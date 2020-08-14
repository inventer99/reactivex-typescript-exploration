import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function toArray<A>(): OperatorFn<A, Array<A>> {
    return (source) => new Observable<Array<A>>((subscriber) => {
        const collection = new Array<A>();
        return source.subscribe(
            (value) => collection.push(value),
            (error) => subscriber.error(error),
            () => {
                subscriber.next(collection);
                subscriber.complete();
            }
        );
    });
}

export function toSet<A>(): OperatorFn<A, Set<A>> {
    return (source) => new Observable<Set<A>>((subscriber) => {
        const collection = new Set<A>();
        return source.subscribe(
            (value) => collection.add(value),
            (error) => subscriber.error(error),
            () => {
                subscriber.next(collection);
                subscriber.complete();
            }
        );
    });
}
