/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// Load the package and run the simulation\nlet mod;\nlet controls;\n\nPromise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_text-encoding_index_js\"), __webpack_require__.e(\"pkg_index_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pkg */ \"./pkg/index.js\"))\n    .then(wasm => {\n      mod = wasm;\n\n      // Optionally get the width and height from the page parameters\n      let url = new URL(window.location.href);\n      let width = parseInt(url.searchParams.get(\"width\")||\"600\");\n      let height = parseInt(url.searchParams.get(\"height\")||\"600\");\n\n      let options = {\n        width: width,\n        height: height,\n      }\n\n      let initial_values = {\n        rotate_angle: 22.0,\n        sense_angle: 22.0,\n        sense_offset: 5.0,\n        step_size: 3.0,\n        decay: 0.10,\n        deposit: 1.0,\n        number_of_agents: 1 << 20,\n      }\n\n      wasm.add_simulation_to(\"physarum-div\", options);\n\n      let div = document.getElementById(\"physarum-div\");\n      div.setAttribute(\"style\", \"min-width: \" + options.width + \"px; min-height: \"  + options.height + \"px;\");\n\n      wasm.set_foreground_colour( \"74A19A\" );\n      wasm.set_background_colour( \"EBD999\" );\n\n      add_controls( initial_values );\n\n    }\n);\n\nfunction add_controls( initial_values ) {\n  \n  let container = document.getElementById('simulation-controls');\n  if (!container) throw new Error('Unable to find #container in dom');\n\n  let table = document.createElement('table');\n  let title_row = document.createElement('tr');\n  let title_data = document.createElement('td');\n  let title = document.createElement('h2');\n  title.textContent = \"Parameters\";\n  title_data.appendChild(title);\n  title_row.appendChild(title_data);\n  table.appendChild(title_row);\n\n  let angle_denorm =  function(x){ return (Math.pow( x, 3.0 ) * 360.0).toFixed(1); };\n  let angle_norm = function(x){ return Math.pow( x / 360.0, 1.0 / 3.0 )  };\n\n  let ra = add_control_to_table(\"Rotate angle\", table, \n    angle_denorm, \n    angle_norm,\n    function(x){ mod.set_rotate_angle(x) } );\n  let sa = add_control_to_table(\"Sense angle\", table, \n    angle_denorm, \n    angle_norm,\n    function(x){ mod.set_sense_angle(x) } );\n  let so = add_control_to_table(\"Sense offset\", table, \n  function(x){ return (x * 10).toFixed(1); }, \n  function(x){ return (x / 10); },\n    function(x){ mod.set_sense_offset(x) } );\n  let ss = add_control_to_table(\"Step size\", table,\n    function(x){ return (x * 10).toFixed(1); }, \n    function(x){ return (x / 10); },\n    function(x){ mod.set_step_size(x) } );\n  let dr = add_control_to_table(\"Decay ratio\", table, \n    function(x){ return  Math.pow( x, 2.0 ).toFixed(3); },\n    function(x){ return Math.pow( x, 0.5 ); },\n    function(x){ mod.set_decay(x) } );\n  let da = add_control_to_table(\"Deposit amount\", table, \n    function(x){ return (x * 5).toFixed(2);}, \n    function(x){ return x / 5 },\n    function(x){ mod.set_deposit(x) } );\n\n  let na = add_control_to_table(\"Number of particles\", table, \n    function(x){\n      return 1 << x;\n    }, \n    function(x){\n      return Math.log2(x); \n    },\n    function(x){ mod.set_number_of_agents(x) },\n    10, 21, 1 );\n\n  ra.input.value = ra.norm( initial_values.rotate_angle );\n  ra.input.dispatchEvent(new Event('input'));\n\n  sa.input.value = sa.norm( initial_values.sense_angle );\n  sa.input.dispatchEvent(new Event('input'));\n\n  so.input.value = so.norm( initial_values.sense_offset );\n  so.input.dispatchEvent(new Event('input'));\n\n  ss.input.value = ss.norm( initial_values.step_size );\n  ss.input.dispatchEvent(new Event('input'));\n\n  dr.input.value = dr.norm( initial_values.decay );\n  dr.input.dispatchEvent(new Event('input'));\n\n  da.input.value = da.norm( initial_values.deposit );\n  da.input.dispatchEvent(new Event('input'));\n\n  na.input.value = na.norm( initial_values.number_of_agents );\n  na.input.dispatchEvent(new Event('input'));\n\n\n  let url = new URL(window.location.href);\n  let extra_controls = (url.searchParams.get(\"extra_controls\")||\"0\") == \"1\";\n\n  if( extra_controls )\n  {\n    let bc = add_colour_control_to_table(\"Background colour\", table, \n      function(x){ mod.set_background_colour(x) } );\n    bc.input.value = \"#EBD999\";\n  \n    let fc = add_colour_control_to_table(\"Foreground colour\", table, \n    function(x){ mod.set_foreground_colour(x) } );\n    fc.input.value = \"#74A19A\";\n  }\n\n  let controls_title_row = document.createElement('tr');\n  let control_title = document.createElement('h2');\n  control_title.textContent = \"Controls\";\n  controls_title_row.appendChild(control_title);\n  table.appendChild(controls_title_row);\n\n  let pause_button_row = document.createElement('tr');\n  let pause_button_td = document.createElement('td');\n  let pause_button = document.createElement('button');\n  pause_button.textContent = \"Pause\";\n  pause_button.onclick = function() {\n    pause = pause_button.textContent == \"Pause\";\n    mod.set_pause( pause );\n    pause_button.textContent = pause ? \"Resume\" : \"Pause\";\n  }\n  pause_button.setAttribute(\"style\", \"width: 100px;\");\n  pause_button_td.appendChild(pause_button);\n  pause_button_row.appendChild(pause_button_td);\n  table.appendChild(pause_button_row);\n\n  let save_button_row = document.createElement('tr');\n  let save_button_td = document.createElement('td');\n  let save_button = document.createElement('button');\n  save_button.textContent = \"Save\";\n  save_button.onclick = function() {\n    var canvas = document.getElementById('physarum-div').getElementsByTagName('canvas')[0];\n    var dataURL = canvas.toDataURL(\"image/png\", 1.0);\n    downloadImage(dataURL, 'physarum.png');\n  }\n\n  function downloadImage(data, filename = 'untitled.jpeg') {\n      var a = document.createElement('a');\n      a.href = data;\n      a.download = filename;\n      document.body.appendChild(a);\n      a.click();\n  }\n  save_button.setAttribute(\"style\", \"width: 100px;\");\n  save_button_td.appendChild(save_button);\n  save_button_row.appendChild(save_button_td);\n  table.appendChild(save_button_row);\n\n  container.appendChild(table);\n\n}\n\nfunction add_control_to_table( name, table, denormalisation, normalisation,\n  on_change = function(x){},\n  min = 0.0, max = 1.0, step = 0.001) {\n  \n  let row = document.createElement('tr');\n  let label = document.createElement('td');\n  label.innerHTML = name;\n\n  let input_td = document.createElement('td');\n  let input = document.createElement('input');\n  input.type = \"range\";\n  input.min = min.toString();\n  input.max = max.toString();\n  input.step = step.toString();\n  input.className = \"slider\";\n  input_td.appendChild(input);\n\n  let output = document.createElement('td');\n  output.innerHTML = input.value;\n\n  input.oninput = function() {\n    let denorm_value = denormalisation( parseFloat(this.value) )\n    on_change( denorm_value );\n    output.innerHTML = denorm_value;\n  }\n\n  row.appendChild(label);\n  row.appendChild(input_td);\n  row.appendChild(output);\n  table.appendChild(row);\n\n  return {\n    'input': input,\n    'output': output,\n    'norm': normalisation,\n    'denorm': denormalisation,\n  }\n}\n\nfunction add_colour_control_to_table( name, table, on_change = function(x){}) {\n  let row = document.createElement('tr');\n  let label = document.createElement('td');\n  label.innerHTML = name;\n\n  let input_td = document.createElement('td');\n  let input = document.createElement('input');\n  input.type = \"color\";\n  input_td.appendChild(input);\n\n  input.oninput = function() {\n    on_change( this.value );\n  }\n\n  row.appendChild(label);\n  row.appendChild(input_td);\n  table.appendChild(row);\n\n  return {\n    'input': input\n  }\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			var fallback = () => (req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports))));
/******/ 			return req.then((res) => {
/******/ 				if (typeof WebAssembly.instantiateStreaming === "function") {
/******/ 					return WebAssembly.instantiateStreaming(res, importsObj)
/******/ 						.then(
/******/ 							(res) => (Object.assign(exports, res.instance.exports)),
/******/ 							(e) => {
/******/ 								if(res.headers.get("Content-Type") !== "application/wasm") {
/******/ 									console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
/******/ 									return fallback();
/******/ 								}
/******/ 								throw e;
/******/ 							}
/******/ 						);
/******/ 				}
/******/ 				return fallback();
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;