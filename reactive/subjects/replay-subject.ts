import { Subject } from './subject';
import { CreatorFn } from '../observable';


export class ReplaySubject<T> extends Subject<T> {
    private queue: Array<T> = [];

    private readonly REPLAY_CREATOR_FN: CreatorFn<T> = (subscriber) => {
        this.queue.forEach((value) => {
            subscriber.next(value);
        });
        return this.DEFAULT_CREATOR_FN(subscriber);
    };

    constructor(private count?: number) {
        super();
        this.creator = this.REPLAY_CREATOR_FN;
    }

    next = (value: T): void => {
        this.queue.push(value);
        if(this.count !== undefined && this.queue.length > this.count) {
            this.queue.shift();
        }

        this.subscribers.forEach((subscriber) => {
            subscriber.next(value);
        });
    };
}
