// const MyPromise = require("../../my-solutions/promise/MyPromise");
const MyPromise = require("../../solutions/promise/MyPromise");

describe("Promise.race 实现", () => {
  test("应该返回第一个完成的 Promise 的结果", () => {
    const promise1 = new MyPromise((resolve) => {
      setTimeout(() => resolve(1), 200);
    });
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 300);
    });

    return MyPromise.race([promise1, promise2, promise3]).then((value) => {
      expect(value).toBe(2);
    });
  });

  test("如果第一个完成的 Promise 是拒绝的，应该返回拒绝原因", () => {
    const promise1 = new MyPromise((resolve) => {
      setTimeout(() => resolve(1), 200);
    });
    const promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("test error")), 100);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 300);
    });

    return MyPromise.race([promise1, promise2, promise3]).catch((error) => {
      expect(error.message).toBe("test error");
    });
  });

  test("应该处理非 Promise 值", () => {
    return MyPromise.race([1, 2, 3]).then((value) => {
      expect(value).toBe(1);
    });
  });

  test("应该处理空数组", () => {
    return MyPromise.race([]).then((value) => {
      expect(value).toBeUndefined();
    });
  });

  test("应该处理混合类型的输入", () => {
    const promise1 = new MyPromise((resolve) => {
      setTimeout(() => resolve(1), 200);
    });
    const promise2 = 2;
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 100);
    });

    return MyPromise.race([promise1, promise2, promise3]).then((value) => {
      expect(value).toBe(2);
    });
  });

  test("应该处理立即完成的 Promise", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });

    return MyPromise.race([promise1, promise2]).then((value) => {
      expect(value).toBe(1);
    });
  });

  test("应该处理立即拒绝的 Promise", () => {
    const promise1 = MyPromise.reject(new Error("immediate error"));
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });

    return MyPromise.race([promise1, promise2]).catch((error) => {
      expect(error.message).toBe("immediate error");
    });
  });
});
