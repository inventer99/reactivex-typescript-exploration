import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function skip<A>(n: number): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let count = 0;
        return source.subscribe(
            (value) => {
                count++;
                if(count > n) {
                    subscriber.next(value);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
