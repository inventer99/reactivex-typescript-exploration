import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function last<A>(): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let receivedNext = false;
        let mostRecentValue: A;
        return source.subscribe(
            (value) => {
                mostRecentValue = value;
                receivedNext = true;
            },
            (error) => subscriber.error(error),
            () => {
                if(receivedNext) {
                    subscriber.next(mostRecentValue);
                }
                subscriber.complete();
            }
        );
    });
}
