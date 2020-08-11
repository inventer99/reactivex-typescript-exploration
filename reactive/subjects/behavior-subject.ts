import { Subject } from './subject';
import { CreatorFn } from '../observable';


export class BehaviorSubject<T> extends Subject<T> {
    private readonly BEHAVIOR_CREATOR_FN: CreatorFn<T> = (subscriber) => {
        subscriber.next(this.initialValue);
        return this.DEFAULT_CREATOR_FN(subscriber);
    };

    constructor(private initialValue: T) {
        super();
        this.creator = this.BEHAVIOR_CREATOR_FN;
    }

    next = (value: T): void => {
        this.initialValue = value;
        this.subscribers.forEach((subscriber) => {
            subscriber.next(value);
        });
    };
}
