import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function timestamp<A>(): OperatorFn<A, [Date, A]> {
    return (source) => new Observable<[Date, A]>((subscriber) => {
        return source.subscribe(
            (value) => subscriber.next([new Date(), value]),
            (error) => subscriber.next(error),
            () => subscriber.complete()
        );
    });
}
