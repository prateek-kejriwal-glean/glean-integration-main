import{r as h,j as i}from"./index-gsoGpVZP.js";import{S as x}from"./Spinner-B0BjJv5U.js";let d;function j({auth:a,setHeight:n,activeChatId:e,chatRef:r,worldMode:c}){const u=h.useRef(),f=h.useRef();return d=e,h.useEffect(()=>{const t=u.current.getBoundingClientRect();t.bottom-t.top,n(t.bottom-t.top+8)},[n]),i.jsxs("div",{ref:u,className:"input-group pb-4 fixed-bottom",style:{backgroundColor:"white"},children:[i.jsx("input",{type:"text",className:"form-control",placeholder:"What's Gleaning?",onKeyUp:t=>{const s=t.key,g=t.currentTarget.value;s==="Enter"&&(b(a,g,{isWorld:c,chatRef:r,spinnerRef:f}),t.currentTarget.value="")}}),i.jsx("button",{className:"btn border d-none",ref:f,type:"button",children:i.jsx(x,{animation:"border",variant:"primary"})}),i.jsx("button",{className:" input-group-text btn btn-primary",type:"button",children:"Send"})]})}async function b(a,n,e){e.spinnerRef.current.classList.remove("d-none");let r=!1;d||(r=!0);const c=R(n,d,e.isWorld),u={method:"POST",body:JSON.stringify(c),headers:{"content-type":"application/json",Authorization:`${a.token}`,"x-api-host":a.backendURL}};e.chatRef.current.addMessage(c),r=!1,e.chatRef.current.clearFollowUpPrompts(c);const f=await fetch("/api/chat",u);let t=[],s;for await(const g of f.body){let l=new TextDecoder().decode(g);if(l=l.trim(),l){const m=l.split(`
`);s&&(m.unshift(s),s=void 0);for(const p of m)try{const o=JSON.parse(p);d=(o==null?void 0:o.chatId)??d,r?e.chatRef.current.startNewChat(o):e.chatRef.current.addMessage(o)}catch{t.push(p),s=y(t),s!==void 0?(t.length=0,console.log("Fixed",s)):console.log(p)}}}s&&(console.log("Pending Message",s),e.chatRef.current.addMessage(JSON.parse(s)),s=void 0),e.spinnerRef.current.classList.add("d-none")}function y(a){const n=a.join("");try{return JSON.parse(n),n}catch{return}}function R(a,n,e){const r={saveChat:!0,stream:!0,messages:[{author:"USER",fragments:[{text:a}],messageType:"CONTENT"}]};return e&&(r.actionHints=["Gemini Web Search"],r.agentConfig={agent:"GPT"}),n&&(r.chatId=n),r}export{j as default};
