import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function sum(): OperatorFn<number, number> {
    return (source) => new Observable<number>((subscriber) => {
        let accumulator = 0;
        return source.subscribe(
            (value) => {
                accumulator += value;
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(accumulator);
                subscriber.complete()
            }
        );
    });
}
