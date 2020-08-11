import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function timer(delay): Observable<number> {
    return new Observable<number>((subscriber) => {
        const id = setTimeout(() => {
            subscriber.next(0);
            subscriber.complete();
        }, delay);

        return new Subscription(() => clearTimeout(id));
    });
}
