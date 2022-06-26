// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"ShInH":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8lqZg":[function(require,module,exports) {
var _preprocess = require("./scripts/preprocess");
var _mapViz = require("./scripts/mapViz");
var _dropdownJs = require("./scripts/dropdown.js");
var _clickHandlers = require("./scripts/clickHandlers");
var _geography = require("./scripts/geography");
var _lineChart = require("./scripts/lineChart");
var _areaChart = require("./scripts/areaChart");
var _barChartVizJs = require("./scripts/barChartViz.js");
(async function(d3) {
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
    // Get all raw data
    const years = [
        // 2009, 2010,
        // 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        2019, 
    ];
    const montreal = await (0, _geography.getMontrealData)();
    const bikePaths = await (0, _geography.getBikePaths)();
    const locationData = await (0, _preprocess.getLocationData)();
    const counterData = await (0, _preprocess.getCounterData)(years);
    // Generate SVG groups
    (0, _mapViz.generateMapGroups)(mapsize.width, mapsize.height);
    // Render map
    const projection = (0, _geography.getProjection)();
    const path = (0, _geography.getPath)(projection);
    (0, _mapViz.drawMapBackground)(montreal, path);
    (0, _mapViz.drawBikePaths)(bikePaths, path);
    // Get all processed data
    const dataset = (0, _preprocess.createDataset)(locationData, counterData, years);
    const mapData = (0, _preprocess.createMapData)(dataset, montreal, projection);
    const lineChartData = (0, _preprocess.createLineChartData)(dataset, montreal);
    const areaChartData = (0, _preprocess.createAreaChartData)(dataset);
    const barChartData = (0, _preprocess.createBarChartData)(dataset);
    // Interactivity and re-drawing
    function redrawVizForCounter(year, counter) {
        // Add barchart, areachart and linechart here
        // Called on counter click
        (0, _areaChart.drawAreaChart)(areaSize.width, areaSize.height, areaChartData[year]["Average"], areaChartData[year][counter]);
        (0, _lineChart.drawLineChart)(lineSize.width, lineSize.height, lineChartData[year]["Average"], lineChartData[year][counter]);
    // buildBarChart(barChartData, '#bar-svg'); WITH COUNTER
    }
    function redrawVizForYear(year) {
        (0, _mapViz.drawCircles)(mapData[year], (0, _clickHandlers.circleClickHandler)(redrawVizForCounter));
        (0, _areaChart.drawAreaChart)(areaSize.width, areaSize.height, areaChartData[year]["Average"]);
        (0, _lineChart.drawLineChart)(lineSize.width, lineSize.height, lineChartData[year]["Average"]);
    // buildBarChart(barChartData, '#bar-svg'); WITH NO COUNTER
    }
    const year1 = (0, _dropdownJs.drawDropdown)(years);
    (0, _clickHandlers.dropDownClickHandler)(redrawVizForYear);
    // Call draw graphs
    redrawVizForYear(year1);
})(d3);

},{"./scripts/preprocess":"ko2Fr","./scripts/mapViz":"cyjxE","./scripts/clickHandlers":"blWZ6","./scripts/geography":"iRz4J","./scripts/lineChart":"kHSI7","./scripts/areaChart":"apy0w","./scripts/barChartViz.js":"lsnFW","./scripts/dropdown.js":"47aYr"}],"ko2Fr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Load counter CSVs
 *
 * @param {number[]} years Array of years to load
 *
 * @returns {object[]} Array of data by year
 */ parcelHelpers.export(exports, "getCounterData", ()=>getCounterData);
/** Load location CSV
 *
 * @returns {object} Location data
 */ parcelHelpers.export(exports, "getLocationData", ()=>getLocationData);
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
 */ parcelHelpers.export(exports, "createDataset", ()=>createDataset);
/** Generates data in format for map
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 * @param projection Projection used for the map
 *
 * @returns {object} Data for Area chart
 */ parcelHelpers.export(exports, "createMapData", ()=>createMapData);
/** Generates data in format for line chart
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 */ parcelHelpers.export(exports, "createLineChartData", ()=>createLineChartData);
/** Generates data in format for area chart
 *
 * @param {object} dataset Dataset created by createDataset
 *
 * @returns {object} Data for Area chart
 */ parcelHelpers.export(exports, "createAreaChartData", ()=>createAreaChartData);
/** Generates data in format for bar chart
 *
 * @param {object} dataset Dataset created by createDataset
 */ parcelHelpers.export(exports, "createBarChartData", ()=>createBarChartData);
var _geography = require("./geography");
function sum(a1, key = "") {
    if (key) a1 = a1.map((a)=>a[key]);
    return a1.reduce((b, c)=>b + (isNaN(c) ? 0 : c), 0);
}
function groupSum(a, key, key2) {
    return a.reduce((b, c)=>{
        b[c[key]] = (b[c[key]] || 0) + (isNaN(c[key2]) ? 0 : c[key2]);
        return b;
    }, {});
}
async function getCounterData(years) {
    const counterData = {};
    // Required due to asynchronous loop
    await Promise.all(years.map(async (year)=>{
        counterData[year] = await d3.csv("comptage_velo_" + year + ".csv");
    }));
    return counterData;
}
async function getLocationData() {
    return await d3.csv("localisation_des_compteurs_velo.csv");
}
function createDataset(locations, counters, years) {
    const dataset = {};
    years.forEach((year)=>{
        const counterData = counters[year];
        dataset[year] = {};
        // Keeps only data columns
        const acceptedCounters = Object.keys(counterData[0]).filter((name)=>{
            return name !== "Date" && name !== "";
        });
        // Gets relevant data for each counter from location dataset
        acceptedCounters.forEach((name)=>{
            const counter = locations.find((t)=>{
                if (name.includes("compteur")) // Finds via ID, for 2019-2021 datasets
                return name.includes(t.ID);
                else // Finds via name, for 2009-2018 datasets
                return t.Nom === name;
            });
            dataset[year][counter.Nom] = {
                name: counter.Nom,
                longitude: counter.Longitude,
                latitude: counter.Latitude,
                counts: []
            };
        });
        // Iterates through counterData to add counts to each counter
        counterData.forEach((timestep)=>{
            let date = undefined;
            let time = "00:00";
            Object.entries(timestep).map(([key, value])=>{
                if (key === "Date") {
                    const dateTime = value.split(" ");
                    date = dateTime[0];
                    // Gets time as well for datasets after 2018
                    if (dateTime.length > 1) time = dateTime[1];
                }
                return [
                    key,
                    value
                ];
            }).filter(([name])=>acceptedCounters.includes(name)).forEach(([name, count])=>{
                if (parseInt(year) > 2018) name = locations.find((t)=>name.includes(t.ID)).Nom;
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
function createMapData(dataset, montreal, projection) {
    const mapData = {};
    Object.entries(dataset).forEach(([year, yearData])=>{
        mapData[year] = Object.entries(yearData).map(([counter, counterData])=>{
            return {
                name: counter,
                neighborhood: (0, _geography.determineNeighborhood)(counterData.longitude, counterData.latitude, montreal),
                counts: sum(counterData.counts, "count"),
                ...(0, _geography.convertCoordinatesToXY)(counterData.longitude, counterData.latitude, projection)
            };
        });
    });
    return mapData;
}
function createLineChartData(dataset, montreal) {
    const lineChartData = {};
    Object.entries(dataset).forEach(([year, yearData])=>{
        lineChartData[year] = {};
        let averageDayCounts;
        // Sums counts across each day for each counter
        // Also adds neighborhood
        Object.entries(yearData).forEach(([counter, counterData])=>{
            let newCounts = [];
            // Years 2019-2021 need to group the data by day
            if (counterData.counts.length > 366) newCounts = Object.values(groupSum(counterData.counts, "date", "count"));
            else newCounts = counterData.counts.map((data)=>data.count);
            // Save this counter's data to averageDayCounts
            if (!averageDayCounts) averageDayCounts = newCounts;
            else newCounts.map((count, i)=>{
                averageDayCounts[i] += count;
            });
            lineChartData[year][counter] = {
                name: counter,
                neighborhood: (0, _geography.determineNeighborhood)(counterData.longitude, counterData.latitude, montreal),
                counts: newCounts.map((v, i)=>{
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
            counts: averageDayCounts.map((counts, i)=>{
                return {
                    index: i,
                    value: Math.round(counts / totalCounters)
                };
            })
        };
    });
    return lineChartData;
}
function createAreaChartData(dataset) {
    const areaChartData = {};
    Object.entries(dataset).forEach(([year, yearData])=>{
        // Time data not available for years before 2019
        if (parseInt(year) < 2019) return;
        areaChartData[year] = {};
        let averageTimeCounts;
        // Sums counts across each day for each counter
        // Also adds neighborhood
        Object.entries(yearData).forEach(([counter, counterData])=>{
            let newCounts = Object.values(groupSum(counterData.counts, "time", "count"));
            // Save this counter's data to averageTimeCounts
            if (!averageTimeCounts) averageTimeCounts = newCounts;
            else newCounts.map((count, i)=>{
                averageTimeCounts[i] += count;
            });
            areaChartData[year][counter] = {
                name: counter,
                counts: newCounts.map((v, i)=>{
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
            counts: averageTimeCounts.map((counts, i)=>{
                return {
                    index: i,
                    value: Math.round(counts / totalCounters)
                };
            })
        };
    });
    return areaChartData;
}
function createBarChartData(dataset) {
    const barChartData = {};
    Object.entries(dataset).forEach(([year, yearData])=>{
        let allCounts = 0;
        // Sums counts across entire year for each counter
        Object.entries(yearData).forEach(([counter, counterData])=>{
            const counterSum = {
                year: year,
                counts: sum(counterData.counts, "count")
            };
            allCounts += counterSum.counts;
            barChartData[counter] ? barChartData[counter].push(counterSum) : barChartData[counter] = [
                counterSum
            ];
        });
        // Adds average of all sensors for year for default view
        const average = {
            year: year,
            counts: Math.round(allCounts / Object.keys(yearData).length)
        };
        barChartData["Average"] ? barChartData["Average"].push(average) : barChartData["Average"] = [
            average
        ];
    });
    return barChartData;
}

},{"./geography":"iRz4J","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iRz4J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal GEOJSON
 */ parcelHelpers.export(exports, "getMontrealData", ()=>getMontrealData);
/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal's bike path GEOJSON
 */ parcelHelpers.export(exports, "getBikePaths", ()=>getBikePaths);
/**
 * Determines the neighborhood based on coordinates
 *
 * @param lon Longitude of point (float)
 * @param lat Latitude of point (float)
 * @param montreal Pre-loaded JSON of Montreal data
 *
 * @returns {string} Neighborhood of point or empty if not found
 */ parcelHelpers.export(exports, "determineNeighborhood", ()=>determineNeighborhood);
/** Gets the map projection function
 *
 * @returns Projection function in Mercator for Montreal
 */ parcelHelpers.export(exports, "getProjection", ()=>getProjection);
/** Gets the path function
 *
 * @param projection Projection in Mercator for Montreal
 *
 * @returns Path function for Montreal
 */ parcelHelpers.export(exports, "getPath", ()=>getPath);
/** Gets the XY positions on the map viz for a given set of coordinates
 * @param {number} longitude Longitude to convert
 * @param {number} latitude Latitude to convert
 * @param projection Projection in Mercator for Montreal
 *
 * @returns {x: number, y: number}
 */ parcelHelpers.export(exports, "convertCoordinatesToXY", ()=>convertCoordinatesToXY);
var _pointInPolygon = require("point-in-polygon");
var _pointInPolygonDefault = parcelHelpers.interopDefault(_pointInPolygon);
async function getMontrealData() {
    return await d3.json("montreal.json");
}
async function getBikePaths() {
    return await d3.json("reseau_cyclable.geojson");
}
function determineNeighborhood(lon, lat, montreal) {
    let returnName = "";
    montreal.forEach((feature)=>{
        if ((0, _pointInPolygonDefault.default)([
            lon,
            lat
        ], feature.geometry.coordinates[0][0])) returnName = feature.properties.NOM;
    });
    return returnName;
}
function getProjection() {
    return d3.geoMercator().center([
        -73.708879,
        45.579611
    ]).scale(70000);
}
function getPath(projection) {
    return d3.geoPath().projection(projection);
}
function convertCoordinatesToXY(longitude, latitude, projection) {
    const projected = projection([
        longitude,
        latitude
    ]);
    return {
        x: projected[0],
        y: projected[1]
    };
}

},{"point-in-polygon":"hhB7Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hhB7Y":[function(require,module,exports) {
var pointInPolygonFlat = require("./flat.js");
var pointInPolygonNested = require("./nested.js");
module.exports = function pointInPolygon(point, vs, start, end) {
    if (vs.length > 0 && Array.isArray(vs[0])) return pointInPolygonNested(point, vs, start, end);
    else return pointInPolygonFlat(point, vs, start, end);
};
module.exports.nested = pointInPolygonNested;
module.exports.flat = pointInPolygonFlat;

},{"./flat.js":"ipgya","./nested.js":"4nqAZ"}],"ipgya":[function(require,module,exports) {
module.exports = function pointInPolygonFlat(point, vs, start, end) {
    var x = point[0], y = point[1];
    var inside = false;
    if (start === undefined) start = 0;
    if (end === undefined) end = vs.length;
    var len = (end - start) / 2;
    for(var i = 0, j = len - 1; i < len; j = i++){
        var xi = vs[start + i * 2 + 0], yi = vs[start + i * 2 + 1];
        var xj = vs[start + j * 2 + 0], yj = vs[start + j * 2 + 1];
        var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
};

},{}],"4nqAZ":[function(require,module,exports) {
// ray-casting algorithm based on
// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
module.exports = function pointInPolygonNested(point, vs, start, end) {
    var x = point[0], y = point[1];
    var inside = false;
    if (start === undefined) start = 0;
    if (end === undefined) end = vs.length;
    var len = end - start;
    for(var i = 0, j = len - 1; i < len; j = i++){
        var xi = vs[i + start][0], yi = vs[i + start][1];
        var xj = vs[j + start][0], yj = vs[j + start][1];
        var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
};

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cyjxE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Adds SVG groups for the map base, bike paths and circles
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */ parcelHelpers.export(exports, "generateMapGroups", ()=>generateMapGroups);
/**
 * Draws the map base of Montreal.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 */ parcelHelpers.export(exports, "drawMapBackground", ()=>drawMapBackground);
/**
 * Draws the cycle lanes of Montreal
 *
 * @param {object[]} data The data for the cycle lanes
 * @param {*} path The path associated with the current projection
 */ parcelHelpers.export(exports, "drawBikePaths", ()=>drawBikePaths);
/**
 * Draws the counter
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */ parcelHelpers.export(exports, "drawCircles", ()=>drawCircles);
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
function radiusScale(data1) {
    const maxCounts = d3.max(data1.map((data)=>data.counts));
    return d3.scaleLinear().domain([
        0,
        maxCounts
    ]).range([
        4,
        10
    ]);
}
function drawCircles(data, callback) {
    const scale = radiusScale(data);
    d3.select("#map-circles-g").selectAll("circle").remove();
    d3.select("#map-circles-g").selectAll("circle").data(data).enter().append("circle").attr("class", "circle").attr("r", (d)=>scale(d.counts)).attr("cx", (d)=>d.x).attr("cy", (d)=>d.y).attr("fill", "#0461cc").attr("stroke", "#ffffff").attr("stroke-width", 1).on("click", callback);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"blWZ6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Appends a callback to redraw graphs to the year dropdown
 *
 * @param callback Redraw function to call on click
 */ parcelHelpers.export(exports, "dropDownClickHandler", ()=>dropDownClickHandler);
/** To be passed to circles to redraw charts on circle click
 *
 * @param callback Callback to call on click
 */ parcelHelpers.export(exports, "circleClickHandler", ()=>circleClickHandler);
function dropDownClickHandler(callback) {
    d3.select("#dropdown").on("change", ()=>{
        const year = d3.select("#dropdown").property("value");
        console.log(year);
        callback(year);
    // Pass year to drawBarChart, drawMapCircles and drawAreaChart to redraw
    // Rerun drawLineChart with no name specified (default data)
    });
}
function circleClickHandler(callback) {
    return (d)=>{
        const year = d3.select("#dropdown").property("value");
        const name = d.name;
        console.log(name);
        callback(year, name);
    // Pass d.name, d.neighborhood and lineChartData[year][name] to drawLinechart
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kHSI7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Draws the line chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */ parcelHelpers.export(exports, "drawLineChart", ()=>drawLineChart);
function addLabels(g, width, height, name, neighborhood) {
    // X label
    g.append("g").append("text").attr("class", "axis-label").text("Jours de l'ann\xe9e").attr("x", width / 2 + 30).attr("y", height);
    // Y label
    g.append("g").append("text").attr("class", "axis-label").text("Comptes").attr("x", 10).attr("y", height / 2).attr("transform", "rotate(-90)");
    // Title
    const title = g.append("g").append("text").attr("class", "graph-title").attr("x", width / 2 + 30).attr("y", 15);
    if (name) title.text(name + " - " + neighborhood);
    else title.text("Moyenne de tous les compteurs");
}
function generateXScale(width, days) {
    return d3.scaleLinear().domain([
        0,
        days
    ]).range([
        0,
        width
    ]);
}
function generateYScale(height, counts) {
    return d3.scaleLinear().domain([
        0,
        d3.max(counts)
    ]).range([
        height,
        0
    ]).nice();
}
function addAxes(g, width, height, yScale) {
    // Create X axis with 24 hr time
    const xAxis = d3.axisBottom(d3.scaleTime().domain([
        new Date(2000, 0, 0),
        new Date(2000, 12, 31)
    ]).range([
        0,
        width
    ]).nice()).ticks(6).tickFormat(d3.timeFormat("%B"));
    // Add axes, pixel-perfect positioning
    g.append("g").attr("class", "axis").attr("transform", "translate(59," + height + ")").call(xAxis);
    g.attr("class", "axis").append("g").attr("transform", "translate(59,0)").call(d3.axisLeft(yScale));
}
function drawLineChart(width, height, averageData, counterData) {
    const svg = d3.select("#line-svg").attr("width", width + 80).attr("height", height + 80);
    // Reset line chart svg
    svg.selectAll("g").remove();
    // Add labels
    addLabels(svg, width + 80, height + 70, counterData && counterData.name, counterData && counterData.neighborhood);
    const outerG = svg.append("g").attr("width", width + 30).attr("height", height + 20).attr("transform", "translate(10, 30)");
    // Generate scales
    const xScale = generateXScale(width, averageData.counts.length);
    const yScale = generateYScale(height, [
        ...averageData.counts.map((v)=>v.value),
        ...counterData ? counterData.counts.map((v)=>v.value) : [], 
    ]);
    // Add axes
    addAxes(outerG, width, height, yScale);
    const innerG = outerG.append("g").attr("width", width).attr("height", height).attr("transform", "translate(60, 0)");
    // Draw chart
    innerG.append("path").datum(averageData.counts).attr("fill", "rgba(0, 0, 0, 0)").attr("stroke", "#9a9a9a").attr("stroke-width", 1).attr("d", d3.line().x(function(d) {
        return xScale(d.index);
    }).y(function(d) {
        return yScale(d.value);
    }));
    if (counterData) innerG.append("path").datum(counterData.counts).attr("fill", "rgba(0, 0, 0, 0)").attr("stroke", "rgba(18, 81, 153, 1)").attr("stroke-width", 1).attr("d", d3.line().x(function(d) {
        return xScale(d.index);
    }).y(function(d) {
        return yScale(d.value);
    }));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"apy0w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Draws the area chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */ parcelHelpers.export(exports, "drawAreaChart", ()=>drawAreaChart);
function addLabels(g, width, height, name) {
    // X label
    g.append("g").append("text").attr("class", "axis-label").text("Heures de la journ\xe9e").attr("x", width / 2 + 30).attr("y", height);
    // Y label
    g.append("g").append("text").attr("class", "axis-label").text("Comptes").attr("x", 10).attr("y", height / 2).attr("transform", "rotate(-90)");
    // Title
    const title = g.append("g").append("text").attr("class", "graph-title").attr("x", width / 2 + 30).attr("y", 15);
    if (name) title.text("Comptes par heure pour " + name);
    else title.text("Moyenne de tous les compteurs");
}
function generateXScale(width) {
    return d3.scaleLinear().domain([
        0,
        96
    ]).range([
        0,
        width
    ]);
}
function generateYScale(height, counts) {
    return d3.scaleLinear().domain([
        0,
        d3.max(counts)
    ]).range([
        height,
        0
    ]).nice();
}
function addAxes(g, width, height, yScale) {
    // Create X axis with 24 hr time
    const xAxis = d3.axisBottom(d3.scaleTime().range([
        0,
        width - 7
    ]).nice()).ticks(20).tickFormat(d3.timeFormat("%H:%M"));
    // Add axes, pixel-perfect positioning
    g.append("g").attr("class", "axis").attr("transform", "translate(59," + height + ")").call(xAxis);
    g.attr("class", "axis").append("g").attr("transform", "translate(59,0)").call(d3.axisLeft(yScale));
}
function drawAreaChart(width, height, averageData, counterData) {
    const svg = d3.select("#area-svg").attr("width", width + 80).attr("height", height + 80);
    // Reset area chart svg
    svg.selectAll("g").remove();
    // Add labels
    addLabels(svg, width + 80, height + 70, counterData && counterData.name);
    const outerG = svg.append("g").attr("width", width + 30).attr("height", height + 20).attr("transform", "translate(10, 30)");
    // Generate scales
    const xScale = generateXScale(width);
    const yScale = generateYScale(height, [
        ...averageData.counts.map((v)=>v.value),
        ...counterData ? counterData.counts.map((v)=>v.value) : [], 
    ]);
    // Add axes
    addAxes(outerG, width, height, yScale);
    const innerG = outerG.append("g").attr("width", width).attr("height", height).attr("transform", "translate(60, 0)");
    // Draw chart
    innerG.append("path").datum(averageData.counts).attr("fill", "#c9c9c9").attr("stroke", "#9a9a9a").attr("stroke-width", 1).attr("d", d3.area().x(function(d) {
        return xScale(d.index);
    }).y0(height).y1(function(d) {
        return yScale(d.value);
    }));
    if (counterData) innerG.append("path").datum(counterData.counts).attr("fill", "rgba(77, 149, 232, 0.5)").attr("stroke", "rgba(18, 81, 153, 0.5)").attr("stroke-width", 1).attr("d", d3.area().x(function(d) {
        return xScale(d.index);
    }).y0(height).y1(function(d) {
        return yScale(d.value);
    }));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lsnFW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Appends SVG g elements which will contain the x and y axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */ parcelHelpers.export(exports, "appendAxes", ()=>appendAxes);
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */ parcelHelpers.export(exports, "appendGraphLabels", ()=>appendGraphLabels);
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */ parcelHelpers.export(exports, "setCanvasSize", ()=>setCanvasSize);
/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */ parcelHelpers.export(exports, "positionLabels", ()=>positionLabels);
/**
 * Updates the X scale to be used within each group of the grouped bar chart
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} subGroupBars The bars per subgroup (average on all counters and specific counter)
 * @param {*} xScale The graph's encompassing x scale
 */ parcelHelpers.export(exports, "updateXSubgroupScale", ()=>updateXSubgroupScale);
/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */ parcelHelpers.export(exports, "drawXAxis", ()=>drawXAxis);
/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */ parcelHelpers.export(exports, "drawYAxis", ()=>drawYAxis);
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */ parcelHelpers.export(exports, "updateGroupXScale", ()=>updateGroupXScale);
/**
   * Sets the domain and range of the Y scale.
   *
   * @param {*} scale The Y scale
   * @param {object[]} data The data to be used
   * @param {number} height The height of the graph
   */ parcelHelpers.export(exports, "updateYScale", ()=>updateYScale);
/**
   * Creates the groups for the grouped bar chart and appends them to the graph.
   * Each group corresponds to a pair of average/chosen counter values
   *
   * @param {object[]} data The data to be used
   * @param {*} x The graph's x scale
   */ parcelHelpers.export(exports, "createGroups", ()=>createGroups);
/**
   * Draws the bars inside the groups
   *
   * @param {*} y The graph's y scale
   * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
   * @param {number} height The height of the graph
   * @param {object[]} data The data to be used
   */ parcelHelpers.export(exports, "drawBars", ()=>drawBars);
/**
     *   This function builds the graph.
     */ parcelHelpers.export(exports, "buildBarChart", ()=>buildBarChart);
function appendAxes(g) {
    g.append("g").attr("class", "x axis");
    g.append("g").attr("class", "y axis");
}
function appendGraphLabels(g) {
    g.append("text").text("Total counts for the year").attr("class", "y axis-text").attr("transform", "rotate(-90)").attr("fill", "#898989").attr("font-size", 12);
    g.append("text").text("Average counts per year").attr("class", "title").attr("fill", "#898989");
}
function setCanvasSize(width, height) {
    d3.select("#bar-svg").attr("width", width).attr("height", height);
}
function positionLabels(width, height) {
    d3.select(".y.axis-text").attr("x", -50).attr("y", height / 2);
    d3.select(".title").attr("x", width / 2).attr("y", -35);
}
function updateXSubgroupScale(scale, subGroupBars, xScale1) {
    scale.domain(subGroupBars).range([
        0,
        xScale1.bandwidth()
    ]);
}
function drawXAxis(xScale2, height) {
    d3.select(".x.axis").attr("transform", "translate(0, " + height + ")").call(d3.axisBottom(xScale2).tickFormat((x)=>`year ${x}`));
}
function drawYAxis(yScale1) {
    d3.select(".y.axis").call(d3.axisLeft(yScale1).ticks(5));
}
function updateGroupXScale(scale, data, width) {
    scale.domain(data.Average.year).range([
        0,
        width
    ]);
}
function updateYScale(scale, data, height) {
    const max = d3.max(data.Average.counts, (m)=>d3.max(m));
    scale.domain([
        0,
        max
    ]).range([
        height,
        0
    ]);
}
function createGroups(data1, x) {
    d3.select("#bar-svg").selectAll(".group").data(data1).enter().append("g").attr("class", "group").attr("transform", (data)=>"translate(" + x(data.Average.year + ",0)")).attr("x", (data)=>x(data.Average.year));
}
function drawBars(y, xSubgroup, height, data2) {
    d3.select("#bar-svg").selectAll(".group").selectAll("rect").data(data2).enter().append("rect").attr("x", (data)=>xSubgroup(data.Average.year)).attr("y", (data)=>y(data.Average.counts)).attr("width", xSubgroup.bandwidth()).attr("height", (data)=>height - y(data.Average.counts));
}
const margin = {
    top: 80,
    right: 0,
    bottom: 80,
    left: 55
};
let bounds;
let svgSize;
let graphSize;
const xScale = d3.scaleBand().padding(0.15);
const xSubgroupScale = d3.scaleBand().padding([
    0.015
]);
const yScale = d3.scaleLinear();
/**
     *   This function handles the graph's sizing.
     */ function setSizing() {
    bounds = d3.select("#bar-svg").node().getBoundingClientRect();
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
function buildBarChart(data, g) {
    appendAxes(g);
    appendGraphLabels(g);
    setSizing();
    var subGroupBars = [
        "Average",
        "X"
    ] // Update according to data input
    ;
    positionLabels(graphSize.width, graphSize.height);
    updateGroupXScale(xScale, data, graphSize.width);
    updateXSubgroupScale(xSubgroupScale, subGroupBars, xScale);
    updateYScale(yScale, data, graphSize.height);
    drawXAxis(xScale, graphSize.height);
    drawYAxis(yScale);
    createGroups(data, xScale);
    drawBars(yScale, xSubgroupScale, subGroupBars, graphSize.height);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"47aYr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Draws the dropdown menu to select the desired year
 *
 * @param {number} years The years to display
 * @param {number} width The width of the graph, used to place the button
 *
 * @returns Initial year in dropdown
 */ parcelHelpers.export(exports, "drawDropdown", ()=>drawDropdown);
function drawDropdown(years) {
    d3.select("#map-div").append("select").attr("id", "dropdown").attr("width", 130).attr("height", 25).selectAll("myOptions").data(years).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
    return years[0];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["ShInH","8lqZg"], "8lqZg", "parcelRequire5ccb")

//# sourceMappingURL=index.975ef6c8.js.map
