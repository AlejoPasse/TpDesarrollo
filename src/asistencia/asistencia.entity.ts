import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/decorators/legacy";
import { Usuarios } from "../usuario/usuario.entity.js";


@Entity()
export class Asistencia {
  @ManyToOne(() => Usuarios, { primary: true })
  usuario!: Usuarios;
  @PrimaryKey({ type: 'date' })
  date!: Date;
}