import { Subject } from './subject';


export class AsyncSubject<T> extends Subject<T> {
    private mostRecentValue: T;
    private emitted = false;

    next = (value: T): void => {
        this.emitted = true;
        this.mostRecentValue = value;
    };

    complete = (): void => {
        this.subscribers.forEach((subscriber) => {
            if(this.emitted) {
                subscriber.next(this.mostRecentValue);
            }
            subscriber.complete();
        });
    };
}
