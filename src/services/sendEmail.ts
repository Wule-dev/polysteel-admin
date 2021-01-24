import nodemailer from 'nodemailer';
import { MailModel } from '../types';

const sendMail = async ({
  title, to, subject, text, html,
}: MailModel): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: Number(process.env.MAILPORT),
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  });

  await transporter.sendMail({
    from: `"${title}" <${process.env.MAILUSER}>`,
    to: `<${to}>`,
    subject,
    text,
    html,
  });
};

export default sendMail;
