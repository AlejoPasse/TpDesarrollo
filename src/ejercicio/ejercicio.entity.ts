import "reflect-metadata";
import { Entity, Property } from "@mikro-orm/decorators/legacy";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class Ejercicio extends BaseEntity {
  @Property({type: 'string', nullable: false, length: 100})
  name!: string;
  @Property({type: 'string', nullable: false, length: 100})
  description!: string;
  @Property({type: 'string', nullable: true, length: 100})
  nota!: string; //observaciones del ejercicio
}