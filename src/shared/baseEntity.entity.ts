import { Entity, PrimaryKey } from '@mikro-orm/decorators/legacy'

export abstract class BaseEntity {
  @PrimaryKey({type: 'number', autoincrement: true})
  id?: number

  /*

  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  */
}