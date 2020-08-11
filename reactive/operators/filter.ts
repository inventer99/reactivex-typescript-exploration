import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function filter<A>(predicate: (value: A) => boolean): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        return source.subscribe(
            (value) => {
                try {
                    if(predicate(value)) {
                        subscriber.next(value);
                    }
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
