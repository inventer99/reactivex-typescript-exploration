export interface NextNotification<T> {
    type: 'next';
    value: T;
    error?: any;
}

export interface ErrorNotification<T> {
    type: 'error';
    value?: T;
    error: any;
}

export interface CompleteNotification<T> {
    type: 'complete';
    value?: T;
    error?: any;
}

export type Notification<T> = NextNotification<T> | ErrorNotification<T> | CompleteNotification<T>;
