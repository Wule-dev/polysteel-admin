export type UserType = {
  userID: string,
  name: string,
  email: string,
  password?: string,
  phone?: string,
  cpf?: string,
  address?: {
    cep: string,
    city: string,
    street: string,
    additionalAddress: string,
    neighborhood: string,
    number: number,
    state: string,
    referencePoint: string,
  },
  actived: boolean,
  recovery: {
    code: string,
    date: number
  }
};
