import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function distinct<A>(): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        const emitted = new Set<A>();

        return source.subscribe(
            (value) => {
                if(!emitted.has(value)) {
                    emitted.add(value);
                    subscriber.next(value);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
