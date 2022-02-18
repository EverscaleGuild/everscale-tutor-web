parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yrjL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUniqueId=exports.mergeTransactions=exports.AddressLiteral=exports.Address=void 0;class e{constructor(e){this._address=e}toString(){return this._address}equals(s){return s instanceof e?this._address==s._address:this._address==s}}exports.Address=e;class s extends e{constructor(e){super(e)}}function r(e,s,r){if("old"==r.batchType)return e.push(...s),e;if(0===e.length)return e.push(...s),e;let t=0;for(;t<e.length&&e[t].id.lt.localeCompare(r.maxLt)>=0;)++t;return e.splice(t,0,...s),e}exports.AddressLiteral=s,exports.mergeTransactions=r;const t=4294967295;let o=Math.floor(Math.random()*t);function d(){return o=(o+1)%t}exports.getUniqueId=d;
},{}],"S51G":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseTokensObject=exports.serializeTokensObject=exports.parseAccountInteraction=exports.parsePermissions=exports.parseMessage=exports.serializeMessage=exports.parseTransaction=exports.serializeTransaction=void 0;const e=require("./utils");function s(e){return{...e,inMessage:n(e.inMessage),outMessages:e.outMessages.map(n)}}function t(e){return{...e,inMessage:r(e.inMessage),outMessages:e.outMessages.map(r)}}function n(e){return{...e,src:e.src?e.src.toString():void 0,dst:e.dst?e.dst.toString():void 0}}function r(s){return{...s,src:s.src?new e.Address(s.src):void 0,dst:s.dst?new e.Address(s.dst):void 0}}function o(e){return{...e,accountInteraction:e.accountInteraction?i(e.accountInteraction):void 0}}function i(s){return{...s,address:new e.Address(s.address)}}function c(e){return a(e)}function a(s){if(s instanceof e.Address)return s.toString();if(Array.isArray(s)){const e=[];for(const t of s)e.push(a(t));return e}if(null!=s&&"object"==typeof s){const e={};for(const[t,n]of Object.entries(s))e[t]=a(n);return e}return s}function p(e,s){const t={};for(const n of e)t[n.name]=u(n,s[n.name]);return t}function u(s,t){if(s.type.startsWith("map")){let[e,n]=s.type.split(",");e=e.slice(4),n=n.slice(0,-1);const r=[];for(const[o,i]of t)r.push([u({name:"",type:e},o),u({name:"",type:n,components:s.components},i)]);return r}{const n=s.type.endsWith("[]"),r=!n&&s.type.startsWith("optional"),o=n?s.type.slice(0,-2):r?s.type.slice(9,-1):s.type;if(n){const e={name:s.name,type:o,components:s.components},n=[];for(const s of t)n.push(u(e,s));return n}if(r){if(null==t)return null;return u({name:s.name,type:o,components:s.components},t)}if("tuple"==o){const e={};if(null!=s.components)for(const n of s.components)e[n.name]=u(n,t[n.name]);return e}return"address"==o?new e.Address(t):t}}exports.serializeTransaction=s,exports.parseTransaction=t,exports.serializeMessage=n,exports.parseMessage=r,exports.parsePermissions=o,exports.parseAccountInteraction=i,exports.serializeTokensObject=c,exports.parseTokensObject=p;
},{"./utils":"yrjL"}],"qeQ0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Subscriber=void 0;const t=require("./utils");class s{constructor(t){this.provider=t,this.subscriptions={},this.scanners={}}transactions(t){return this._addSubscription("transactionsFound",t)}oldTransactions(s,r){const o=(0,t.getUniqueId)();return new n(async(t,e)=>{const n=new i(this.provider,{address:s,onData:t,onEnd:e,...r});this.scanners[o]=n,await n.start()},async()=>{const t=this.scanners[o];delete this.scanners[o],null!=t&&await t.stop()},e)}states(t){return this._addSubscription("contractStateChanged",t)}async unsubscribe(){const t=Object.assign({},this.subscriptions);for(const e of Object.keys(this.subscriptions))delete this.subscriptions[e];const s=Object.assign({},this.scanners);for(const e of Object.keys(this.scanners))delete this.scanners[e];await Promise.all(Object.values(t).map(async t=>{const s=Object.assign({},t);for(const e of Object.keys(s))delete t[e];await Promise.all(Object.values(s).map(t=>{if(null!=t)return t.subscription.then(t=>t.unsubscribe()).catch(()=>{})}))}).concat(Object.values(s).map(t=>t.stop())))}_addSubscription(s,i){const o=(0,t.getUniqueId)();return new n((t,e)=>{let n=this.subscriptions[i.toString()],a=null==n?void 0:n[s];if(null==a){const c={[o]:{onData:t,onEnd:e,queue:new r}};a={subscription:this.provider.subscribe(s,{address:i}).then(t=>(t.on("data",t=>{Object.values(c).forEach(({onData:s,queue:e})=>{e.enqueue(()=>s(t))})}),t.on("unsubscribed",()=>{Object.values(c).forEach(({onEnd:t,queue:s})=>{delete c[o],s.clear(),s.enqueue(async()=>t())})}),t)).catch(t=>{throw console.error(t),Object.values(c).forEach(({onEnd:t,queue:s})=>{delete c[o],s.clear(),s.enqueue(()=>t())}),t}),handlers:c},null==n?(n={[s]:a},this.subscriptions[i.toString()]=n):n[s]=a}else a.handlers[o]={onData:t,onEnd:e,queue:new r}},()=>{const t=this.subscriptions[i.toString()];if(null==t)return;const e=t[s];if(null!=e&&(delete e.handlers[o],0===Object.keys(e.handlers).length)){const n=e.subscription;delete t[s],n.then(t=>t.unsubscribe()).catch(console.debug)}0===Object.keys(t).length&&delete this.subscriptions[i.toString()]},e)}}async function e(t,s){await s(t)}exports.Subscriber=s;class n{constructor(t,s,e){this.makeProducer=t,this.stopProducer=s,this.extractor=e}first(){return new Promise(async(t,s)=>{this.makeProducer(async s=>{await this.extractor(s,s=>{this.stopProducer(),t(s)})},()=>s(new Error("Subscription closed")))})}on(t){this.makeProducer(async s=>{await this.extractor(s,t)},()=>{})}merge(t){return new n(async(s,e)=>{const n={counter:0},i=()=>{2==++n.counter&&e()};this.makeProducer(s,i),t.makeProducer(s,i)},()=>{this.stopProducer(),t.stopProducer()},this.extractor)}filter(t){return new n(this.makeProducer,this.stopProducer,(s,e)=>this.extractor(s,async s=>{await t(s)&&await e(s)}))}filterMap(t){return new n(this.makeProducer,this.stopProducer,(s,e)=>this.extractor(s,async s=>{const n=await t(s);void 0!==n&&await e(n)}))}map(t){return this.filterMap(t)}flatMap(t){return new n(this.makeProducer,this.stopProducer,(s,e)=>this.extractor(s,async s=>{const n=await t(s);for(const t of n)await e(t)}))}skip(t){const s={index:0};return new n(this.makeProducer,this.stopProducer,(e,n)=>this.extractor(e,async e=>{s.index>=t?await n(e):++s.index}))}skipWhile(t){const s={shouldSkip:!0};return new n(this.makeProducer,this.stopProducer,(e,n)=>this.extractor(e,async e=>{s.shouldSkip&&await t(e)||(s.shouldSkip=!1,await n(e))}))}}class i{constructor(t,{address:s,onData:e,onEnd:n,fromLt:i,fromUtime:o}){this.provider=t,this.queue=new r,this.isRunning=!1,this.address=s,this.onData=e,this.onEnd=n,this.fromLt=i,this.fromUtime=o}async start(){this.isRunning||null!=this.promise||(this.isRunning=!0,this.promise=(async()=>{for(;this.isRunning;)try{const{transactions:s,continuation:e}=await this.provider.getTransactions({address:this.address,continuation:this.continuation});if(!this.isRunning||null==s.length)break;const n=s.filter(t=>(null==this.fromLt||t.id.lt>this.fromLt)&&(null==this.fromUtime||t.createdAt>this.fromUtime));if(0==n.length)break;const i={maxLt:n[0].id.lt,minLt:n[n.length-1].id.lt,batchType:"old"};if(this.queue.enqueue(()=>this.onData({address:this.address,transactions:n,info:i})),null==e)break;this.continuation=e}catch(t){console.error(t)}this.queue.enqueue(async()=>this.onEnd()),this.isRunning=!1,this.continuation=void 0})())}async stop(){this.isRunning=!1,this.queue.clear(),null!=this.promise?await this.promise:this.onEnd()}}class r{constructor(){this.queue=[],this.workingOnPromise=!1}enqueue(t){this.queue.push(t),this._dequeue().catch(()=>{})}clear(){this.queue.length=0}async _dequeue(){if(this.workingOnPromise)return;const t=this.queue.shift();t&&(this.workingOnPromise=!0,t().then(()=>{this.workingOnPromise=!1,this._dequeue()}).catch(()=>{this.workingOnPromise=!1,this._dequeue()}))}}
},{"./utils":"yrjL"}],"Xnvh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TvmException=exports.Contract=void 0;const t=require("./models");class s{constructor(s,i,n){if(!Array.isArray(i.functions))throw new Error("Invalid abi. Functions array required");if(!Array.isArray(i.events))throw new Error("Invalid abi. Events array required");this._provider=s,this._abi=JSON.stringify(i),this._functions=i.functions.reduce((t,s)=>(t[s.name]={inputs:s.inputs||[],outputs:s.outputs||[]},t),{}),this._events=i.events.reduce((t,s)=>(t[s.name]={inputs:s.inputs||[]},t),{}),this._address=n;class a{constructor(s,e,i,n,a,r){this.provider=s,this.functionAbi=e,this.abi=i,this.address=n,this.method=a,this.params=(0,t.serializeTokensObject)(r)}async send(s){const{transaction:e}=await this.provider.rawApi.sendMessage({sender:s.from.toString(),recipient:this.address.toString(),amount:s.amount,bounce:null==s.bounce||s.bounce,payload:{abi:this.abi,method:this.method,params:this.params}});return(0,t.parseTransaction)(e)}async sendWithResult(s){const e=this.provider.createSubscriber();try{let n,a;const r=new Promise(t=>{a=(s=>t(s))}),o=[];e.transactions(this.address).flatMap(t=>t.transactions).filter(t=>{var e;return(null===(e=t.inMessage.src)||void 0===e?void 0:e.equals(s.from))||!1}).on(t=>{null==n?o.push(t):n.possibleMessages.findIndex(s=>s.hash==t.inMessage.hash)>=0&&(null==a||a(t))});const u=await this.send(s),c=u.outMessages.filter(t=>{var s;return(null===(s=t.dst)||void 0===s?void 0:s.equals(this.address))||!1});n={transaction:u,possibleMessages:c};const d=o.find(t=>c.findIndex(s=>s.hash==t.inMessage.hash)>=0);null!=d&&(null==a||a(d));const h=await r;let p=void 0;try{const s=await this.provider.rawApi.decodeTransaction({transaction:(0,t.serializeTransaction)(h),abi:this.abi,method:this.method});null!=s&&(p=null!=this.functionAbi.outputs?(0,t.parseTokensObject)(this.functionAbi.outputs,s.output):{})}catch(i){console.error(i)}return{parentTransaction:n.transaction,childTransaction:h,output:p}}finally{await e.unsubscribe()}}async estimateFees(t){const{fees:s}=await this.provider.rawApi.estimateFees({sender:t.from.toString(),recipient:this.address.toString(),amount:t.amount,payload:{abi:this.abi,method:this.method,params:this.params}});return s}async sendExternal(s){let e=!0===s.withoutSignature?this.provider.rawApi.sendUnsignedExternalMessage:this.provider.rawApi.sendExternalMessage,{transaction:i,output:n}=await e({publicKey:s.publicKey,recipient:this.address.toString(),stateInit:s.stateInit,payload:{abi:this.abi,method:this.method,params:this.params},local:s.local});return{transaction:(0,t.parseTransaction)(i),output:null!=n?(0,t.parseTokensObject)(this.functionAbi.outputs,n):void 0}}async call(s={}){let{output:i,code:n}=await this.provider.rawApi.runLocal({address:this.address.toString(),cachedState:s.cachedState,responsible:s.responsible,functionCall:{abi:this.abi,method:this.method,params:this.params}});if(null==i||0!=n)throw new e(n);return(0,t.parseTokensObject)(this.functionAbi.outputs,i)}}this._methods=new Proxy({},{get:(t,s)=>{const e=this._functions[s];return t=>new a(this._provider,e,this._abi,this._address,s,t)}})}get methods(){return this._methods}get address(){return this._address}get abi(){return this._abi}async decodeTransaction(s){try{const i=await this._provider.rawApi.decodeTransaction({transaction:(0,t.serializeTransaction)(s.transaction),abi:this._abi,method:s.methods});if(null==i)return;let{method:n,input:a,output:r}=i;const o=this._functions[n];return{method:n,input:null!=o.inputs?(0,t.parseTokensObject)(o.inputs,a):{},output:null!=o.outputs?(0,t.parseTokensObject)(o.outputs,r):{}}}catch(e){return}}async decodeTransactionEvents(s){try{const{events:i}=await this._provider.rawApi.decodeTransactionEvents({transaction:(0,t.serializeTransaction)(s.transaction),abi:this._abi}),n=[];for(const{event:s,data:e}of i){const i=this._events[s];n.push({event:s,data:null!=i.inputs?(0,t.parseTokensObject)(i.inputs,e):{}})}return n}catch(e){return[]}}async decodeInputMessage(s){try{const i=await this._provider.rawApi.decodeInput({abi:this._abi,body:s.body,internal:s.internal,method:s.methods});if(null==i)return;let{method:n,input:a}=i;const r=this._functions[n];return{method:n,input:null!=r.inputs?(0,t.parseTokensObject)(r.inputs,a):{}}}catch(e){return}}async decodeOutputMessage(s){try{const i=await this._provider.rawApi.decodeOutput({abi:this._abi,body:s.body,method:s.methods});if(null==i)return;let{method:n,output:a}=i;const r=this._functions[n];return{method:n,output:null!=r.outputs?(0,t.parseTokensObject)(r.outputs,a):{}}}catch(e){return}}}exports.Contract=s;class e extends Error{constructor(t){super(`TvmException: ${t}`),this.code=t}}exports.TvmException=e;
},{"./models":"S51G"}],"mEq5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});
},{}],"RebX":[function(require,module,exports) {
"use strict";var t=this&&this.__createBinding||(Object.create?function(t,e,s,r){void 0===r&&(r=s),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[s]}})}:function(t,e,s,r){void 0===r&&(r=s),t[r]=e[s]}),e=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),s=this&&this.__importStar||function(s){if(s&&s.__esModule)return s;var r={};if(null!=s)for(var i in s)"default"!==i&&Object.prototype.hasOwnProperty.call(s,i)&&t(r,s,i);return e(r,s),r},r=this&&this.__exportStar||function(e,s){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(s,r)||t(s,e,r)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ProviderNotInitializedException=exports.ProviderNotFoundException=exports.ProviderRpcClient=exports.hasEverscaleProvider=exports.mergeTransactions=exports.AddressLiteral=exports.Address=exports.Subscriber=void 0;const i=require("./models"),a=require("./utils"),n=s(require("./stream")),o=s(require("./contract"));r(require("./api"),exports),r(require("./models"),exports),r(require("./contract"),exports);var c=require("./stream");Object.defineProperty(exports,"Subscriber",{enumerable:!0,get:function(){return c.Subscriber}});var d=require("./utils");let u;async function p(){return await u,!0===window.__hasEverscaleProvider}Object.defineProperty(exports,"Address",{enumerable:!0,get:function(){return d.Address}}),Object.defineProperty(exports,"AddressLiteral",{enumerable:!0,get:function(){return d.AddressLiteral}}),Object.defineProperty(exports,"mergeTransactions",{enumerable:!0,get:function(){return d.mergeTransactions}}),u="complete"==document.readyState?Promise.resolve():new Promise(t=>{window.addEventListener("load",()=>{t()})}),exports.hasEverscaleProvider=p;class l{constructor(t={}){this._subscriptions={},this._contractSubscriptions={};const e=this;this.Contract=class extends o.Contract{constructor(t,s){super(e,t,s)}};this.Subscriber=class extends n.Subscriber{constructor(){super(e)}},this._properties=t,this._api=new Proxy({},{get:(t,e)=>t=>{if(null!=this._provider)return this._provider.request({method:e,params:t});throw new b}}),this._provider=window.__ever,null!=this._provider?this._mainInitializationPromise=Promise.resolve():this._mainInitializationPromise=p().then(t=>new Promise((e,s)=>{t?(this._provider=window.__ever,null!=this._provider?e():window.addEventListener("ever#initialized",t=>{this._provider=window.__ever,e()})):s(new h)})),this._mainInitializationPromise.then(()=>{null!=this._provider&&this._registerEventHandlers(this._provider)})}async hasProvider(){return p()}async ensureInitialized(){try{await this._mainInitializationPromise}catch(t){if(null==this._properties.fallback)throw t;null==this._additionalInitializationPromise&&(this._additionalInitializationPromise=this._properties.fallback().then(async t=>{this._provider=t,this._registerEventHandlers(this._provider)})),await this._additionalInitializationPromise}}get isInitialized(){return null!=this._provider}get raw(){if(null!=this._provider)return this._provider;throw new b}get rawApi(){return this._api}createContract(t,e){return new this.Contract(t,e)}createSubscriber(){return new this.Subscriber}async requestPermissions(t){const e=await this._api.requestPermissions({permissions:t.permissions});return(0,i.parsePermissions)(e)}async changeAccount(){await this._api.changeAccount()}async disconnect(){await this._api.disconnect()}async subscribe(t,e){class s{constructor(t,e){this._subscribe=t,this._unsubscribe=e,this._listeners={data:[],subscribed:[],unsubscribed:[]}}on(t,e){return this._listeners[t].push(e),this}async subscribe(){await this._subscribe(this);for(const t of this._listeners.subscribed)t()}async unsubscribe(){await this._unsubscribe();for(const t of this._listeners.unsubscribed)t()}notify(t){for(const e of this._listeners.data)e(t)}}let r=this._getEventSubscriptions(t);const i=(0,a.getUniqueId)();switch(t){case"connected":case"disconnected":case"networkChanged":case"permissionsChanged":case"loggedOut":{const t=new s(async t=>{null==r[i]&&(r[i]=(e=>{t.notify(e)}))},async()=>{delete r[i]});return await t.subscribe(),t}case"transactionsFound":case"contractStateChanged":{const a=e.address.toString(),n=new s(async e=>{if(null!=r[i])return;r[i]=(t=>{t.address.toString()==a&&e.notify(t)});let s=this._contractSubscriptions[a];null==s&&(s={},this._contractSubscriptions[a]=s),s[i]={state:"contractStateChanged"==t,transactions:"transactionsFound"==t};const{total:n,withoutExcluded:o}=_(Object.values(s),s[i]);try{n.transactions==o.transactions&&n.state==o.state||await this.rawApi.subscribe({address:a,subscriptions:n})}catch(c){throw delete r[i],delete s[i],c}},async()=>{delete r[i];const t=this._contractSubscriptions[a];if(null==t)return;const e=t[i],{total:s,withoutExcluded:n}=_(Object.values(t),e);delete t[i],n.transactions||n.state?s.transactions==n.transactions&&s.state==n.state||await this.rawApi.subscribe({address:a,subscriptions:n}):await this.rawApi.unsubscribe({address:a})});return await n.subscribe(),n}default:throw new Error(`Unknown event ${t}`)}}async getProviderState(){const t=await this._api.getProviderState();return{...t,permissions:(0,i.parsePermissions)(t.permissions)}}async getFullContractState(t){return await this._api.getFullContractState({address:t.address.toString()})}async getAccountsByCodeHash(t){const{accounts:e,continuation:s}=await this._api.getAccountsByCodeHash({...t});return{accounts:e.map(t=>new a.Address(t)),continuation:s}}async getTransactions(t){const{transactions:e,continuation:s,info:r}=await this._api.getTransactions({...t,address:t.address.toString()});return{transactions:e.map(i.parseTransaction),continuation:s,info:r}}async getTransaction(t){const{transaction:e}=await this._api.getTransaction({...t});return{transaction:e?(0,i.parseTransaction)(e):void 0}}async getExpectedAddress(t,e){const{address:s}=await this._api.getExpectedAddress({abi:JSON.stringify(t),...e,initParams:(0,i.serializeTokensObject)(e.initParams)});return new a.Address(s)}async getBocHash(t){return await this._api.getBocHash({boc:t}).then(({hash:t})=>t)}async packIntoCell(t){return await this._api.packIntoCell({structure:t.structure,data:(0,i.serializeTokensObject)(t.data)})}async unpackFromCell(t){const{data:e}=await this._api.unpackFromCell({...t,structure:t.structure});return{data:(0,i.parseTokensObject)(t.structure,e)}}async extractPublicKey(t){const{publicKey:e}=await this._api.extractPublicKey({boc:t});return e}async codeToTvc(t){const{tvc:e}=await this._api.codeToTvc({code:t});return e}async splitTvc(t){return await this._api.splitTvc({tvc:t})}async addAsset(t){let e;switch(t.type){case"tip3_token":e={rootContract:t.params.rootContract.toString()};break;default:throw new Error("Unknown asset type")}return await this._api.addAsset({account:t.account.toString(),type:t.type,params:e})}async verifySignature(t){return await this._api.verifySignature(t)}async signData(t){return await this._api.signData(t)}async signDataRaw(t){return await this._api.signDataRaw(t)}async encryptData(t){const{encryptedData:e}=await this._api.encryptData(t);return e}async decryptData(t){const{data:e}=await this._api.decryptData({encryptedData:t});return e}async sendMessage(t){const{transaction:e}=await this._api.sendMessage({...t,sender:t.sender.toString(),recipient:t.recipient.toString(),payload:t.payload?{abi:t.payload.abi,method:t.payload.method,params:(0,i.serializeTokensObject)(t.payload.params)}:void 0});return{transaction:(0,i.parseTransaction)(e)}}_registerEventHandlers(t){const e={connected:t=>t,disconnected:t=>t,transactionsFound:t=>({address:new a.Address(t.address),transactions:t.transactions.map(i.parseTransaction),info:t.info}),contractStateChanged:t=>({address:new a.Address(t.address),state:t.state}),networkChanged:t=>t,permissionsChanged:t=>({permissions:(0,i.parsePermissions)(t.permissions)}),loggedOut:t=>t};for(const[s,r]of Object.entries(e))t.addListener(s,t=>{const e=this._subscriptions[s];if(null==e)return;const i=r(t);for(const s of Object.values(e))s(i)})}_getEventSubscriptions(t){let e=this._subscriptions[t];return null==e&&(e={},this._subscriptions[t]=e),e}}exports.ProviderRpcClient=l;class h extends Error{constructor(){super("Everscale provider was not found")}}exports.ProviderNotFoundException=h;class b extends Error{constructor(){super("Everscale provider was not initialized yet")}}function _(t,e){const s={state:!1,transactions:!1},r=Object.assign({},s);for(const i of t){if(r.transactions&&r.state)break;s.state||(s.state=i.state),s.transactions||(s.transactions=i.transactions),i!=e&&(r.state||(r.state=i.state),r.transactions||(r.transactions=i.transactions))}return{total:s,withoutExcluded:r}}exports.ProviderNotInitializedException=b;
},{"./models":"S51G","./utils":"yrjL","./stream":"qeQ0","./contract":"Xnvh","./api":"mEq5"}],"tKmd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={"ABI version":2,version:"2.2",header:["time","expire"],functions:[{name:"constructor",inputs:[],outputs:[]},{name:"renderHelloWorld",inputs:[],outputs:[{name:"value0",type:"string"}]},{name:"touch",inputs:[],outputs:[]},{name:"sendValue",inputs:[{name:"dest",type:"address"},{name:"amount",type:"uint128"},{name:"bounce",type:"bool"}],outputs:[]},{name:"timestamp",inputs:[],outputs:[{name:"timestamp",type:"uint32"}]}],data:[],events:[],fields:[{name:"_pubkey",type:"uint256"},{name:"_timestamp",type:"uint64"},{name:"_constructorFlag",type:"bool"},{name:"timestamp",type:"uint32"}]};
},{}],"H6gL":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,c){function i(e){try{a(r.next(e))}catch(n){c(n)}}function s(e){try{a(r.throw(e))}catch(n){c(n)}}function a(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t(function(e){e(n)})).then(i,s)}a((r=r.apply(e,n||[])).next())})},n=this&&this.__generator||function(e,n){var t,r,o,c,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function s(c){return function(s){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=n.call(e,i)}catch(s){c=[6,s],r=0}finally{t=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("everscale-inpage-provider"),o=new r.ProviderRpcClient,c=t(require("../build/App.abi"));function i(e,n){document.querySelectorAll("[data-behavior=".concat(e,"]")).forEach(n)}function s(){return o.requestPermissions({permissions:["basic","accountInteraction"]})}function a(){return e(this,void 0,void 0,function(){return n(this,function(e){switch(e.label){case 0:return[4,o.requestPermissions({permissions:["basic","accountInteraction"]})];case 1:return e.sent(),[2]}})})}function u(e){var n="mainnet"===e?"success":"secondary";i("network",function(t){return t.innerHTML='<span class="badge bg-'.concat(n,'">').concat(e,"</span>")})}function l(){return e(this,void 0,void 0,function(){var e,t,a,l,f;return n(this,function(n){switch(n.label){case 0:return[4,o.hasProvider()];case 1:return n.sent()?(i("extension",function(e){return e.style.display="none"}),i("main",function(e){return e.style.display="block"}),i("connect",function(e){return e.onclick=s})):i("extension",function(e){return e.style.display="block"}),[4,o.ensureInitialized()];case 2:return n.sent(),[4,o.getProviderState()];case 3:return e=n.sent(),console.log(e),u(e.selectedConnection),[4,o.subscribe("networkChanged")];case 4:n.sent().on("data",function(e){u(e.selectedConnection)}),t=new r.Address("0:bbcbf7eb4b6f1203ba2d4ff5375de30a5408a8130bf79f870efbcfd49ec164e9"),a=new o.Contract(c.default,t),n.label=5;case 5:return n.trys.push([5,7,,8]),[4,a.methods.timestamp({})];case 6:return l=n.sent(),console.log(l),[3,8];case 7:return(f=n.sent())instanceof r.TvmException&&console.error(f.code),[3,8];case 8:return[2]}})})}l().catch(console.error);
},{"everscale-inpage-provider":"RebX","../build/App.abi":"tKmd"}]},{},["H6gL"], null)