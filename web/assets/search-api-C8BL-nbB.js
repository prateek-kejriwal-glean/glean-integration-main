import{r as o,j as t,F as c,C as l,B as f}from"./index-gsoGpVZP.js";import{S as m}from"./Spinner-B0BjJv5U.js";import{P as x}from"./index-D4nKKFhc.js";import"./objectWithoutPropertiesLoose-DgCFJhGp.js";import"./Modal-DdqUwFjC.js";function L({auth:e,ref:n}){d(e);const s=o.useRef(null),a=o.useRef(null),[r,i]=o.useState([]);return t.jsxs(t.Fragment,{children:[t.jsxs(c.Group,{className:"mb-3 d-flex",children:[t.jsx(c.Control,{type:"text",style:{float:"left"},onKeyUp:u=>{const h=u.key,p=u.currentTarget.value;h==="Enter"&&y({auth:e,query:p,searchResultsListRef:a,setSearchResults:i,spinnerRef:s})},placeholder:"What's Gleaning?"}),t.jsx(m,{ref:s,animation:"border",variant:"primary",style:{float:"right",display:"none",margin:8}})]}),t.jsx(x,{records:r,Element:j,pageSize:10,title:"Search Responses"})]})}function d(e){return!!(e.token&&e.emailAddress&&e.backendURL)}async function y(e){e.spinnerRef.current.style.display="block";const n=e.auth,s=e.query,a=e.setSearchResults,r=await fetch(`/api/search?query=${encodeURIComponent(s)}`,{headers:{authorization:`${n.token}`,"x-api-host":n.backendURL},method:"get",credentials:"include"});try{const{result:i}=await r.json();a(i),e.spinnerRef.current.style.display="none"}catch(i){console.log(i)}}function j({record:e,debugClick:n}){var s;return t.jsx(l,{style:{margin:"8px",width:"auto"},children:t.jsxs(l.Body,{children:[t.jsx(l.Title,{children:e==null?void 0:e.title}),t.jsx("div",{className:"container-fluid",style:{display:"flex",justifyContent:"flex-end"},children:t.jsx(f,{className:"btn btn-light m-2 float-right",onClick:a=>{a.stopPropagation(),n()},children:"🐞"})}),t.jsxs(l.Subtitle,{className:"mb-2 text-muted",children:["Last updated on ",new Date(e==null?void 0:e.updatedAt).toDateString()]}),t.jsx(l.Text,{children:(s=e==null?void 0:e.snippets)==null?void 0:s[0].snippet}),t.jsx("a",{href:e==null?void 0:e.url,children:"Link Here"})]})})}export{L as default};
