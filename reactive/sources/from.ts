import { Observable } from '../observable';
import { error } from './error';
import { isArray, isArrayLike, isIterable, isPromise } from '../utils';


function fromIterator<T>(iterable: Iterable<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        const iterator = iterable[Symbol.iterator]()

        do {
            const next = iterator.next();

            if(next.done) {
                subscriber.complete();
                return;
            }

            subscriber.next(next.value);
        } while(true);

        //TODO: Finish
        // return new Subscription();
    });
}

function fromArray<T>(array: Array<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        for(let i = 0;i < array.length;i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}

function fromPromise<T>(promise: Promise<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
       promise.then((value) => {
           subscriber.next(value);
           subscriber.complete();
       }, (error) => {
           subscriber.error(error);
       });
    });
}

export function from<T>(array: Array<T>): Observable<T>;
export function from<T>(source: ArrayLike<T>): Observable<T>;
export function from<T>(iterator: IterableIterator<T>): Observable<T>;
export function from<T>(source: Promise<T>): Observable<T>;
export function from<T>(source: unknown): Observable<T> {
    if(isArray<T>(source)) {
        return fromArray<T>(source);
    } else if (isArrayLike<T>(source)) {
        return fromArray<T>(Array.from(source));
    } else if (isIterable<T>(source)) {
        return fromIterator<T>(source);
    } else if(isPromise<T>(source)) {
        return fromPromise<T>(source);
    } else {
        return error();
    }
}

