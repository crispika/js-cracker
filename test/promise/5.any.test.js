const MyPromise = require("../../my-solutions/promise/MyPromise");

describe("Promise.any 实现", () => {
  test("应该返回第一个成功的 Promise 的结果", () => {
    const promise1 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error 1")), 100);
    });
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 200);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 300);
    });

    return MyPromise.any([promise1, promise2, promise3]).then((value) => {
      expect(value).toBe(2);
    });
  });

  test("如果所有 Promise 都失败，应该返回 AggregateError", () => {
    const promise1 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error 1")), 100);
    });
    const promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error 2")), 200);
    });
    const promise3 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error 3")), 300);
    });

    return MyPromise.any([promise1, promise2, promise3]).catch((error) => {
      expect(error).toBeInstanceOf(AggregateError);
      expect(error.errors).toHaveLength(3);
      expect(error.errors[0].message).toBe("error 1");
      expect(error.errors[1].message).toBe("error 2");
      expect(error.errors[2].message).toBe("error 3");
    });
  });

  test("应该处理空数组", () => {
    return MyPromise.any([]).catch((error) => {
      expect(error).toBeInstanceOf(AggregateError);
      expect(error.errors).toHaveLength(0);
    });
  });

  test("应该处理非 Promise 值", () => {
    return MyPromise.any([1, 2, 3]).then((value) => {
      expect(value).toBe(1);
    });
  });

  test("应该处理 thenable 对象", () => {
    const thenable = {
      then: (resolve) => resolve(42),
    };

    return MyPromise.any([thenable]).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该处理混合类型的输入", () => {
    const promise1 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error")), 100);
    });
    const promise2 = 2;
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 200);
    });

    return MyPromise.any([promise1, promise2, promise3]).then((value) => {
      expect(value).toBe(2);
    });
  });

  test("应该处理立即成功的 Promise", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });

    return MyPromise.any([promise1, promise2]).then((value) => {
      expect(value).toBe(1);
    });
  });

  test("应该处理立即失败的 Promise", () => {
    const promise1 = MyPromise.reject(new Error("immediate error"));
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });

    return MyPromise.any([promise1, promise2]).then((value) => {
      expect(value).toBe(2);
    });
  });
});
