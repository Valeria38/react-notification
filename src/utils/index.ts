export const sum = (a: number, b: number) => a + b;

class Observer {
  observers: Array<Function>;
  constructor() {
    this.observers = [];
  }

  set(fn: Function) {
    this.observers.push(fn);
  }

  remove(fn: Function) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  dispatch(data: any) {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
