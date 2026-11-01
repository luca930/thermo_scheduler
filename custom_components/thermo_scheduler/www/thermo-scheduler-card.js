var D=globalThis,N=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,C=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(N&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(t,e))}return e}toString(){return this.cssText}},ot=a=>new C(typeof a=="string"?a:a+"",void 0,W),q=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[o+1],a[0]);return new C(t,a,W)},at=(a,e)=>{if(N)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=D.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,a.appendChild(i)}},K=N?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ot(t)})(a):a;var{is:Ot,defineProperty:Dt,getOwnPropertyDescriptor:Nt,getOwnPropertyNames:zt,getOwnPropertySymbols:Ht,getPrototypeOf:Ut}=Object,z=globalThis,rt=z.trustedTypes,Bt=rt?rt.emptyScript:"",It=z.reactiveElementPolyfillSupport,P=(a,e)=>a,G={toAttribute(a,e){switch(e){case Boolean:a=a?Bt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ct=(a,e)=>!Ot(a,e),lt={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Dt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:o}=Nt(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let r=s?.call(this);o?.call(this,n),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Ut(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,i=[...zt(t),...Ht(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(K(s))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:G).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:G;this._$Em=s;let r=n.fromAttribute(t,o.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(e!==void 0){let n=this.constructor;if(s===!1&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??ct)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:n}=o,r=this[s];n!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,o,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,It?.({ReactiveElement:f}),(z.reactiveElementVersions??=[]).push("2.1.2");var Y=globalThis,ht=a=>a,H=Y.trustedTypes,dt=H?H.createPolicy("lit-html",{createHTML:a=>a}):void 0,J="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+b,Lt=`<${Q}>`,k=document,R=()=>k.createComment(""),M=a=>a===null||typeof a!="object"&&typeof a!="function",Z=Array.isArray,ft=a=>Z(a)||typeof a?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,y=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,_t=/"/g,bt=/^(?:script|style|textarea|title)$/i,tt=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),h=tt(1),Jt=tt(2),Qt=tt(3),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),gt=new WeakMap,x=k.createTreeWalker(k,129);function vt(a,e){if(!Z(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(e):e}var $t=(a,e)=>{let t=a.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",n=T;for(let r=0;r<t;r++){let l=a[r],p,u,d=-1,_=0;for(;_<l.length&&(n.lastIndex=_,u=n.exec(l),u!==null);)_=n.lastIndex,n===T?u[1]==="!--"?n=pt:u[1]!==void 0?n=ut:u[2]!==void 0?(bt.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=y):u[3]!==void 0&&(n=y):n===y?u[0]===">"?(n=s??T,d=-1):u[1]===void 0?d=-2:(d=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?y:u[3]==='"'?_t:mt):n===_t||n===mt?n=y:n===pt||n===ut?n=T:(n=y,s=void 0);let g=n===y&&a[r+1].startsWith("/>")?" ":"";o+=n===T?l+Lt:d>=0?(i.push(p),l.slice(0,d)+J+l.slice(d)+b+g):l+b+(d===-2?r:g)}return[vt(a,o+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},O=class a{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0,r=e.length-1,l=this.parts,[p,u]=$t(e,t);if(this.el=a.createElement(p,i),x.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=x.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(J)){let _=u[n++],g=s.getAttribute(d).split(b),v=/([.?@])?(.*)/.exec(_);l.push({type:1,index:o,name:v[2],strings:g,ctor:v[1]==="."?B:v[1]==="?"?I:v[1]==="@"?L:S}),s.removeAttribute(d)}else d.startsWith(b)&&(l.push({type:6,index:o}),s.removeAttribute(d));if(bt.test(s.tagName)){let d=s.textContent.split(b),_=d.length-1;if(_>0){s.textContent=H?H.emptyScript:"";for(let g=0;g<_;g++)s.append(d[g],R()),x.nextNode(),l.push({type:2,index:++o});s.append(d[_],R())}}}else if(s.nodeType===8)if(s.data===Q)l.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(b,d+1))!==-1;)l.push({type:7,index:o}),d+=b.length-1}o++}}static createElement(e,t){let i=k.createElement("template");return i.innerHTML=e,i}};function A(a,e,t=a,i){if(e===w)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,o=M(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(a),s._$AT(a,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=A(a,s._$AS(a,e.values),s,i)),e}var U=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??k).importNode(t,!0);x.currentNode=s;let o=x.nextNode(),n=0,r=0,l=i[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new E(o,o.nextSibling,this,e):l.type===1?p=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(p=new j(o,this,e)),this._$AV.push(p),l=i[++r]}n!==l?.index&&(o=x.nextNode(),n++)}return x.currentNode=k,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},E=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),M(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ft(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(vt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new U(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=gt.get(e.strings);return t===void 0&&gt.set(e.strings,t=new O(e)),t}k(e){Z(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let o of e)s===t.length?t.push(i=new a(this.O(R()),this.O(R()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ht(e).nextSibling;ht(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){let o=this.strings,n=!1;if(o===void 0)e=A(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let r=e,l,p;for(e=o[0],l=0;l<o.length-1;l++)p=A(this,r[i+l],t,l),p===w&&(p=this._$AH[l]),n||=!M(p)||p!==this._$AH[l],p===c?e=c:e!==c&&(e+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},B=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},I=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},L=class extends S{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??c)===w)return;let i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},j=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}},yt={M:J,P:b,A:Q,C:1,L:$t,R:U,D:ft,V:A,I:E,H:S,N:I,U:L,B,F:j},jt=Y.litHtmlPolyfillSupport;jt?.(O,E),(Y.litHtmlVersions??=[]).push("3.3.3");var xt=(a,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=t?.renderBefore??null;i._$litPart$=s=new E(e.insertBefore(R(),o),o,void 0,t??{})}return s._$AI(a),s};var et=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};$._$litElement$=!0,$.finalized=!0,et.litElementHydrateSupport?.({LitElement:$});var Ft=et.litElementPolyfillSupport;Ft?.({LitElement:$});(et.litElementVersions??=[]).push("4.2.2");var kt=a=>(...e)=>({_$litDirective$:a,values:e}),F=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:ue}=yt;var Vt={},wt=(a,e=Vt)=>a._$AH=e;var At=kt(class extends F{constructor(){super(...arguments),this.key=c}render(a,e){return this.key=a,e}update(a,[e,t]){return e!==this.key&&(wt(a),this.key=e),t}});var St=a=>({list:()=>a({type:"thermo_scheduler/list"}),saveProfile:e=>a({type:"thermo_scheduler/save_profile",profile:e}),deleteProfile:e=>a({type:"thermo_scheduler/delete_profile",profile_id:e}),saveCondition:e=>a({type:"thermo_scheduler/save_condition",condition:e}),deleteCondition:e=>a({type:"thermo_scheduler/delete_condition",condition_id:e}),assign:(e,t,i={})=>a({type:"thermo_scheduler/assign",climate_id:e,profile_id:t,...i}),unassign:e=>a({type:"thermo_scheduler/unassign",climate_id:e}),clearOverride:e=>a({type:"thermo_scheduler/clear_override",climate_id:e}),setRoom:(e,t)=>a({type:"thermo_scheduler/set_room",climate_id:e,room:t}),setOutdoor:e=>a({type:"thermo_scheduler/set_outdoor",entity_id:e}),estimate:(e,t)=>a({type:"thermo_scheduler/estimate",climate_id:e,target:t})});var Wt={en:{climates:"Thermostats",profiles:"Schedules",conditions:"Conditions",until:"Until {t}",scheduled:"Scheduled",override:"Manual",blocked:"Blocked",disabled:"Disabled",clearOverride:"Back to schedule",enable:"Enable",disable:"Disable",unassign:"Remove",assign:"Assign",addClimate:"Add thermostat",save:"Save",cancel:"Cancel",edit:"Edit",delete:"Delete",newProfile:"New schedule",newCondition:"New condition",name:"Name",start:"Start",temperature:"Temperature",mode:"Mode",addBlock:"Add block",removeBlock:"Remove block",entity:"Entity",value:"Value",match:"Match",all:"All",any:"Any",addCheck:"Add check",delay:"Delay (s)",action:"Action",actionOff:"Turn off",actionMin:"Minimum setpoint {x}",delaySec:"delay {x}s",useSchedule:"Use schedule of\u2026",ownSchedule:"Own schedule",sharedWith:"Shared with: {x}",days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun",configure:"Configure",active:"Active",schedule:"Schedule",noBlocks:"No schedule blocks",emptySchedule:"No schedule for this thermostat",heating:"Heating",cooling:"Cooling",off:"Off",target:"Target",lower:"Lower by 0.5 \xB0",raise:"Raise by 0.5 \xB0",actionFailed:"Action failed",retry:"Retry",next:"Next",tomorrow:"Tomorrow",timeSlots:"Time slots",back:"Back",noBlocksDay:"No slots this day",slot:"Slot",done:"Done",forThis:"For this thermostat",settings:"Settings",house:"Home",emitter:"Heating system",boiler:"Boiler",energyClass:"Energy class",area:"Area (m\xB2)",height:"Height (m)",saveHouse:"Save home",emitterRadiators:"Radiators",emitterFloor:"Floor",boilerGas:"Gas",boilerHeatPump:"Heat pump",startAt:"Start",estMinutes:"~{x} min",noInside:"Indoor temperature unavailable",noOutdoor:"Set the outdoor sensor in the card",unreachable:"Target not reachable in time",calibrated:"calibrated on {x} cycles",genericEstimate:"generic estimate: set up the home",changeMode:"Change mode",auto:"Auto",dry:"Dry",fan:"Fan"},it:{climates:"Termostati",profiles:"Programmazioni",conditions:"Condizioni",until:"Fino alle {t}",scheduled:"Programmato",override:"Manuale",blocked:"Bloccato",disabled:"Disattivato",clearOverride:"Torna alla programmazione",enable:"Attiva",disable:"Disattiva",unassign:"Rimuovi",assign:"Assegna",addClimate:"Aggiungi termostato",save:"Salva",cancel:"Annulla",edit:"Modifica",delete:"Elimina",newProfile:"Nuova programmazione",newCondition:"Nuova condizione",name:"Nome",start:"Inizio",temperature:"Temperatura",mode:"Modalit\xE0",addBlock:"Aggiungi fascia",removeBlock:"Rimuovi fascia",entity:"Entit\xE0",value:"Valore",match:"Combinazione",all:"Tutte",any:"Almeno una",addCheck:"Aggiungi test",delay:"Ritardo (s)",action:"Azione",actionOff:"Spegni",actionMin:"Setpoint minimo {x}",delaySec:"ritardo {x}s",useSchedule:"Usa la programmazione di\u2026",ownSchedule:"Programmazione propria",sharedWith:"Condivisa con: {x}",days:"Lun,Mar,Mer,Gio,Ven,Sab,Dom",configure:"Configura",active:"Attiva",schedule:"Programmazione",noBlocks:"Nessuna fascia",emptySchedule:"Nessuna programmazione per questo termostato",heating:"Riscaldamento",cooling:"Raffrescamento",off:"Spento",target:"Obiettivo",lower:"Abbassa di 0,5 \xB0",raise:"Alza di 0,5 \xB0",actionFailed:"Operazione non riuscita",retry:"Riprova",next:"Prossima",tomorrow:"Domani",timeSlots:"Fasce orarie",back:"Indietro",noBlocksDay:"Nessuna fascia in questo giorno",slot:"Fascia",done:"Fine",forThis:"Per questo termostato",settings:"Impostazioni",house:"Casa",emitter:"Impianto",boiler:"Caldaia",energyClass:"Classe energetica",area:"Superficie (m\xB2)",height:"Altezza (m)",saveHouse:"Salva casa",emitterRadiators:"Termosifoni",emitterFloor:"Pavimento",boilerGas:"Metano",boilerHeatPump:"Pompa di calore",startAt:"Avvio",estMinutes:"~{x} min",noInside:"Temperatura interna non disponibile",noOutdoor:"Imposta il sensore esterno nella card",unreachable:"Target non raggiungibile in tempo",calibrated:"calibrata su {x} cicli",genericEstimate:"stima generica: configura la casa",changeMode:"Cambia modalit\xE0",auto:"Automatico",dry:"Deumidifica",fan:"Ventilatore"}};function Et(a,e,t={}){return(Wt[a?.startsWith("it")?"it":"en"][e]??e).replace(/\{(\w+)\}/g,(s,o)=>String(t[o]??""))}var m=a=>a.target.value,Ct=a=>a.target.checked,Pt=a=>`${a}_${Date.now().toString(36)}`,Tt=[0,1,2,3,4,5,6],it=5,Mt=30,V=.5,qt=a=>Math.min(Mt,Math.max(it,Math.round(a/V)*V)),Rt=()=>(new Date().getDay()+6)%7,st=class extends ${constructor(){super(...arguments);this._config={};this._data=null;this._profile=null;this._condition=null;this._selected="";this._view="summary";this._scheduleDay=Rt();this._editIndex=null;this._modeOpen=!1;this._est=null;this._room=null;this._estKey="";this._outdoorSent=null;this._error="";this._retry=null;this._loaded=!1}static{this.properties={hass:{attribute:!1},_data:{state:!0},_profile:{state:!0},_condition:{state:!0},_selected:{state:!0},_view:{state:!0},_scheduleDay:{state:!0},_editIndex:{state:!0},_modeOpen:{state:!0},_est:{state:!0},_room:{state:!0},_error:{state:!0}}}static{this.styles=q`
    :host {
      --ts-accent: var(--primary-color, #0062cc);
      --ts-heat: light-dark(#b35400, #ff9f0a);
      --ts-cool: light-dark(#0b6e99, #64d2ff);
      --ts-danger: light-dark(#c4252b, #ff6961);
      --ts-ink: var(--primary-text-color, #000);
      --ts-ink2: var(--secondary-text-color, #6e6e73);
      --ts-sep: var(--divider-color, rgba(128, 128, 128, 0.25));
      --ts-group: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--ts-ink) 6%);
      --ts-tile: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--ts-ink) 10%);
      --ts-ease: cubic-bezier(0.32, 0.72, 0, 1);
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      color: var(--ts-ink);
    }
    * { box-sizing: border-box; }
    .wrap { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    h3 {
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--ts-ink2);
      margin: 16px 4px 0;
    }
    .group { background: var(--ts-group); border-radius: 24px; overflow: hidden; }
    .group > * { position: relative; }
    .group > * + *::before {
      content: "";
      position: absolute;
      top: 0;
      left: 16px;
      right: 0;
      height: 0.5px;
      background: var(--ts-sep);
    }
    .row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      min-height: 44px;
      padding: 8px 16px;
      font-size: 17px;
      line-height: 22px;
      width: 100%;
    }
    .row > span:first-child { flex: 1; min-width: 0; }
    .footnote { margin: 0; padding: 8px 16px; font-size: 13px; line-height: 18px; color: var(--ts-ink2); }
    .caption { font-size: 13px; line-height: 18px; color: var(--ts-ink2); }

    button, select, input {
      font: inherit;
      color: inherit;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--ts-group);
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 44px;
      padding: 0 16px;
      color: var(--ts-accent);
      font-weight: 500;
      cursor: pointer;
      transition: background-color 250ms var(--ts-ease), transform 120ms var(--ts-ease), opacity 200ms var(--ts-ease);
      -webkit-tap-highlight-color: transparent;
    }
    button:active { transform: scale(0.97); }
    @media (hover: hover) { button:hover { opacity: 0.9; } }
    button.primary { background: var(--ts-accent); color: #fff; font-weight: 600; }
    button.danger { color: var(--ts-danger); }
    button.wide { width: 100%; }
    button.pill { min-height: 32px; padding: 0 12px; border-radius: 16px; font-size: 15px; }
    button.plain { background: transparent; padding: 0; min-width: 0; }
    select, input[type="text"], input:not([type]), input[type="time"], input[type="number"] {
      padding: 0 12px;
      min-width: 0;
    }
    input[type="checkbox"][role="switch"] {
      appearance: none;
      -webkit-appearance: none;
      width: 51px;
      height: 31px;
      min-height: 31px;
      margin: 0;
      padding: 0;
      border-radius: 16px;
      background: light-dark(#e9e9eb, #39393d);
      position: relative;
      cursor: pointer;
      transition: background-color 200ms ease;
      flex-shrink: 0;
    }
    input[type="checkbox"][role="switch"]::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 200ms ease;
    }
    input[type="checkbox"][role="switch"]:checked { background: var(--ts-accent); }
    input[type="checkbox"][role="switch"]:checked::after { transform: translateX(20px); }

    :focus-visible { outline: 2px solid var(--ts-accent); outline-offset: 2px; }
    ha-icon { --mdc-icon-size: 20px; color: var(--tone, var(--ts-ink2)); flex-shrink: 0; }
    .tone-heat { --tone: var(--ts-heat); }
    .tone-cool { --tone: var(--ts-cool); }
    .tone-accent { --tone: var(--ts-accent); }
    .tone-danger { --tone: var(--ts-danger); }
    .tone-off { --tone: var(--ts-ink2); }

    .banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 16px;
      background: color-mix(in srgb, var(--ts-danger) 12%, transparent);
      color: var(--ts-danger);
      font-size: 15px;
      line-height: 20px;
    }
    .banner span { flex: 1; }
    .banner ha-icon { color: var(--ts-danger); }

    /* riepilogo: hero con quadrante ad arco, pillola di stato e tile */
    .hero {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
      width: 100%;
      padding: 16px 16px 20px;
      border-radius: 28px;
      background: var(--ts-tile);
      color: var(--ts-ink);
      text-align: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
      transition: background-color 250ms var(--ts-ease);
    }
    .hero-top {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 32px;
      padding: 0;
      background: transparent;
      color: var(--ts-ink);
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.01em;
      text-align: left;
    }
    .hero-top .hero-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .hero-top ha-icon { color: var(--ts-ink2); }

    .dial {
      position: relative;
      display: block;
      width: min(220px, 70vw);
      aspect-ratio: 1;
      margin: 4px auto;
      --p: 0;
    }
    .ring, .knob-wrap {
      position: absolute;
      inset: 0;
    }
    .ring {
      border-radius: 50%;
      background: conic-gradient(var(--tone) calc(var(--p) * 270deg), var(--ts-sep) 0);
      transform: rotate(135deg);
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px));
      transition: background 250ms ease;
    }
    .knob-wrap { transform: rotate(calc(135deg + var(--p) * 270deg)); transition: transform 250ms ease; }
    .knob {
      position: absolute;
      top: 0;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 4px var(--tone), 0 1px 3px rgba(0, 0, 0, 0.25);
    }
    .dial-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .num { display: inline-flex; align-items: flex-start; font-size: 64px; line-height: 64px; font-weight: 300; letter-spacing: -0.03em; }
    .num sup { font-size: 26px; vertical-align: top; position: relative; top: -4px; margin-left: 1px; }
    .deg { font-size: 26px; line-height: 1; margin: 6px 0 0 4px; font-weight: 300; }
    .dial-mode { margin-top: 2px; font-size: 15px; color: var(--tone); font-weight: 600; }

    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      align-self: center;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 18px;
      font-size: 15px;
      font-weight: 600;
    }
    .status-pill { background: color-mix(in srgb, var(--tone) 14%, transparent); color: var(--tone); }
    .status-pill ha-icon { color: var(--tone); }

    .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; text-align: left; }
    .tile {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      min-height: 84px;
      padding: 12px 14px;
      text-align: left;
      flex-direction: column;
      gap: 2px;
      min-height: 84px;
      padding: 12px 14px;
      border-radius: 20px;
      background: var(--ts-group);
    }
    .tile ha-icon { margin-bottom: 4px; }
    .mode-tile { background: color-mix(in srgb, var(--tone) 16%, var(--ts-group)); }
    .mode-picker { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .mode-picker button {
      min-height: 40px;
      padding: 0 16px;
      border-radius: 20px;
      background: var(--ts-group);
      color: var(--ts-ink);
      font-weight: 500;
    }
    .mode-picker button[aria-pressed="true"] { background: var(--ts-accent); color: #fff; font-weight: 600; }
    .mode-tile ha-icon, .mode-tile .t-value { color: var(--tone); }
    .t-label { font-size: 13px; color: var(--ts-ink2); }
    .t-value { font-size: 17px; font-weight: 600; }
    .t-sub { font-size: 15px; color: var(--ts-ink2); }

    /* barra superiore con indietro */
    .topbar { display: flex; align-items: center; gap: 8px; min-height: 44px; }
    .topbar h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .topbar .spacer { min-width: 44px; }
    .back { display: inline-flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; background: transparent; }

    /* impostazioni */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 0 4px; }
    .nav { width: 100%; justify-content: space-between; text-align: left; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; padding: 8px 16px; }
    .nav .value { color: var(--ts-ink2); font-size: 15px; }
    .stack { display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; }
    .stack select { width: 100%; padding: 0; background: transparent; font-size: 17px; text-align: left; }

    /* programmazione: tab dei giorni, fasce come card, chip colorato */
    .tabs { display: grid; grid-template-columns: repeat(7, 1fr); }
    .tab {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      border-radius: 0;
      background: transparent;
      color: var(--ts-ink2);
      font-size: 14px;
      font-weight: 500;
      box-shadow: inset 0 -2px 0 var(--ts-sep);
    }
    .tab[aria-pressed="true"] { color: var(--ts-accent); font-weight: 600; box-shadow: inset 0 -3px 0 var(--ts-accent); }
    .slots { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
    .slot {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 64px;
      padding: 10px 16px;
      border-radius: 20px;
      background: var(--ts-tile);
      color: var(--ts-ink);
      font-weight: 400;
      text-align: left;
    }
    .slot .chip {
      min-width: 64px;
      padding: 6px 12px;
      border-radius: 14px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      background: color-mix(in srgb, var(--tone) 16%, transparent);
      color: var(--tone);
    }
    .slot .mode { flex: 1; min-width: 0; color: var(--ts-ink2); font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .slot time { font-size: 20px; font-weight: 500; }
    .slot ha-icon { color: var(--ts-ink2); }
    .add-pill {
      width: 100%;
      min-height: 52px;
      border-radius: 26px;
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--ts-sep);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .actions button.ghost { background: transparent; box-shadow: inset 0 0 0 1px var(--ts-sep); color: var(--ts-ink); }
    .actions button.primary { min-height: 52px; border-radius: 26px; }

    /* editor fascia: quadrante di temperatura e ora grande */
    .hero-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px 16px;
      border-radius: 28px;
      background: color-mix(in srgb, var(--tone) 12%, var(--ts-tile));
      --tone: var(--ts-heat);
    }
    .hero-slot.tone-cool { --tone: var(--ts-cool); }
    .stepper { display: flex; align-items: center; gap: 16px; }
    .stepper .big { min-width: 120px; text-align: center; font-size: 44px; font-weight: 300; }
    .round {
      width: 56px;
      height: 56px;
      min-width: 56px;
      padding: 0;
      border-radius: 50%;
      background: var(--ts-tile);
      font-size: 26px;
      line-height: 1;
      color: var(--ts-ink);
    }
    .time-field { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .big-time {
      min-height: 52px;
      font-size: 34px;
      font-weight: 300;
      background: transparent;
      text-align: center;
      padding: 0 8px;
    }
    .tile-group { overflow: visible; background: var(--ts-tile); }

    .seg button {
      min-width: 0;
      min-height: 40px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 14px;
      background: transparent;
      color: var(--ts-ink);
    }
    .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .seg { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; padding: 12px; background: transparent; }
    .editor { display: flex; flex-direction: column; gap: 12px; }
    .editor input[type="text"], .editor input:not([type]) { flex: 1; width: 100%; }
    .switch-row { display: flex; align-items: center; gap: 8px; }

    /* condizioni */
    .cond-list .row > b { font-weight: 600; }
    .cond-list .meta { color: var(--ts-ink2); font-size: 15px; }
    .cond-editor { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    .cond-editor .row { padding: 0; min-height: 0; }

    .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; color: var(--ts-ink2); }
    .empty ha-icon { --mdc-icon-size: 36px; }

    @keyframes ts-enter {
      from { opacity: 0; transform: translateX(16px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .view-in { animation: ts-enter 250ms var(--ts-ease) both; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
    @media (max-width: 360px) {
      .wrap { padding: 12px; }
      .sum-temp { font-size: 48px; line-height: 52px; }
    }
  `}setConfig(t){if(!t?.entity?.startsWith("climate."))throw new Error("thermo-scheduler-card: imposta 'entity' con un termostato climate.*");this._config=t,this._selected=t.entity,this._syncProfile()}getCardSize(){return 3}updated(){!this._data||!this.hass||(this._syncOutdoor(),this._maybeEstimate())}_syncOutdoor(){let t=this._config.outdoor_entity??null;t===(this._data.outdoor_entity??null)||t===this._outdoorSent||(this._outdoorSent=t,this._try(()=>this._api.setOutdoor(t)))}_maybeEstimate(){let t=this._selected,i=this._data.assignments[t],s=i?this._nextBlock(this._data.profiles[i.profile_id]):null;if(!s){this._est=null,this._estKey="";return}let o=Math.floor(Date.now()/6e5),n=`${t}|${s.block.temperature}|${s.at.getTime()}|${o}`;n!==this._estKey&&(this._estKey=n,this._api.estimate(t,s.block.temperature).then(r=>{this._estKey===n&&(this._est=r)}).catch(()=>{this._estKey===n&&(this._est=null)}))}willUpdate(t){t.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._reload())}get _api(){return St(t=>this.hass.callWS(t))}_t(t,i){return Et(this.hass?.language,t,i)}async _reload(){this._data=await this._api.list(),this._selected||(this._selected=Object.keys(this._data.assignments)[0]??""),this._syncProfile()}_name(t){let i=this.hass.states[t]?.attributes?.friendly_name;return i||(t.split(".")[1]??t).replace(/_/g," ").replace(/^./,o=>o.toUpperCase())}_users(t){return Object.entries(this._data.assignments).filter(([,i])=>i.profile_id===t).map(([i])=>i)}_syncProfile(){let t=this._data?.assignments[this._selected];t?this._profile?.id!==t.profile_id&&(this._profile=structuredClone(this._data.profiles[t.profile_id])):this._profile=null}_select(t){this._selected=t,this._room=null,this._profile=null,this._syncProfile()}async _makeOwn(t){let i=this._data.assignments[t],s=i?structuredClone(this._data.profiles[i.profile_id].blocks):[],o={id:Pt("p"),name:this._name(t),blocks:s};await this._api.saveProfile(o),await this._api.assign(t,o.id)}async _do(t){await t(),await this._reload()}async _try(t){this._retry=t,this._error="";try{await this._do(t)}catch(i){let s=i?.message;this._error=s||this._t("actionFailed")}}async _setMode(t,i){this._modeOpen=!1;try{await this.hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:i})}catch(s){this._error=s?.message||this._t("actionFailed")}}_modeName(t){let i={heat:"heating",cool:"cooling",off:"off",auto:"auto",heat_cool:"auto",dry:"dry",fan_only:"fan"};return this._t(i[t]??t)}_go(t){this._view=t,t!=="schedule"&&(this._editIndex=null)}_openSchedule(){this._syncProfile(),this._scheduleDay=Rt(),this._editIndex=null,this._view="schedule"}_back(){if(this._view==="schedule"&&this._editIndex!==null){this._editIndex=null;return}if(this._view==="schedule"){this._profile=null,this._syncProfile(),this._go("settings");return}this._go(this._view==="settings"?"summary":"settings")}async _saveProfile(){let t=this._profile;await this._try(()=>this._api.saveProfile(t)),this._error||this._go("settings")}_status(t){let i=this.hass.states[`sensor.${t.split(".")[1]}_scheduler`];return i?i.state==="override"?this._t("until",{t:String(i.attributes.override_until??"").slice(11,16)}):this._t(i.state):""}_sensorState(t){return this.hass.states[`sensor.${t.split(".")[1]}_scheduler`]?.state??""}_hvac(t){return this.hass.states[t]?.state??"off"}_targetTemp(t){let i=this.hass.states[t]?.attributes?.temperature;return i==null?null:Number(i)}_fmt(t){return new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number(t))}_dayNames(){return this._t("days").split(",")}_dayList(t){let i=this._dayNames(),s=[...t].sort((n,r)=>n-r),o=[];for(let n of s){let r=o[o.length-1];r&&n===r[r.length-1]+1?r.push(n):o.push([n])}return o.map(n=>n.length>2?`${i[n[0]]}\u2013${i[n[n.length-1]]}`:n.map(r=>i[r]).join(", ")).join(", ")}_blockTone(t){return t.hvac_mode==="cool"?"cool":"heat"}_statusInfo(t){let i=this._sensorState(t),s=this._hvac(t),o=i==="blocked"?"danger":i==="override"?"accent":i==="disabled"?"off":s==="cool"?"cool":"heat",n={override:"mdi:hand-back-left",blocked:"mdi:lock",disabled:"mdi:pause-circle-outline",scheduled:"mdi:calendar-clock"},r=i==="override"?`${this._t("override")} \xB7 ${this._status(t)}`:this._status(t);return{key:i,tone:o,icon:n[i]??"mdi:thermostat",text:r}}_nextBlock(t){if(!t||!t.blocks.length)return null;let i=new Date;for(let s=0;s<8;s++){let o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+s),n=(o.getDay()+6)%7,r=null;for(let l of t.blocks){if(!l.days.includes(n))continue;let[p,u]=l.start.split(":").map(Number),d=new Date(o.getFullYear(),o.getMonth(),o.getDate(),p,u);d>i&&(!r||d<r.at)&&(r={at:d,block:l})}if(r)return{...r,k:s,wd:n}}return null}render(){return this._data?h`<div class="wrap">
      ${this._error?h`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${()=>this._retry&&this._try(this._retry)}>${this._t("retry")}</button>
      </div>`:c}
      ${At(this._view,h`<div class="view-in">${this._renderView()}</div>`)}
    </div>`:c}_renderView(){switch(this._view){case"settings":return this._renderSettings();case"schedule":return this._renderSchedule();case"conditions":return this._renderConditions();default:return this._renderSummary()}}_tempParts(t){let i=new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).formatToParts(t),s=i.filter(n=>n.type==="integer"||n.type==="group"||n.type==="minusSign").map(n=>n.value).join(""),o=i.filter(n=>n.type==="decimal"||n.type==="fraction").map(n=>n.value).join("");return{int:s,dec:o}}_modeLabel(t){let i=this._hvac(t);return i==="cool"?this._t("cooling"):i==="heat"?this._t("heating"):this._t("off")}_renderSummary(){let t=this._selected,i=this._data.assignments[t],s=this._statusInfo(t),o=this._targetTemp(t),n=o==null?null:this._tempParts(o),r=o==null?0:Math.min(1,Math.max(0,(o-it)/(Mt-it))),l=i?this._nextBlock(this._data.profiles[i.profile_id]):null,p=this._dayNames(),u=l?l.k===0?"":l.k===1?`${this._t("tomorrow")} `:`${p[l.wd]} `:"",d=this._hvac(t),_=d==="cool"?"cool":d==="heat"?"heat":"off",g=this.hass.states[t]?.attributes?.hvac_modes??[];return h`<section class="hero tone-${_}" data-climate=${t}>
      <button class="hero-top" aria-label=${`${this._t("settings")}: ${this._name(t)}`} @click=${()=>this._go("settings")}>
        <span class="hero-name">${this._name(t)}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
      </button>
      <span class="dial" style="--p: ${r}" role="img" aria-label=${`${this._t("target")} ${o==null?"\u2013":this._fmt(o)} \xB0`}>
        <span class="ring"></span>
        <span class="knob-wrap"><span class="knob"></span></span>
        <span class="dial-center">
          <span class="num">${n?n.int:"\u2013"}${n&&n.dec?h`<sup>${n.dec}</sup>`:c}<span class="deg">°</span></span>
          <span class="dial-mode">${this._modeLabel(t)}</span>
        </span>
      </span>
      <span class="pill status-pill tone-${s.tone}"><ha-icon icon=${s.icon}></ha-icon>${s.text}</span>
      <span class="tiles">
        <button class="tile mode-tile" aria-expanded=${this._modeOpen} aria-controls="mode-picker"
          @click=${()=>this._modeOpen=!this._modeOpen}>
          <ha-icon icon=${d==="cool"?"mdi:snowflake":"mdi:fire"}></ha-icon>
          <span class="t-label">${this._t("mode")}</span>
          <span class="t-value">${this._modeLabel(t)}</span>
        </button>
        ${l?h`<span class="tile">
          <span class="t-label">${this._t("next")}</span>
          <span class="t-value">${u}${l.block.start}</span>
          <span class="t-sub">${this._fmt(l.block.temperature)}°</span>
          ${this._estimateLine(l)}
        </span>`:c}
      </span>
      ${this._modeOpen&&g.length?h`<div id="mode-picker" class="mode-picker" role="group" aria-label=${this._t("changeMode")}>
        ${g.map(v=>h`<button type="button" aria-pressed=${v===d} @click=${()=>this._setMode(t,v)}>${this._modeName(v)}</button>`)}
      </div>`:c}
      ${i?c:h`<span class="footnote">${this._t("emptySchedule")}</span>`}
    </section>`}_estimateLine(t){let i=this._est;if(!i)return c;if(i.minutes==null){let r={inside:"noInside",outdoor:"noOutdoor",unreachable:"unreachable"};return h`<span class="t-sub est-warn">${this._t(r[i.reason??"unreachable"])}</span>`}let o=new Date(t.at.getTime()-i.minutes*6e4).toLocaleTimeString(this.hass?.language??"en",{hour:"2-digit",minute:"2-digit"}),n=i.configured?i.samples?this._t("calibrated",{x:i.samples}):"":this._t("genericEstimate");return h`<span class="t-sub est" title=${n}>${this._t("startAt")} ${o}</span>
      <span class="t-sub">${this._t("estMinutes",{x:i.minutes})}</span>`}_roomView(t){return this._room??this._data.rooms?.[t]??{emitter:"radiators",boiler:"gas",energy_class:"D",area_m2:20,height_m:2.7}}_patchRoom(t,i){this._room={...this._roomView(t),...i}}_renderHouse(t){let i=this._roomView(t);return h`<h3>${this._t("house")}</h3>
      <div class="group tile-group">
        <label class="row"><span>${this._t("emitter")}</span>
          <select @change=${s=>this._patchRoom(t,{emitter:m(s)})}>
            <option value="radiators" ?selected=${i.emitter==="radiators"}>${this._t("emitterRadiators")}</option>
            <option value="floor" ?selected=${i.emitter==="floor"}>${this._t("emitterFloor")}</option>
          </select></label>
        <label class="row"><span>${this._t("boiler")}</span>
          <select @change=${s=>this._patchRoom(t,{boiler:m(s)})}>
            <option value="gas" ?selected=${i.boiler==="gas"}>${this._t("boilerGas")}</option>
            <option value="heat_pump" ?selected=${i.boiler==="heat_pump"}>${this._t("boilerHeatPump")}</option>
          </select></label>
        <label class="row"><span>${this._t("energyClass")}</span>
          <select @change=${s=>this._patchRoom(t,{energy_class:m(s)})}>
            ${["A","B","C","D","E","F","G"].map(s=>h`<option value=${s} ?selected=${i.energy_class===s}>${s}</option>`)}
          </select></label>
        <label class="row"><span>${this._t("area")}</span>
          <input type="number" min="5" max="500" step="1" .value=${String(i.area_m2)} @change=${s=>this._patchRoom(t,{area_m2:Number(m(s))})} /></label>
        <label class="row"><span>${this._t("height")}</span>
          <input type="number" min="2" max="6" step="0.1" .value=${String(i.height_m)} @change=${s=>this._patchRoom(t,{height_m:Number(m(s))})} /></label>
        <button class="nav" data-action="save-room" @click=${()=>this._saveRoom(t)}>${this._t("saveHouse")}</button>
      </div>`}async _saveRoom(t){let i=this._roomView(t);await this._try(()=>this._api.setRoom(t,i)),this._error||(this._room=null)}_renderSettings(){let t=this._data,i=this._selected,s=t.assignments[i],o=s?this._users(s.profile_id).filter(r=>r!==i):[],n=this._statusInfo(i);return h`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._name(i)}</h2>
        <span class="spacer"></span>
      </div>
      <div class="status tone-${n.tone}" data-climate=${i}>
        <span class="status-text"><ha-icon icon=${n.icon}></ha-icon>${n.text}</span>
        ${n.key==="override"?h`<button class="pill" data-action="clear-override"
          @click=${()=>this._try(()=>this._api.clearOverride(i))}>${this._t("clearOverride")}</button>`:c}
      </div>
      ${s?h`<div class="group">
        <label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${s.enabled}
            @change=${r=>this._try(()=>this._api.assign(i,s.profile_id,{enabled:Ct(r)}))} />
        </label>
        <button class="nav" data-action="open-schedule" @click=${()=>this._openSchedule()}>
          <span>${this._t("timeSlots")}</span><span class="value">${t.profiles[s.profile_id].name}</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
        <button class="nav" data-action="conditions" @click=${()=>this._go("conditions")}>
          <span>${this._t("conditions")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>`:c}
      <div class="group">
        <div class="stack">
          <span class="caption">${this._t("schedule")}</span>
          <select data-action="link" @change=${r=>m(r)&&this._try(()=>this._api.assign(i,m(r)))}>
            ${s?c:h`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(t.profiles).map(r=>h`<option value=${r.id} ?selected=${r.id===s?.profile_id}>${r.name} (${this._users(r.id).map(l=>this._name(l)).join(", ")||"-"})</option>`)}
          </select>
        </div>
        <button class="nav" data-action="own" @click=${()=>this._try(()=>this._makeOwn(i))}>${this._t("ownSchedule")}</button>
        ${o.length?h`<p class="footnote">${this._t("sharedWith",{x:o.map(r=>this._name(r)).join(", ")})}</p>`:c}
      </div>
      ${this._renderHouse(i)}
      ${s?h`<div class="group">
        <button class="nav danger" @click=${()=>this._try(()=>this._api.unassign(i))}>${this._t("unassign")}</button>
      </div>`:c}`}_renderSchedule(){let t=this._profile;if(!t)return h`<div class="topbar">
          <button class="back" @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
          <h2>${this._t("timeSlots")}</h2><span class="spacer"></span>
        </div>
        <div class="group"><div class="empty"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon><p>${this._t("emptySchedule")}</p></div></div>`;if(this._editIndex!==null&&t.blocks[this._editIndex])return this._renderSlotEditor(this._editIndex);let i=this._dayNames(),s=this._scheduleDay,o=t.blocks.map((n,r)=>({block:n,i:r})).filter(({block:n})=>n.days.includes(s)).sort((n,r)=>n.block.start.localeCompare(r.block.start));return h`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${t.name}</h2><span class="spacer"></span>
      </div>
      <div class="tabs" role="group" aria-label=${this._t("days")}>
        ${Tt.map(n=>h`<button type="button" class="tab" aria-pressed=${n===s} @click=${()=>this._scheduleDay=n}>${i[n]}</button>`)}
      </div>
      <div class="slots">
        ${o.length?o.map(({block:n,i:r})=>h`<button class="slot tone-${this._blockTone(n)}" @click=${()=>this._editIndex=r}>
          <span class="chip">${this._fmt(n.temperature)}°</span>
          <span class="mode">${n.hvac_mode??this._dayList(n.days)}</span>
          <time datetime=${n.start}>${n.start}</time>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`):h`<p class="footnote">${this._t("noBlocksDay")}</p>`}
        <button class="add-pill" @click=${()=>this._addBlock()}><ha-icon icon="mdi:plus"></ha-icon>${this._t("addBlock")}</button>
      </div>
      <div class="actions">
        <button class="primary" data-action="save-profile" @click=${()=>this._saveProfile()}>${this._t("save")}</button>
        <button class="ghost" @click=${()=>this._back()}>${this._t("cancel")}</button>
      </div>`}_addBlock(){this._patchProfile(t=>t.blocks.push({days:[this._scheduleDay],start:"06:30",temperature:20,hvac_mode:null})),this._editIndex=this._profile.blocks.length-1}_renderSlotEditor(t){let i=this._profile.blocks[t],s=this._dayNames();return h`<div class="topbar">
        <button class="back" @click=${()=>this._editIndex=null}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("timeSlots")}</button>
        <h2>${this._t("slot")}</h2><span class="spacer"></span>
      </div>
      <div class="editor">
        <div class="hero-slot tone-${this._blockTone(i)}">
          <div class="stepper">
            <button type="button" class="round" aria-label=${this._t("lower")} @click=${()=>this._stepTemp(t,-V)}>−</button>
            <output class="big" aria-live="polite">${this._fmt(i.temperature)}°</output>
            <button type="button" class="round" aria-label=${this._t("raise")} @click=${()=>this._stepTemp(t,V)}>+</button>
          </div>
          <label class="time-field">
            <span class="caption">${this._t("start")}</span>
            <input type="time" class="big-time" .value=${i.start} @input=${o=>this._patchProfile(n=>n.blocks[t].start=m(o))} />
          </label>
        </div>
        <div class="group tile-group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${Tt.map(o=>h`<button type="button" aria-pressed=${i.days.includes(o)}
              @click=${()=>this._patchProfile(n=>{let r=new Set(n.blocks[t].days);r.has(o)?r.delete(o):r.add(o),n.blocks[t].days=[...r].sort()})}>${s[o]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("mode")}</span>
            <input type="text" .value=${i.hvac_mode??""} placeholder=${this._t("mode")}
              @input=${o=>this._patchProfile(n=>n.blocks[t].hvac_mode=m(o)||null)} />
          </label>
        </div>
        <button class="danger wide" @click=${()=>{this._patchProfile(o=>o.blocks.splice(t,1)),this._editIndex=null}}>${this._t("removeBlock")}</button>
        <button class="primary wide" @click=${()=>this._editIndex=null}>${this._t("done")}</button>
      </div>`}_patchProfile(t){let i=structuredClone(this._profile);t(i),this._profile=i}_stepTemp(t,i){this._patchProfile(s=>s.blocks[t].temperature=qt(s.blocks[t].temperature+i))}_actionLabel(t){return t.action.kind==="off"?this._t("actionOff"):this._t("actionMin",{x:t.action.temperature??""})}_patchCondition(t){let i=structuredClone(this._condition);t(i),this._condition=i}_renderConditions(){let t=this._data,i=this._selected,s=t.assignments[i];return h`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("conditions")}</h2><span class="spacer"></span>
      </div>
      <div class="group cond-list">
        ${Object.values(t.conditions).map(o=>h`<div class="row">
          <b>${o.name}</b>
          <span class="meta">${o.checks.map(n=>`${n.entity_id} ${n.op} ${n.value}`).join(o.match==="all"?" & ":" | ")}</span>
          <span class="meta">${this._t("delaySec",{x:o.delay})}</span>
          <span class="meta">${this._actionLabel(o)}</span>
          ${s?h`<label class="switch-row"><span class="caption">${this._t("forThis")}</span>
            <input type="checkbox" role="switch" aria-label=${`${o.name}: ${this._name(i)}`} .checked=${s.condition_ids.includes(o.id)}
              @change=${n=>this._try(()=>this._api.assign(i,s.profile_id,{condition_ids:Ct(n)?[...s.condition_ids,o.id]:s.condition_ids.filter(r=>r!==o.id)}))} /></label>`:c}
          <button class="pill" @click=${()=>this._condition=structuredClone(o)}>${this._t("edit")}</button>
          <button class="pill danger" @click=${()=>this._try(()=>this._api.deleteCondition(o.id))}>${this._t("delete")}</button>
        </div>`)}
        <div class="row">
          <button class="wide" @click=${()=>this._condition={id:Pt("c"),name:"",checks:[],match:"all",delay:120,action:{kind:"off",temperature:null}}}>${this._t("newCondition")}</button>
        </div>
      </div>
      ${this._condition?h`<div class="group cond-editor">
        <input type="text" .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${o=>this._patchCondition(n=>n.name=m(o))} />
        <select @change=${o=>this._patchCondition(n=>n.match=m(o))}>
          <option value="all" ?selected=${this._condition.match==="all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match==="any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((o,n)=>h`<div class="row">
          <input type="text" placeholder=${this._t("entity")} .value=${o.entity_id} @input=${r=>this._patchCondition(l=>l.checks[n].entity_id=m(r))} />
          <select @change=${r=>this._patchCondition(l=>l.checks[n].op=m(r))}>
            ${["=","!=",">","<"].map(r=>h`<option ?selected=${o.op===r}>${r}</option>`)}
          </select>
          <input type="text" placeholder=${this._t("value")} .value=${o.value} @input=${r=>this._patchCondition(l=>l.checks[n].value=m(r))} />
          <button class="pill danger" @click=${()=>this._patchCondition(r=>r.checks.splice(n,1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${()=>this._patchCondition(o=>o.checks.push({entity_id:"",op:"=",value:"on"}))}>${this._t("addCheck")}</button>
        <div class="row">
          <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")} aria-label=${this._t("delay")}
            @input=${o=>this._patchCondition(n=>n.delay=Number(m(o)))} />
          <select @change=${o=>this._patchCondition(n=>n.action.kind=m(o))}>
            <option value="off" ?selected=${this._condition.action.kind==="off"}>${this._t("actionOff")}</option>
            <option value="min_setpoint" ?selected=${this._condition.action.kind==="min_setpoint"}>${this._t("actionMin",{x:""})}</option>
          </select>
          ${this._condition.action.kind==="min_setpoint"?h`<input type="number" step="0.5" .value=${String(this._condition.action.temperature??12)}
            @input=${o=>this._patchCondition(n=>n.action.temperature=Number(m(o)))} />`:c}
        </div>
        <div class="actions">
          <button class="primary" data-action="save-condition" @click=${()=>this._try(async()=>{await this._api.saveCondition(this._condition),this._condition=null})}>${this._t("save")}</button>
          <button @click=${()=>this._condition=null}>${this._t("cancel")}</button>
        </div>
      </div>`:c}`}};customElements.define("thermo-scheduler-card",st);window.customCards=window.customCards??[];window.customCards.push({type:"thermo-scheduler-card",name:"Thermo Scheduler",description:"Stato, prossima fascia e programmazione di un termostato"});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/keyed.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
