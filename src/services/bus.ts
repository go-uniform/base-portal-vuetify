// This is just a communications bus using observer pub/sub patterns

type FuncSubscribe = (
  event: string | string[],
  callback: any,
) => void;

type FuncPublish = (
  event: string,
  args: any,
) => void;

type FuncUnsubscribe = (
  event?: string | string[],
  callback?: any,
) => void;

interface IObserver {
    subscribe: FuncSubscribe;
    publish: FuncPublish;
    unsubscribe: FuncUnsubscribe;
}

let observer: IObserver;

export const bus = {

    set: (
      wrapper: IObserver,
    ) => {
        observer = wrapper;
    },

    unsubscribe: (
      event?: string | string[],
      callback?: any,
    ): void => {
        observer.unsubscribe(event, callback);
    },

    subscribe: (
      event: string | string[],
      callback: any,
    ): void => {
        observer.subscribe(event, callback);
    },

    publish: (
      event: string,
      args: any,
    ): void => {
        observer.publish(event, args);
    },

};
