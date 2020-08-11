import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { Subscriber } from '../subscriber';


export function window<T>(signal: Observable<any>): OperatorFn<T, Observable<T>> {
    return (source) => new Observable<Observable<T>>((subscriber) => {
        let frameSubscriber: Subscriber<T>;

        const advanceFrame = () => {
            const frame = new Observable<T>((_frameSubscriber) => {
                frameSubscriber = _frameSubscriber;
            });
            subscriber.next(frame);
        };

        const signalSubscription = signal.subscribe(() => {
            advanceFrame();
        });

        advanceFrame();

        return source.subscribe(
            (value) => {
                frameSubscriber.next(value);
            },
            (error) => {
                signalSubscription.unsubscribe();
                subscriber.error(error);
            },
            () => {
                signalSubscription.unsubscribe();
                subscriber.complete();
            }
        );
    });
}
