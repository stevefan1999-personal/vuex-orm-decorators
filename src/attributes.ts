import { Model, Attribute } from '@vuex-orm/core';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';

type FunctorOrValue<T> = (() => T) | T

const unwrapFunctorOrValue = <T>(functorOrValue: FunctorOrValue<T>): T =>
    ((functorOrValue instanceof Function && functorOrValue()) || functorOrValue) as T

/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
    return (target: Object, propertyName: string | symbol): void => {
        (target.constructor as any).primaryKey = propertyName;
    };
}

/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldTypeFn: () => Attribute) {
    return (target: Object, propertyName: string | symbol): void => {
        (target.constructor as any)._fields = (target.constructor as any)._fields || {};
        (target.constructor as any)._fields[propertyName] = fieldTypeFn;
    };
}

/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function StringField(defaultValue?: FunctorOrValue<string>) {
    return Field(() => Model.string(unwrapFunctorOrValue(defaultValue) || ''));
}

/**
 * Adds the property as an incremental field
 */
export function IncrementField() {
    return Field(() => Model.increment());
}

/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undefined dthe default will be '')
 */
export function AttrField<T>(defaultValue?: FunctorOrValue<T>) {
    return Field(() => Model.attr(unwrapFunctorOrValue(defaultValue) || ''));
}

/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export function NumberField(defaultValue?: FunctorOrValue<number>) {
    return Field(() => Model.number(unwrapFunctorOrValue(defaultValue) || 0));
}

/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export function BooleanField(value: FunctorOrValue<any>, mutator?: Mutator<boolean | null>) {
    return Field(() => Model.boolean(unwrapFunctorOrValue(value) || false, mutator));
}

/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(related: FunctorOrValue<typeof Model | string>, foreignKey: FunctorOrValue<string>, localKey?: FunctorOrValue<string>) {
    return Field(() => (Model.hasMany as any)(...[related, foreignKey, localKey].map(unwrapFunctorOrValue)));
}

/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(related: FunctorOrValue<typeof Model | string>, foreignKey: FunctorOrValue<string>, localKey?: FunctorOrValue<string>) {
    return Field(() => (Model.hasOne as any)(...[related, foreignKey, localKey].map(unwrapFunctorOrValue)));
}

/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(parent: FunctorOrValue<typeof Model | string>, foreignKey: FunctorOrValue<string>, ownerKey?: FunctorOrValue<string>) {
    return Field(() => (Model.belongsTo as any)(...[parent, foreignKey, ownerKey].map(unwrapFunctorOrValue)));
}

export function HasManyByField(parent: FunctorOrValue<typeof Model | string>, foreignKey: FunctorOrValue<string>, ownerKey?: FunctorOrValue<string>) {
    return Field(() => (Model.hasManyBy as any)(...[parent, foreignKey, ownerKey].map(unwrapFunctorOrValue)));
}

export function HasManyThroughField(
    related: FunctorOrValue<typeof Model | string>, 
    through: FunctorOrValue<typeof Model | string>, 
    firstKey: FunctorOrValue<string>, secondKey: FunctorOrValue<string>, 
    localKey?: FunctorOrValue<string>, secondLocalKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.hasManyThrough as any)(...[related, through, firstKey, secondKey, localKey, secondLocalKey].map(unwrapFunctorOrValue)));
}

export function BelongsToManyField(
    related: FunctorOrValue<typeof Model | string>, 
    pivot: FunctorOrValue<typeof Model | string>, 
    foreignPivotKey: FunctorOrValue<string>, relatedPivotKey: FunctorOrValue<string>,
    parentKey?: FunctorOrValue<string>, relatedKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.belongsToMany as any)(...[related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey].map(unwrapFunctorOrValue)));
}

export function MorphToField(
    id: FunctorOrValue<string>, type: FunctorOrValue<string>
) {
    return Field(() => (Model.morphTo as any)(...[id, type].map(unwrapFunctorOrValue)));
}

export function MorphOneField(
    related: FunctorOrValue<typeof Model | string>, 
    id: FunctorOrValue<string>, type: FunctorOrValue<string>, localKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.morphOne as any)(...[related, id, type, localKey].map(unwrapFunctorOrValue)));
}

export function MorphManyField(
    related: FunctorOrValue<typeof Model | string>, 
    id: FunctorOrValue<string>, type: FunctorOrValue<string>, localKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.morphMany as any)(...[related, id, type, localKey].map(unwrapFunctorOrValue)));
}

export function MorphToManyField(
    related: FunctorOrValue<typeof Model | string>, 
    pivot: FunctorOrValue<typeof Model | string>, 
    relatedId: FunctorOrValue<string>, id: FunctorOrValue<string>, type: FunctorOrValue<string>, 
    parentKey?: FunctorOrValue<string>, relatedKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.morphToMany as any)(...[related, pivot, relatedId, id, type, parentKey, relatedKey].map(unwrapFunctorOrValue)));
}

export function MorphedByManyField(
    related: FunctorOrValue<typeof Model | string>, 
    pivot: FunctorOrValue<typeof Model | string>, 
    relatedId: FunctorOrValue<string>, id: FunctorOrValue<string>, type: FunctorOrValue<string>, 
    parentKey?: FunctorOrValue<string>, relatedKey?: FunctorOrValue<string>
) {
    return Field(() => (Model.morphedByMany as any)(...[related, pivot, relatedId, id, type, parentKey, relatedKey].map(unwrapFunctorOrValue)));
}

