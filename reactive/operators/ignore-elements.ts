import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function ignoreElements<A>(): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        source.subscribe(
            null,
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
