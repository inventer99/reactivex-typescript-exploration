import { Observable } from '../observable';
import { error } from './error';
import { isArray, isArrayLike, isIterable, isPromise } from '../utils';
import { Scheduler } from '../scheduler';
import { syncScheduler } from '../schedulers';
import { Subscription } from '../subscription';
import { Subscriber } from '../subscriber';


function fromIterator<T>(iterable: Iterable<T>, subscriber: Subscriber<T>): void {
    const iterator = iterable[Symbol.iterator]()

    do {
        const next = iterator.next();

        if(next.done) {
            subscriber.complete();
            return;
        }

        subscriber.next(next.value);
    } while(true);
}

function fromArray<T>(array: Array<T>, subscriber: Subscriber<T>): void {
    for(let i = 0;i < array.length;i++) {
        subscriber.next(array[i]);
    }
    subscriber.complete();
}

function fromPromise<T>(promise: Promise<T>, subscriber: Subscriber<T>): void {
   promise.then((value) => {
       subscriber.next(value);
       subscriber.complete();
   }, (error) => {
       subscriber.error(error);
   });
}

export function from<T>(array: Array<T>, scheduler?: Scheduler): Observable<T>;
export function from<T>(source: ArrayLike<T>, scheduler?: Scheduler): Observable<T>;
export function from<T>(iterator: IterableIterator<T>, scheduler?: Scheduler): Observable<T>;
export function from<T>(source: Promise<T>, scheduler?: Scheduler): Observable<T>;
export function from<T>(source: unknown, scheduler: Scheduler = syncScheduler): Observable<T> {
    return new Observable<T>((subscriber) => {
        const job = scheduler.schedule(() => {
            if(isArray<T>(source)) {
                return fromArray<T>(source, subscriber);
            } else if (isArrayLike<T>(source)) {
                return fromArray<T>(Array.from(source), subscriber);
            } else if (isIterable<T>(source)) {
                return fromIterator<T>(source, subscriber);
            } else if(isPromise<T>(source)) {
                return fromPromise<T>(source, subscriber);
            } else {
                return error();
            }
        });

        return new Subscription(() => {
            job.cancel();
        });
    });
}

