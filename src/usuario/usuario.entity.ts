import "reflect-metadata";
import { Entity, Property } from "@mikro-orm/decorators/legacy";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class Usuarios extends BaseEntity {

  @Property({ type: 'string', nullable: false, length: 100 })
  name!: string;

  @Property({ type: 'string', nullable: false, length: 100, unique: true })
  email!: string;

  @Property({ type: 'string', nullable: false, length: 100 })
  password!: string;

  @Property({ type: 'string', nullable: false, length: 50 })
  role!: string;

  @Property({ type: 'number', nullable: true })
  peso?: number;

  @Property({ type: 'number', nullable: true })
  altura?: number;
  
}