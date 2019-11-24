import { Model } from '@vuex-orm/core';
export declare function OrmModel(entityName: string, parentEntity?: string, types?: {
    [key: string]: typeof Model;
}, typeKey?: string): <Model_1 extends Function>(constructor: Model_1) => void | Model_1;
