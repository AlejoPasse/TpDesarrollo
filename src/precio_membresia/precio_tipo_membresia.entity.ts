import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { TipoMembresias } from "../tipo_membresia/tipo_membresia.entity.js";


@Entity()
export class PrecioTipoMembresias {
  @ManyToOne(() => TipoMembresias , {primary: true})
  idTipoMembresia!: TipoMembresias;
  @PrimaryKey({type: 'date'})
  date_start_price!: Date;
  @Property({type: 'date', nullable: true})
  date_end_price!: Date;
  @Property({type: 'number', nullable: false})
  price!: number;
}