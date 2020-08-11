import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function map<A, B>(projector: (value: A) => B): OperatorFn<A, B> {
    return (source) => new Observable<B>((subscriber) => {
        return source.subscribe(
            (value) => {
                try {
                    const projected = projector(value);
                    subscriber.next(projected);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
