import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { UserType } from '../types';

import User from '../models/User';

import { treatEmail } from './utils/treatment';
import generateToken from './utils/generateToken';
import sendMail from '../services/sendEmail';

export = {
  async index(req: Request, res: Response) {
    const { email, password }: UserType = req.body;

    if (!email) return res.status(400).json({ message: 'Digite um e-mail', field: 'loginEmail' });
    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json({ message: 'Email Invalido', field: 'loginEmail' });

    const account = await User.findOne({ email });
    if (!account) return res.status(400).json({ message: 'Não existe uma conta administrativa com este email', field: 'loginEmail' });
    if (!account.actived) return res.status(401).json({ message: 'Esta conta administrativa ainda não foi ativada, verifique seu email' });

    if (!password || password.length < 8) return res.status(400).json({ message: 'Senha inválida', field: 'loginPassword' });
    if (!await bcrypt.compare(password, account.password)) return res.status(401).json({ message: 'Senha incorreta', field: 'loginPassword' });

    const jwtToken = generateToken(account);

    return res.status(200).json(jwtToken);
  },
  async show(req: Request, res: Response) {
    const { email }: UserType = req.body;

    const recoveryCode = uuid();

    const account = await User.findOne({ email });
    if (!account) return res.status(400).json({ message: 'Não existe uma conta administrativa com este email.', field: 'recoverEmail' });

    sendMail({
      title: 'Recuperação de senha',
      subject: 'E-mail para recuperação da sua senha ',
      to: account.email,
      html: `${process.env.BASEURL}/newpass?recoveryCode=${recoveryCode}`,
    });

    await User.updateOne({ email }, {
      recovery: {
        code: recoveryCode,
        date: new Date().getTime() + 3600000,
      },
    });

    return res.status(200).json({ message: 'Um e-mail foi enviado para que você recupere sua conta administrativa, confira a sua caixa de entrada.' });
  },
  async update(req: Request, res: Response) {
    const { password, confirmPassword }: { password: string, confirmPassword: string } = req.body;
    const { recoveryCode }: UserType & any = req.query;

    const dateNow = new Date().getTime();

    if (!password || !confirmPassword) return res.status(400).json({ message: 'Senha inválida', field: 'updateEmail' });
    if (password !== confirmPassword) return res.status(400).json({ message: 'As senhas não são iguais', field: 'updateEmail' });

    const account = await User.findOne({ 'recovery.code': recoveryCode });

    if (!account || !recoveryCode) return res.status(401).json({ message: 'Código de recuperação inválido' });
    if (account.recovery.date < dateNow) return res.status(401).json({ message: 'Código de recuperação expirado' });

    await User.updateOne({ userID: account.userID }, {
      password: await bcrypt.hash(password, 10),
      recovery: {
        code: uuid(),
        date: new Date().getTime() + 3600000,
      },
    });

    return res.status(200).json({ message: 'Você já pode logar com sua nova senha.' });
  },
}
