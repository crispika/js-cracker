const MyPromise = require("../../my-solutions/promise/MyPromise");

describe("Promise.try 实现", () => {
  test("应该正确处理同步函数", () => {
    return MyPromise.try(() => 42).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该正确处理异步函数", () => {
    return MyPromise.try(() => {
      return new MyPromise((resolve) => {
        setTimeout(() => resolve(42), 100);
      });
    }).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该正确处理同步错误", () => {
    return MyPromise.try(() => {
      throw new Error("sync error");
    }).catch((error) => {
      expect(error.message).toBe("sync error");
    });
  });

  test("应该正确处理异步错误", () => {
    return MyPromise.try(() => {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => reject(new Error("async error")), 100);
      });
    }).catch((error) => {
      expect(error.message).toBe("async error");
    });
  });

  test("应该正确处理 thenable 对象", () => {
    const thenable = {
      then: (resolve) => resolve(42),
    };

    return MyPromise.try(() => thenable).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该正确处理非函数输入", () => {
    return MyPromise.try(42).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该正确处理 undefined 输入", () => {
    return MyPromise.try(undefined).then((value) => {
      expect(value).toBeUndefined();
    });
  });

  test("应该正确处理 null 输入", () => {
    return MyPromise.try(null).then((value) => {
      expect(value).toBeNull();
    });
  });

  test("应该正确处理对象输入", () => {
    const obj = { foo: "bar" };
    return MyPromise.try(obj).then((value) => {
      expect(value).toEqual(obj);
    });
  });

  test("应该正确处理数组输入", () => {
    const arr = [1, 2, 3];
    return MyPromise.try(arr).then((value) => {
      expect(value).toEqual(arr);
    });
  });

  test("应该正确处理字符串输入", () => {
    return MyPromise.try("hello").then((value) => {
      expect(value).toBe("hello");
    });
  });

  test("应该正确处理数字输入", () => {
    return MyPromise.try(42).then((value) => {
      expect(value).toBe(42);
    });
  });

  test("应该正确处理布尔输入", () => {
    return MyPromise.try(true).then((value) => {
      expect(value).toBe(true);
    });
  });
});
