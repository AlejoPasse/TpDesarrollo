import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { TipoMembresias } from "../tipo_membresia/tipo_membresia.entity.js";


@Entity()
export class PrecioMembresia {
  @ManyToOne(() => TipoMembresias , {primary: true})
  membresia!: TipoMembresias;
  @PrimaryKey({type: 'date'})
  date_price!: Date;
  @Property({type: 'number', nullable: false})
  price!: number;
}