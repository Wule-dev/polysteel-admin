import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { UserType } from '../types';

import User from '../models/User';

import generateToken from './utils/generateToken';
import sendMail from '../services/sendEmail';
import { treatCPF, treatEmail } from './utils/treatment';

export = {
  async store(req: Request, res: Response) {
    const { name, email, password }: UserType = req.body;

    if (!name || name.length <= 3) return res.status(400).json({ message: 'Nome inválido', field: 'registerName' });

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json({ message: 'Email Invalido', field: 'registerEmail' });

    const existingAccount = await User.findOne({ email });
    if (existingAccount) return res.status(400).json({ message: 'Email já existe', field: 'registerEmail' });

    if (!password || password.length < 8) return res.status(400).json({ message: 'Senha inválida', field: 'registerPassword' });

    const account = await new User({
      userID: uuid(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();

    sendMail({
      title: 'Confirmar Cadastro de nova conta administrativa',
      to: email,
      subject: 'Uma pedido de nova conta administrativa foi aberto',
      html: `${process.env.BASEURL}/signup/confirm?userID=${account.userID}`,
    });

    return res.status(201).json({ message: 'Pré cadastro concluído. Confirme sua caixa de entrada e ative sua conta para continuar.' });
  },

  async update(req: Request, res: Response) {
    const { cpf, address, phone }: UserType = req.body;
    const { userID }: UserType & any = req.query;

    const user = await User.findOne({ userID });
    if (!user) return res.status(401).json({ message: 'Esta conta não existe' });
    if (user.actived) return res.status(401).json({ message: 'Esta conta já está confirmada' });

    const CPFTest: boolean = treatCPF(cpf);
    if (!CPFTest) return res.status(400).json({ message: 'CPF inválido', field: 'registerCPF' });

    if (!address) return res.status(400).json({ message: 'Endereço inválido', field: 'registerAddress' });

    if (!phone || phone.length < 10) return res.status(400).json({ message: 'Telefone inválido', field: 'registerPhone' });

    await User.updateOne({ userID }, {
      actived: true,
      cpf,
      address,
      phone,
    });

    const jwtToken = generateToken(user);

    return res.status(201).json(jwtToken);
  },
}
