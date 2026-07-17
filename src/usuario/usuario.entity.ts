import crypto from 'node:crypto'

export class Usuario {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id ?: number,
  ) {}
}