import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function count<A>(): OperatorFn<A, number> {
    return (source) => new Observable<number>((subscriber) => {
        let values = 0;
        return source.subscribe(
            (value) => {
                values++;
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(values);
                subscriber.complete();
            }
        );
    });
}
