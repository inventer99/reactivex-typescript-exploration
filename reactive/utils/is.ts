export const isArray = <T>(value: any): value is Array<T> => value instanceof Array;

export const isArrayLike = <T>(value: any): value is ArrayLike<T> => value && typeof value.length === 'number' && typeof value !== 'function';

export const isIterable = <T>(value: any): value is Iterable<T> => value && typeof value[Symbol.iterator] === 'function';

export const isPromise = <T>(value: any): value is Promise<T> => value instanceof Promise;

export const isObject = (value: any): value is object => value && typeof value === 'object';
