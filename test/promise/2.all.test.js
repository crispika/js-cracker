const MyPromise = require("../../my-solutions/promise/MyPromise");

describe("Promise.all 实现", () => {
  test("应该等待所有 Promise 完成", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = new MyPromise((resolve) => {
      setTimeout(() => resolve(2), 100);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 50);
    });

    return MyPromise.all([promise1, promise2, promise3]).then((values) => {
      expect(values).toEqual([1, 2, 3]);
    });
  });

  test("如果任何一个 Promise 失败，应该立即拒绝", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("test error")), 100);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 50);
    });

    return MyPromise.all([promise1, promise2, promise3]).catch((error) => {
      expect(error.message).toBe("test error");
    });
  });

  test("应该处理空数组", () => {
    return MyPromise.all([]).then((values) => {
      expect(values).toEqual([]);
    });
  });

  test("应该处理非 Promise 值", () => {
    return MyPromise.all([1, 2, 3]).then((values) => {
      expect(values).toEqual([1, 2, 3]);
    });
  });

  test("应该保持输入数组的顺序", () => {
    const promises = [
      new MyPromise((resolve) => setTimeout(() => resolve(3), 300)),
      new MyPromise((resolve) => setTimeout(() => resolve(1), 100)),
      new MyPromise((resolve) => setTimeout(() => resolve(2), 200)),
    ];

    return MyPromise.all(promises).then((values) => {
      expect(values).toEqual([3, 1, 2]);
    });
  });

  test("应该处理 thenable 对象", () => {
    const thenable = {
      then: (resolve) => resolve(42),
    };

    return MyPromise.all([thenable]).then((values) => {
      expect(values).toEqual([42]);
    });
  });

  test("应该处理混合类型的输入", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = 2;
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 100);
    });
    const thenable = {
      then: (resolve) => resolve(4),
    };

    return MyPromise.all([promise1, promise2, promise3, thenable]).then(
      (values) => {
        expect(values).toEqual([1, 2, 3, 4]);
      }
    );
  });
});
