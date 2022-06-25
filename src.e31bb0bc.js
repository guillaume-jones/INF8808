// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"../node_modules/point-in-polygon/flat.js":[function(require,module,exports) {
module.exports = function pointInPolygonFlat (point, vs, start, end) {
    var x = point[0], y = point[1];
    var inside = false;
    if (start === undefined) start = 0;
    if (end === undefined) end = vs.length;
    var len = (end-start)/2;
    for (var i = 0, j = len - 1; i < len; j = i++) {
        var xi = vs[start+i*2+0], yi = vs[start+i*2+1];
        var xj = vs[start+j*2+0], yj = vs[start+j*2+1];
        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

},{}],"../node_modules/point-in-polygon/nested.js":[function(require,module,exports) {
// ray-casting algorithm based on
// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

module.exports = function pointInPolygonNested (point, vs, start, end) {
    var x = point[0], y = point[1];
    var inside = false;
    if (start === undefined) start = 0;
    if (end === undefined) end = vs.length;
    var len = end - start;
    for (var i = 0, j = len - 1; i < len; j = i++) {
        var xi = vs[i+start][0], yi = vs[i+start][1];
        var xj = vs[j+start][0], yj = vs[j+start][1];
        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

},{}],"../node_modules/point-in-polygon/index.js":[function(require,module,exports) {
var pointInPolygonFlat = require('./flat.js')
var pointInPolygonNested = require('./nested.js')

module.exports = function pointInPolygon (point, vs, start, end) {
    if (vs.length > 0 && Array.isArray(vs[0])) {
        return pointInPolygonNested(point, vs, start, end);
    } else {
        return pointInPolygonFlat(point, vs, start, end);
    }
}
module.exports.nested = pointInPolygonNested
module.exports.flat = pointInPolygonFlat

},{"./flat.js":"../node_modules/point-in-polygon/flat.js","./nested.js":"../node_modules/point-in-polygon/nested.js"}],"scripts/geography.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMontrealData = getMontrealData;
exports.getBikePaths = getBikePaths;
exports.determineNeighborhood = determineNeighborhood;
exports.getProjection = getProjection;
exports.getPath = getPath;
exports.convertCoordinatesToXY = convertCoordinatesToXY;

var _pointInPolygon = _interopRequireDefault(require("point-in-polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal GEOJSON
 */
function getMontrealData() {
  return _getMontrealData.apply(this, arguments);
}
/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal's bike path GEOJSON
 */


function _getMontrealData() {
  _getMontrealData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return d3.json('montreal.json');

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getMontrealData.apply(this, arguments);
}

function getBikePaths() {
  return _getBikePaths.apply(this, arguments);
}
/**
 * Determines the neighborhood based on coordinates
 *
 * @param lon Longitude of point (float)
 * @param lat Latitude of point (float)
 * @param montreal Pre-loaded JSON of Montreal data
 *
 * @returns {string} Neighborhood of point or empty if not found
 */


function _getBikePaths() {
  _getBikePaths = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return d3.json('reseau_cyclable.geojson');

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getBikePaths.apply(this, arguments);
}

function determineNeighborhood(lon, lat, montreal) {
  var returnName = '';
  montreal.forEach(function (feature) {
    if ((0, _pointInPolygon.default)([lon, lat], feature.geometry.coordinates[0][0])) {
      returnName = feature.properties.NOM;
    }
  });
  return returnName;
}
/** Gets the map projection function
 *
 * @returns Projection function in Mercator for Montreal
 */


function getProjection() {
  return d3.geoMercator().center([-73.708879, 45.579611]).scale(70000);
}
/** Gets the path function
 *
 * @param projection Projection in Mercator for Montreal
 *
 * @returns Path function for Montreal
 */


function getPath(projection) {
  return d3.geoPath().projection(projection);
}
/** Gets the XY positions on the map viz for a given set of coordinates
 * @param {number} longitude Longitude to convert
 * @param {number} latitude Latitude to convert
 * @param projection Projection in Mercator for Montreal
 *
 * @returns {x: number, y: number}
 */


function convertCoordinatesToXY(longitude, latitude, projection) {
  var projected = projection([longitude, latitude]);
  return {
    x: projected[0],
    y: projected[1]
  };
}
},{"point-in-polygon":"../node_modules/point-in-polygon/index.js"}],"scripts/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCounterData = getCounterData;
exports.getLocationData = getLocationData;
exports.createDataset = createDataset;
exports.createMapData = createMapData;
exports.createLineChartData = createLineChartData;
exports.createAreaChartData = createAreaChartData;
exports.createBarChartData = createBarChartData;

var _geography = require("./geography");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function sum(a) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (key) {
    a = a.map(function (a) {
      return a[key];
    });
  }

  return a.reduce(function (b, c) {
    return b + (isNaN(c) ? 0 : c);
  }, 0);
}

function groupSum(a, key, key2) {
  return a.reduce(function (b, c) {
    b[c[key]] = (b[c[key]] || 0) + (isNaN(c[key2]) ? 0 : c[key2]);
    return b;
  }, {});
}
/** Load counter CSVs
 *
 * @param {number[]} years Array of years to load
 *
 * @returns {object[]} Array of data by year
 */


function getCounterData(_x) {
  return _getCounterData.apply(this, arguments);
}
/** Load location CSV
 *
 * @returns {object} Location data
 */


function _getCounterData() {
  _getCounterData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(years) {
    var counterData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            counterData = {}; // Required due to asynchronous loop

            _context2.next = 3;
            return Promise.all(years.map( /*#__PURE__*/function () {
              var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(year) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return d3.csv('comptage_velo_' + year + '.csv');

                      case 2:
                        counterData[year] = _context.sent;

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref23.apply(this, arguments);
              };
            }()));

          case 3:
            return _context2.abrupt("return", counterData);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getCounterData.apply(this, arguments);
}

function getLocationData() {
  return _getLocationData.apply(this, arguments);
}
/** Convert location and counter data into usable dataset
 *
 * Filters out partial data
 * Harmonizes IDs and names
 * Organizes by year, counter name, date and time
 *
 * @param {object} locations Location data from CSV
 * @param {object[]} counters Counter data from CSV
 * @param {object} years Years of data loaded into counters
 *
 * @returns {object[]} The filtered and combined dataset
 */


function _getLocationData() {
  _getLocationData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return d3.csv('localisation_des_compteurs_velo.csv');

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getLocationData.apply(this, arguments);
}

function createDataset(locations, counters, years) {
  var dataset = {};
  years.forEach(function (year) {
    var counterData = counters[year];
    dataset[year] = {}; // Keeps only data columns

    var acceptedCounters = Object.keys(counterData[0]).filter(function (name) {
      return name !== 'Date' && name !== '';
    }); // Gets relevant data for each counter from location dataset

    acceptedCounters.forEach(function (name) {
      var counter = locations.find(function (t) {
        if (name.includes('compteur')) {
          // Finds via ID, for 2019-2021 datasets
          return name.includes(t.ID);
        } else {
          // Finds via name, for 2009-2018 datasets
          return t.Nom === name;
        }
      });
      dataset[year][counter.Nom] = {
        name: counter.Nom,
        longitude: counter.Longitude,
        latitude: counter.Latitude,
        counts: []
      };
    }); // Iterates through counterData to add counts to each counter

    counterData.forEach(function (timestep) {
      var date = undefined;
      var time = '00:00';
      Object.entries(timestep).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (key === 'Date') {
          var dateTime = value.split(' ');
          date = dateTime[0]; // Gets time as well for datasets after 2018

          if (dateTime.length > 1) {
            time = dateTime[1];
          }
        }

        return [key, value];
      }).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            name = _ref4[0];

        return acceptedCounters.includes(name);
      }).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            name = _ref6[0],
            count = _ref6[1];

        if (parseInt(year) > 2018) {
          name = locations.find(function (t) {
            return name.includes(t.ID);
          }).Nom;
        }

        dataset[year][name].counts.push({
          date: date,
          time: time,
          count: parseInt(count)
        });
      });
    });
  });
  return dataset;
}
/** Generates data in format for map
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 * @param projection Projection used for the map
 *
 * @returns {object} Data for Area chart
 */


function createMapData(dataset, montreal, projection) {
  var mapData = {};
  Object.entries(dataset).forEach(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        year = _ref8[0],
        yearData = _ref8[1];

    mapData[year] = Object.entries(yearData).map(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          counter = _ref10[0],
          counterData = _ref10[1];

      return _objectSpread({
        name: counter,
        neighborhood: (0, _geography.determineNeighborhood)(counterData.longitude, counterData.latitude, montreal),
        counts: sum(counterData.counts, 'count')
      }, (0, _geography.convertCoordinatesToXY)(counterData.longitude, counterData.latitude, projection));
    });
  });
  return mapData;
}
/** Generates data in format for line chart
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 */


function createLineChartData(dataset, montreal) {
  var lineChartData = {};
  Object.entries(dataset).forEach(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        year = _ref12[0],
        yearData = _ref12[1];

    lineChartData[year] = {};
    var averageDayCounts; // Sums counts across each day for each counter
    // Also adds neighborhood

    Object.entries(yearData).forEach(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          counter = _ref14[0],
          counterData = _ref14[1];

      var newCounts = []; // Years 2019-2021 need to group the data by day

      if (counterData.counts.length > 366) {
        newCounts = Object.values(groupSum(counterData.counts, 'date', 'count'));
      } else {
        newCounts = counterData.counts.map(function (data) {
          return data.count;
        });
      } // Save this counter's data to averageDayCounts


      if (!averageDayCounts) {
        averageDayCounts = newCounts;
      } else {
        newCounts.map(function (count, i) {
          averageDayCounts[i] += count;
        });
      }

      lineChartData[year][counter] = {
        name: counter,
        neighborhood: (0, _geography.determineNeighborhood)(counterData.longitude, counterData.latitude, montreal),
        counts: newCounts.map(function (v, i) {
          return {
            index: i,
            value: v
          };
        })
      };
    });
    var totalCounters = Object.keys(yearData).length;
    lineChartData[year]['Average'] = {
      name: 'All',
      neighborhood: '',
      counts: averageDayCounts.map(function (counts, i) {
        return {
          index: i,
          value: Math.round(counts / totalCounters)
        };
      })
    };
  });
  return lineChartData;
}
/** Generates data in format for area chart
 *
 * @param {object} dataset Dataset created by createDataset
 *
 * @returns {object} Data for Area chart
 */


function createAreaChartData(dataset) {
  var areaChartData = {};
  Object.entries(dataset).forEach(function (_ref15) {
    var _ref16 = _slicedToArray(_ref15, 2),
        year = _ref16[0],
        yearData = _ref16[1];

    // Time data not available for years before 2019
    if (parseInt(year) < 2019) {
      return;
    }

    areaChartData[year] = {};
    var averageTimeCounts; // Sums counts across each day for each counter
    // Also adds neighborhood

    Object.entries(yearData).forEach(function (_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
          counter = _ref18[0],
          counterData = _ref18[1];

      var newCounts = Object.values(groupSum(counterData.counts, 'time', 'count')); // Save this counter's data to averageTimeCounts

      if (!averageTimeCounts) {
        averageTimeCounts = newCounts;
      } else {
        newCounts.map(function (count, i) {
          averageTimeCounts[i] += count;
        });
      }

      areaChartData[year][counter] = {
        name: counter,
        counts: newCounts.map(function (v, i) {
          return {
            index: i,
            value: v
          };
        })
      };
    });
    var totalCounters = Object.keys(yearData).length;
    areaChartData[year]['Average'] = {
      name: 'All',
      counts: averageTimeCounts.map(function (counts, i) {
        return {
          index: i,
          value: Math.round(counts / totalCounters)
        };
      })
    };
  });
  return areaChartData;
}
/** Generates data in format for bar chart
 *
 * @param {object} dataset Dataset created by createDataset
 */


function createBarChartData(dataset) {
  var barChartData = {};
  Object.entries(dataset).forEach(function (_ref19) {
    var _ref20 = _slicedToArray(_ref19, 2),
        year = _ref20[0],
        yearData = _ref20[1];

    var allCounts = 0; // Sums counts across entire year for each counter

    Object.entries(yearData).forEach(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
          counter = _ref22[0],
          counterData = _ref22[1];

      var counterSum = {
        year: year,
        counts: sum(counterData.counts, 'count')
      };
      allCounts += counterSum.counts;
      barChartData[counter] ? barChartData[counter].push(counterSum) : barChartData[counter] = [counterSum];
    }); // Adds average of all sensors for year for default view

    var average = {
      year: year,
      counts: Math.round(allCounts / Object.keys(yearData).length)
    };
    barChartData['Average'] ? barChartData['Average'].push(average) : barChartData['Average'] = [average];
  });
  return barChartData;
}
},{"./geography":"scripts/geography.js"}],"scripts/mapViz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapGroups = generateMapGroups;
exports.drawMapBackground = drawMapBackground;
exports.drawBikePaths = drawBikePaths;
exports.drawCircles = drawCircles;

/**
 * Adds SVG groups for the map base, bike paths and circles
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
function generateMapGroups(width, height) {
  d3.select('#map-svg').attr('width', width).attr('height', height).append('g').attr('id', 'map-base-g').attr('width', width).attr('height', height).select(function () {
    return this.parentNode;
  }).append('g').attr('id', 'map-lanes-g').attr('width', width).attr('height', height).select(function () {
    return this.parentNode;
  }).append('g').attr('id', 'map-circles-g').attr('width', width).attr('height', height);
}
/**
 * Draws the map base of Montreal.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 */


function drawMapBackground(data, path) {
  d3.select('#map-base-g').selectAll('path').data(data).enter().append('path').attr('d', path).attr('fill', '#d8dbe3').attr('stroke', '#ffffff').attr('stroke-width', 1);
}
/**
 * Draws the cycle lanes of Montreal
 *
 * @param {object[]} data The data for the cycle lanes
 * @param {*} path The path associated with the current projection
 */


function drawBikePaths(data, path) {
  d3.select('#map-lanes-g').selectAll('path').data(data).enter().append('path').attr('d', path).attr('fill', 'rgba(0,0,0,0)').attr('stroke', '#0bb52d').attr('stroke-width', 1.5);
}

function radiusScale(data) {
  var maxCounts = d3.max(data.map(function (data) {
    return data.counts;
  }));
  return d3.scaleLinear().domain([0, maxCounts]).range([4, 10]);
}
/**
 * Draws the counter
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */


function drawCircles(data, callback) {
  var scale = radiusScale(data);
  d3.select('#map-circles-g').selectAll('circle').remove();
  d3.select('#map-circles-g').selectAll('circle').data(data).enter().append('circle').attr('class', 'circle').attr('r', function (d) {
    return scale(d.counts);
  }).attr('cx', function (d) {
    return d.x;
  }).attr('cy', function (d) {
    return d.y;
  }).attr('fill', '#0461cc').attr('stroke', '#ffffff').attr('stroke-width', 1).on('click', callback);
}
},{}],"scripts/yearButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDropdown = drawDropdown;

/**
 * Draws the dropdown menu to select the desired year
 *
 * @param {number} years The years to display
 * @param {number} width The width of the graph, used to place the button
 *
 * @returns Initial year in dropdown
 */
function drawDropdown(years, width) {
  d3.select('#dropdown').attr('transform', 'translate(' + width + ', 140)').attr('width', 130).attr('height', 25).selectAll('myOptions').data(years).enter().append('option').text(function (d) {
    return d;
  }).attr('value', function (d) {
    return d;
  });
  return years[0];
}
},{}],"scripts/clickHandlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropDownClickHandler = dropDownClickHandler;
exports.circleClickHandler = circleClickHandler;

/** Appends a callback to redraw graphs to the year dropdown
 *
 * @param callback Redraw function to call on click
 */
function dropDownClickHandler(callback) {
  d3.select('#dropdown').on('change', function () {
    var year = d3.select('#dropdown').property('value');
    console.log(year);
    callback(year); // Pass year to drawBarChart, drawMapCircles and drawAreaChart to redraw
    // Rerun drawLineChart with no name specified (default data)
  });
}
/** To be passed to circles to redraw charts on circle click
 *
 * @param callback Callback to call on click
 */


function circleClickHandler(callback) {
  return function (d) {
    var year = d3.select('#dropdown').property('value');
    var name = d.name;
    console.log(name);
    callback(year, name); // Pass d.name, d.neighborhood and lineChartData[year][name] to drawLinechart
  };
}
},{}],"scripts/lineChart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLineChart = drawLineChart;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function generateXScale(width, days) {
  return d3.scaleLinear().domain([0, days]).range([0, width]);
}

function generateXTimescale(width) {
  return d3.scaleTime().domain([new Date(2019, 12, 15, 0, 0), new Date(2020, 11, 1, 0, 0)]).range([0, width]).nice();
}

function generateYScale(height, counts) {
  return d3.scaleLinear().domain([0, d3.max(counts)]).range([height, 0]);
}

function addLabels(g, width, height, name, neighborhood) {
  // X label
  g.append('text').text("Jours de l'année").attr('x', width / 3).attr('y', height + 30); // Y label

  g.append('text').text('Comptes').attr('x', 10).attr('y', height / 2).attr('transform', 'rotate(-90)'); // Title

  if (name) {
    g.append('text').text(name + ' - ' + neighborhood).attr('x', width / 4).attr('y', 10);
  } else {
    g.append('text').text('Moyenne de tous les compteurs').attr('x', width / 4).attr('y', 10);
  }
}

function addAxes(g, width, height, yScale) {
  // Add axes, including special time axis on X
  g.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(generateXTimescale(width)).ticks(6));
  g.append('g').call(d3.axisLeft(yScale));
}
/**
 * Draws the line chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */


function drawLineChart(width, height, averageData, counterData) {
  // Reset line chart svg
  d3.select('#line-g').remove();
  var group = d3.select('#map-svg').append('g').attr('id', 'line-g').attr('width', width).attr('height', height).attr('transform', 'translate(40, 0)'); // Generate scales

  var xScale = generateXScale(width, averageData.counts.length);
  var yScale = generateYScale(height, [].concat(_toConsumableArray(averageData.counts.map(function (v) {
    return v.value;
  })), _toConsumableArray(counterData ? counterData.counts.map(function (v) {
    return v.value;
  }) : [])));
  addAxes(group, width, height, yScale);
  addLabels(group, width, height, counterData && counterData.name, counterData && counterData.neighborhood);
  group.append('path').datum(averageData.counts).attr('fill', 'rgba(0, 0, 0, 0)').attr('stroke', '#9a9a9a').attr('stroke-width', 1.5).attr('d', d3.line().x(function (d) {
    return xScale(d.index);
  }).y(function (d) {
    return yScale(d.value);
  }));

  if (counterData) {
    group.append('path').datum(counterData.counts).attr('fill', 'rgba(0, 0, 0, 0)').attr('stroke', 'rgba(18, 81, 153, 1)').attr('stroke-width', 1.5).attr('d', d3.line().x(function (d) {
      return xScale(d.index);
    }).y(function (d) {
      return yScale(d.value);
    }));
  }
}
},{}],"scripts/areaChart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawAreaChart = drawAreaChart;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function generateXScale(width) {
  return d3.scaleLinear().domain([0, 96]).range([0, width]);
}

function generateXTimescale(width) {
  return d3.scaleTime().domain([new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 2, 0, 0)]).range([0, width]).nice();
}

function generateYScale(height, counts) {
  return d3.scaleLinear().domain([0, d3.max(counts)]).range([height, 0]);
}

function addLabels(g, width, height, name, neighborhood) {
  // X label
  g.append('text').text("Heures de la journée").attr('x', width / 3).attr('y', height + 20); // Y label

  g.append('text').text('Comptes').attr('x', 10).attr('y', height / 2).attr('transform', 'rotate(-90)'); // Title

  if (name) {
    g.append('text').text(name + ' - ' + neighborhood).attr('x', width / 3).attr('y', 10);
  } else {
    g.append('text').text('Moyenne de tous les compteurs').attr('x', width / 3).attr('y', 10);
  }
}
/**
 * Draws the area chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */


function drawAreaChart(width, height, averageData, counterData) {
  // Reset area chart svg
  d3.select('#area-g').remove();
  var group = d3.select('#area-svg').attr('width', width + 40).attr('height', height + 20).append('g').attr('id', 'area-g').attr('width', width).attr('height', height).attr('transform', 'translate(40, 0)'); // Generate scales

  var xScale = generateXScale(width);
  var yScale = generateYScale(height, [].concat(_toConsumableArray(averageData.counts.map(function (v) {
    return v.value;
  })), _toConsumableArray(counterData ? counterData.counts.map(function (v) {
    return v.value;
  }) : []))); // Add axes, including special time axis on X

  group.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(generateXTimescale(width)));
  group.append('g').call(d3.axisLeft(yScale)); // Add labels

  addLabels(group, width, height, counterData && counterData.name, counterData && counterData.neighborhood);
  group.append('path').datum(averageData.counts).attr('fill', '#c9c9c9').attr('stroke', '#9a9a9a').attr('stroke-width', 1.5).attr('d', d3.area().x(function (d) {
    return xScale(d.index);
  }).y0(height).y1(function (d) {
    return yScale(d.value);
  }));

  if (counterData) {
    group.append('path').datum(counterData.counts).attr('fill', 'rgba(77, 149, 232, 0.5)').attr('stroke', 'rgba(18, 81, 153, 0.5)').attr('stroke-width', 1.5).attr('d', d3.area().x(function (d) {
      return xScale(d.index);
    }).y0(height).y1(function (d) {
      return yScale(d.value);
    }));
  }
}
},{}],"scripts/barChartViz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.appendGraphLabels = appendGraphLabels;
exports.setCanvasSize = setCanvasSize;
exports.positionLabels = positionLabels;
exports.updateXSubgroupScale = updateXSubgroupScale;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.updateGroupXScale = updateGroupXScale;
exports.updateYScale = updateYScale;
exports.createGroups = createGroups;
exports.drawBars = drawBars;
exports.buildBarChart = buildBarChart;

/**
 * Appends SVG g elements which will contain the x and y axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis');
  g.append('g').attr('class', 'y axis');
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */


function appendGraphLabels(g) {
  g.append('text').text('Total counts for the year').attr('class', 'y axis-text').attr('transform', 'rotate(-90)').attr('fill', '#898989').attr('font-size', 12);
  g.append('text').text('Average counts per year').attr('class', 'title').attr('fill', '#898989');
}
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */


function setCanvasSize(width, height) {
  d3.select('#bar-svg').attr('width', width).attr('height', height);
}
/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */


function positionLabels(width, height) {
  d3.select('.y.axis-text').attr('x', -50).attr('y', height / 2);
  d3.select('.title').attr('x', width / 2).attr('y', -35);
}
/**
 * Updates the X scale to be used within each group of the grouped bar chart
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} subGroupBars The bars per subgroup (average on all counters and specific counter)
 * @param {*} xScale The graph's encompassing x scale
 */


function updateXSubgroupScale(scale, subGroupBars, xScale) {
  scale.domain(subGroupBars).range([0, xScale.bandwidth()]);
}
/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */


function drawXAxis(xScale, height) {
  d3.select('.x.axis').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(xScale).tickFormat(function (x) {
    return "year ".concat(x);
  }));
}
/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */


function drawYAxis(yScale) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5));
}
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */


function updateGroupXScale(scale, data, width) {
  scale.domain(data.Average.year).range([0, width]);
}
/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */


function updateYScale(scale, data, height) {
  var max = d3.max(data.Average.counts, function (m) {
    return d3.max(m);
  });
  scale.domain([0, max]).range([height, 0]);
}
/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to a pair of average/chosen counter values
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */


function createGroups(data, x) {
  d3.select('#bar-svg').selectAll('.group').data(data).enter().append('g').attr('class', 'group').attr('transform', function (data) {
    return 'translate(' + x(data.Average.year + ',0)');
  }).attr('x', function (data) {
    return x(data.Average.year);
  });
}
/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {number} height The height of the graph
 * @param {object[]} data The data to be used
 */


function drawBars(y, xSubgroup, height, data) {
  d3.select('#bar-svg').selectAll('.group').selectAll('rect').data(data).enter().append('rect').attr('x', function (data) {
    return xSubgroup(data.Average.year);
  }).attr('y', function (data) {
    return y(data.Average.counts);
  }).attr('width', xSubgroup.bandwidth()).attr('height', function (data) {
    return height - y(data.Average.counts);
  });
}

var margin = {
  top: 80,
  right: 0,
  bottom: 80,
  left: 55
};
var bounds;
var svgSize;
var graphSize;
var xScale = d3.scaleBand().padding(0.15);
var xSubgroupScale = d3.scaleBand().padding([0.015]);
var yScale = d3.scaleLinear();
/**
     *   This function handles the graph's sizing.
     */

function setSizing() {
  bounds = d3.select('#bar-svg').node().getBoundingClientRect();
  svgSize = {
    width: bounds.width,
    height: 550
  };
  graphSize = {
    width: svgSize.width - margin.right - margin.left,
    height: svgSize.height - margin.bottom - margin.top
  };
  setCanvasSize(svgSize.width, svgSize.height);
}
/**
     *   This function builds the graph.
     */


function buildBarChart(data, g) {
  appendAxes(g);
  appendGraphLabels(g);
  setSizing();
  var subGroupBars = ['Average', 'X']; // Update according to data input

  positionLabels(graphSize.width, graphSize.height);
  updateGroupXScale(xScale, data, graphSize.width);
  updateXSubgroupScale(xSubgroupScale, subGroupBars, xScale);
  updateYScale(yScale, data, graphSize.height);
  drawXAxis(xScale, graphSize.height);
  drawYAxis(yScale);
  createGroups(data, xScale);
  drawBars(yScale, xSubgroupScale, subGroupBars, graphSize.height);
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime.js");

var _preprocess = require("./scripts/preprocess");

var _mapViz = require("./scripts/mapViz");

var _yearButton = require("./scripts/yearButton.js");

var _clickHandlers = require("./scripts/clickHandlers");

var _geography = require("./scripts/geography");

var _lineChart = require("./scripts/lineChart");

var _areaChart = require("./scripts/areaChart");

var _barChartViz = require("./scripts/barChartViz.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(d3) {
    var mapsize, areaSize, lineSize, years, montreal, bikePaths, locationData, counterData, projection, path, dataset, mapData, lineChartData, areaChartData, barChartData, redrawVizForCounter, redrawVizForYear, year;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redrawVizForYear = function _redrawVizForYear(year) {
              (0, _mapViz.drawCircles)(mapData[year], (0, _clickHandlers.circleClickHandler)(redrawVizForCounter));
              (0, _areaChart.drawAreaChart)(areaSize.width, areaSize.height, areaChartData[year]['Average']);
              (0, _lineChart.drawLineChart)(lineSize.width, lineSize.height, lineChartData[year]['Average']); // buildBarChart(barChartData, '#bar-svg'); WITH NO COUNTER
            };

            redrawVizForCounter = function _redrawVizForCounter(year, counter) {
              // Add barchart, areachart and linechart here
              // Called on counter click
              (0, _areaChart.drawAreaChart)(areaSize.width, areaSize.height, areaChartData[year]['Average'], areaChartData[year][counter]);
              (0, _lineChart.drawLineChart)(lineSize.width, lineSize.height, lineChartData[year]['Average'], lineChartData[year][counter]); // buildBarChart(barChartData, '#bar-svg'); WITH COUNTER
            };

            mapsize = {
              width: 800,
              height: 625
            };
            areaSize = {
              width: 800,
              height: 350
            };
            lineSize = {
              width: 400,
              height: 250
            }; // Get all raw data

            years = [// 2009, 2010,
            // 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
            2019];
            _context.next = 8;
            return (0, _geography.getMontrealData)();

          case 8:
            montreal = _context.sent;
            _context.next = 11;
            return (0, _geography.getBikePaths)();

          case 11:
            bikePaths = _context.sent;
            _context.next = 14;
            return (0, _preprocess.getLocationData)();

          case 14:
            locationData = _context.sent;
            _context.next = 17;
            return (0, _preprocess.getCounterData)(years);

          case 17:
            counterData = _context.sent;
            // Generate SVG groups
            (0, _mapViz.generateMapGroups)(mapsize.width, mapsize.height); // Render map

            projection = (0, _geography.getProjection)();
            path = (0, _geography.getPath)(projection);
            (0, _mapViz.drawMapBackground)(montreal, path);
            (0, _mapViz.drawBikePaths)(bikePaths, path); // Get all processed data

            dataset = (0, _preprocess.createDataset)(locationData, counterData, years);
            mapData = (0, _preprocess.createMapData)(dataset, montreal, projection);
            lineChartData = (0, _preprocess.createLineChartData)(dataset, montreal);
            areaChartData = (0, _preprocess.createAreaChartData)(dataset);
            barChartData = (0, _preprocess.createBarChartData)(dataset); // Interactivity and re-drawing

            year = (0, _yearButton.drawDropdown)(years, mapsize.width);
            (0, _clickHandlers.dropDownClickHandler)(redrawVizForYear); // Call draw graphs

            redrawVizForYear(year);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()(d3);
},{"regenerator-runtime/runtime.js":"../node_modules/regenerator-runtime/runtime.js","./scripts/preprocess":"scripts/preprocess.js","./scripts/mapViz":"scripts/mapViz.js","./scripts/yearButton.js":"scripts/yearButton.js","./scripts/clickHandlers":"scripts/clickHandlers.js","./scripts/geography":"scripts/geography.js","./scripts/lineChart":"scripts/lineChart.js","./scripts/areaChart":"scripts/areaChart.js","./scripts/barChartViz.js":"scripts/barChartViz.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63454" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map