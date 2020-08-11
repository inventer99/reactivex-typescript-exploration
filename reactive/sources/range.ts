import { Observable } from '../observable';


export function range(start: number, end: number): Observable<number> {
    if(start > end) {
        throw new RangeError(`Start (${start}) is after end (${end})!`);
    }

    return new Observable<number>((subscriber) => {
        for(let i = start;i < end;i++) {
            subscriber.next(i);
        }
        subscriber.complete();
    });
}
