import jwt from 'jsonwebtoken';
import { UserType } from '../../types';

const generateToken = ({
  userID, name, email, phone, cpf, address, actived,
}: UserType) => jwt.sign({
  userID,
  name,
  email,
  phone,
  cpf,
  address,
  actived,
}, process.env.SECRET);

export default generateToken;
