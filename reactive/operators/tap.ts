import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { OnCompleteFn, OnErrorFn, OnNextFn } from '../observer';


export function tap<A>(onNext: OnNextFn<A>, onError?: OnErrorFn, onComplete?: OnCompleteFn): OperatorFn<A, A> {
    return (source) => new Observable((subscriber) => {
        return source.subscribe(
            (value) => {
                if(onNext) {
                    onNext(value);
                }
                subscriber.next(value);
            },
            (error) => {
                if(onError) {
                    onError(error);
                }
                subscriber.error(error);
            },
            () => {
                if(onComplete) {
                    onComplete();
                }
                subscriber.complete();
            }
        );
    });
}


