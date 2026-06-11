export interface Repository<T> {
    findAll(): T[] | undefined;
    findOne(item: {id: string}): T | undefined;
    create(item: T): T | undefined;
    update(item: {id: string}): T | undefined;
    delete(item: {id: string}):  T | undefined;
}