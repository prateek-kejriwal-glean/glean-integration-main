import{r,j as i}from"./index-gsoGpVZP.js";import p from"./AnswerCard-BP3NwKUG.js";import{P as c}from"./index-D4nKKFhc.js";import"./AnswerModal-DfZeqnTC.js";import"./Modal-DdqUwFjC.js";import"./objectWithoutPropertiesLoose-DgCFJhGp.js";import"./index-pqJVgooD.js";function g({auth:e,ref:t}){const s=f(e);r.useRef(null);const[n,o]=r.useState([]);return r.useEffect(()=>{s&&m(e).then(a=>{o(a)})},[e,s]),i.jsx(c,{records:n,Element:p,title:"Answers",pageSize:9,layoutType:"grid"})}function f(e){return!!(e.token&&e.emailAddress&&e.backendURL)}async function m(e){return(await fetch("/api/answers",{headers:{authorization:`${e.token}`,"x-api-host":e.backendURL},method:"get"})).json()??[]}export{g as default};
