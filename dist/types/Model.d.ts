import { Model } from '@vuex-orm/core';
export declare function OrmModel(entityName: string, options?: {
    parentEntity?: string;
    types?: {
        [key: string]: typeof Model;
    };
    typeKey?: string;
    autoRegister: boolean;
    cacheFields: boolean;
}): <Model_1 extends Function>(constructor: Model_1) => void | Model_1;
