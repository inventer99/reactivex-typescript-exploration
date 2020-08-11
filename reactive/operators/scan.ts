import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function scan<A, B>(projector: (accumulator: B, value: A) => B, inital: B): OperatorFn<A, B> {
    return (source) => new Observable<B>((subscriber) => {
        let accumulator = inital;
        return source.subscribe(
            (value) => {
                try {
                    accumulator = projector(accumulator, value);
                    subscriber.next(accumulator);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
