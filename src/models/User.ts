import { Schema, model, Document } from 'mongoose';
import { UserType } from '../types';

const UserSchema: Schema = new Schema({
  userID: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  cpf: String,
  address: {
    cep: String,
    city: String,
    street: String, // Endereço inicial
    additionalAddress: String, // Complemento
    neighborhood: String, // Bairro
    number: Number,
    state: String,
    referencePoint: String,
  },
  company: {
    name: String,
    phone: String,
    cnpj: String,
    address: {
      cep: String,
      city: String,
      street: String,
      additionalAddress: String,
      neighborhood: String,
      number: Number,
      state: String,
      referencePoint: String,
    },
  },
  actived: Boolean,
  recovery: {
    code: String,
    date: Number,
  },
});

export default model<UserType & Document>('User', UserSchema);
