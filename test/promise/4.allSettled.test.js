const MyPromise = require("../../my-solutions/promise/MyPromise");

describe("Promise.allSettled 实现", () => {
  test("应该等待所有 Promise 完成，无论成功或失败", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("test error")), 100);
    });
    const promise3 = new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 50);
    });

    return MyPromise.allSettled([promise1, promise2, promise3]).then(
      (results) => {
        expect(results).toEqual([
          { status: "fulfilled", value: 1 },
          { status: "rejected", reason: new Error("test error") },
          { status: "fulfilled", value: 3 },
        ]);
      }
    );
  });

  test("应该处理空数组", () => {
    return MyPromise.allSettled([]).then((results) => {
      expect(results).toEqual([]);
    });
  });

  test("应该处理非 Promise 值", () => {
    return MyPromise.allSettled([1, 2, 3]).then((results) => {
      expect(results).toEqual([
        { status: "fulfilled", value: 1 },
        { status: "fulfilled", value: 2 },
        { status: "fulfilled", value: 3 },
      ]);
    });
  });

  test("应该保持输入数组的顺序", () => {
    const promises = [
      new MyPromise((resolve) => setTimeout(() => resolve(3), 300)),
      new MyPromise((resolve, reject) =>
        setTimeout(() => reject(new Error("error")), 100)
      ),
      new MyPromise((resolve) => setTimeout(() => resolve(2), 200)),
    ];

    return MyPromise.allSettled(promises).then((results) => {
      expect(results).toEqual([
        { status: "fulfilled", value: 3 },
        { status: "rejected", reason: new Error("error") },
        { status: "fulfilled", value: 2 },
      ]);
    });
  });

  test("应该处理 thenable 对象", () => {
    const thenable = {
      then: (resolve) => resolve(42),
    };

    return MyPromise.allSettled([thenable]).then((results) => {
      expect(results).toEqual([{ status: "fulfilled", value: 42 }]);
    });
  });

  test("应该处理混合类型的输入", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = 2;
    const promise3 = new MyPromise((resolve, reject) => {
      setTimeout(() => reject(new Error("error")), 100);
    });
    const thenable = {
      then: (resolve) => resolve(4),
    };

    return MyPromise.allSettled([promise1, promise2, promise3, thenable]).then(
      (results) => {
        expect(results).toEqual([
          { status: "fulfilled", value: 1 },
          { status: "fulfilled", value: 2 },
          { status: "rejected", reason: new Error("error") },
          { status: "fulfilled", value: 4 },
        ]);
      }
    );
  });

  test("应该处理立即完成的 Promise", () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = MyPromise.reject(new Error("immediate error"));

    return MyPromise.allSettled([promise1, promise2]).then((results) => {
      expect(results).toEqual([
        { status: "fulfilled", value: 1 },
        { status: "rejected", reason: new Error("immediate error") },
      ]);
    });
  });
});
