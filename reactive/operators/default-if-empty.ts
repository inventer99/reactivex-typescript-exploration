import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function defaultIfEmpty<A>(defaultValue: A): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let emitted = false;
        return source.subscribe(
            (value) => {
                emitted = true;
                subscriber.next(value);
            },
            (error) => subscriber.error(error),
            () => {
                if(!emitted) {
                    subscriber.next(defaultValue);
                }
                subscriber.complete()
            }
        );
    });
}
