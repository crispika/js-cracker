/**
 * 主要简化点：
 * 移除了复杂的 resolvePromise 方法
 * 简化了 thenable 对象的处理
 * 移除了 allSettled、any、try 等扩展方法
 * 简化了错误处理逻辑
 */

class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  state = MyPromise.PENDING;
  value = undefined;
  reason = undefined;
  promiseFulfilledReactions = [];
  promiseRejectedReactions = [];

  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Promise constructor's argument is not a function");
    }

    const resolve = (value) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.FULFILLED;
        this.value = value;
        this.promiseFulfilledReactions.forEach((reaction) => reaction());
      }
    };

    const reject = (reason) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.REJECTED;
        this.reason = reason;
        this.promiseRejectedReactions.forEach((reaction) => reaction());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const _resolve = () => {
        if (typeof onFulfilled !== "function") {
          resolve(this.value);
        } else {
          try {
            const res = onFulfilled(this.value);
            if (res instanceof MyPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (err) {
            reject(err);
          }
        }
      };

      const _reject = () => {
        if (typeof onRejected !== "function") {
          reject(this.reason);
        } else {
          try {
            const res = onRejected(this.reason);
            if (res instanceof MyPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (err) {
            reject(err);
          }
        }
      };

      switch (this.state) {
        case MyPromise.PENDING:
          this.promiseFulfilledReactions.push(() => {
            queueMicrotask(() => _resolve());
          });
          this.promiseRejectedReactions.push(() => {
            queueMicrotask(() => _reject());
          });
          break;
        case MyPromise.FULFILLED:
          queueMicrotask(() => _resolve());
          break;
        case MyPromise.REJECTED:
          queueMicrotask(() => _reject());
          break;
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value),
      (reason) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises = []) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results = [];
      let count = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  static race(promises = []) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve(undefined);
        return;
      }

      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }
}

module.exports = MyPromise;
