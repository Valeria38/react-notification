export class Observer {
  observers: Array<Function>;

  constructor() {
    this.observers = [];
  }

  subscribe(fn: Function) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Function) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  dispatch(data: any) {
    this.observers.forEach((subscriber) => subscriber(data));
  }

  get() {
    return this.observers;
  }
}
