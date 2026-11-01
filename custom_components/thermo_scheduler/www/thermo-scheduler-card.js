var z=globalThis,D=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,E=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(e,t))}return t}toString(){return this.cssText}},ot=a=>new E(typeof a=="string"?a:a+"",void 0,W),q=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[o+1],a[0]);return new E(e,a,W)},at=(a,t)=>{if(D)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},K=D?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ot(e)})(a):a;var{is:Ot,defineProperty:zt,getOwnPropertyDescriptor:Dt,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ut,getPrototypeOf:Bt}=Object,R=globalThis,rt=R.trustedTypes,It=rt?rt.emptyScript:"",Ht=R.reactiveElementPolyfillSupport,P=(a,t)=>a,X={toAttribute(a,t){switch(t){case Boolean:a=a?It:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},ct=(a,t)=>!Ot(a,t),lt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),R.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&zt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:o}=Dt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let r=s?.call(this);o?.call(this,n),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,i=[...Rt(e),...Ut(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:X).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:X;this._$Em=s;let r=n.fromAttribute(e,o.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(t!==void 0){let n=this.constructor;if(s===!1&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??ct)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:n}=o,r=this[s];n!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,o,r)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,Ht?.({ReactiveElement:f}),(R.reactiveElementVersions??=[]).push("2.1.2");var G=globalThis,dt=a=>a,U=G.trustedTypes,ht=U?U.createPolicy("lit-html",{createHTML:a=>a}):void 0,J="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+v,Lt=`<${Q}>`,k=document,M=()=>k.createComment(""),N=a=>a===null||typeof a!="object"&&typeof a!="function",Z=Array.isArray,ft=a=>Z(a)||typeof a?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,x=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,tt=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),h=tt(1),Jt=tt(2),Qt=tt(3),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),_t=new WeakMap,y=k.createTreeWalker(k,129);function bt(a,t){if(!Z(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var $t=(a,t)=>{let e=a.length-1,i=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=T;for(let r=0;r<e;r++){let l=a[r],p,u,d=-1,g=0;for(;g<l.length&&(n.lastIndex=g,u=n.exec(l),u!==null);)g=n.lastIndex,n===T?u[1]==="!--"?n=pt:u[1]!==void 0?n=ut:u[2]!==void 0?(vt.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=x):u[3]!==void 0&&(n=x):n===x?u[0]===">"?(n=s??T,d=-1):u[1]===void 0?d=-2:(d=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?x:u[3]==='"'?gt:mt):n===gt||n===mt?n=x:n===pt||n===ut?n=T:(n=x,s=void 0);let _=n===x&&a[r+1].startsWith("/>")?" ":"";o+=n===T?l+Lt:d>=0?(i.push(p),l.slice(0,d)+J+l.slice(d)+v+_):l+v+(d===-2?r:_)}return[bt(a,o+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},O=class a{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0,r=t.length-1,l=this.parts,[p,u]=$t(t,e);if(this.el=a.createElement(p,i),y.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=y.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(J)){let g=u[n++],_=s.getAttribute(d).split(v),b=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:b[2],strings:_,ctor:b[1]==="."?I:b[1]==="?"?H:b[1]==="@"?L:S}),s.removeAttribute(d)}else d.startsWith(v)&&(l.push({type:6,index:o}),s.removeAttribute(d));if(vt.test(s.tagName)){let d=s.textContent.split(v),g=d.length-1;if(g>0){s.textContent=U?U.emptyScript:"";for(let _=0;_<g;_++)s.append(d[_],M()),y.nextNode(),l.push({type:2,index:++o});s.append(d[g],M())}}}else if(s.nodeType===8)if(s.data===Q)l.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(v,d+1))!==-1;)l.push({type:7,index:o}),d+=v.length-1}o++}}static createElement(t,e){let i=k.createElement("template");return i.innerHTML=t,i}};function A(a,t,e=a,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,o=N(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(a),s._$AT(a,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=A(a,s._$AS(a,t.values),s,i)),t}var B=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);y.currentNode=s;let o=y.nextNode(),n=0,r=0,l=i[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new C(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new j(o,this,t)),this._$AV.push(p),l=i[++r]}n!==l?.index&&(o=y.nextNode(),n++)}return y.currentNode=k,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},C=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),N(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(bt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new B(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new O(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new a(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=dt(t).nextSibling;dt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){let o=this.strings,n=!1;if(o===void 0)t=A(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{let r=t,l,p;for(t=o[0],l=0;l<o.length-1;l++)p=A(this,r[i+l],e,l),p===w&&(p=this._$AH[l]),n||=!N(p)||p!==this._$AH[l],p===c?t=c:t!==c&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},I=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},H=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},L=class extends S{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=A(this,t,e,0)??c)===w)return;let i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},j=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}},xt={M:J,P:v,A:Q,C:1,L:$t,R:B,D:ft,V:A,I:C,H:S,N:H,U:L,B:I,F:j},jt=G.litHtmlPolyfillSupport;jt?.(O,C),(G.litHtmlVersions??=[]).push("3.3.3");var yt=(a,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let o=e?.renderBefore??null;i._$litPart$=s=new C(t.insertBefore(M(),o),o,void 0,e??{})}return s._$AI(a),s};var et=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};$._$litElement$=!0,$.finalized=!0,et.litElementHydrateSupport?.({LitElement:$});var Vt=et.litElementPolyfillSupport;Vt?.({LitElement:$});(et.litElementVersions??=[]).push("4.2.2");var kt=a=>(...t)=>({_$litDirective$:a,values:t}),V=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:ue}=xt;var Ft={},wt=(a,t=Ft)=>a._$AH=t;var At=kt(class extends V{constructor(){super(...arguments),this.key=c}render(a,t){return this.key=a,t}update(a,[t,e]){return t!==this.key&&(wt(a),this.key=t),e}});var St=a=>({list:()=>a({type:"thermo_scheduler/list"}),saveProfile:t=>a({type:"thermo_scheduler/save_profile",profile:t}),deleteProfile:t=>a({type:"thermo_scheduler/delete_profile",profile_id:t}),saveCondition:t=>a({type:"thermo_scheduler/save_condition",condition:t}),deleteCondition:t=>a({type:"thermo_scheduler/delete_condition",condition_id:t}),assign:(t,e,i={})=>a({type:"thermo_scheduler/assign",climate_id:t,profile_id:e,...i}),unassign:t=>a({type:"thermo_scheduler/unassign",climate_id:t}),clearOverride:t=>a({type:"thermo_scheduler/clear_override",climate_id:t})});var Wt={en:{climates:"Thermostats",profiles:"Schedules",conditions:"Conditions",until:"Until {t}",scheduled:"Scheduled",override:"Manual",blocked:"Blocked",disabled:"Disabled",clearOverride:"Back to schedule",enable:"Enable",disable:"Disable",unassign:"Remove",assign:"Assign",addClimate:"Add thermostat",save:"Save",cancel:"Cancel",edit:"Edit",delete:"Delete",newProfile:"New schedule",newCondition:"New condition",name:"Name",start:"Start",temperature:"Temperature",mode:"Mode",addBlock:"Add block",removeBlock:"Remove block",entity:"Entity",value:"Value",match:"Match",all:"All",any:"Any",addCheck:"Add check",delay:"Delay (s)",action:"Action",actionOff:"Turn off",actionMin:"Minimum setpoint {x}",delaySec:"delay {x}s",useSchedule:"Use schedule of\u2026",ownSchedule:"Own schedule",sharedWith:"Shared with: {x}",days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun",configure:"Configure",active:"Active",schedule:"Schedule",noBlocks:"No schedule blocks",emptySchedule:"No schedule for this thermostat",heating:"Heating",cooling:"Cooling",off:"Off",target:"Target",lower:"Lower by 0.5 \xB0",raise:"Raise by 0.5 \xB0",actionFailed:"Action failed",retry:"Retry",next:"Next",tomorrow:"Tomorrow",timeSlots:"Time slots",back:"Back",noBlocksDay:"No slots this day",slot:"Slot",done:"Done",forThis:"For this thermostat",settings:"Settings",changeMode:"Change mode",auto:"Auto",dry:"Dry",fan:"Fan"},it:{climates:"Termostati",profiles:"Programmazioni",conditions:"Condizioni",until:"Fino alle {t}",scheduled:"Programmato",override:"Manuale",blocked:"Bloccato",disabled:"Disattivato",clearOverride:"Torna alla programmazione",enable:"Attiva",disable:"Disattiva",unassign:"Rimuovi",assign:"Assegna",addClimate:"Aggiungi termostato",save:"Salva",cancel:"Annulla",edit:"Modifica",delete:"Elimina",newProfile:"Nuova programmazione",newCondition:"Nuova condizione",name:"Nome",start:"Inizio",temperature:"Temperatura",mode:"Modalit\xE0",addBlock:"Aggiungi fascia",removeBlock:"Rimuovi fascia",entity:"Entit\xE0",value:"Valore",match:"Combinazione",all:"Tutte",any:"Almeno una",addCheck:"Aggiungi test",delay:"Ritardo (s)",action:"Azione",actionOff:"Spegni",actionMin:"Setpoint minimo {x}",delaySec:"ritardo {x}s",useSchedule:"Usa la programmazione di\u2026",ownSchedule:"Programmazione propria",sharedWith:"Condivisa con: {x}",days:"Lun,Mar,Mer,Gio,Ven,Sab,Dom",configure:"Configura",active:"Attiva",schedule:"Programmazione",noBlocks:"Nessuna fascia",emptySchedule:"Nessuna programmazione per questo termostato",heating:"Riscaldamento",cooling:"Raffrescamento",off:"Spento",target:"Obiettivo",lower:"Abbassa di 0,5 \xB0",raise:"Alza di 0,5 \xB0",actionFailed:"Operazione non riuscita",retry:"Riprova",next:"Prossima",tomorrow:"Domani",timeSlots:"Fasce orarie",back:"Indietro",noBlocksDay:"Nessuna fascia in questo giorno",slot:"Fascia",done:"Fine",forThis:"Per questo termostato",settings:"Impostazioni",changeMode:"Cambia modalit\xE0",auto:"Automatico",dry:"Deumidifica",fan:"Ventilatore"}};function Ct(a,t,e={}){return(Wt[a?.startsWith("it")?"it":"en"][t]??t).replace(/\{(\w+)\}/g,(s,o)=>String(e[o]??""))}var m=a=>a.target.value,Et=a=>a.target.checked,Pt=a=>`${a}_${Date.now().toString(36)}`,Tt=[0,1,2,3,4,5,6],it=5,Nt=30,F=.5,qt=a=>Math.min(Nt,Math.max(it,Math.round(a/F)*F)),Mt=()=>(new Date().getDay()+6)%7,st=class extends ${constructor(){super(...arguments);this._config={};this._data=null;this._profile=null;this._condition=null;this._selected="";this._view="summary";this._scheduleDay=Mt();this._editIndex=null;this._modeOpen=!1;this._error="";this._retry=null;this._loaded=!1}static{this.properties={hass:{attribute:!1},_data:{state:!0},_profile:{state:!0},_condition:{state:!0},_selected:{state:!0},_view:{state:!0},_scheduleDay:{state:!0},_editIndex:{state:!0},_modeOpen:{state:!0},_error:{state:!0}}}static{this.styles=q`
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
  `}setConfig(e){if(!e?.entity?.startsWith("climate."))throw new Error("thermo-scheduler-card: imposta 'entity' con un termostato climate.*");this._config=e,this._selected=e.entity,this._syncProfile()}getCardSize(){return 3}willUpdate(e){e.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._reload())}get _api(){return St(e=>this.hass.callWS(e))}_t(e,i){return Ct(this.hass?.language,e,i)}async _reload(){this._data=await this._api.list(),this._selected||(this._selected=Object.keys(this._data.assignments)[0]??""),this._syncProfile()}_name(e){let i=this.hass.states[e]?.attributes?.friendly_name;return i||(e.split(".")[1]??e).replace(/_/g," ").replace(/^./,o=>o.toUpperCase())}_users(e){return Object.entries(this._data.assignments).filter(([,i])=>i.profile_id===e).map(([i])=>i)}_syncProfile(){let e=this._data?.assignments[this._selected];e?this._profile?.id!==e.profile_id&&(this._profile=structuredClone(this._data.profiles[e.profile_id])):this._profile=null}_select(e){this._selected=e,this._profile=null,this._syncProfile()}async _makeOwn(e){let i=this._data.assignments[e],s=i?structuredClone(this._data.profiles[i.profile_id].blocks):[],o={id:Pt("p"),name:this._name(e),blocks:s};await this._api.saveProfile(o),await this._api.assign(e,o.id)}async _do(e){await e(),await this._reload()}async _try(e){this._retry=e,this._error="";try{await this._do(e)}catch(i){let s=i?.message;this._error=s||this._t("actionFailed")}}async _setMode(e,i){this._modeOpen=!1;try{await this.hass.callService("climate","set_hvac_mode",{entity_id:e,hvac_mode:i})}catch(s){this._error=s?.message||this._t("actionFailed")}}_modeName(e){let i={heat:"heating",cool:"cooling",off:"off",auto:"auto",heat_cool:"auto",dry:"dry",fan_only:"fan"};return this._t(i[e]??e)}_go(e){this._view=e,e!=="schedule"&&(this._editIndex=null)}_openSchedule(){this._syncProfile(),this._scheduleDay=Mt(),this._editIndex=null,this._view="schedule"}_back(){if(this._view==="schedule"&&this._editIndex!==null){this._editIndex=null;return}if(this._view==="schedule"){this._profile=null,this._syncProfile(),this._go("settings");return}this._go(this._view==="settings"?"summary":"settings")}async _saveProfile(){let e=this._profile;await this._try(()=>this._api.saveProfile(e)),this._error||this._go("settings")}_status(e){let i=this.hass.states[`sensor.${e.split(".")[1]}_scheduler`];return i?i.state==="override"?this._t("until",{t:String(i.attributes.override_until??"").slice(11,16)}):this._t(i.state):""}_sensorState(e){return this.hass.states[`sensor.${e.split(".")[1]}_scheduler`]?.state??""}_hvac(e){return this.hass.states[e]?.state??"off"}_targetTemp(e){let i=this.hass.states[e]?.attributes?.temperature;return i==null?null:Number(i)}_fmt(e){return new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number(e))}_dayNames(){return this._t("days").split(",")}_dayList(e){let i=this._dayNames(),s=[...e].sort((n,r)=>n-r),o=[];for(let n of s){let r=o[o.length-1];r&&n===r[r.length-1]+1?r.push(n):o.push([n])}return o.map(n=>n.length>2?`${i[n[0]]}\u2013${i[n[n.length-1]]}`:n.map(r=>i[r]).join(", ")).join(", ")}_blockTone(e){return e.hvac_mode==="cool"?"cool":"heat"}_statusInfo(e){let i=this._sensorState(e),s=this._hvac(e),o=i==="blocked"?"danger":i==="override"?"accent":i==="disabled"?"off":s==="cool"?"cool":"heat",n={override:"mdi:hand-back-left",blocked:"mdi:lock",disabled:"mdi:pause-circle-outline",scheduled:"mdi:calendar-clock"},r=i==="override"?`${this._t("override")} \xB7 ${this._status(e)}`:this._status(e);return{key:i,tone:o,icon:n[i]??"mdi:thermostat",text:r}}_nextBlock(e){if(!e||!e.blocks.length)return null;let i=new Date;for(let s=0;s<8;s++){let o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+s),n=(o.getDay()+6)%7,r=null;for(let l of e.blocks){if(!l.days.includes(n))continue;let[p,u]=l.start.split(":").map(Number),d=new Date(o.getFullYear(),o.getMonth(),o.getDate(),p,u);d>i&&(!r||d<r.at)&&(r={at:d,block:l})}if(r)return{...r,k:s,wd:n}}return null}render(){return this._data?h`<div class="wrap">
      ${this._error?h`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${()=>this._retry&&this._try(this._retry)}>${this._t("retry")}</button>
      </div>`:c}
      ${At(this._view,h`<div class="view-in">${this._renderView()}</div>`)}
    </div>`:c}_renderView(){switch(this._view){case"settings":return this._renderSettings();case"schedule":return this._renderSchedule();case"conditions":return this._renderConditions();default:return this._renderSummary()}}_tempParts(e){let i=new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).formatToParts(e),s=i.filter(n=>n.type==="integer"||n.type==="group"||n.type==="minusSign").map(n=>n.value).join(""),o=i.filter(n=>n.type==="decimal"||n.type==="fraction").map(n=>n.value).join("");return{int:s,dec:o}}_modeLabel(e){let i=this._hvac(e);return i==="cool"?this._t("cooling"):i==="heat"?this._t("heating"):this._t("off")}_renderSummary(){let e=this._selected,i=this._data.assignments[e],s=this._statusInfo(e),o=this._targetTemp(e),n=o==null?null:this._tempParts(o),r=o==null?0:Math.min(1,Math.max(0,(o-it)/(Nt-it))),l=i?this._nextBlock(this._data.profiles[i.profile_id]):null,p=this._dayNames(),u=l?l.k===0?"":l.k===1?`${this._t("tomorrow")} `:`${p[l.wd]} `:"",d=this._hvac(e),g=d==="cool"?"cool":d==="heat"?"heat":"off",_=this.hass.states[e]?.attributes?.hvac_modes??[];return h`<section class="hero tone-${g}" data-climate=${e}>
      <button class="hero-top" aria-label=${`${this._t("settings")}: ${this._name(e)}`} @click=${()=>this._go("settings")}>
        <span class="hero-name">${this._name(e)}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
      </button>
      <span class="dial" style="--p: ${r}" role="img" aria-label=${`${this._t("target")} ${o==null?"\u2013":this._fmt(o)} \xB0`}>
        <span class="ring"></span>
        <span class="knob-wrap"><span class="knob"></span></span>
        <span class="dial-center">
          <span class="num">${n?n.int:"\u2013"}${n&&n.dec?h`<sup>${n.dec}</sup>`:c}<span class="deg">°</span></span>
          <span class="dial-mode">${this._modeLabel(e)}</span>
        </span>
      </span>
      <span class="pill status-pill tone-${s.tone}"><ha-icon icon=${s.icon}></ha-icon>${s.text}</span>
      <span class="tiles">
        <button class="tile mode-tile" aria-expanded=${this._modeOpen} aria-controls="mode-picker"
          @click=${()=>this._modeOpen=!this._modeOpen}>
          <ha-icon icon=${d==="cool"?"mdi:snowflake":"mdi:fire"}></ha-icon>
          <span class="t-label">${this._t("mode")}</span>
          <span class="t-value">${this._modeLabel(e)}</span>
        </button>
        ${l?h`<span class="tile">
          <span class="t-label">${this._t("next")}</span>
          <span class="t-value">${u}${l.block.start}</span>
          <span class="t-sub">${this._fmt(l.block.temperature)}°</span>
        </span>`:c}
      </span>
      ${this._modeOpen&&_.length?h`<div id="mode-picker" class="mode-picker" role="group" aria-label=${this._t("changeMode")}>
        ${_.map(b=>h`<button type="button" aria-pressed=${b===d} @click=${()=>this._setMode(e,b)}>${this._modeName(b)}</button>`)}
      </div>`:c}
      ${i?c:h`<span class="footnote">${this._t("emptySchedule")}</span>`}
    </section>`}_renderSettings(){let e=this._data,i=this._selected,s=e.assignments[i],o=s?this._users(s.profile_id).filter(r=>r!==i):[],n=this._statusInfo(i);return h`<div class="topbar">
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
            @change=${r=>this._try(()=>this._api.assign(i,s.profile_id,{enabled:Et(r)}))} />
        </label>
        <button class="nav" data-action="open-schedule" @click=${()=>this._openSchedule()}>
          <span>${this._t("timeSlots")}</span><span class="value">${e.profiles[s.profile_id].name}</span>
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
            ${Object.values(e.profiles).map(r=>h`<option value=${r.id} ?selected=${r.id===s?.profile_id}>${r.name} (${this._users(r.id).map(l=>this._name(l)).join(", ")||"-"})</option>`)}
          </select>
        </div>
        <button class="nav" data-action="own" @click=${()=>this._try(()=>this._makeOwn(i))}>${this._t("ownSchedule")}</button>
        ${o.length?h`<p class="footnote">${this._t("sharedWith",{x:o.map(r=>this._name(r)).join(", ")})}</p>`:c}
      </div>
      ${s?h`<div class="group">
        <button class="nav danger" @click=${()=>this._try(()=>this._api.unassign(i))}>${this._t("unassign")}</button>
      </div>`:c}`}_renderSchedule(){let e=this._profile;if(!e)return h`<div class="topbar">
          <button class="back" @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
          <h2>${this._t("timeSlots")}</h2><span class="spacer"></span>
        </div>
        <div class="group"><div class="empty"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon><p>${this._t("emptySchedule")}</p></div></div>`;if(this._editIndex!==null&&e.blocks[this._editIndex])return this._renderSlotEditor(this._editIndex);let i=this._dayNames(),s=this._scheduleDay,o=e.blocks.map((n,r)=>({block:n,i:r})).filter(({block:n})=>n.days.includes(s)).sort((n,r)=>n.block.start.localeCompare(r.block.start));return h`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${e.name}</h2><span class="spacer"></span>
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
      </div>`}_addBlock(){this._patchProfile(e=>e.blocks.push({days:[this._scheduleDay],start:"06:30",temperature:20,hvac_mode:null})),this._editIndex=this._profile.blocks.length-1}_renderSlotEditor(e){let i=this._profile.blocks[e],s=this._dayNames();return h`<div class="topbar">
        <button class="back" @click=${()=>this._editIndex=null}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("timeSlots")}</button>
        <h2>${this._t("slot")}</h2><span class="spacer"></span>
      </div>
      <div class="editor">
        <div class="hero-slot tone-${this._blockTone(i)}">
          <div class="stepper">
            <button type="button" class="round" aria-label=${this._t("lower")} @click=${()=>this._stepTemp(e,-F)}>−</button>
            <output class="big" aria-live="polite">${this._fmt(i.temperature)}°</output>
            <button type="button" class="round" aria-label=${this._t("raise")} @click=${()=>this._stepTemp(e,F)}>+</button>
          </div>
          <label class="time-field">
            <span class="caption">${this._t("start")}</span>
            <input type="time" class="big-time" .value=${i.start} @input=${o=>this._patchProfile(n=>n.blocks[e].start=m(o))} />
          </label>
        </div>
        <div class="group tile-group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${Tt.map(o=>h`<button type="button" aria-pressed=${i.days.includes(o)}
              @click=${()=>this._patchProfile(n=>{let r=new Set(n.blocks[e].days);r.has(o)?r.delete(o):r.add(o),n.blocks[e].days=[...r].sort()})}>${s[o]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("mode")}</span>
            <input type="text" .value=${i.hvac_mode??""} placeholder=${this._t("mode")}
              @input=${o=>this._patchProfile(n=>n.blocks[e].hvac_mode=m(o)||null)} />
          </label>
        </div>
        <button class="danger wide" @click=${()=>{this._patchProfile(o=>o.blocks.splice(e,1)),this._editIndex=null}}>${this._t("removeBlock")}</button>
        <button class="primary wide" @click=${()=>this._editIndex=null}>${this._t("done")}</button>
      </div>`}_patchProfile(e){let i=structuredClone(this._profile);e(i),this._profile=i}_stepTemp(e,i){this._patchProfile(s=>s.blocks[e].temperature=qt(s.blocks[e].temperature+i))}_actionLabel(e){return e.action.kind==="off"?this._t("actionOff"):this._t("actionMin",{x:e.action.temperature??""})}_patchCondition(e){let i=structuredClone(this._condition);e(i),this._condition=i}_renderConditions(){let e=this._data,i=this._selected,s=e.assignments[i];return h`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("conditions")}</h2><span class="spacer"></span>
      </div>
      <div class="group cond-list">
        ${Object.values(e.conditions).map(o=>h`<div class="row">
          <b>${o.name}</b>
          <span class="meta">${o.checks.map(n=>`${n.entity_id} ${n.op} ${n.value}`).join(o.match==="all"?" & ":" | ")}</span>
          <span class="meta">${this._t("delaySec",{x:o.delay})}</span>
          <span class="meta">${this._actionLabel(o)}</span>
          ${s?h`<label class="switch-row"><span class="caption">${this._t("forThis")}</span>
            <input type="checkbox" role="switch" aria-label=${`${o.name}: ${this._name(i)}`} .checked=${s.condition_ids.includes(o.id)}
              @change=${n=>this._try(()=>this._api.assign(i,s.profile_id,{condition_ids:Et(n)?[...s.condition_ids,o.id]:s.condition_ids.filter(r=>r!==o.id)}))} /></label>`:c}
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
