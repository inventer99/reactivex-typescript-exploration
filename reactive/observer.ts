export type OnNextFn<T> = (value: T) => void;
export type OnErrorFn = (error: any) => void;
export type OnCompleteFn = () => void;

export interface Observer<T> {
    next?: OnNextFn<T>;
    error?: OnErrorFn;
    complete?: OnCompleteFn;
}
