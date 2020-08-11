import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function skipWhile<A>(predicate: (value: A) => boolean): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let skipping = true;

        return source.subscribe(
            (value) => {
                skipping = skipping && predicate(value);
                if(!skipping) {
                    subscriber.next(value);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
