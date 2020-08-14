import { Subscription } from '../subscription';


export class SubSink {
    private subscriptions: Array<Subscription> = [];

    add(subscription: Subscription): this {
        this.subscriptions.push(subscription);
        return this;
    }

    remove(subscription: Subscription): this {
        this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
        return this;
    }

    unsubscribe() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
}
