import { Observable } from '../observable';
import { OperatorFn } from '../operator';


export function sample<A>(signal: Observable<any>): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let receivedNext = false;
        let sample: A;

        const takeSample = () => {
            if(receivedNext) {
                subscriber.next(sample);
                receivedNext = false;
            }
        };

        const signalSubscription = signal.subscribe(
            () => takeSample(),
            null,
            () => takeSample()
        );

        return source.subscribe(
            (value) => {
                sample = value;
                receivedNext = true;
            },
            (error) => {
                signalSubscription.unsubscribe();
                subscriber.error(error)
            },
            () => {
                signalSubscription.unsubscribe();
                subscriber.complete()
            }
        );
    });
}
