import VuexORM, { Model, Database } from '@vuex-orm/core';
import { Plugin } from 'vuex';


export class ORMDatabase {
    private static _ormDatabase?: Database = undefined;
    private static _installed: (typeof Model)[] = [];

    public static install(): Plugin<any> {
        return VuexORM.install(this.ormDatabase);
    }

    public static registerEntity(model: typeof Model): void {
        if (this._installed.indexOf(model) !== -1) {
            console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
            return;
        }
        this.ormDatabase.register(model);
    }

    public static get ormDatabase(): Database {
        if (!this._ormDatabase) this._ormDatabase = new Database();
        return this._ormDatabase
    }
}