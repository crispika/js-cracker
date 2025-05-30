/**
 * 手写 Promise 类
 * 实现一个符合 Promise A+ 规范的 Promise 类
 * 需要实现以下功能：
 * 1. Promise 构造函数
 * 2. then 方法
 * 3. catch 方法
 * 4. finally 方法
 * 5. 静态方法：resolve, reject
 */
class MyPromise {
  constructor(executor) {
    // TODO: 在这里实现你的代码
  }

  then(onFulfilled, onRejected) {
    // TODO: 在这里实现你的代码
  }

  catch(onRejected) {
    // TODO: 在这里实现你的代码
  }

  finally(onFinally) {
    // TODO: 在这里实现你的代码
  }

  static resolve(value) {
    // TODO: 在这里实现你的代码
  }

  static reject(reason) {
    // TODO: 在这里实现你的代码
  }

  static all(promises = []) {
    // TODO: 在这里实现你的代码
  }

  static race(promises = []) {
    // TODO: 在这里实现你的代码
  }
}

module.exports = MyPromise;
