import { Observer } from './observer';
import { noop } from './utils';


export interface Subscriber<T> {
    next(value: T);
    error(error: any);
    complete();
}

export class Subscriber<T> {
    private closed: boolean = false;

    constructor(private observer: Observer<T>) {}

    next(value: T) {
        if(!this.closed) {
            (this.observer.next ?? noop)(value);
        }
    }
    error(error: any) {
        if(!this.closed) {
            (this.observer.error ?? noop)(error);
            this.closed = true;
        }
    }
    complete() {
        if(!this.closed) {
            (this.observer.complete ?? noop)();
            this.closed = true;
        }
    }

    isClosed(): boolean {
        return this.closed;
    }
}
