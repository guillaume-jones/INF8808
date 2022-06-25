(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/regenerator-runtime/runtime.js
  var require_runtime = __commonJS({
    "node_modules/regenerator-runtime/runtime.js"(exports, module) {
      var runtime = function(exports2) {
        "use strict";
        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined2;
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return obj[key];
        }
        try {
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);
          generator._invoke = makeInvokeMethod(innerFn, self, context);
          return generator;
        }
        exports2.wrap = wrap;
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
        var ContinueSentinel = {};
        function Generator() {
        }
        function GeneratorFunction() {
        }
        function GeneratorFunctionPrototype() {
        }
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, function() {
          return this;
        });
        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          IteratorPrototype = NativeIteratorPrototype;
        }
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = GeneratorFunctionPrototype;
        define(Gp, "constructor", GeneratorFunctionPrototype);
        define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
        GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
              return this._invoke(method, arg);
            });
          });
        }
        exports2.isGeneratorFunction = function(genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };
        exports2.mark = function(genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };
        exports2.awrap = function(arg) {
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
              if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                return PromiseImpl.resolve(value.__await).then(function(value2) {
                  invoke("next", value2, resolve, reject);
                }, function(err) {
                  invoke("throw", err, resolve, reject);
                });
              }
              return PromiseImpl.resolve(value).then(function(unwrapped) {
                result.value = unwrapped;
                resolve(result);
              }, function(error) {
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
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
          this._invoke = enqueue;
        }
        defineIteratorMethods(AsyncIterator.prototype);
        define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
          return this;
        });
        exports2.AsyncIterator = AsyncIterator;
        exports2.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          if (PromiseImpl === void 0)
            PromiseImpl = Promise;
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
          return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
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
              return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel)
                    continue;
                  return delegateResult;
                }
              }
              if (context.method === "next") {
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
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                if (record.arg === ContinueSentinel) {
                  continue;
                }
                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }
        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (method === undefined2) {
            context.delegate = null;
            if (context.method === "throw") {
              if (delegate.iterator["return"]) {
                context.method = "return";
                context.arg = undefined2;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") {
                  return ContinueSentinel;
                }
              }
              context.method = "throw";
              context.arg = new TypeError("The iterator does not provide a 'throw' method");
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
          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined2;
            }
          } else {
            return info;
          }
          context.delegate = null;
          return ContinueSentinel;
        }
        defineIteratorMethods(Gp);
        define(Gp, toStringTagSymbol, "Generator");
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
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }
        exports2.keys = function(object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();
          return function next() {
            while (keys.length) {
              var key2 = keys.pop();
              if (key2 in object) {
                next.value = key2;
                next.done = false;
                return next;
              }
            }
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
              var i = -1, next = function next2() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next2.value = iterable[i];
                    next2.done = false;
                    return next2;
                  }
                }
                next2.value = undefined2;
                next2.done = true;
                return next2;
              };
              return next.next = next;
            }
          }
          return { next: doneResult };
        }
        exports2.values = values;
        function doneResult() {
          return { value: undefined2, done: true };
        }
        Context.prototype = {
          constructor: Context,
          reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined2;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined2;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
              for (var name in this) {
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined2;
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
                context.method = "next";
                context.arg = undefined2;
              }
              return !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;
              if (entry.tryLoc === "root") {
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
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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
            if (record.type === "break" || record.type === "continue") {
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
            throw new Error("illegal catch attempt");
          },
          delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName,
              nextLoc
            };
            if (this.method === "next") {
              this.arg = undefined2;
            }
            return ContinueSentinel;
          }
        };
        return exports2;
      }(typeof module === "object" ? module.exports : {});
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
          globalThis.regeneratorRuntime = runtime;
        } else {
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      }
    }
  });

  // node_modules/point-in-polygon/flat.js
  var require_flat = __commonJS({
    "node_modules/point-in-polygon/flat.js"(exports, module) {
      module.exports = function pointInPolygonFlat(point, vs, start, end) {
        var x = point[0], y = point[1];
        var inside = false;
        if (start === void 0)
          start = 0;
        if (end === void 0)
          end = vs.length;
        var len = (end - start) / 2;
        for (var i = 0, j = len - 1; i < len; j = i++) {
          var xi = vs[start + i * 2 + 0], yi = vs[start + i * 2 + 1];
          var xj = vs[start + j * 2 + 0], yj = vs[start + j * 2 + 1];
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect)
            inside = !inside;
        }
        return inside;
      };
    }
  });

  // node_modules/point-in-polygon/nested.js
  var require_nested = __commonJS({
    "node_modules/point-in-polygon/nested.js"(exports, module) {
      module.exports = function pointInPolygonNested(point, vs, start, end) {
        var x = point[0], y = point[1];
        var inside = false;
        if (start === void 0)
          start = 0;
        if (end === void 0)
          end = vs.length;
        var len = end - start;
        for (var i = 0, j = len - 1; i < len; j = i++) {
          var xi = vs[i + start][0], yi = vs[i + start][1];
          var xj = vs[j + start][0], yj = vs[j + start][1];
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect)
            inside = !inside;
        }
        return inside;
      };
    }
  });

  // node_modules/point-in-polygon/index.js
  var require_point_in_polygon = __commonJS({
    "node_modules/point-in-polygon/index.js"(exports, module) {
      var pointInPolygonFlat = require_flat();
      var pointInPolygonNested = require_nested();
      module.exports = function pointInPolygon2(point, vs, start, end) {
        if (vs.length > 0 && Array.isArray(vs[0])) {
          return pointInPolygonNested(point, vs, start, end);
        } else {
          return pointInPolygonFlat(point, vs, start, end);
        }
      };
      module.exports.nested = pointInPolygonNested;
      module.exports.flat = pointInPolygonFlat;
    }
  });

  // src/index.js
  var import_runtime = __toESM(require_runtime());

  // src/scripts/geography.js
  var import_point_in_polygon = __toESM(require_point_in_polygon());
  async function getMontrealData() {
    return await d3.json("montreal.json");
  }
  async function getBikePaths() {
    return await d3.json("reseau_cyclable.geojson");
  }
  function determineNeighborhood(lon, lat, montreal) {
    let returnName = "";
    montreal.forEach((feature) => {
      if ((0, import_point_in_polygon.default)([lon, lat], feature.geometry.coordinates[0][0])) {
        returnName = feature.properties.NOM;
      }
    });
    return returnName;
  }
  function getProjection() {
    return d3.geoMercator().center([-73.708879, 45.579611]).scale(7e4);
  }
  function getPath(projection) {
    return d3.geoPath().projection(projection);
  }
  function convertCoordinatesToXY(longitude, latitude, projection) {
    const projected = projection([longitude, latitude]);
    return {
      x: projected[0],
      y: projected[1]
    };
  }

  // src/scripts/preprocess.js
  function sum(a, key = "") {
    if (key) {
      a = a.map((a2) => a2[key]);
    }
    return a.reduce((b, c) => b + (isNaN(c) ? 0 : c), 0);
  }
  function groupSum(a, key, key2) {
    return a.reduce((b, c) => {
      b[c[key]] = (b[c[key]] || 0) + (isNaN(c[key2]) ? 0 : c[key2]);
      return b;
    }, {});
  }
  async function getCounterData(years) {
    const counterData = {};
    await Promise.all(years.map(async (year) => {
      counterData[year] = await d3.csv("comptage_velo_" + year + ".csv");
    }));
    return counterData;
  }
  async function getLocationData() {
    return await d3.csv("localisation_des_compteurs_velo.csv");
  }
  function createDataset(locations, counters, years) {
    const dataset = {};
    years.forEach((year) => {
      const counterData = counters[year];
      dataset[year] = {};
      const acceptedCounters = Object.keys(counterData[0]).filter((name) => {
        return name !== "Date" && name !== "";
      });
      acceptedCounters.forEach((name) => {
        const counter = locations.find((t) => {
          if (name.includes("compteur")) {
            return name.includes(t.ID);
          } else {
            return t.Nom === name;
          }
        });
        dataset[year][counter.Nom] = {
          name: counter.Nom,
          longitude: counter.Longitude,
          latitude: counter.Latitude,
          counts: []
        };
      });
      counterData.forEach((timestep) => {
        let date = void 0;
        let time = "00:00";
        Object.entries(timestep).map(([key, value]) => {
          if (key === "Date") {
            const dateTime = value.split(" ");
            date = dateTime[0];
            if (dateTime.length > 1) {
              time = dateTime[1];
            }
          }
          return [key, value];
        }).filter(([name]) => acceptedCounters.includes(name)).forEach(([name, count]) => {
          if (parseInt(year) > 2018) {
            name = locations.find((t) => name.includes(t.ID)).Nom;
          }
          dataset[year][name].counts.push({
            date,
            time,
            count: parseInt(count)
          });
        });
      });
    });
    return dataset;
  }
  function createMapData(dataset, montreal, projection) {
    const mapData = {};
    Object.entries(dataset).forEach(([year, yearData]) => {
      mapData[year] = Object.entries(yearData).map(([counter, counterData]) => {
        return {
          name: counter,
          neighborhood: determineNeighborhood(counterData.longitude, counterData.latitude, montreal),
          counts: sum(counterData.counts, "count"),
          ...convertCoordinatesToXY(counterData.longitude, counterData.latitude, projection)
        };
      });
    });
    return mapData;
  }
  function createLineChartData(dataset, montreal) {
    const lineChartData = {};
    Object.entries(dataset).forEach(([year, yearData]) => {
      lineChartData[year] = {};
      let averageDayCounts;
      Object.entries(yearData).forEach(([counter, counterData]) => {
        let newCounts = [];
        if (counterData.counts.length > 366) {
          newCounts = Object.values(groupSum(counterData.counts, "date", "count"));
        } else {
          newCounts = counterData.counts.map((data) => data.count);
        }
        if (!averageDayCounts) {
          averageDayCounts = newCounts;
        } else {
          newCounts.map((count, i) => {
            averageDayCounts[i] += count;
          });
        }
        lineChartData[year][counter] = {
          name: counter,
          neighborhood: determineNeighborhood(counterData.longitude, counterData.latitude, montreal),
          counts: newCounts.map((v, i) => {
            return {
              index: i,
              value: v
            };
          })
        };
      });
      const totalCounters = Object.keys(yearData).length;
      lineChartData[year]["Average"] = {
        name: "All",
        neighborhood: "",
        counts: averageDayCounts.map((counts, i) => {
          return { index: i, value: Math.round(counts / totalCounters) };
        })
      };
    });
    return lineChartData;
  }
  function createAreaChartData(dataset) {
    const areaChartData = {};
    Object.entries(dataset).forEach(([year, yearData]) => {
      if (parseInt(year) < 2019) {
        return;
      }
      areaChartData[year] = {};
      let averageTimeCounts;
      Object.entries(yearData).forEach(([counter, counterData]) => {
        let newCounts = Object.values(groupSum(counterData.counts, "time", "count"));
        if (!averageTimeCounts) {
          averageTimeCounts = newCounts;
        } else {
          newCounts.map((count, i) => {
            averageTimeCounts[i] += count;
          });
        }
        areaChartData[year][counter] = {
          name: counter,
          counts: newCounts.map((v, i) => {
            return {
              index: i,
              value: v
            };
          })
        };
      });
      const totalCounters = Object.keys(yearData).length;
      areaChartData[year]["Average"] = {
        name: "All",
        counts: averageTimeCounts.map((counts, i) => {
          return { index: i, value: Math.round(counts / totalCounters) };
        })
      };
    });
    return areaChartData;
  }
  function createBarChartData(dataset) {
    const barChartData = {};
    Object.entries(dataset).forEach(([year, yearData]) => {
      let allCounts = 0;
      Object.entries(yearData).forEach(([counter, counterData]) => {
        const counterSum = {
          year,
          counts: sum(counterData.counts, "count")
        };
        allCounts += counterSum.counts;
        barChartData[counter] ? barChartData[counter].push(counterSum) : barChartData[counter] = [counterSum];
      });
      const average = {
        year,
        counts: Math.round(allCounts / Object.keys(yearData).length)
      };
      barChartData["Average"] ? barChartData["Average"].push(average) : barChartData["Average"] = [average];
    });
    return barChartData;
  }

  // src/scripts/mapViz.js
  function generateMapGroups(width, height) {
    d3.select("#map-svg").attr("width", width).attr("height", height).append("g").attr("id", "map-base-g").attr("width", width).attr("height", height).select(function() {
      return this.parentNode;
    }).append("g").attr("id", "map-lanes-g").attr("width", width).attr("height", height).select(function() {
      return this.parentNode;
    }).append("g").attr("id", "map-circles-g").attr("width", width).attr("height", height);
  }
  function drawMapBackground(data, path) {
    d3.select("#map-base-g").selectAll("path").data(data).enter().append("path").attr("d", path).attr("fill", "#d8dbe3").attr("stroke", "#ffffff").attr("stroke-width", 1);
  }
  function drawBikePaths(data, path) {
    d3.select("#map-lanes-g").selectAll("path").data(data).enter().append("path").attr("d", path).attr("fill", "rgba(0,0,0,0)").attr("stroke", "#0bb52d").attr("stroke-width", 1.5);
  }
  function radiusScale(data) {
    const maxCounts = d3.max(data.map((data2) => data2.counts));
    return d3.scaleLinear().domain([0, maxCounts]).range([4, 10]);
  }
  function drawCircles(data, callback) {
    const scale = radiusScale(data);
    d3.select("#map-circles-g").selectAll("circle").remove();
    d3.select("#map-circles-g").selectAll("circle").data(data).enter().append("circle").attr("class", "circle").attr("r", (d) => scale(d.counts)).attr("cx", (d) => d.x).attr("cy", (d) => d.y).attr("fill", "#0461cc").attr("stroke", "#ffffff").attr("stroke-width", 1).on("click", callback);
  }

  // src/scripts/yearButton.js
  function drawDropdown(years, width) {
    d3.select("#dropdown").attr("transform", "translate(" + width + ", 140)").attr("width", 130).attr("height", 25).selectAll("myOptions").data(years).enter().append("option").text(function(d) {
      return d;
    }).attr("value", function(d) {
      return d;
    });
    return years[0];
  }

  // src/scripts/clickHandlers.js
  function dropDownClickHandler(callback) {
    d3.select("#dropdown").on("change", () => {
      const year = d3.select("#dropdown").property("value");
      console.log(year);
      callback(year);
    });
  }
  function circleClickHandler(callback) {
    return (d) => {
      const year = d3.select("#dropdown").property("value");
      const name = d.name;
      console.log(name);
      callback(year, name);
    };
  }

  // src/scripts/lineChart.js
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
    g.append("text").text("Jours de l'ann\xE9e").attr("x", width / 3).attr("y", height + 30);
    g.append("text").text("Comptes").attr("x", 10).attr("y", height / 2).attr("transform", "rotate(-90)");
    if (name) {
      g.append("text").text(name + " - " + neighborhood).attr("x", width / 4).attr("y", 10);
    } else {
      g.append("text").text("Moyenne de tous les compteurs").attr("x", width / 4).attr("y", 10);
    }
  }
  function addAxes(g, width, height, yScale2) {
    g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(generateXTimescale(width)).ticks(6));
    g.append("g").call(d3.axisLeft(yScale2));
  }
  function drawLineChart(width, height, averageData, counterData) {
    d3.select("#line-g").remove();
    const group = d3.select("#map-svg").append("g").attr("id", "line-g").attr("width", width).attr("height", height).attr("transform", "translate(40, 0)");
    const xScale2 = generateXScale(width, averageData.counts.length);
    const yScale2 = generateYScale(height, [
      ...averageData.counts.map((v) => v.value),
      ...counterData ? counterData.counts.map((v) => v.value) : []
    ]);
    addAxes(group, width, height, yScale2);
    addLabels(group, width, height, counterData && counterData.name, counterData && counterData.neighborhood);
    group.append("path").datum(averageData.counts).attr("fill", "rgba(0, 0, 0, 0)").attr("stroke", "#9a9a9a").attr("stroke-width", 1.5).attr("d", d3.line().x(function(d) {
      return xScale2(d.index);
    }).y(function(d) {
      return yScale2(d.value);
    }));
    if (counterData) {
      group.append("path").datum(counterData.counts).attr("fill", "rgba(0, 0, 0, 0)").attr("stroke", "rgba(18, 81, 153, 1)").attr("stroke-width", 1.5).attr("d", d3.line().x(function(d) {
        return xScale2(d.index);
      }).y(function(d) {
        return yScale2(d.value);
      }));
    }
  }

  // src/scripts/areaChart.js
  function generateXScale2(width) {
    return d3.scaleLinear().domain([0, 96]).range([0, width]);
  }
  function generateXTimescale2(width) {
    return d3.scaleTime().domain([new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 2, 0, 0)]).range([0, width]).nice();
  }
  function generateYScale2(height, counts) {
    return d3.scaleLinear().domain([0, d3.max(counts)]).range([height, 0]);
  }
  function addLabels2(g, width, height, name, neighborhood) {
    g.append("text").text("Heures de la journ\xE9e").attr("x", width / 3).attr("y", height + 20);
    g.append("text").text("Comptes").attr("x", 10).attr("y", height / 2).attr("transform", "rotate(-90)");
    if (name) {
      g.append("text").text(name + " - " + neighborhood).attr("x", width / 3).attr("y", 10);
    } else {
      g.append("text").text("Moyenne de tous les compteurs").attr("x", width / 3).attr("y", 10);
    }
  }
  function drawAreaChart(width, height, averageData, counterData) {
    d3.select("#area-g").remove();
    const group = d3.select("#area-svg").attr("width", width + 40).attr("height", height + 20).append("g").attr("id", "area-g").attr("width", width).attr("height", height).attr("transform", "translate(40, 0)");
    const xScale2 = generateXScale2(width);
    const yScale2 = generateYScale2(height, [
      ...averageData.counts.map((v) => v.value),
      ...counterData ? counterData.counts.map((v) => v.value) : []
    ]);
    group.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(generateXTimescale2(width)));
    group.append("g").call(d3.axisLeft(yScale2));
    addLabels2(group, width, height, counterData && counterData.name, counterData && counterData.neighborhood);
    group.append("path").datum(averageData.counts).attr("fill", "#c9c9c9").attr("stroke", "#9a9a9a").attr("stroke-width", 1.5).attr("d", d3.area().x(function(d) {
      return xScale2(d.index);
    }).y0(height).y1(function(d) {
      return yScale2(d.value);
    }));
    if (counterData) {
      group.append("path").datum(counterData.counts).attr("fill", "rgba(77, 149, 232, 0.5)").attr("stroke", "rgba(18, 81, 153, 0.5)").attr("stroke-width", 1.5).attr("d", d3.area().x(function(d) {
        return xScale2(d.index);
      }).y0(height).y1(function(d) {
        return yScale2(d.value);
      }));
    }
  }

  // src/scripts/barChartViz.js
  var xScale = d3.scaleBand().padding(0.15);
  var xSubgroupScale = d3.scaleBand().padding([0.015]);
  var yScale = d3.scaleLinear();

  // src/index.js
  (async function(d32) {
    const mapsize = {
      width: 800,
      height: 625
    };
    const areaSize = {
      width: 800,
      height: 350
    };
    const lineSize = {
      width: 400,
      height: 250
    };
    const years = [
      2019
    ];
    const montreal = await getMontrealData();
    const bikePaths = await getBikePaths();
    const locationData = await getLocationData();
    const counterData = await getCounterData(years);
    generateMapGroups(mapsize.width, mapsize.height);
    const projection = getProjection();
    const path = getPath(projection);
    drawMapBackground(montreal, path);
    drawBikePaths(bikePaths, path);
    const dataset = createDataset(locationData, counterData, years);
    const mapData = createMapData(dataset, montreal, projection);
    const lineChartData = createLineChartData(dataset, montreal);
    const areaChartData = createAreaChartData(dataset);
    const barChartData = createBarChartData(dataset);
    function redrawVizForCounter(year2, counter) {
      drawAreaChart(areaSize.width, areaSize.height, areaChartData[year2]["Average"], areaChartData[year2][counter]);
      drawLineChart(lineSize.width, lineSize.height, lineChartData[year2]["Average"], lineChartData[year2][counter]);
    }
    function redrawVizForYear(year2) {
      drawCircles(mapData[year2], circleClickHandler(redrawVizForCounter));
      drawAreaChart(areaSize.width, areaSize.height, areaChartData[year2]["Average"]);
      drawLineChart(lineSize.width, lineSize.height, lineChartData[year2]["Average"]);
    }
    const year = drawDropdown(years, mapsize.width);
    dropDownClickHandler(redrawVizForYear);
    redrawVizForYear(year);
  })(d3);
})();
