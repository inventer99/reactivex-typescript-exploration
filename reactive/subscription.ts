import { noop } from './utils';


export class Subscription {
    constructor(private onSubscribe: () => void = noop) {}

    unsubscribe(): void {
        this.onSubscribe();
    }
}
