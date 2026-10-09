import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/decorators/legacy";
import { Usuario } from "../usuario/usuario.entity.js";


@Entity()
export class Asistencia {
  @ManyToOne(() => Usuario, { primary: true })
  usuario!: Usuario;
  @PrimaryKey({ type: 'date' })
  date!: Date;
}