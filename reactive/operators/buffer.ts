import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function buffer<T>(signal: Observable<any>): OperatorFn<T, Array<T>> {
    return (source) => new Observable<Array<T>>((subscriber) => {
        let buffer: Array<T> = [];

        const subscription = signal.subscribe(() => {
            subscriber.next(buffer);
            buffer = [];
        });

        return source.subscribe(
            (value) => {
                buffer.push(value);
            },
            (error) => {
                subscription.unsubscribe();
                subscriber.error(error);
            },
            () => {
                subscription.unsubscribe();
                subscriber.complete();
            }
        );
    });
}
