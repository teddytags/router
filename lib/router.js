import{render as t,Component as n,unmountComponent as e,h as i}from"teddytags";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function s(t,n,e,i){return new(e||(e=Promise))((function(s,o){function a(t){try{c(i.next(t))}catch(t){o(t)}}function r(t){try{c(i.throw(t))}catch(t){o(t)}}function c(t){var n;t.done?s(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))}let o,a,r=[];class c{constructor(t){this.container=a=t.container,this.routes=r=t.routes,this.basename=o=t.basename||"";const n=()=>s(this,void 0,void 0,(function*(){yield d(this.basename,this.container,...this.routes)}));window.addEventListener("popstate",()=>s(this,void 0,void 0,(function*(){e(this.container),yield n()}))),n()}}const d=(n,e,...i)=>s(void 0,void 0,void 0,(function*(){const s=window.location.pathname.split("/");s.map(t=>{let e;"/"+t!==n||e||(s.splice(s.indexOf(t),1),e=!0)});const o=s.length>1?s.splice(1):"",a=h(o,i),r=yield a.render(a.params),c=document.head.querySelector("title");c.innerHTML=a.title||c.innerHTML,yield t(r,e)})),h=(t,n)=>{const e={},i=n.filter(t=>"404"===t.path)[0],s=n.find(n=>{const i=n.path.split("/").slice(1);if(i.length!==t.length&&!i.includes(":endOfPath"))return!1;const s=i.every((n,e)=>n===t[e]||":"===n[0]||":endOfPath"===n);return!0===s&&i.forEach((n,i)=>{if(":endOfPath"===n&&Array.isArray(t)){const n=t.slice(1,t.length);e.endOfPath=decodeURIComponent(n.join("/"))}if(":"===n[0]&&":endOfPath"!==n){const s=n.slice(1);e[s]=decodeURIComponent(t[i])}}),s});return s?Object.assign(Object.assign({},s),{params:e}):Object.assign(Object.assign({},i),{params:{}})};class l extends n{constructor(t){super(t),this.handleClick=this.handleClick.bind(this)}handleClick(){window.history.pushState({},"",this.props.path);(()=>{s(this,void 0,void 0,(function*(){e(a),yield d(o,a,...r)}))})()}render(){return i("a",{onClick:t=>{t.preventDefault(),t.stopPropagation(),this.handleClick()},href:this.props.path},this.props.name)}}export{l as Link,c as Router};
//# sourceMappingURL=router.js.map
