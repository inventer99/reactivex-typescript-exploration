import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function reduce<A, B>(projector: (accumulator: B, value: A) => B, inital: B): OperatorFn<A, B> {
    return (source) => new Observable<B>((subscriber) => {
        let accumulator = inital;
        return source.subscribe(
            (value) => {
                try {
                    accumulator = projector(accumulator, value);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(accumulator);
                subscriber.complete()
            }
        );
    });
}
