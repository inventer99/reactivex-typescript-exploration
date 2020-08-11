import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function interval(delay: number = 1000): Observable<number> {
    return new Observable<number>((subscriber) => {
        let index = 0;
        const id = setInterval(() => {
            subscriber.next(index++);
        }, delay);

        return new Subscription(() => clearInterval(id));
    });
}
