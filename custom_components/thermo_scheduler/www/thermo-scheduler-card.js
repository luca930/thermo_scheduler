var R=globalThis,z=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),et=new WeakMap,S=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&et.set(e,t))}return t}toString(){return this.cssText}},it=o=>new S(typeof o=="string"?o:o+"",void 0,B),L=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new S(e,o,B)},st=(o,t)=>{if(z)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=R.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},j=z?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return it(e)})(o):o;var{is:kt,defineProperty:At,getOwnPropertyDescriptor:St,getOwnPropertyNames:Et,getOwnPropertySymbols:Ct,getPrototypeOf:Pt}=Object,U=globalThis,nt=U.trustedTypes,Mt=nt?nt.emptyScript:"",Tt=U.reactiveElementPolyfillSupport,E=(o,t)=>o,I={toAttribute(o,t){switch(t){case Boolean:o=o?Mt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},rt=(o,t)=>!kt(o,t),ot={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??=Symbol("metadata"),U.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&At(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=St(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let l=s?.call(this);r?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ot}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){let e=this.properties,i=[...Et(e),...Ct(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(j(s))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return st(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:I;this._$Em=s;let l=n.fromAttribute(e,r.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let n=this.constructor;if(s===!1&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??rt)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[E("elementProperties")]=new Map,g[E("finalized")]=new Map,Tt?.({ReactiveElement:g}),(U.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,at=o=>o,H=J.trustedTypes,lt=H?H.createPolicy("lit-html",{createHTML:o=>o}):void 0,_t="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+v,Ot=`<${mt}>`,x=document,P=()=>x.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,Nt=o=>X(o)||typeof o?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,dt=/>/g,b=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,pt=/"/g,gt=/^(?:script|style|textarea|title)$/i,Y=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),d=Y(1),Vt=Y(2),Ft=Y(3),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ut=new WeakMap,y=x.createTreeWalker(x,129);function ft(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(t):t}var Rt=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",n=C;for(let l=0;l<e;l++){let a=o[l],h,u,p=-1,m=0;for(;m<a.length&&(n.lastIndex=m,u=n.exec(a),u!==null);)m=n.lastIndex,n===C?u[1]==="!--"?n=ct:u[1]!==void 0?n=dt:u[2]!==void 0?(gt.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=b):u[3]!==void 0&&(n=b):n===b?u[0]===">"?(n=s??C,p=-1):u[1]===void 0?p=-2:(p=n.lastIndex-u[2].length,h=u[1],n=u[3]===void 0?b:u[3]==='"'?pt:ht):n===pt||n===ht?n=b:n===ct||n===dt?n=C:(n=b,s=void 0);let f=n===b&&o[l+1].startsWith("/>")?" ":"";r+=n===C?a+Ot:p>=0?(i.push(h),a.slice(0,p)+_t+a.slice(p)+v+f):a+v+(p===-2?l:f)}return[ft(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},T=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,l=t.length-1,a=this.parts,[h,u]=Rt(t,e);if(this.el=o.createElement(h,i),y.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=y.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(_t)){let m=u[n++],f=s.getAttribute(p).split(v),N=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:N[2],strings:f,ctor:N[1]==="."?F:N[1]==="?"?q:N[1]==="@"?K:A}),s.removeAttribute(p)}else p.startsWith(v)&&(a.push({type:6,index:r}),s.removeAttribute(p));if(gt.test(s.tagName)){let p=s.textContent.split(v),m=p.length-1;if(m>0){s.textContent=H?H.emptyScript:"";for(let f=0;f<m;f++)s.append(p[f],P()),y.nextNode(),a.push({type:2,index:++r});s.append(p[m],P())}}}else if(s.nodeType===8)if(s.data===mt)a.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(v,p+1))!==-1;)a.push({type:7,index:r}),p+=v.length-1}r++}}static createElement(t,e){let i=x.createElement("template");return i.innerHTML=t,i}};function k(o,t,e=o,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=M(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=k(o,s._$AS(o,t.values),s,i)),t}var V=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);y.currentNode=s;let r=y.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new O(r,r.nextSibling,this,t):a.type===1?h=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(h=new G(r,this,t)),this._$AV.push(h),a=i[++l]}n!==a?.index&&(r=y.nextNode(),n++)}return y.currentNode=x,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},O=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),M(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=T.createElement(ft(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new V(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new T(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new o(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=at(t).nextSibling;at(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=k(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{let l=t,a,h;for(t=r[0],a=0;a<r.length-1;a++)h=k(this,l[i+a],e,a),h===w&&(h=this._$AH[a]),n||=!M(h)||h!==this._$AH[a],h===c?t=c:t!==c&&(t+=(h??"")+r[a+1]),this._$AH[a]=h}n&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends A{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},q=class extends A{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},K=class extends A{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??c)===w)return;let i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}};var zt=J.litHtmlPolyfillSupport;zt?.(T,O),(J.litHtmlVersions??=[]).push("3.3.3");var vt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new O(t.insertBefore(P(),r),r,void 0,e??{})}return s._$AI(o),s};var Z=globalThis,$=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};$._$litElement$=!0,$.finalized=!0,Z.litElementHydrateSupport?.({LitElement:$});var Ut=Z.litElementPolyfillSupport;Ut?.({LitElement:$});(Z.litElementVersions??=[]).push("4.2.2");var $t=o=>({list:()=>o({type:"thermo_scheduler/list"}),saveProfile:t=>o({type:"thermo_scheduler/save_profile",profile:t}),deleteProfile:t=>o({type:"thermo_scheduler/delete_profile",profile_id:t}),saveCondition:t=>o({type:"thermo_scheduler/save_condition",condition:t}),deleteCondition:t=>o({type:"thermo_scheduler/delete_condition",condition_id:t}),assign:(t,e,i={})=>o({type:"thermo_scheduler/assign",climate_id:t,profile_id:e,...i}),unassign:t=>o({type:"thermo_scheduler/unassign",climate_id:t}),clearOverride:t=>o({type:"thermo_scheduler/clear_override",climate_id:t})});var Ht={en:{climates:"Thermostats",profiles:"Schedules",conditions:"Conditions",until:"Until {t}",scheduled:"Scheduled",override:"Manual",blocked:"Blocked",disabled:"Disabled",clearOverride:"Back to schedule",enable:"Enable",disable:"Disable",unassign:"Remove",assign:"Assign",addClimate:"Add thermostat",save:"Save",cancel:"Cancel",edit:"Edit",delete:"Delete",newProfile:"New schedule",newCondition:"New condition",name:"Name",start:"Start",temperature:"Temperature",mode:"Mode",addBlock:"Add block",removeBlock:"Remove block",entity:"Entity",value:"Value",match:"Match",all:"All",any:"Any",addCheck:"Add check",delay:"Delay (s)",action:"Action",actionOff:"Turn off",actionMin:"Minimum setpoint {x}",delaySec:"delay {x}s",useSchedule:"Use schedule of\u2026",ownSchedule:"Own schedule",sharedWith:"Shared with: {x}",days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun",configure:"Configure",active:"Active",schedule:"Schedule",noBlocks:"No schedule blocks",emptySchedule:"No schedule for this thermostat",heating:"Heating",cooling:"Cooling",off:"Off",target:"Target",lower:"Lower by 0.5 \xB0",raise:"Raise by 0.5 \xB0",actionFailed:"Action failed",retry:"Retry"},it:{climates:"Termostati",profiles:"Programmazioni",conditions:"Condizioni",until:"Fino alle {t}",scheduled:"Programmato",override:"Manuale",blocked:"Bloccato",disabled:"Disattivato",clearOverride:"Torna alla programmazione",enable:"Attiva",disable:"Disattiva",unassign:"Rimuovi",assign:"Assegna",addClimate:"Aggiungi termostato",save:"Salva",cancel:"Annulla",edit:"Modifica",delete:"Elimina",newProfile:"Nuova programmazione",newCondition:"Nuova condizione",name:"Nome",start:"Inizio",temperature:"Temperatura",mode:"Modalit\xE0",addBlock:"Aggiungi fascia",removeBlock:"Rimuovi fascia",entity:"Entit\xE0",value:"Valore",match:"Combinazione",all:"Tutte",any:"Almeno una",addCheck:"Aggiungi test",delay:"Ritardo (s)",action:"Azione",actionOff:"Spegni",actionMin:"Setpoint minimo {x}",delaySec:"ritardo {x}s",useSchedule:"Usa la programmazione di\u2026",ownSchedule:"Programmazione propria",sharedWith:"Condivisa con: {x}",days:"Lun,Mar,Mer,Gio,Ven,Sab,Dom",configure:"Configura",active:"Attiva",schedule:"Programmazione",noBlocks:"Nessuna fascia",emptySchedule:"Nessuna programmazione per questo termostato",heating:"Riscaldamento",cooling:"Raffrescamento",off:"Spento",target:"Obiettivo",lower:"Abbassa di 0,5 \xB0",raise:"Alza di 0,5 \xB0",actionFailed:"Operazione non riuscita",retry:"Riprova"}};function bt(o,t,e={}){return(Ht[o?.startsWith("it")?"it":"en"][t]??t).replace(/\{(\w+)\}/g,(s,r)=>String(e[r]??""))}var _=o=>o.target.value,yt=o=>o.target.checked,xt=o=>`${o}_${Date.now().toString(36)}`,Dt=[0,1,2,3,4,5,6],Q=5,wt=30,D=.5,Bt=o=>Math.min(wt,Math.max(Q,Math.round(o/D)*D)),tt=class extends ${constructor(){super(...arguments);this._data=null;this._profile=null;this._condition=null;this._selected="";this._configuring=!1;this._error="";this._retry=null;this._loaded=!1}static{this.properties={hass:{attribute:!1},_data:{state:!0},_profile:{state:!0},_condition:{state:!0},_selected:{state:!0},_configuring:{state:!0},_error:{state:!0}}}static{this.styles=L`
    :host {
      --ts-accent: var(--primary-color, #0062cc);
      --ts-heat: light-dark(#b35400, #ff9f0a);
      --ts-cool: light-dark(#0b6e99, #64d2ff);
      --ts-danger: light-dark(#c4252b, #ff6961);
      --ts-ink: var(--primary-text-color, #000);
      --ts-ink2: var(--secondary-text-color, #6e6e73);
      --ts-sep: var(--divider-color, rgba(128, 128, 128, 0.25));
      --ts-group: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--ts-ink) 6%);
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      color: var(--ts-ink);
    }
    * { box-sizing: border-box; }
    .wrap { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    h3 {
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--ts-ink2);
      margin: 24px 4px 4px;
    }
    .group {
      background: var(--ts-group);
      border-radius: 16px;
      overflow: hidden;
    }
    .group > * + * { border-top: 0.5px solid var(--ts-sep); }
    .row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      min-height: 44px;
      padding: 8px 16px;
      font-size: 17px;
      line-height: 22px;
    }
    .row > span:first-child { flex: 1; min-width: 0; }
    .footnote { margin: 0; padding: 8px 16px; font-size: 13px; line-height: 18px; color: var(--ts-ink2); }

    button, select, input {
      font: inherit;
      color: inherit;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--ts-group);
    }
    button {
      min-width: 44px;
      padding: 0 16px;
      color: var(--ts-accent);
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease, transform 150ms ease, opacity 200ms ease;
    }
    button:active { transform: scale(0.98); }
    button:hover { opacity: 0.85; }
    button.primary { background: var(--ts-accent); color: #fff; font-weight: 600; }
    button.danger { color: var(--ts-danger); }
    button.wide { width: 100%; }
    button.pill { min-height: 32px; padding: 0 12px; border-radius: 16px; font-size: 15px; }
    select, input[type="text"], input:not([type]), input[type="time"], input[type="number"] {
      padding: 0 12px;
      min-width: 0;
    }
    select.picker {
      width: 100%;
      min-height: 44px;
      font-size: 17px;
      font-weight: 600;
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
    .banner button { min-height: 32px; }

    /* stato del termostato */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 4px 4px 0; }
    .status-text { display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 600; }
    .tone-heat { --tone: var(--ts-heat); }
    .tone-cool { --tone: var(--ts-cool); }
    .tone-accent { --tone: var(--ts-accent); }
    .tone-danger { --tone: var(--ts-danger); }
    .tone-off { --tone: var(--ts-ink2); }
    .status-text { color: var(--tone, var(--ts-ink)); }
    ha-icon { --mdc-icon-size: 20px; color: var(--tone, var(--ts-ink2)); }

    /* vista C: sola lettura */
    .view { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px 0 0; }
    .dial {
      position: relative;
      width: 200px;
      height: 200px;
      --p: 0;
      color: var(--ts-ink);
    }
    .dial::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(var(--tone, var(--ts-accent)) calc(var(--p) * 270deg), var(--ts-sep) 0);
      transform: rotate(135deg);
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
      transition: background 250ms ease;
    }
    .dial-value {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      font-weight: 300;
      line-height: 56px;
    }
    .dial-value small { font-size: 26px; vertical-align: top; margin-left: 2px; }
    .dial-mode { font-size: 15px; color: var(--ts-ink2); margin-top: 4px; }
    .blocks { list-style: none; margin: 0; padding: 0; width: 100%; }
    .blocks li { display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 8px 16px; font-size: 17px; }
    .blocks li + li { border-top: 0.5px solid var(--ts-sep); }
    .blocks .days { flex: 1; color: var(--ts-ink2); font-size: 15px; }
    .blocks time { font-weight: 600; }
    .blocks .temp { min-width: 56px; text-align: right; font-weight: 600; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); flex-shrink: 0; }
    .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; color: var(--ts-ink2); }
    .empty ha-icon { --mdc-icon-size: 36px; }
    .view-actions { width: 100%; padding: 8px 0 0; }

    /* editor A */
    .editor { display: flex; flex-direction: column; gap: 8px; }
    .editor input[type="text"], .editor input:not([type]) { flex: 1; width: 100%; }
    .seg {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      padding: 2px;
      margin: 12px 16px 4px;
      border-radius: 10px;
      background: light-dark(#e9e9eb, #1c1c1e);
    }
    .seg button {
      min-width: 0;
      min-height: 36px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      background: transparent;
      color: var(--ts-ink);
    }
    .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .stepper { display: inline-flex; align-items: center; gap: 4px; }
    .stepper button { min-width: 44px; font-size: 22px; line-height: 1; }
    .stepper output { min-width: 64px; text-align: center; font-size: 17px; font-weight: 600; }
    .actions { display: flex; gap: 8px; }
    .actions button { flex: 1; }
    .sub-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

    /* condizioni */
    .cond-list .row > b { font-weight: 600; }
    .cond-list .meta { color: var(--ts-ink2); font-size: 15px; }
    .cond-editor { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    .cond-editor .row { padding: 0; min-height: 0; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
    @media (max-width: 360px) {
      .wrap { padding: 12px; }
      .dial { width: 176px; height: 176px; }
      .dial-value { font-size: 44px; }
    }
  `}setConfig(e){}getCardSize(){return 6}willUpdate(e){e.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._reload())}get _api(){return $t(e=>this.hass.callWS(e))}_t(e,i){return bt(this.hass?.language,e,i)}async _reload(){this._data=await this._api.list(),this._selected||(this._selected=Object.keys(this._data.assignments)[0]??""),this._syncProfile()}_name(e){return this.hass.states[e]?.attributes?.friendly_name??e}_users(e){return Object.entries(this._data.assignments).filter(([,i])=>i.profile_id===e).map(([i])=>i)}_syncProfile(){let e=this._data?.assignments[this._selected];e?this._profile?.id!==e.profile_id&&(this._profile=structuredClone(this._data.profiles[e.profile_id])):this._profile=null}_select(e){this._selected=e,this._profile=null,this._syncProfile()}async _makeOwn(e){let i=this._data.assignments[e],s=i?structuredClone(this._data.profiles[i.profile_id].blocks):[],r={id:xt("p"),name:this._name(e),blocks:s};await this._api.saveProfile(r),await this._api.assign(e,r.id)}async _do(e){await e(),await this._reload()}async _try(e){this._retry=e,this._error="";try{await this._do(e)}catch{this._error=this._t("actionFailed")}}_openEditor(){this._syncProfile(),this._profile&&(this._configuring=!0)}_closeEditor(){this._profile=null,this._syncProfile(),this._configuring=!1}async _saveProfile(){let e=this._profile;await this._try(()=>this._api.saveProfile(e)),this._error||(this._configuring=!1)}_status(e){let i=this.hass.states[`sensor.${e.split(".")[1]}_scheduler`];return i?i.state==="override"?this._t("until",{t:String(i.attributes.override_until??"").slice(11,16)}):this._t(i.state):""}_sensorState(e){return this.hass.states[`sensor.${e.split(".")[1]}_scheduler`]?.state??""}_hvac(e){return this.hass.states[e]?.state??"off"}_targetTemp(e){let i=this.hass.states[e]?.attributes?.temperature;return i==null?null:Number(i)}_fmt(e){return new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number(e))}_dayNames(){return this._t("days").split(",")}_dayList(e){let i=this._dayNames();return e.map(s=>i[s]).join(" ")}_blockTone(e){return e.hvac_mode==="cool"?"cool":"heat"}_actionLabel(e){return e.action.kind==="off"?this._t("actionOff"):this._t("actionMin",{x:e.action.temperature??""})}_patchProfile(e){let i=structuredClone(this._profile);e(i),this._profile=i}_stepTemp(e,i){this._patchProfile(s=>s.blocks[e].temperature=Bt(s.blocks[e].temperature+i))}_patchCondition(e){let i=structuredClone(this._condition);e(i),this._condition=i}render(){return this._data?d`<div class="wrap">
      ${this._error?d`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${()=>this._retry&&this._try(this._retry)}>${this._t("retry")}</button>
      </div>`:c}
      ${this._renderClimates()}
      ${this._renderConditions()}
    </div>`:c}_renderClimates(){let e=this._data,i=Object.keys(this.hass.states).filter(s=>s.startsWith("climate."));return d`<h3>${this._t("climates")}</h3>
      <div class="group">
        <div class="row">
          <select class="picker" aria-label=${this._t("climates")}
            @change=${s=>{this._configuring=!1,this._select(_(s))}}>
            ${i.map(s=>d`<option value=${s} ?selected=${s===this._selected}>${this._name(s)}${s in e.assignments?" \u2713":""}</option>`)}
          </select>
        </div>
      </div>
      ${this._selected?this._renderThermostat(this._selected):c}`}_renderThermostat(e){let i=this._data,s=i.assignments[e],r=s?this._users(s.profile_id).filter(n=>n!==e):[];return d`<div data-climate=${e}>
      ${this._renderStatus(e)}
      ${this._configuring&&this._profile?this._renderEditor():this._renderView(e)}
      <div class="group">
        ${s?d`<label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${s.enabled}
            @change=${n=>this._try(()=>this._api.assign(e,s.profile_id,{enabled:yt(n)}))} />
        </label>`:c}
        <div class="row">
          <span>${this._t("schedule")}</span>
          <select data-action="link" @change=${n=>_(n)&&this._try(()=>this._api.assign(e,_(n)))}>
            ${s?c:d`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(i.profiles).map(n=>d`<option value=${n.id} ?selected=${n.id===s?.profile_id}>${n.name} (${this._users(n.id).map(l=>this._name(l)).join(", ")||"-"})</option>`)}
          </select>
        </div>
        <div class="row">
          <button data-action="own" class="wide" @click=${()=>this._try(()=>this._makeOwn(e))}>${this._t("ownSchedule")}</button>
        </div>
        ${r.length?d`<p class="footnote">${this._t("sharedWith",{x:r.map(n=>this._name(n)).join(", ")})}</p>`:c}
        ${s?Object.values(i.conditions).map(n=>d`<label class="row">
          <span>${n.name}</span>
          <input type="checkbox" role="switch" .checked=${s.condition_ids.includes(n.id)}
            @change=${l=>this._try(()=>this._api.assign(e,s.profile_id,{condition_ids:yt(l)?[...s.condition_ids,n.id]:s.condition_ids.filter(a=>a!==n.id)}))} />
        </label>`):c}
        ${s?d`<div class="row">
          <button class="danger wide" @click=${()=>this._try(()=>this._api.unassign(e))}>${this._t("unassign")}</button>
        </div>`:c}
      </div>
    </div>`}_renderStatus(e){let i=this._sensorState(e),s=i==="blocked"?"danger":i==="override"?"accent":i==="disabled"?"off":this._hvac(e)==="cool"?"cool":"heat",r={override:"mdi:hand-back-left",blocked:"mdi:lock",disabled:"mdi:pause-circle-outline",scheduled:"mdi:calendar-clock"},n=i==="override"?`${this._t("override")} \xB7 ${this._status(e)}`:this._status(e);return n?d`<div class="status tone-${s}">
      <span class="status-text" role="status">
        <ha-icon icon=${r[i]??"mdi:thermostat"}></ha-icon>${n}
      </span>
      ${i==="override"?d`<button class="pill" data-action="clear-override"
        @click=${()=>this._try(()=>this._api.clearOverride(e))}>${this._t("clearOverride")}</button>`:c}
    </div>`:c}_renderView(e){if(!this._profile)return d`<div class="group"><div class="empty">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <p>${this._t("emptySchedule")}</p>
      </div></div>`;let i=this._hvac(e),s=i==="cool"?"cool":i==="heat"?"heat":"off",r=i==="cool"?this._t("cooling"):i==="heat"?this._t("heating"):this._t("off"),n=this._targetTemp(e),l=n==null?0:Math.min(1,Math.max(0,(n-Q)/(wt-Q))),a=this._profile.blocks;return d`<div class="view tone-${s}">
      <div class="dial" style="--p: ${l}" role="img" aria-label=${`${this._t("target")} ${n==null?"\u2013":this._fmt(n)} \xB0`}>
        <span class="dial-value">${n==null?"\u2013":this._fmt(n)}<small>°</small>
          <span class="dial-mode">${r}</span>
        </span>
      </div>
      <div class="group blocks-group" style="width:100%">
        ${a.length?d`<ul class="blocks" aria-label=${this._profile.name}>
          ${a.map(h=>d`<li class="tone-${this._blockTone(h)}">
            <i class="dot"></i>
            <span class="days">${this._dayList(h.days)}</span>
            <time datetime=${h.start}>${h.start}</time>
            <span class="temp">${this._fmt(h.temperature)}°</span>
          </li>`)}
        </ul>`:d`<p class="footnote">${this._t("noBlocks")}</p>`}
      </div>
      <div class="view-actions">
        <button class="primary wide" data-action="configure" @click=${()=>this._openEditor()}>${this._t("configure")}</button>
      </div>
    </div>`}_renderEditor(){let e=this._profile,i=this._dayNames();return d`<div class="editor">
      <div class="group">
        <label class="row">
          <span>${this._t("name")}</span>
          <input type="text" .value=${e.name} placeholder=${this._t("name")}
            @input=${s=>this._patchProfile(r=>r.name=_(s))} />
        </label>
      </div>
      ${e.blocks.map((s,r)=>d`<div class="group">
        <div class="seg" role="group" aria-label=${this._t("days")}>
          ${Dt.map(n=>d`<button type="button" aria-pressed=${s.days.includes(n)}
            @click=${()=>this._patchProfile(l=>{let a=new Set(l.blocks[r].days);a.has(n)?a.delete(n):a.add(n),l.blocks[r].days=[...a].sort()})}>${i[n]}</button>`)}
        </div>
        <div class="row">
          <span>${this._t("start")}</span>
          <input type="time" aria-label=${this._t("start")} .value=${s.start}
            @input=${n=>this._patchProfile(l=>l.blocks[r].start=_(n))} />
        </div>
        <div class="row">
          <span>${this._t("temperature")}</span>
          <div class="stepper">
            <button type="button" aria-label=${this._t("lower")} @click=${()=>this._stepTemp(r,-D)}>−</button>
            <output aria-live="polite">${this._fmt(s.temperature)}°</output>
            <button type="button" aria-label=${this._t("raise")} @click=${()=>this._stepTemp(r,D)}>+</button>
          </div>
        </div>
        <div class="row">
          <input type="text" aria-label=${this._t("mode")} placeholder=${this._t("mode")} .value=${s.hvac_mode??""}
            @input=${n=>this._patchProfile(l=>l.blocks[r].hvac_mode=_(n)||null)} />
          <button type="button" class="danger" @click=${()=>this._patchProfile(n=>n.blocks.splice(r,1))}>${this._t("removeBlock")}</button>
        </div>
      </div>`)}
      <button type="button" class="wide" @click=${()=>this._patchProfile(s=>s.blocks.push({days:[0,1,2,3,4],start:"06:30",temperature:20,hvac_mode:null}))}>${this._t("addBlock")}</button>
      <div class="actions">
        <button type="button" data-action="save-profile" class="primary" @click=${()=>this._saveProfile()}>${this._t("save")}</button>
        <button type="button" @click=${()=>this._closeEditor()}>${this._t("cancel")}</button>
      </div>
    </div>`}_renderConditions(){let e=this._data;return d`<h3>${this._t("conditions")}</h3>
      <div class="group cond-list">
        ${Object.values(e.conditions).map(i=>d`<div class="row">
          <b>${i.name}</b>
          <span class="meta">${i.checks.map(s=>`${s.entity_id} ${s.op} ${s.value}`).join(i.match==="all"?" & ":" | ")}</span>
          <span class="meta">${this._t("delaySec",{x:i.delay})}</span>
          <span class="meta">${this._actionLabel(i)}</span>
          <button class="pill" @click=${()=>this._condition=structuredClone(i)}>${this._t("edit")}</button>
          <button class="pill danger" @click=${()=>this._try(()=>this._api.deleteCondition(i.id))}>${this._t("delete")}</button>
        </div>`)}
        <div class="row">
          <button class="wide" @click=${()=>this._condition={id:xt("c"),name:"",checks:[],match:"all",delay:120,action:{kind:"off",temperature:null}}}>${this._t("newCondition")}</button>
        </div>
      </div>
      ${this._condition?d`<div class="group cond-editor">
        <input type="text" .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${i=>this._patchCondition(s=>s.name=_(i))} />
        <select @change=${i=>this._patchCondition(s=>s.match=_(i))}>
          <option value="all" ?selected=${this._condition.match==="all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match==="any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((i,s)=>d`<div class="row">
          <input type="text" placeholder=${this._t("entity")} .value=${i.entity_id} @input=${r=>this._patchCondition(n=>n.checks[s].entity_id=_(r))} />
          <select @change=${r=>this._patchCondition(n=>n.checks[s].op=_(r))}>
            ${["=","!=",">","<"].map(r=>d`<option ?selected=${i.op===r}>${r}</option>`)}
          </select>
          <input type="text" placeholder=${this._t("value")} .value=${i.value} @input=${r=>this._patchCondition(n=>n.checks[s].value=_(r))} />
          <button class="pill danger" @click=${()=>this._patchCondition(r=>r.checks.splice(s,1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${()=>this._patchCondition(i=>i.checks.push({entity_id:"",op:"=",value:"on"}))}>${this._t("addCheck")}</button>
        <div class="row">
          <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")} aria-label=${this._t("delay")}
            @input=${i=>this._patchCondition(s=>s.delay=Number(_(i)))} />
          <select @change=${i=>this._patchCondition(s=>s.action.kind=_(i))}>
            <option value="off" ?selected=${this._condition.action.kind==="off"}>${this._t("actionOff")}</option>
            <option value="min_setpoint" ?selected=${this._condition.action.kind==="min_setpoint"}>${this._t("actionMin",{x:""})}</option>
          </select>
          ${this._condition.action.kind==="min_setpoint"?d`<input type="number" step="0.5" .value=${String(this._condition.action.temperature??12)}
            @input=${i=>this._patchCondition(s=>s.action.temperature=Number(_(i)))} />`:c}
        </div>
        <div class="actions">
          <button class="primary" data-action="save-condition" @click=${()=>this._try(async()=>{await this._api.saveCondition(this._condition),this._condition=null})}>${this._t("save")}</button>
          <button @click=${()=>this._condition=null}>${this._t("cancel")}</button>
        </div>
      </div>`:c}`}};customElements.define("thermo-scheduler-card",tt);window.customCards=window.customCards??[];window.customCards.push({type:"thermo-scheduler-card",name:"Thermo Scheduler",description:"Programmazioni, override e condizioni per i climate"});
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
*/
