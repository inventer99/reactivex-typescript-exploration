import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function average(): OperatorFn<number, number> {
    return (source) => new Observable<number>((subscriber) => {
        let values = 0, accumulator = 0;
        return source.subscribe(
            (value) => {
                values++;
                accumulator += value;
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(accumulator / values);
                subscriber.complete();
            }
        );
    });
}
