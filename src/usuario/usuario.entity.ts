import crypto from 'node:crypto'

export class Usuario {
  constructor(
    public id = crypto.randomUUID(),
    public nombre: string,
    public email: string,
    public password: string
  ) {}
}