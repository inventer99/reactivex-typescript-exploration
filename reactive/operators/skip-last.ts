import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function skipLast<A>(n: number): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        const queue: Array<A> = [];
        return source.subscribe(
            (value) => {
                queue.push(value);
                if(queue.length > n) {
                    subscriber.next(queue.shift());
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
