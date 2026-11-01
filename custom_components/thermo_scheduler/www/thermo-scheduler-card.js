var O=globalThis,D=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,H=Symbol(),tt=new WeakMap,S=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==H)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&tt.set(e,t))}return t}toString(){return this.cssText}},et=a=>new S(typeof a=="string"?a:a+"",void 0,H),I=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[n+1],a[0]);return new S(e,a,H)},it=(a,t)=>{if(D)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=O.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},L=D?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return et(e)})(a):a;var{is:wt,defineProperty:At,getOwnPropertyDescriptor:St,getOwnPropertyNames:Et,getOwnPropertySymbols:Ct,getPrototypeOf:Pt}=Object,R=globalThis,st=R.trustedTypes,Tt=st?st.emptyScript:"",Mt=R.reactiveElementPolyfillSupport,E=(a,t)=>a,j={toAttribute(a,t){switch(t){case Boolean:a=a?Tt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},ot=(a,t)=>!wt(a,t),nt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??=Symbol("metadata"),R.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&At(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=St(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let r=s?.call(this);n?.call(this,o),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){let e=this.properties,i=[...Et(e),...Ct(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(L(s))}else t!==void 0&&e.push(L(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:j).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:j;this._$Em=s;let r=o.fromAttribute(e,n.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let o=this.constructor;if(s===!1&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??ot)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:o}=n,r=this[s];o!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,n,r)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[E("elementProperties")]=new Map,g[E("finalized")]=new Map,Mt?.({ReactiveElement:g}),(R.reactiveElementVersions??=[]).push("2.1.2");var G=globalThis,at=a=>a,U=G.trustedTypes,rt=U?U.createPolicy("lit-html",{createHTML:a=>a}):void 0,ut="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+$,Nt=`<${mt}>`,x=document,P=()=>x.createComment(""),T=a=>a===null||typeof a!="object"&&typeof a!="function",J=Array.isArray,zt=a=>J(a)||typeof a?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,b=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,dt=/"/g,_t=/^(?:script|style|textarea|title)$/i,X=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),d=X(1),Wt=X(2),qt=X(3),k=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),pt=new WeakMap,y=x.createTreeWalker(x,129);function gt(a,t){if(!J(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return rt!==void 0?rt.createHTML(t):t}var Ot=(a,t)=>{let e=a.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",o=C;for(let r=0;r<e;r++){let l=a[r],p,u,h=-1,_=0;for(;_<l.length&&(o.lastIndex=_,u=o.exec(l),u!==null);)_=o.lastIndex,o===C?u[1]==="!--"?o=lt:u[1]!==void 0?o=ct:u[2]!==void 0?(_t.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=b):u[3]!==void 0&&(o=b):o===b?u[0]===">"?(o=s??C,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,p=u[1],o=u[3]===void 0?b:u[3]==='"'?dt:ht):o===dt||o===ht?o=b:o===lt||o===ct?o=C:(o=b,s=void 0);let f=o===b&&a[r+1].startsWith("/>")?" ":"";n+=o===C?l+Nt:h>=0?(i.push(p),l.slice(0,h)+ut+l.slice(h)+$+f):l+$+(h===-2?r:f)}return[gt(a,n+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},M=class a{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0,r=t.length-1,l=this.parts,[p,u]=Ot(t,e);if(this.el=a.createElement(p,i),y.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=y.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ut)){let _=u[o++],f=s.getAttribute(h).split($),z=/([.?@])?(.*)/.exec(_);l.push({type:1,index:n,name:z[2],strings:f,ctor:z[1]==="."?W:z[1]==="?"?q:z[1]==="@"?K:A}),s.removeAttribute(h)}else h.startsWith($)&&(l.push({type:6,index:n}),s.removeAttribute(h));if(_t.test(s.tagName)){let h=s.textContent.split($),_=h.length-1;if(_>0){s.textContent=U?U.emptyScript:"";for(let f=0;f<_;f++)s.append(h[f],P()),y.nextNode(),l.push({type:2,index:++n});s.append(h[_],P())}}}else if(s.nodeType===8)if(s.data===mt)l.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)l.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(t,e){let i=x.createElement("template");return i.innerHTML=t,i}};function w(a,t,e=a,i){if(t===k)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=T(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(a),s._$AT(a,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=w(a,s._$AS(a,t.values),s,i)),t}var V=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);y.currentNode=s;let n=y.nextNode(),o=0,r=0,l=i[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new N(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new Y(n,this,t)),this._$AV.push(p),l=i[++r]}o!==l?.index&&(n=y.nextNode(),o++)}return y.currentNode=x,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},N=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),T(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=M.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new V(s,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new M(t)),e}k(t){J(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new a(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=at(t).nextSibling;at(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){let n=this.strings,o=!1;if(n===void 0)t=w(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let r=t,l,p;for(t=n[0],l=0;l<n.length-1;l++)p=w(this,r[i+l],e,l),p===k&&(p=this._$AH[l]),o||=!T(p)||p!==this._$AH[l],p===c?t=c:t!==c&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},W=class extends A{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},q=class extends A{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},K=class extends A{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===k)return;let i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Dt=G.litHtmlPolyfillSupport;Dt?.(M,N),(G.litHtmlVersions??=[]).push("3.3.3");var ft=(a,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new N(t.insertBefore(P(),n),n,void 0,e??{})}return s._$AI(a),s};var Z=globalThis,v=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ft(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};v._$litElement$=!0,v.finalized=!0,Z.litElementHydrateSupport?.({LitElement:v});var Rt=Z.litElementPolyfillSupport;Rt?.({LitElement:v});(Z.litElementVersions??=[]).push("4.2.2");var $t=a=>({list:()=>a({type:"thermo_scheduler/list"}),saveProfile:t=>a({type:"thermo_scheduler/save_profile",profile:t}),deleteProfile:t=>a({type:"thermo_scheduler/delete_profile",profile_id:t}),saveCondition:t=>a({type:"thermo_scheduler/save_condition",condition:t}),deleteCondition:t=>a({type:"thermo_scheduler/delete_condition",condition_id:t}),assign:(t,e,i={})=>a({type:"thermo_scheduler/assign",climate_id:t,profile_id:e,...i}),unassign:t=>a({type:"thermo_scheduler/unassign",climate_id:t}),clearOverride:t=>a({type:"thermo_scheduler/clear_override",climate_id:t})});var Ut={en:{climates:"Thermostats",profiles:"Schedules",conditions:"Conditions",until:"Until {t}",scheduled:"Scheduled",override:"Manual",blocked:"Blocked",disabled:"Disabled",clearOverride:"Back to schedule",enable:"Enable",disable:"Disable",unassign:"Remove",assign:"Assign",addClimate:"Add thermostat",save:"Save",cancel:"Cancel",edit:"Edit",delete:"Delete",newProfile:"New schedule",newCondition:"New condition",name:"Name",start:"Start",temperature:"Temperature",mode:"Mode",addBlock:"Add block",removeBlock:"Remove block",entity:"Entity",value:"Value",match:"Match",all:"All",any:"Any",addCheck:"Add check",delay:"Delay (s)",action:"Action",actionOff:"Turn off",actionMin:"Minimum setpoint {x}",delaySec:"delay {x}s",useSchedule:"Use schedule of\u2026",ownSchedule:"Own schedule",sharedWith:"Shared with: {x}",days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun",configure:"Configure",active:"Active",schedule:"Schedule",noBlocks:"No schedule blocks",emptySchedule:"No schedule for this thermostat",heating:"Heating",cooling:"Cooling",off:"Off",target:"Target",lower:"Lower by 0.5 \xB0",raise:"Raise by 0.5 \xB0",actionFailed:"Action failed",retry:"Retry",next:"Next",tomorrow:"Tomorrow",timeSlots:"Time slots",back:"Back",noBlocksDay:"No slots this day",slot:"Slot",done:"Done",forThis:"For this thermostat"},it:{climates:"Termostati",profiles:"Programmazioni",conditions:"Condizioni",until:"Fino alle {t}",scheduled:"Programmato",override:"Manuale",blocked:"Bloccato",disabled:"Disattivato",clearOverride:"Torna alla programmazione",enable:"Attiva",disable:"Disattiva",unassign:"Rimuovi",assign:"Assegna",addClimate:"Aggiungi termostato",save:"Salva",cancel:"Annulla",edit:"Modifica",delete:"Elimina",newProfile:"Nuova programmazione",newCondition:"Nuova condizione",name:"Nome",start:"Inizio",temperature:"Temperatura",mode:"Modalit\xE0",addBlock:"Aggiungi fascia",removeBlock:"Rimuovi fascia",entity:"Entit\xE0",value:"Valore",match:"Combinazione",all:"Tutte",any:"Almeno una",addCheck:"Aggiungi test",delay:"Ritardo (s)",action:"Azione",actionOff:"Spegni",actionMin:"Setpoint minimo {x}",delaySec:"ritardo {x}s",useSchedule:"Usa la programmazione di\u2026",ownSchedule:"Programmazione propria",sharedWith:"Condivisa con: {x}",days:"Lun,Mar,Mer,Gio,Ven,Sab,Dom",configure:"Configura",active:"Attiva",schedule:"Programmazione",noBlocks:"Nessuna fascia",emptySchedule:"Nessuna programmazione per questo termostato",heating:"Riscaldamento",cooling:"Raffrescamento",off:"Spento",target:"Obiettivo",lower:"Abbassa di 0,5 \xB0",raise:"Alza di 0,5 \xB0",actionFailed:"Operazione non riuscita",retry:"Riprova",next:"Prossima",tomorrow:"Domani",timeSlots:"Fasce orarie",back:"Indietro",noBlocksDay:"Nessuna fascia in questo giorno",slot:"Fascia",done:"Fine",forThis:"Per questo termostato"}};function vt(a,t,e={}){return(Ut[a?.startsWith("it")?"it":"en"][t]??t).replace(/\{(\w+)\}/g,(s,n)=>String(e[n]??""))}var m=a=>a.target.value,bt=a=>a.target.checked,yt=a=>`${a}_${Date.now().toString(36)}`,xt=[0,1,2,3,4,5,6],Bt=5,Ht=30,B=.5,It=a=>Math.min(Ht,Math.max(Bt,Math.round(a/B)*B)),kt=()=>(new Date().getDay()+6)%7,Q=class extends v{constructor(){super(...arguments);this._config={};this._data=null;this._profile=null;this._condition=null;this._selected="";this._view="summary";this._scheduleDay=kt();this._editIndex=null;this._error="";this._retry=null;this._loaded=!1}static{this.properties={hass:{attribute:!1},_data:{state:!0},_profile:{state:!0},_condition:{state:!0},_selected:{state:!0},_view:{state:!0},_scheduleDay:{state:!0},_editIndex:{state:!0},_error:{state:!0}}}static{this.styles=I`
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
    .group { background: var(--ts-group); border-radius: 16px; overflow: hidden; }
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
      transition: background-color 200ms ease, transform 150ms ease, opacity 200ms ease;
    }
    button:active { transform: scale(0.98); }
    button:hover { opacity: 0.85; }
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

    /* riepilogo: una card che apre le impostazioni */
    .summary {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      width: 100%;
      min-height: 0;
      padding: 16px;
      border-radius: 20px;
      background: var(--ts-group);
      text-align: left;
      color: var(--ts-ink);
    }
    .summary:hover { opacity: 1; background: color-mix(in srgb, var(--ts-group) 92%, var(--ts-ink) 8%); }
    .sum-top { display: flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 600; }
    .sum-top span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sum-temp { font-size: 56px; line-height: 60px; font-weight: 300; margin-top: 8px; }
    .sum-temp small { font-size: 28px; vertical-align: top; margin-left: 2px; }
    .status-text { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: var(--tone, var(--ts-ink)); }
    .status-text ha-icon { color: var(--tone); }
    .next { font-size: 15px; color: var(--ts-ink2); margin-top: 4px; }

    /* barra superiore con indietro */
    .topbar { display: flex; align-items: center; gap: 8px; min-height: 44px; }
    .topbar h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .topbar .spacer { min-width: 44px; }
    .back { display: inline-flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; background: transparent; }

    /* impostazioni */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 0 4px; }
    .nav { width: 100%; justify-content: space-between; text-align: left; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; padding: 8px 16px; }
    .nav .value { color: var(--ts-ink2); font-size: 15px; }
    .stack { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; }
    .stack select { width: 100%; padding: 0; background: transparent; font-size: 17px; text-align: left; }

    /* programmazione: giorni e fasce */
    .week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      padding: 2px;
      border-radius: 10px;
      background: light-dark(#e9e9eb, #1c1c1e);
      min-height: 0;
    }
    .week button, .seg button {
      min-width: 0;
      min-height: 36px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      background: transparent;
      color: var(--ts-ink);
    }
    .week button[aria-pressed="true"], .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .slot { width: 100%; min-height: 56px; justify-content: flex-start; padding: 8px 16px; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; }
    .slot .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); flex-shrink: 0; }
    .slot time { font-size: 17px; font-weight: 600; min-width: 56px; }
    .slot .mode { flex: 1; color: var(--ts-ink2); font-size: 15px; }
    .slot .temp { font-weight: 600; font-size: 17px; }
    .add { width: 100%; border-radius: 0; background: transparent; }
    .actions { display: flex; gap: 8px; }
    .actions button { flex: 1; }
    .stepper { display: inline-flex; align-items: center; gap: 4px; }
    .stepper button { min-width: 44px; font-size: 22px; line-height: 1; }
    .stepper output { min-width: 64px; text-align: center; font-size: 17px; font-weight: 600; }
    .seg { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; padding: 2px; margin: 12px 16px 4px; border-radius: 10px; background: light-dark(#e9e9eb, #1c1c1e); }
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

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
    @media (max-width: 360px) {
      .wrap { padding: 12px; }
      .sum-temp { font-size: 48px; line-height: 52px; }
    }
  `}setConfig(e){if(!e?.entity?.startsWith("climate."))throw new Error("thermo-scheduler-card: imposta 'entity' con un termostato climate.*");this._config=e,this._selected=e.entity,this._syncProfile()}getCardSize(){return 3}willUpdate(e){e.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._reload())}get _api(){return $t(e=>this.hass.callWS(e))}_t(e,i){return vt(this.hass?.language,e,i)}async _reload(){this._data=await this._api.list(),this._selected||(this._selected=Object.keys(this._data.assignments)[0]??""),this._syncProfile()}_name(e){return this.hass.states[e]?.attributes?.friendly_name??e}_users(e){return Object.entries(this._data.assignments).filter(([,i])=>i.profile_id===e).map(([i])=>i)}_syncProfile(){let e=this._data?.assignments[this._selected];e?this._profile?.id!==e.profile_id&&(this._profile=structuredClone(this._data.profiles[e.profile_id])):this._profile=null}_select(e){this._selected=e,this._profile=null,this._syncProfile()}async _makeOwn(e){let i=this._data.assignments[e],s=i?structuredClone(this._data.profiles[i.profile_id].blocks):[],n={id:yt("p"),name:this._name(e),blocks:s};await this._api.saveProfile(n),await this._api.assign(e,n.id)}async _do(e){await e(),await this._reload()}async _try(e){this._retry=e,this._error="";try{await this._do(e)}catch{this._error=this._t("actionFailed")}}_go(e){this._view=e,e!=="schedule"&&(this._editIndex=null)}_openSchedule(){this._syncProfile(),this._scheduleDay=kt(),this._editIndex=null,this._view="schedule"}_back(){if(this._view==="schedule"&&this._editIndex!==null){this._editIndex=null;return}if(this._view==="schedule"){this._profile=null,this._syncProfile(),this._go("settings");return}this._go(this._view==="settings"?"summary":"settings")}async _saveProfile(){let e=this._profile;await this._try(()=>this._api.saveProfile(e)),this._error||this._go("settings")}_status(e){let i=this.hass.states[`sensor.${e.split(".")[1]}_scheduler`];return i?i.state==="override"?this._t("until",{t:String(i.attributes.override_until??"").slice(11,16)}):this._t(i.state):""}_sensorState(e){return this.hass.states[`sensor.${e.split(".")[1]}_scheduler`]?.state??""}_hvac(e){return this.hass.states[e]?.state??"off"}_targetTemp(e){let i=this.hass.states[e]?.attributes?.temperature;return i==null?null:Number(i)}_fmt(e){return new Intl.NumberFormat(this.hass?.language??"en",{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number(e))}_dayNames(){return this._t("days").split(",")}_dayList(e){let i=this._dayNames(),s=[...e].sort((o,r)=>o-r),n=[];for(let o of s){let r=n[n.length-1];r&&o===r[r.length-1]+1?r.push(o):n.push([o])}return n.map(o=>o.length>2?`${i[o[0]]}\u2013${i[o[o.length-1]]}`:o.map(r=>i[r]).join(", ")).join(", ")}_blockTone(e){return e.hvac_mode==="cool"?"cool":"heat"}_statusInfo(e){let i=this._sensorState(e),s=this._hvac(e),n=i==="blocked"?"danger":i==="override"?"accent":i==="disabled"?"off":s==="cool"?"cool":"heat",o={override:"mdi:hand-back-left",blocked:"mdi:lock",disabled:"mdi:pause-circle-outline",scheduled:"mdi:calendar-clock"},r=i==="override"?`${this._t("override")} \xB7 ${this._status(e)}`:this._status(e);return{key:i,tone:n,icon:o[i]??"mdi:thermostat",text:r}}_nextBlock(e){if(!e||!e.blocks.length)return null;let i=new Date;for(let s=0;s<8;s++){let n=new Date(i.getFullYear(),i.getMonth(),i.getDate()+s),o=(n.getDay()+6)%7,r=null;for(let l of e.blocks){if(!l.days.includes(o))continue;let[p,u]=l.start.split(":").map(Number),h=new Date(n.getFullYear(),n.getMonth(),n.getDate(),p,u);h>i&&(!r||h<r.at)&&(r={at:h,block:l})}if(r)return{...r,k:s,wd:o}}return null}render(){return this._data?d`<div class="wrap">
      ${this._error?d`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${()=>this._retry&&this._try(this._retry)}>${this._t("retry")}</button>
      </div>`:c}
      ${this._renderView()}
    </div>`:c}_renderView(){switch(this._view){case"settings":return this._renderSettings();case"schedule":return this._renderSchedule();case"conditions":return this._renderConditions();default:return this._renderSummary()}}_renderSummary(){let e=this._selected,i=this._data.assignments[e],s=this._statusInfo(e),n=this._targetTemp(e),o=i?this._nextBlock(this._data.profiles[i.profile_id]):null,r=this._dayNames(),l=o?o.k===0?"":o.k===1?`${this._t("tomorrow")} `:`${r[o.wd]} `:"";return d`<button class="summary tone-${s.tone}" data-climate=${e} aria-label=${`${this._name(e)}: ${s.text}`}
        @click=${()=>this._go("settings")}>
      <span class="sum-top"><span>${this._name(e)}</span><ha-icon icon="mdi:chevron-right"></ha-icon></span>
      <span class="sum-temp" aria-label=${this._t("target")}>${n==null?"\u2013":this._fmt(n)}<small>°</small></span>
      <span class="status-text tone-${s.tone}"><ha-icon icon=${s.icon}></ha-icon>${s.text}</span>
      ${i?c:d`<span class="next">${this._t("emptySchedule")}</span>`}
      ${o?d`<span class="next">${this._t("next")} ${l}${o.block.start} · ${this._fmt(o.block.temperature)}°</span>`:c}
    </button>`}_renderSettings(){let e=this._data,i=this._selected,s=e.assignments[i],n=s?this._users(s.profile_id).filter(r=>r!==i):[],o=this._statusInfo(i);return d`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._name(i)}</h2>
        <span class="spacer"></span>
      </div>
      <div class="status tone-${o.tone}" data-climate=${i}>
        <span class="status-text"><ha-icon icon=${o.icon}></ha-icon>${o.text}</span>
        ${o.key==="override"?d`<button class="pill" data-action="clear-override"
          @click=${()=>this._try(()=>this._api.clearOverride(i))}>${this._t("clearOverride")}</button>`:c}
      </div>
      ${s?d`<div class="group">
        <label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${s.enabled}
            @change=${r=>this._try(()=>this._api.assign(i,s.profile_id,{enabled:bt(r)}))} />
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
            ${s?c:d`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(e.profiles).map(r=>d`<option value=${r.id} ?selected=${r.id===s?.profile_id}>${r.name} (${this._users(r.id).map(l=>this._name(l)).join(", ")||"-"})</option>`)}
          </select>
        </div>
        <button class="nav" data-action="own" @click=${()=>this._try(()=>this._makeOwn(i))}>${this._t("ownSchedule")}</button>
        ${n.length?d`<p class="footnote">${this._t("sharedWith",{x:n.map(r=>this._name(r)).join(", ")})}</p>`:c}
      </div>
      ${s?d`<div class="group">
        <button class="nav danger" @click=${()=>this._try(()=>this._api.unassign(i))}>${this._t("unassign")}</button>
      </div>`:c}`}_renderSchedule(){let e=this._profile;if(!e)return d`<div class="topbar">
          <button class="back" @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
          <h2>${this._t("timeSlots")}</h2><span class="spacer"></span>
        </div>
        <div class="group"><div class="empty"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon><p>${this._t("emptySchedule")}</p></div></div>`;if(this._editIndex!==null&&e.blocks[this._editIndex])return this._renderSlotEditor(this._editIndex);let i=this._dayNames(),s=this._scheduleDay,n=e.blocks.map((o,r)=>({block:o,i:r})).filter(({block:o})=>o.days.includes(s)).sort((o,r)=>o.block.start.localeCompare(r.block.start));return d`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${e.name}</h2><span class="spacer"></span>
      </div>
      <div class="week" role="group" aria-label=${this._t("days")}>
        ${xt.map(o=>d`<button type="button" aria-pressed=${o===s} @click=${()=>this._scheduleDay=o}>${i[o]}</button>`)}
      </div>
      <div class="group">
        ${n.length?n.map(({block:o,i:r})=>d`<button class="slot tone-${this._blockTone(o)}" @click=${()=>this._editIndex=r}>
          <i class="dot"></i>
          <time datetime=${o.start}>${o.start}</time>
          <span class="mode">${o.hvac_mode??""}</span>
          <span class="temp">${this._fmt(o.temperature)}°</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`):d`<p class="footnote">${this._t("noBlocksDay")}</p>`}
        <button class="add" @click=${()=>this._addBlock()}>${this._t("addBlock")}</button>
      </div>
      <div class="actions">
        <button class="primary" data-action="save-profile" @click=${()=>this._saveProfile()}>${this._t("save")}</button>
        <button @click=${()=>this._back()}>${this._t("cancel")}</button>
      </div>`}_addBlock(){this._patchProfile(e=>e.blocks.push({days:[this._scheduleDay],start:"06:30",temperature:20,hvac_mode:null})),this._editIndex=this._profile.blocks.length-1}_renderSlotEditor(e){let i=this._profile.blocks[e],s=this._dayNames();return d`<div class="topbar">
        <button class="back" @click=${()=>this._editIndex=null}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("timeSlots")}</button>
        <h2>${this._t("slot")}</h2><span class="spacer"></span>
      </div>
      <div class="editor">
        <div class="group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${xt.map(n=>d`<button type="button" aria-pressed=${i.days.includes(n)}
              @click=${()=>this._patchProfile(o=>{let r=new Set(o.blocks[e].days);r.has(n)?r.delete(n):r.add(n),o.blocks[e].days=[...r].sort()})}>${s[n]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("start")}</span>
            <input type="time" .value=${i.start} @input=${n=>this._patchProfile(o=>o.blocks[e].start=m(n))} />
          </label>
          <div class="row">
            <span>${this._t("temperature")}</span>
            <div class="stepper">
              <button type="button" aria-label=${this._t("lower")} @click=${()=>this._stepTemp(e,-B)}>−</button>
              <output aria-live="polite">${this._fmt(i.temperature)}°</output>
              <button type="button" aria-label=${this._t("raise")} @click=${()=>this._stepTemp(e,B)}>+</button>
            </div>
          </div>
          <label class="row">
            <span>${this._t("mode")}</span>
            <input type="text" .value=${i.hvac_mode??""} placeholder=${this._t("mode")}
              @input=${n=>this._patchProfile(o=>o.blocks[e].hvac_mode=m(n)||null)} />
          </label>
        </div>
        <button class="danger wide" @click=${()=>{this._patchProfile(n=>n.blocks.splice(e,1)),this._editIndex=null}}>${this._t("removeBlock")}</button>
        <button class="primary wide" @click=${()=>this._editIndex=null}>${this._t("done")}</button>
      </div>`}_patchProfile(e){let i=structuredClone(this._profile);e(i),this._profile=i}_stepTemp(e,i){this._patchProfile(s=>s.blocks[e].temperature=It(s.blocks[e].temperature+i))}_actionLabel(e){return e.action.kind==="off"?this._t("actionOff"):this._t("actionMin",{x:e.action.temperature??""})}_patchCondition(e){let i=structuredClone(this._condition);e(i),this._condition=i}_renderConditions(){let e=this._data,i=this._selected,s=e.assignments[i];return d`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${()=>this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("conditions")}</h2><span class="spacer"></span>
      </div>
      <div class="group cond-list">
        ${Object.values(e.conditions).map(n=>d`<div class="row">
          <b>${n.name}</b>
          <span class="meta">${n.checks.map(o=>`${o.entity_id} ${o.op} ${o.value}`).join(n.match==="all"?" & ":" | ")}</span>
          <span class="meta">${this._t("delaySec",{x:n.delay})}</span>
          <span class="meta">${this._actionLabel(n)}</span>
          ${s?d`<label class="switch-row"><span class="caption">${this._t("forThis")}</span>
            <input type="checkbox" role="switch" aria-label=${`${n.name}: ${this._name(i)}`} .checked=${s.condition_ids.includes(n.id)}
              @change=${o=>this._try(()=>this._api.assign(i,s.profile_id,{condition_ids:bt(o)?[...s.condition_ids,n.id]:s.condition_ids.filter(r=>r!==n.id)}))} /></label>`:c}
          <button class="pill" @click=${()=>this._condition=structuredClone(n)}>${this._t("edit")}</button>
          <button class="pill danger" @click=${()=>this._try(()=>this._api.deleteCondition(n.id))}>${this._t("delete")}</button>
        </div>`)}
        <div class="row">
          <button class="wide" @click=${()=>this._condition={id:yt("c"),name:"",checks:[],match:"all",delay:120,action:{kind:"off",temperature:null}}}>${this._t("newCondition")}</button>
        </div>
      </div>
      ${this._condition?d`<div class="group cond-editor">
        <input type="text" .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${n=>this._patchCondition(o=>o.name=m(n))} />
        <select @change=${n=>this._patchCondition(o=>o.match=m(n))}>
          <option value="all" ?selected=${this._condition.match==="all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match==="any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((n,o)=>d`<div class="row">
          <input type="text" placeholder=${this._t("entity")} .value=${n.entity_id} @input=${r=>this._patchCondition(l=>l.checks[o].entity_id=m(r))} />
          <select @change=${r=>this._patchCondition(l=>l.checks[o].op=m(r))}>
            ${["=","!=",">","<"].map(r=>d`<option ?selected=${n.op===r}>${r}</option>`)}
          </select>
          <input type="text" placeholder=${this._t("value")} .value=${n.value} @input=${r=>this._patchCondition(l=>l.checks[o].value=m(r))} />
          <button class="pill danger" @click=${()=>this._patchCondition(r=>r.checks.splice(o,1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${()=>this._patchCondition(n=>n.checks.push({entity_id:"",op:"=",value:"on"}))}>${this._t("addCheck")}</button>
        <div class="row">
          <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")} aria-label=${this._t("delay")}
            @input=${n=>this._patchCondition(o=>o.delay=Number(m(n)))} />
          <select @change=${n=>this._patchCondition(o=>o.action.kind=m(n))}>
            <option value="off" ?selected=${this._condition.action.kind==="off"}>${this._t("actionOff")}</option>
            <option value="min_setpoint" ?selected=${this._condition.action.kind==="min_setpoint"}>${this._t("actionMin",{x:""})}</option>
          </select>
          ${this._condition.action.kind==="min_setpoint"?d`<input type="number" step="0.5" .value=${String(this._condition.action.temperature??12)}
            @input=${n=>this._patchCondition(o=>o.action.temperature=Number(m(n)))} />`:c}
        </div>
        <div class="actions">
          <button class="primary" data-action="save-condition" @click=${()=>this._try(async()=>{await this._api.saveCondition(this._condition),this._condition=null})}>${this._t("save")}</button>
          <button @click=${()=>this._condition=null}>${this._t("cancel")}</button>
        </div>
      </div>`:c}`}};customElements.define("thermo-scheduler-card",Q);window.customCards=window.customCards??[];window.customCards.push({type:"thermo-scheduler-card",name:"Thermo Scheduler",description:"Stato, prossima fascia e programmazione di un termostato"});
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
