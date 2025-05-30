const MyPromise = require("../../my-solutions/promise/MyPromise");

describe("Promise 基础实现", () => {
  describe("constructor 测试", () => {
    test("应该正确执行同步的 resolve", () => {
      return new MyPromise((resolve) => {
        resolve(42);
      }).then((value) => {
        expect(value).toBe(42);
      });
    });

    test("应该正确执行同步的 reject", () => {
      return new MyPromise((resolve, reject) => {
        reject(new Error("test error"));
      }).catch((error) => {
        expect(error.message).toBe("test error");
      });
    });

    test("executor 应该立即执行", () => {
      const executor = jest.fn();
      new MyPromise(executor);
      expect(executor).toHaveBeenCalledTimes(1);
    });

    test("executor 应该只执行一次", () => {
      const executor = jest.fn();
      const promise = new MyPromise(executor);
      promise.then(() => {});
      promise.catch(() => {});
      expect(executor).toHaveBeenCalledTimes(1);
    });

    test("executor 中抛出错误应该被捕获并 reject", () => {
      return new MyPromise(() => {
        throw new Error("executor error");
      }).catch((error) => {
        expect(error.message).toBe("executor error");
      });
    });

    test("executor 不是函数时应该抛出错误", () => {
      expect(() => {
        new MyPromise(42);
      }).toThrow();
    });

    test("resolve 后再次 resolve 应该无效", () => {
      let firstResolve;
      const promise = new MyPromise((resolve) => {
        firstResolve = resolve;
      });

      firstResolve(1);
      firstResolve(2);

      return promise.then((value) => {
        expect(value).toBe(1);
      });
    });

    test("reject 后再次 reject 应该无效", () => {
      let firstReject;
      const promise = new MyPromise((resolve, reject) => {
        firstReject = reject;
      });

      firstReject(new Error("first error"));
      firstReject(new Error("second error"));

      return promise.catch((error) => {
        expect(error.message).toBe("first error");
      });
    });
  });

  describe("then 方法测试", () => {
    test("应该支持链式调用", () => {
      return new MyPromise((resolve) => {
        resolve(1);
      })
        .then((value) => value + 1)
        .then((value) => value * 2)
        .then((value) => {
          expect(value).toBe(4);
        });
    });

    test("应该正确处理 then 中的错误", () => {
      return new MyPromise((resolve) => {
        resolve(1);
      })
        .then(() => {
          throw new Error("then error");
        })
        .catch((error) => {
          expect(error.message).toBe("then error");
        });
    });

    test("应该正确处理 then 中返回的 Promise", () => {
      return new MyPromise((resolve) => {
        resolve(1);
      })
        .then((value) => {
          return new MyPromise((resolve) => {
            resolve(value + 1);
          });
        })
        .then((value) => {
          expect(value).toBe(2);
        });
    });

    test("then 的参数不是函数时应该被忽略", () => {
      return new MyPromise((resolve) => {
        resolve(1);
      })
        .then(2)
        .then((value) => {
          expect(value).toBe(1);
        });
    });
  });

  describe("catch 方法测试", () => {
    test("应该捕获 Promise 中的错误", () => {
      return new MyPromise(() => {
        throw new Error("promise error");
      }).catch((error) => {
        expect(error.message).toBe("promise error");
      });
    });

    test("应该捕获 then 中的错误", () => {
      return new MyPromise((resolve) => {
        resolve(1);
      })
        .then(() => {
          throw new Error("then error");
        })
        .catch((error) => {
          expect(error.message).toBe("then error");
        });
    });

    test("catch 后可以继续链式调用", () => {
      return new MyPromise(() => {
        throw new Error("error");
      })
        .catch((error) => error.message)
        .then((value) => {
          expect(value).toBe("error");
        });
    });
  });

  describe("finally 方法测试", () => {
    test("finally 应该总是执行", () => {
      const finallyCallback = jest.fn();

      return new MyPromise((resolve) => {
        resolve("success");
      })
        .then((value) => {
          expect(value).toBe("success");
        })
        .finally(finallyCallback)
        .then(() => {
          expect(finallyCallback).toHaveBeenCalled();
        });
    });

    test("finally 应该等待 Promise 完成", () => {
      const finallyCallback = jest.fn();

      return new MyPromise((resolve) => {
        setTimeout(() => resolve("success"), 100);
      })
        .finally(finallyCallback)
        .then(() => {
          expect(finallyCallback).toHaveBeenCalled();
        });
    });

    test("finally 应该传递原始值", () => {
      return new MyPromise((resolve) => {
        resolve("success");
      })
        .finally(() => {})
        .then((value) => {
          expect(value).toBe("success");
        });
    });
  });

  describe("静态方法测试", () => {
    test("resolve 方法应该返回一个已解决的 Promise", () => {
      return MyPromise.resolve(42).then((value) => {
        expect(value).toBe(42);
      });
    });

    test("reject 方法应该返回一个已拒绝的 Promise", () => {
      return MyPromise.reject(new Error("rejected")).catch((error) => {
        expect(error.message).toBe("rejected");
      });
    });
  });
});
