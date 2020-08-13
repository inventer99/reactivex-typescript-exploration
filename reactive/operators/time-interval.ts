import { OperatorFn } from '../operator';
import { Observable } from '../observable';

declare const process;
declare const window;
declare const require;

const performance = (() =>
    typeof process === 'object'
    ? require('perf_hooks').performance
    : window.performance
)();

export function timeInterval<A>(): OperatorFn<A, number> {
    return (source) => new Observable<number>((subscriber) => {
        let startTime = performance.now();
        return source.subscribe(
            (value) => {
                const stopTime = performance.now();
                const interval = stopTime - startTime;
                startTime = stopTime;
                subscriber.next(interval);
            },
            (error) => subscriber.next(error),
            () => subscriber.complete()
        );
    });
}
