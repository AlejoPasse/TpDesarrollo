import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { Membresia } from "../membresia/membresia.entity.js";


@Entity()
export class PrecioMembresia {
  @ManyToOne(() => Membresia , {primary: true})
  membresia!: Membresia;
  @PrimaryKey({type: 'date'})
  date_price!: Date;
  @Property({type: 'number', nullable: false})
  price!: number;
}