var D=globalThis,H=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),ot=new WeakMap,E=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(H&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ot.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ot.set(t,e))}return e}toString(){return this.cssText}},rt=o=>new E(typeof o=="string"?o:o+"",void 0,q),K=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new E(t,o,q)},lt=(o,e)=>{if(H)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=D.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},G=H?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return rt(t)})(o):o;var{is:Dt,defineProperty:Ht,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Nt,getOwnPropertySymbols:Ut,getPrototypeOf:Bt}=Object,O=globalThis,ct=O.trustedTypes,It=ct?ct.emptyScript:"",Lt=O.reactiveElementPolyfillSupport,P=(o,e)=>o,X={toAttribute(o,e){switch(e){case Boolean:o=o?It:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},pt=(o,e)=>!Dt(o,e),dt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:pt};Symbol.metadata??=Symbol("metadata"),O.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ht(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=Ot(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){let r=s?.call(this);n?.call(this,a),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??dt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Bt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,i=[...Nt(t),...Ut(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(G(s))}else e!==void 0&&t.push(G(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:X).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:X;this._$Em=s;let r=a.fromAttribute(t,n.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(e!==void 0){let a=this.constructor;if(s===!1&&(n=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??pt)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:a}=n,r=this[s];a!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,Lt?.({ReactiveElement:f}),(O.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,ht=o=>o,N=J.trustedTypes,ut=N?N.createPolicy("lit-html",{createHTML:o=>o}):void 0,Q="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,Z="?"+v,Ft=`<${Z}>`,k=document,M=()=>k.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",tt=Array.isArray,bt=o=>tt(o)||typeof o?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,gt=/>/g,$=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,ft=/"/g,yt=/^(?:script|style|textarea|title)$/i,et=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),c=et(1),Qt=et(2),Zt=et(3),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),vt=new WeakMap,x=k.createTreeWalker(k,129);function $t(o,e){if(!tt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(e):e}var xt=(o,e)=>{let t=o.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",a=T;for(let r=0;r<t;r++){let l=o[r],h,u,p=-1,g=0;for(;g<l.length&&(a.lastIndex=g,u=a.exec(l),u!==null);)g=a.lastIndex,a===T?u[1]==="!--"?a=mt:u[1]!==void 0?a=gt:u[2]!==void 0?(yt.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=$):u[3]!==void 0&&(a=$):a===$?u[0]===">"?(a=s??T,p=-1):u[1]===void 0?p=-2:(p=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?$:u[3]==='"'?ft:_t):a===ft||a===_t?a=$:a===mt||a===gt?a=T:(a=$,s=void 0);let _=a===$&&o[r+1].startsWith("/>")?" ":"";n+=a===T?l+Ft:p>=0?(i.push(h),l.slice(0,p)+Q+l.slice(p)+v+_):l+v+(p===-2?r:_)}return[$t(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},R=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,a=0,r=e.length-1,l=this.parts,[h,u]=xt(e,t);if(this.el=o.createElement(h,i),x.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=x.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Q)){let g=u[a++],_=s.getAttribute(p).split(v),b=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:b[2],strings:_,ctor:b[1]==="."?B:b[1]==="?"?I:b[1]==="@"?L:S}),s.removeAttribute(p)}else p.startsWith(v)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(yt.test(s.tagName)){let p=s.textContent.split(v),g=p.length-1;if(g>0){s.textContent=N?N.emptyScript:"";for(let _=0;_<g;_++)s.append(p[_],M()),x.nextNode(),l.push({type:2,index:++n});s.append(p[g],M())}}}else if(s.nodeType===8)if(s.data===Z)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(v,p+1))!==-1;)l.push({type:7,index:n}),p+=v.length-1}n++}}static createElement(e,t){let i=k.createElement("template");return i.innerHTML=e,i}};function A(o,e,t=o,i){if(e===w)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,n=z(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=A(o,s._$AS(o,e.values),s,i)),e}var U=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??k).importNode(t,!0);x.currentNode=s;let n=x.nextNode(),a=0,r=0,l=i[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new C(n,n.nextSibling,this,e):l.type===1?h=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(h=new F(n,this,e)),this._$AV.push(h),l=i[++r]}a!==l?.index&&(n=x.nextNode(),a++)}return x.currentNode=k,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},C=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),z(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=R.createElement($t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new U(s,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=vt.get(e.strings);return t===void 0&&vt.set(e.strings,t=new R(e)),t}k(e){tt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new o(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ht(e).nextSibling;ht(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){let n=this.strings,a=!1;if(n===void 0)e=A(this,e,t,0),a=!z(e)||e!==this._$AH&&e!==w,a&&(this._$AH=e);else{let r=e,l,h;for(e=n[0],l=0;l<n.length-1;l++)h=A(this,r[i+l],t,l),h===w&&(h=this._$AH[l]),a||=!z(h)||h!==this._$AH[l],h===d?e=d:e!==d&&(e+=(h??"")+n[l+1]),this._$AH[l]=h}a&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},B=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},I=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},L=class extends S{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??d)===w)return;let i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},F=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}},kt={M:Q,P:v,A:Z,C:1,L:xt,R:U,D:bt,V:A,I:C,H:S,N:I,U:L,B,F},jt=J.litHtmlPolyfillSupport;jt?.(R,C),(J.litHtmlVersions??=[]).push("3.3.3");var wt=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let n=t?.renderBefore??null;i._$litPart$=s=new C(e.insertBefore(M(),n),n,void 0,t??{})}return s._$AI(o),s};var it=globalThis,y=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=wt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};y._$litElement$=!0,y.finalized=!0,it.litElementHydrateSupport?.({LitElement:y});var Vt=it.litElementPolyfillSupport;Vt?.({LitElement:y});(it.litElementVersions??=[]).push("4.2.2");var At=o=>(...e)=>({_$litDirective$:o,values:e}),j=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:me}=kt;var Wt={},St=(o,e=Wt)=>o._$AH=e;var Ct=At(class extends j{constructor(){super(...arguments),this.key=d}render(o,e){return this.key=o,e}update(o,[e,t]){return e!==this.key&&(St(o),this.key=e),t}});var Et=o=>({list:()=>o({type:"thermo_scheduler/list"}),saveProfile:e=>o({type:"thermo_scheduler/save_profile",profile:e}),deleteProfile:e=>o({type:"thermo_scheduler/delete_profile",profile_id:e}),saveCondition:e=>o({type:"thermo_scheduler/save_condition",condition:e}),deleteCondition:e=>o({type:"thermo_scheduler/delete_condition",condition_id:e}),assign:(e,t,i={})=>o({type:"thermo_scheduler/assign",climate_id:e,profile_id:t,...i}),unassign:e=>o({type:"thermo_scheduler/unassign",climate_id:e}),clearOverride:e=>o({type:"thermo_scheduler/clear_override",climate_id:e}),setRoom:(e,t)=>o({type:"thermo_scheduler/set_room",climate_id:e,room:t}),log:e=>o({type:"thermo_scheduler/log",limit:e}),setPreheat:(e,t)=>o({type:"thermo_scheduler/set_preheat",climate_id:e,enabled:t}),estimate:(e,t)=>o({type:"thermo_scheduler/estimate",climate_id:e,target:t})});function Pt(o,e,t){let i=[...new Set(t)].filter(r=>r!==e&&r>=0&&r<=6).sort((r,l)=>r-l);if(!i.length)return o;let s=o.filter(r=>r.days.includes(e)),n=o.map(r=>({...r,days:r.days.filter(l=>!i.includes(l))})).filter(r=>r.days.length>0),a=s.map(r=>({...r,days:[...i]}));return[...n,...a]}var qt={en:{climates:"Thermostats",profiles:"Schedules",conditions:"Conditions",until:"Until {t}",scheduled:"Scheduled",override:"Manual",blocked:"Blocked",disabled:"Disabled",clearOverride:"Back to schedule",enable:"Enable",disable:"Disable",unassign:"Remove",assign:"Assign",addClimate:"Add thermostat",save:"Save",cancel:"Cancel",edit:"Edit",delete:"Delete",newProfile:"New schedule",newCondition:"New condition",name:"Name",start:"Start",temperature:"Temperature",mode:"Mode",addBlock:"Add block",removeBlock:"Remove block",entity:"Entity",value:"Value",match:"Match",all:"All",any:"Any",addCheck:"Add check",delay:"Delay (s)",action:"Action",actionOff:"Turn off",actionMin:"Minimum setpoint {x}",delaySec:"delay {x}s",useSchedule:"Use schedule of\u2026",ownSchedule:"Own schedule",sharedWith:"Shared with: {x}",copyDay:"Copy day\u2026",copyDayTo:"Copy {x} to\u2026",copyDayHint:"Slots already on the selected days are replaced.",apply:"Apply",weekdays:"Mon\u2013Fri",weekend:"Weekend",allDays:"All",days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun",configure:"Configure",active:"Active",schedule:"Schedule",noBlocks:"No schedule blocks",emptySchedule:"No schedule for this thermostat",heating:"Heating",cooling:"Cooling",off:"Off",target:"Target",lower:"Lower by 0.5 \xB0",raise:"Raise by 0.5 \xB0",actionFailed:"Action failed",retry:"Retry",next:"Next",tomorrow:"Tomorrow",timeSlots:"Time slots",back:"Back",noBlocksDay:"No slots this day",slot:"Slot",done:"Done",forThis:"For this thermostat",settings:"Settings",history:"History",refresh:"Refresh",logAll:"All",logManual:"Manual",logAuto:"Automatic",logService:"Service",noHistory:"No activity yet",log_save_profile:"Schedule saved",log_delete_profile:"Schedule deleted",log_save_condition:"Condition saved",log_delete_condition:"Condition deleted",log_assign:"Schedule assigned",log_unassign:"Thermostat unassigned",log_clear_override:"Override cleared",log_set_room:"Room saved",log_set_preheat:"Preheat changed",log_override:"Manual change",log_override_scaduto:"Override expired",log_ciclo_appreso:"Heating cycle learned",log_condizione_attiva:"Condition active",log_condizione_finita:"Condition ended",log_fascia:"Slot applied",log_preriscaldamento:"Preheat",house:"Home",houseHint:"Heating system, boiler and energy class are set in the integration settings.",preheat:"Preheat",preheatHint:"Starts heating before the next slot, based on the estimate.",preheating:"preheating",emitter:"Heating system",boiler:"Boiler",energyClass:"Energy class",area:"Area (m\xB2)",height:"Height (m)",saveHouse:"Save home",emitterRadiators:"Radiators",emitterFloor:"Floor",boilerGas:"Gas",boilerHeatPump:"Heat pump",startAt:"Start",estMinutes:"~{x} min",noInside:"Indoor temperature unavailable",noOutdoor:"Set the outdoor sensor in the card",unreachable:"Target not reachable in time",calibrated:"calibrated on {x} cycles",genericEstimate:"generic estimate: set up the home",changeMode:"Change mode",auto:"Auto",dry:"Dry",fan:"Fan"},it:{climates:"Termostati",profiles:"Programmazioni",conditions:"Condizioni",until:"Fino alle {t}",scheduled:"Programmato",override:"Manuale",blocked:"Bloccato",disabled:"Disattivato",clearOverride:"Torna alla programmazione",enable:"Attiva",disable:"Disattiva",unassign:"Rimuovi",assign:"Assegna",addClimate:"Aggiungi termostato",save:"Salva",cancel:"Annulla",edit:"Modifica",delete:"Elimina",newProfile:"Nuova programmazione",newCondition:"Nuova condizione",name:"Nome",start:"Inizio",temperature:"Temperatura",mode:"Modalit\xE0",addBlock:"Aggiungi fascia",removeBlock:"Rimuovi fascia",entity:"Entit\xE0",value:"Valore",match:"Combinazione",all:"Tutte",any:"Almeno una",addCheck:"Aggiungi test",delay:"Ritardo (s)",action:"Azione",actionOff:"Spegni",actionMin:"Setpoint minimo {x}",delaySec:"ritardo {x}s",useSchedule:"Usa la programmazione di\u2026",ownSchedule:"Programmazione propria",sharedWith:"Condivisa con: {x}",copyDay:"Copia giornata\u2026",copyDayTo:"Copia {x} su\u2026",copyDayHint:"Le fasce gi\xE0 presenti nei giorni scelti vengono sostituite.",apply:"Applica",weekdays:"Lun\u2013Ven",weekend:"Weekend",allDays:"Tutti",days:"Lun,Mar,Mer,Gio,Ven,Sab,Dom",configure:"Configura",active:"Attiva",schedule:"Programmazione",noBlocks:"Nessuna fascia",emptySchedule:"Nessuna programmazione per questo termostato",heating:"Riscaldamento",cooling:"Raffrescamento",off:"Spento",target:"Obiettivo",lower:"Abbassa di 0,5 \xB0",raise:"Alza di 0,5 \xB0",actionFailed:"Operazione non riuscita",retry:"Riprova",next:"Prossima",tomorrow:"Domani",timeSlots:"Fasce orarie",back:"Indietro",noBlocksDay:"Nessuna fascia in questo giorno",slot:"Fascia",done:"Fine",forThis:"Per questo termostato",settings:"Impostazioni",history:"Cronologia",refresh:"Aggiorna",logAll:"Tutte",logManual:"Manuali",logAuto:"Automatiche",logService:"Servizio",noHistory:"Nessuna attivit\xE0 ancora",log_save_profile:"Programmazione salvata",log_delete_profile:"Programmazione eliminata",log_save_condition:"Condizione salvata",log_delete_condition:"Condizione eliminata",log_assign:"Programmazione assegnata",log_unassign:"Termostato rimosso dalla programmazione",log_clear_override:"Override annullato",log_set_room:"Stanza salvata",log_set_preheat:"Preriscaldamento modificato",log_override:"Modifica manuale",log_override_scaduto:"Override scaduto",log_ciclo_appreso:"Ciclo di riscaldamento appreso",log_condizione_attiva:"Condizione attiva",log_condizione_finita:"Condizione finita",log_fascia:"Fascia applicata",log_preriscaldamento:"Preriscaldamento",house:"Casa",houseHint:"Impianto, caldaia e classe energetica si impostano nelle impostazioni dell'integrazione.",preheat:"Preriscaldamento",preheatHint:"Accende il riscaldamento prima della fascia successiva, in base alla stima.",preheating:"preriscaldamento",emitter:"Impianto",boiler:"Caldaia",energyClass:"Classe energetica",area:"Superficie (m\xB2)",height:"Altezza (m)",saveHouse:"Salva casa",emitterRadiators:"Termosifoni",emitterFloor:"Pavimento",boilerGas:"Metano",boilerHeatPump:"Pompa di calore",startAt:"Avvio",estMinutes:"~{x} min",noInside:"Temperatura interna non disponibile",noOutdoor:"Imposta il sensore esterno nella card",unreachable:"Target non raggiungibile in tempo",calibrated:"calibrata su {x} cicli",genericEstimate:"stima generica: configura la casa",changeMode:"Cambia modalit\xE0",auto:"Automatico",dry:"Deumidifica",fan:"Ventilatore"}};function Tt(o,e,t={}){return(qt[o?.startsWith("it")?"it":"en"][e]??e).replace(/\{(\w+)\}/g,(s,n)=>String(t[n]??""))}var m=o=>o.target.value,st=o=>o.target.checked,Mt=o=>`${o}_${Date.now().toString(36)}`,V=[0,1,2,3,4,5,6],nt=5,Rt=30,W=.5,Kt=o=>Math.min(Rt,Math.max(nt,Math.round(o/W)*W)),zt=()=>(new Date().getDay()+6)%7,at=class extends y{constructor(){super(...arguments);this._config={};this._data=null;this._profile=null;this._condition=null;this._selected="";this._view="summary";this._scheduleDay=zt();this._copyTargets=null;this._editIndex=null;this._modeOpen=!1;this._est=null;this._history=null;this._historyFilter="all";this._room=null;this._estKey="";this._error="";this._retry=null;this._loaded=!1}static{this.properties={hass:{attribute:!1},_data:{state:!0},_profile:{state:!0},_condition:{state:!0},_selected:{state:!0},_view:{state:!0},_scheduleDay:{state:!0},_copyTargets:{state:!0},_editIndex:{state:!0},_modeOpen:{state:!0},_est:{state:!0},_history:{state:!0},_historyFilter:{state:!0},_room:{state:!0},_error:{state:!0}}}static{this.styles=K`
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
    .copy-panel { margin-top: 8px; padding-bottom: 12px; }
    .copy-panel .presets { display: flex; gap: 8px; padding: 0 12px; flex-wrap: wrap; }
    .copy-panel .footnote { padding: 8px 16px 0; }
    .copy-panel .actions { padding: 0 12px; }
    .seg button:disabled { opacity: 0.35; }
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

    .seg.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .log-row { align-items: flex-start; padding: 12px 16px; }
    .log-row > .src:first-child { flex: 0 0 auto; min-width: 0; }
    .log-body { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
    .log-title { font-size: 16px; font-weight: 600; }
    .src { flex-shrink: 0; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; margin-top: 2px; }
    .src-manual { background: color-mix(in srgb, var(--ts-accent) 16%, transparent); color: var(--ts-accent); }
    .src-auto { background: color-mix(in srgb, var(--ts-heat) 16%, transparent); color: var(--ts-heat); }
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
  `}setConfig(t){if(!t?.entity?.startsWith("climate."))throw new Error("thermo-scheduler-card: imposta 'entity' con un termostato climate.*");this._config=t,this._selected=t.entity,this._syncProfile()}getCardSize(){return 3}updated(){!this._data||!this.hass||this._maybeEstimate()}_maybeEstimate(){let t=this._selected,i=this._data.assignments[t],s=i?this._nextBlock(this._data.profiles[i.profile_id]):null;if(!s){this._est=null,this._estKey="";return}let n=Math.floor(Date.now()/6e5),a=`${t}|${s.block.temperature}|${s.at.getTime()}|${n}`;a!==this._estKey&&(this._estKey=a,this._api.estimate(t,s.block.temperature).then(r=>{this._estKey===a&&(this._est=r)}).catch(()=>{this._estKey===a&&(this._est=null)}))}willUpdate(t){t.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._reload())}get _api(){return Et(t=>this.hass.callWS(t))}_t(t,i){return Tt(this.hass?.language,t,i)}async _reload(){this._data=await this._api.list(),this._selected||(this._selected=Object.keys(this._data.assignments)[0]??""),this._syncProfile()}_name(t){let i=this.hass.states[t]?.attributes?.friendly_name;return i||(t.split(".")[1]??t).replace(/_/g," ").replace(/^./,n=>n.toUpperCase())}_users(t){return Object.entries(this._data.assignments).filter(([,i])=>i.profile_id===t).map(([i])=>i)}_syncProfile(){let t=this._data?.assignments[this._selected];t?this._profile?.id!==t.profile_id&&(this._profile=structuredClone(this._data.profiles[t.profile_id])):this._profile=null}_select(t){this._selected=t,this._room=null,this._profile=null,this._syncProfile()}async _makeOwn(t){let i=this._data.assignments[t],s=i?structuredClone(this._data.profiles[i.profile_id].blocks):[],n={id:Mt("p"),name:this._name(t),blocks:s};await this._api.saveProfile(n),await this._api.assign(t,n.id)}async _do(t){await t(),await this._reload()}async _try(t){this._retry=t,this._error="";try{await this._do(t)}catch(i){let s=i?.message;this._error=s||this._t("actionFailed")}}async _setMode(t,i){this._modeOpen=!1;try{await this.hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:i})}catch(s){this._error=s?.message||this._t("actionFailed")}}_modeName(t){let i={heat:"heating",cool:"cooling",off:"off",auto:"auto",heat_cool:"auto",dry:"dry",fan_only:"fan"};return this._t(i[t]??t)}_go(t){this._view=t,t!=="schedule"&&(this._editIndex=null)}_openSchedule(){this._syncProfile(),this._scheduleDay=zt(),this._editIndex=null,this._view="schedule"}_back(){if(this._view==="schedule"&&this._editIndex!==null){this._editIndex=null;return}if(this._view==="schedule"){this._profile=null,this._syncProfile(),this._go("settings");return}this._go(this._view==="settings"?"summary":"settings")}async _saveProfile(){let t=this._profile;await this._try(()=>this._api.saveProfile(t)),this._error||this._go("settings")}_status(t){let i=this.hass.states[`sensor.${t.split(".")[1]}_scheduler`];return i?i.state==="override"?this._t("until",{t:String(i.attributes.override_until??"").slice(11,16)}):this._t(i.state):""}_sensorState(t){return this.hass.states[`sensor.${t.split(".")[1]}_scheduler`]?.state??""}_hvac(t){return this.hass.states[t]?.state??"off"}_targetTemp(t){let i=this.hass.states[t]?.attributes?.temperature;return i==null?null:Number(i)}_fmt(t){return new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number(t))}_dayNames(){return this._t("days").split(",")}_dayList(t){let i=this._dayNames(),s=[...t].sort((a,r)=>a-r),n=[];for(let a of s){let r=n[n.length-1];r&&a===r[r.length-1]+1?r.push(a):n.push([a])}return n.map(a=>a.length>2?`${i[a[0]]}\u2013${i[a[a.length-1]]}`:a.map(r=>i[r]).join(", ")).join(", ")}_blockTone(t){return t.hvac_mode==="cool"?"cool":"heat"}_statusInfo(t){let i=this._sensorState(t),s=this._hvac(t),n=i==="blocked"?"danger":i==="override"?"accent":i==="disabled"?"off":s==="cool"?"cool":"heat",a={override:"mdi:hand-back-left",blocked:"mdi:lock",disabled:"mdi:pause-circle-outline",scheduled:"mdi:calendar-clock"},r=i==="override"?`${this._t("override")} \xB7 ${this._status(t)}`:this._status(t);return this.hass.states[`sensor.${t.split(".")[1]}_scheduler`]?.attributes?.preheating&&(r=`${r} \xB7 ${this._t("preheating")}`),{key:i,tone:n,icon:a[i]??"mdi:thermostat",text:r}}_nextBlock(t){if(!t||!t.blocks.length)return null;let i=new Date;for(let s=0;s<8;s++){let n=new Date(i.getFullYear(),i.getMonth(),i.getDate()+s),a=(n.getDay()+6)%7,r=null;for(let l of t.blocks){if(!l.days.includes(a))continue;let[h,u]=l.start.split(":").map(Number),p=new Date(n.getFullYear(),n.getMonth(),n.getDate(),h,u);p>i&&(!r||p<r.at)&&(r={at:p,block:l})}if(r)return{...r,k:s,wd:a}}return null}render(){return this._data?c`<div class="wrap">
      ${this._error?c`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${()=>this._retry&&this._try(this._retry)}>${this._t("retry")}</button>
      </div>`:d}
      ${Ct(this._view,c`<div class="view-in">${this._renderView()}</div>`)}
    </div>`:d}_renderView(){switch(this._view){case"settings":return this._renderSettings();case"schedule":return this._renderSchedule();case"conditions":return this._renderConditions();case"history":return this._renderHistory();default:return this._renderSummary()}}_tempParts(t){let i=new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).formatToParts(t),s=i.filter(a=>a.type==="integer"||a.type==="group"||a.type==="minusSign").map(a=>a.value).join(""),n=i.filter(a=>a.type==="decimal"||a.type==="fraction").map(a=>a.value).join("");return{int:s,dec:n}}_modeLabel(t){let i=this._hvac(t);return i==="cool"?this._t("cooling"):i==="heat"?this._t("heating"):this._t("off")}_renderSummary(){let t=this._selected,i=this._data.assignments[t],s=this._statusInfo(t),n=this._targetTemp(t),a=n==null?null:this._tempParts(n),r=n==null?0:Math.min(1,Math.max(0,(n-nt)/(Rt-nt))),l=i?this._nextBlock(this._data.profiles[i.profile_id]):null,h=this._dayNames(),u=l?l.k===0?"":l.k===1?`${this._t("tomorrow")} `:`${h[l.wd]} `:"",p=this._hvac(t),g=p==="cool"?"cool":p==="heat"?"heat":"off",_=this.hass.states[t]?.attributes?.hvac_modes??[];return c`<section class="hero tone-${g}" data-climate=${t}>
      <button class="hero-top" aria-label=${`${this._t("settings")}: ${this._name(t)}`} @click=${()=>this._go("settings")}>
        <span class="hero-name">${this._name(t)}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
      </button>
      <span class="dial" style="--p: ${r}" role="img" aria-label=${`${this._t("target")} ${n==null?"\u2013":this._fmt(n)} \xB0`}>
        <span class="ring"></span>
        <span class="knob-wrap"><span class="knob"></span></span>
        <span class="dial-center">
          <span class="num">${a?a.int:"\u2013"}${a&&a.dec?c`<sup>${a.dec}</sup>`:d}<span class="deg">°</span></span>
          <span class="dial-mode">${this._modeLabel(t)}</span>
        </span>
      </span>
      <span class="pill status-pill tone-${s.tone}"><ha-icon icon=${s.icon}></ha-icon>${s.text}</span>
      <span class="tiles">
        <button class="tile mode-tile" aria-expanded=${this._modeOpen} aria-controls="mode-picker"
          @click=${()=>this._modeOpen=!this._modeOpen}>
          <ha-icon icon=${p==="cool"?"mdi:snowflake":"mdi:fire"}></ha-icon>
          <span class="t-label">${this._t("mode")}</span>
          <span class="t-value">${this._modeLabel(t)}</span>
        </button>
        ${l?c`<span class="tile">
          <span class="t-label">${this._t("next")}</span>
          <span class="t-value">${u}${l.block.start}</span>
          <span class="t-sub">${this._fmt(l.block.temperature)}°</span>
          ${this._estimateLine(l)}
        </span>`:d}
      </span>
      ${this._modeOpen&&_.length?c`<div id="mode-picker" class="mode-picker" role="group" aria-label=${this._t("changeMode")}>
        ${_.map(b=>c`<button type="button" aria-pressed=${b===p} @click=${()=>this._setMode(t,b)}>${this._modeName(b)}</button>`)}
      </div>`:d}
      ${i?d:c`<span class="footnote">${this._t("emptySchedule")}</span>`}
    </section>`}_estimateLine(t){let i=this._est;if(!i)return d;if(i.minutes==null){let r={inside:"noInside",outdoor:"noOutdoor",unreachable:"unreachable"};return c`<span class="t-sub est-warn">${this._t(r[i.reason??"unreachable"])}</span>`}let n=new Date(t.at.getTime()-i.minutes*6e4).toLocaleTimeString(this.hass?.language??"en",{hour:"2-digit",minute:"2-digit"}),a=i.configured?i.samples?this._t("calibrated",{x:i.samples}):"":this._t("genericEstimate");return c`<span class="t-sub est" title=${a}>${this._t("startAt")} ${n}</span>
      <span class="t-sub">${this._t("estMinutes",{x:i.minutes})}</span>`}_roomView(t){return this._room??this._data.rooms?.[t]??{area_m2:20,height_m:2.7}}_patchRoom(t,i){this._room={...this._roomView(t),...i}}_renderHouse(t){let i=this._roomView(t);return c`<h3>${this._t("house")}</h3>
      <div class="group tile-group">
        <label class="row"><span>${this._t("area")}</span>
          <input type="number" min="5" max="500" step="1" .value=${String(i.area_m2)} @change=${s=>this._patchRoom(t,{area_m2:Number(m(s))})} /></label>
        <label class="row"><span>${this._t("height")}</span>
          <input type="number" min="2" max="6" step="0.1" .value=${String(i.height_m)} @change=${s=>this._patchRoom(t,{height_m:Number(m(s))})} /></label>
        <label class="row"><span>${this._t("preheat")}</span>
          <input type="checkbox" role="switch" data-action="preheat" .checked=${(this._data.preheat??[]).includes(t)}
            @change=${s=>this._try(()=>this._api.setPreheat(t,st(s)))} /></label>
        <p class="footnote">${this._t("preheatHint")}</p>
        <p class="footnote">${this._t("houseHint")}</p>
        <button class="nav" data-action="save-room" @click=${()=>this._saveRoom(t)}>${this._t("saveHouse")}</button>
      </div>`}async _saveRoom(t){let i=this._roomView(t);await this._try(()=>this._api.setRoom(t,i)),this._error||(this._room=null)}_renderSettings(){let t=this._data,i=this._selected,s=t.assignments[i],n=s?this._users(s.profile_id).filter(r=>r!==i):[],a=this._statusInfo(i);return c`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._name(i)}</h2>
        <span class="spacer"></span>
      </div>
      <div class="status tone-${a.tone}" data-climate=${i}>
        <span class="status-text"><ha-icon icon=${a.icon}></ha-icon>${a.text}</span>
        ${a.key==="override"?c`<button class="pill" data-action="clear-override"
          @click=${()=>this._try(()=>this._api.clearOverride(i))}>${this._t("clearOverride")}</button>`:d}
      </div>
      ${s?c`<div class="group">
        <label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${s.enabled}
            @change=${r=>this._try(()=>this._api.assign(i,s.profile_id,{enabled:st(r)}))} />
        </label>
        <button class="nav" data-action="open-schedule" @click=${()=>this._openSchedule()}>
          <span>${this._t("timeSlots")}</span><span class="value">${t.profiles[s.profile_id].name}</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
        <button class="nav" data-action="conditions" @click=${()=>this._go("conditions")}>
          <span>${this._t("conditions")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
        <button class="nav" data-action="history" @click=${()=>this._openHistory()}>
          <span>${this._t("history")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>`:d}
      <div class="group">
        <div class="stack">
          <span class="caption">${this._t("schedule")}</span>
          <select data-action="link" @change=${r=>m(r)&&this._try(()=>this._api.assign(i,m(r)))}>
            ${s?d:c`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(t.profiles).map(r=>c`<option value=${r.id} ?selected=${r.id===s?.profile_id}>${r.name} (${this._users(r.id).map(l=>this._name(l)).join(", ")||"-"})</option>`)}
          </select>
        </div>
        <button class="nav" data-action="own" @click=${()=>this._try(()=>this._makeOwn(i))}>${this._t("ownSchedule")}</button>
        ${n.length?c`<p class="footnote">${this._t("sharedWith",{x:n.map(r=>this._name(r)).join(", ")})}</p>`:d}
      </div>
      ${this._renderHouse(i)}
      ${s?c`<div class="group">
        <button class="nav danger" @click=${()=>this._try(()=>this._api.unassign(i))}>${this._t("unassign")}</button>
      </div>`:d}`}_renderSchedule(){let t=this._profile;if(!t)return c`<div class="topbar">
          <button class="back" @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
          <h2>${this._t("timeSlots")}</h2><span class="spacer"></span>
        </div>
        <div class="group"><div class="empty"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon><p>${this._t("emptySchedule")}</p></div></div>`;if(this._editIndex!==null&&t.blocks[this._editIndex])return this._renderSlotEditor(this._editIndex);let i=this._dayNames(),s=this._scheduleDay,n=t.blocks.map((a,r)=>({block:a,i:r})).filter(({block:a})=>a.days.includes(s)).sort((a,r)=>a.block.start.localeCompare(r.block.start));return c`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${t.name}</h2><span class="spacer"></span>
      </div>
      <div class="tabs" role="group" aria-label=${this._t("days")}>
        ${V.map(a=>c`<button type="button" class="tab" aria-pressed=${a===s} @click=${()=>{this._scheduleDay=a,this._copyTargets=null}}>${i[a]}</button>`)}
      </div>
      <div class="slots">
        ${n.length?n.map(({block:a,i:r})=>c`<button class="slot tone-${this._blockTone(a)}" @click=${()=>this._editIndex=r}>
          <span class="chip">${this._fmt(a.temperature)}°</span>
          <span class="mode">${a.hvac_mode??this._dayList(a.days)}</span>
          <time datetime=${a.start}>${a.start}</time>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`):c`<p class="footnote">${this._t("noBlocksDay")}</p>`}
        <button class="add-pill" @click=${()=>this._addBlock()}><ha-icon icon="mdi:plus"></ha-icon>${this._t("addBlock")}</button>
        ${this._renderCopy(s,n.length>0)}
      </div>
      <div class="actions">
        <button class="primary" data-action="save-profile" @click=${()=>this._saveProfile()}>${this._t("save")}</button>
        <button class="ghost" @click=${()=>this._back()}>${this._t("cancel")}</button>
      </div>`}_renderCopy(t,i){let s=this._copyTargets;if(!s)return i?c`<button class="add-pill" data-action="copy-day" @click=${()=>this._copyTargets=[]}><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDay")}</button>`:d;let n=this._dayNames(),a=l=>this._copyTargets=s.includes(l)?s.filter(h=>h!==l):[...s,l],r=l=>this._copyTargets=l.filter(h=>h!==t);return c`<div class="group copy-panel" data-role="copy-panel">
      <div class="stack"><span class="caption">${this._t("copyDayTo",{x:n[t]})}</span></div>
      <div class="seg" role="group" aria-label=${this._t("days")}>
        ${V.map(l=>c`<button type="button" data-day=${l} ?disabled=${l===t} aria-pressed=${s.includes(l)} @click=${()=>a(l)}>${n[l]}</button>`)}
      </div>
      <div class="presets">
        <button type="button" class="ghost" @click=${()=>r([0,1,2,3,4])}>${this._t("weekdays")}</button>
        <button type="button" class="ghost" @click=${()=>r([5,6])}>${this._t("weekend")}</button>
        <button type="button" class="ghost" @click=${()=>r(V)}>${this._t("allDays")}</button>
      </div>
      <p class="footnote">${this._t("copyDayHint")}</p>
      <div class="actions">
        <button class="primary" data-action="apply-copy" ?disabled=${!s.length} @click=${()=>this._applyCopy(t,s)}>${this._t("apply")}</button>
        <button class="ghost" @click=${()=>this._copyTargets=null}>${this._t("cancel")}</button>
      </div>
    </div>`}_applyCopy(t,i){this._patchProfile(s=>s.blocks=Pt(s.blocks,t,i)),this._copyTargets=null}_addBlock(){this._patchProfile(t=>t.blocks.push({days:[this._scheduleDay],start:"06:30",temperature:20,hvac_mode:null})),this._editIndex=this._profile.blocks.length-1}_renderSlotEditor(t){let i=this._profile.blocks[t],s=this._dayNames();return c`<div class="topbar">
        <button class="back" @click=${()=>this._editIndex=null}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("timeSlots")}</button>
        <h2>${this._t("slot")}</h2><span class="spacer"></span>
      </div>
      <div class="editor">
        <div class="hero-slot tone-${this._blockTone(i)}">
          <div class="stepper">
            <button type="button" class="round" aria-label=${this._t("lower")} @click=${()=>this._stepTemp(t,-W)}>−</button>
            <output class="big" aria-live="polite">${this._fmt(i.temperature)}°</output>
            <button type="button" class="round" aria-label=${this._t("raise")} @click=${()=>this._stepTemp(t,W)}>+</button>
          </div>
          <label class="time-field">
            <span class="caption">${this._t("start")}</span>
            <input type="time" class="big-time" .value=${i.start} @input=${n=>this._patchProfile(a=>a.blocks[t].start=m(n))} />
          </label>
        </div>
        <div class="group tile-group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${V.map(n=>c`<button type="button" aria-pressed=${i.days.includes(n)}
              @click=${()=>this._patchProfile(a=>{let r=new Set(a.blocks[t].days);r.has(n)?r.delete(n):r.add(n),a.blocks[t].days=[...r].sort()})}>${s[n]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("mode")}</span>
            <input type="text" .value=${i.hvac_mode??""} placeholder=${this._t("mode")}
              @input=${n=>this._patchProfile(a=>a.blocks[t].hvac_mode=m(n)||null)} />
          </label>
        </div>
        <button class="danger wide" @click=${()=>{this._patchProfile(n=>n.blocks.splice(t,1)),this._editIndex=null}}>${this._t("removeBlock")}</button>
        <button class="primary wide" @click=${()=>this._editIndex=null}>${this._t("done")}</button>
      </div>`}_patchProfile(t){let i=structuredClone(this._profile);t(i),this._profile=i}_stepTemp(t,i){this._patchProfile(s=>s.blocks[t].temperature=Kt(s.blocks[t].temperature+i))}_actionLabel(t){return t.action.kind==="off"?this._t("actionOff"):this._t("actionMin",{x:t.action.temperature??""})}_patchCondition(t){let i=structuredClone(this._condition);t(i),this._condition=i}_openHistory(){this._historyFilter="all",this._go("history"),this._loadHistory()}async _loadHistory(){this._history=null;try{this._history=await this._api.log(200)}catch(t){this._history=[],this._error=t?.message||this._t("actionFailed")}}_logTitle(t){return t.action.startsWith("servizio ")?`${this._t("logService")}: ${t.action.slice(9)}`:new Set(["save_profile","delete_profile","save_condition","delete_condition","assign","unassign","clear_override","set_room","set_preheat","override","override_scaduto","ciclo_appreso","condizione_attiva","condizione_finita","fascia","preriscaldamento"]).has(t.action)?this._t(`log_${t.action}`):t.action}_renderHistory(){let t=this._historyFilter,i=(this._history??[]).filter(n=>t==="all"||n.source===t).slice().reverse(),s=[["all","logAll"],["manual","logManual"],["auto","logAuto"]];return c`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("history")}</h2>
        <button class="pill" @click=${()=>this._loadHistory()}>${this._t("refresh")}</button>
      </div>
      <div class="seg three" role="group" aria-label=${this._t("history")}>
        ${s.map(([n,a])=>c`<button type="button" aria-pressed=${n===t} @click=${()=>this._historyFilter=n}>${this._t(a)}</button>`)}
      </div>
      <div class="group">
        ${this._history===null?c`<p class="footnote">…</p>`:i.length?i.map(n=>c`<div class="row log-row">
              <span class="src src-${n.source}">${this._t(n.source==="manual"?"logManual":"logAuto")}</span>
              <span class="log-body">
                <span class="log-title">${this._logTitle(n)}</span>
                <span class="t-sub">${this._logTime(n.ts)}${n.climate?` \xB7 ${this._name(n.climate)}`:""}</span>
                ${n.detail?c`<span class="t-sub">${n.detail}</span>`:d}
              </span>
            </div>`):c`<p class="footnote">${this._t("noHistory")}</p>`}
      </div>`}_logTime(t){return new Date(t).toLocaleString(this.hass?.language??"en",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}_renderConditions(){let t=this._data,i=this._selected,s=t.assignments[i];return c`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("conditions")}</h2><span class="spacer"></span>
      </div>
      <div class="group cond-list">
        ${Object.values(t.conditions).map(n=>c`<div class="row">
          <b>${n.name}</b>
          <span class="meta">${n.checks.map(a=>`${a.entity_id} ${a.op} ${a.value}`).join(n.match==="all"?" & ":" | ")}</span>
          <span class="meta">${this._t("delaySec",{x:n.delay})}</span>
          <span class="meta">${this._actionLabel(n)}</span>
          ${s?c`<label class="switch-row"><span class="caption">${this._t("forThis")}</span>
            <input type="checkbox" role="switch" aria-label=${`${n.name}: ${this._name(i)}`} .checked=${s.condition_ids.includes(n.id)}
              @change=${a=>this._try(()=>this._api.assign(i,s.profile_id,{condition_ids:st(a)?[...s.condition_ids,n.id]:s.condition_ids.filter(r=>r!==n.id)}))} /></label>`:d}
          <button class="pill" @click=${()=>this._condition=structuredClone(n)}>${this._t("edit")}</button>
          <button class="pill danger" @click=${()=>this._try(()=>this._api.deleteCondition(n.id))}>${this._t("delete")}</button>
        </div>`)}
        <div class="row">
          <button class="wide" @click=${()=>this._condition={id:Mt("c"),name:"",checks:[],match:"all",delay:120,action:{kind:"off",temperature:null}}}>${this._t("newCondition")}</button>
        </div>
      </div>
      ${this._condition?c`<div class="group cond-editor">
        <input type="text" .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${n=>this._patchCondition(a=>a.name=m(n))} />
        <select @change=${n=>this._patchCondition(a=>a.match=m(n))}>
          <option value="all" ?selected=${this._condition.match==="all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match==="any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((n,a)=>c`<div class="row">
          <input type="text" placeholder=${this._t("entity")} .value=${n.entity_id} @input=${r=>this._patchCondition(l=>l.checks[a].entity_id=m(r))} />
          <select @change=${r=>this._patchCondition(l=>l.checks[a].op=m(r))}>
            ${["=","!=",">","<"].map(r=>c`<option ?selected=${n.op===r}>${r}</option>`)}
          </select>
          <input type="text" placeholder=${this._t("value")} .value=${n.value} @input=${r=>this._patchCondition(l=>l.checks[a].value=m(r))} />
          <button class="pill danger" @click=${()=>this._patchCondition(r=>r.checks.splice(a,1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${()=>this._patchCondition(n=>n.checks.push({entity_id:"",op:"=",value:"on"}))}>${this._t("addCheck")}</button>
        <div class="row">
          <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")} aria-label=${this._t("delay")}
            @input=${n=>this._patchCondition(a=>a.delay=Number(m(n)))} />
          <select @change=${n=>this._patchCondition(a=>a.action.kind=m(n))}>
            <option value="off" ?selected=${this._condition.action.kind==="off"}>${this._t("actionOff")}</option>
            <option value="min_setpoint" ?selected=${this._condition.action.kind==="min_setpoint"}>${this._t("actionMin",{x:""})}</option>
          </select>
          ${this._condition.action.kind==="min_setpoint"?c`<input type="number" step="0.5" .value=${String(this._condition.action.temperature??12)}
            @input=${n=>this._patchCondition(a=>a.action.temperature=Number(m(n)))} />`:d}
        </div>
        <div class="actions">
          <button class="primary" data-action="save-condition" @click=${()=>this._try(async()=>{await this._api.saveCondition(this._condition),this._condition=null})}>${this._t("save")}</button>
          <button @click=${()=>this._condition=null}>${this._t("cancel")}</button>
        </div>
      </div>`:d}`}};customElements.define("thermo-scheduler-card",at);window.customCards=window.customCards??[];window.customCards.push({type:"thermo-scheduler-card",name:"Thermo Scheduler",description:"Stato, prossima fascia e programmazione di un termostato"});
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
