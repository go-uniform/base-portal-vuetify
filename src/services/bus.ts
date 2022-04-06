// This is just a communications bus using observer pub/sub patterns

interface FuncSubscribe {
    (event: string | string[], callback: Function): void;
}

interface FuncPublish {
    (event: string, ...args: any[]): void;
}

interface FuncUnsubscribe {
    (event?: string | string[], callback?: Function): void;
}

interface IObserver {
    subscribe: FuncSubscribe;
    publish: FuncPublish;
    unsubscribe: FuncUnsubscribe;
}

let observer: IObserver;

export const bus = {
    set: (wrapper: IObserver) => {
        observer = wrapper;
    },
    unsubscribe: (event?: string | string[], callback?: Function): void => {
        observer.unsubscribe(event, callback);
    },
    subscribe: (event: string | string[], callback: Function): void => {
        observer.subscribe(event, callback);
    },
    publish: (event: string, ...args: any[]): void => {
        observer.publish(event, args);
    }
};