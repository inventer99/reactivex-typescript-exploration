import { Observer } from '../observer';
import { CreatorFn, Observable } from '../observable';
import { Subscriber } from '../subscriber';
import { Subscription } from '../subscription';
import { noop } from '../utils';


export class Subject<T> extends Observable<T> implements Observer<T> {
    protected subscribers: Array<Subscriber<T>> = [];

    protected readonly DEFAULT_CREATOR_FN: CreatorFn<T> = (subscriber) => {
        this.subscribers.push(subscriber);

        return new Subscription(() => {
            this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
        });
    };

    constructor() {
        super(noop);
        this.creator = this.DEFAULT_CREATOR_FN;
    }

    next = (value: T): void => {
        this.subscribers.forEach((subscriber) => {
            subscriber.next(value);
        });
    };

    error = (error: any): void => {
        this.subscribers.forEach((subscriber) => {
            subscriber.error(error);
        });
    };

    complete = (): void => {
        this.subscribers.forEach((subscriber) => {
            subscriber.complete();
        });
    };
}
