(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{53:function(e,t,a){e.exports=a(71)},70:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(51),r=a.n(c),o=a(3),i=a(37);const m={Transactions:{path:"/transactions"},Import:{path:"/transactions/import"},Portfolio:{path:"/portfolio"}};var s=()=>{const{pathname:e}=Object(o.n)();return l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",{className:"nav nav-tabs"},Object.keys(m).map(t=>l.a.createElement("li",{className:"nav-item",type:"submit"},l.a.createElement(i.b,{className:"nav-link ".concat(e===m[t].path?"active":""),to:m[t].path},t)))),l.a.createElement(o.a,null))},u=a(78),d=a(77);var p=()=>{const[e,t]=Object(n.useState)({show:!1,data:{save:0,not_save:0}});return console.log(e),l.a.createElement(l.a.Fragment,null,l.a.createElement("form",{className:"mb-3",onChange:e=>{e.preventDefault();const t=e.target.files[0];if(!t)return;const a={headers:{"Content-Type":"multipart/form-data"}},{name:n}=t;if(/xls(x)?$/.test(n)){const e=new FormData;e.append("file",e),u.a.post("https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/transactions/import",t,a).then(e=>console.log(e))}}},l.a.createElement("label",{htmlFor:"formFile",className:"form-label"},"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0435 \u0431\u0440\u043e\u043a\u0435\u0440\u0441\u043a\u0438\u0435 \u043e\u0442\u0447\u0435\u0442\u044b: \u0422\u0438\u043d\u044c\u043a\u043e\u0444\u0444, \u0412\u0422\u0411"),l.a.createElement("input",{className:"form-control",type:"file",id:"formFile"})),l.a.createElement(d.a,{show:e.show,onHide:()=>{t({...e,show:!1})}},l.a.createElement(d.a.Body,null,"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439: ",e.data.save),l.a.createElement(d.a.Body,null,"\u041d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439 (\u0434\u0443\u0431\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435): ",e.data.not_save)))},y=a(11),E=a.n(y),g=a(79);var v=e=>{let{reqData:t,setReqData:a}=e;const{page:n,maxPage:c}=t,r=((e,t)=>{let a=null,n=null;t<=7?(a=1,n=t):e<=3?(a=1,n=7):e+3>=t?(a=t-6,n=t):(a=e-3,n=e+3);const l=Object(y.range)(a,n+1);return l[1]>2&&(l[1]=null),l[l.length-2]<t-1&&(l[l.length-2]=null),l[0]=1,l[l.length-1]=t,l})(n,c);return l.a.createElement(g.a,null,l.a.createElement(g.a.Prev,{onClick:()=>{n>1&&a({...t,page:n-1})}}),r.map(e=>null===e?l.a.createElement(g.a.Ellipsis,null):l.a.createElement(g.a.Item,{active:n===e||null,onClick:()=>(e=>a({...t,page:e}))(e)},e)),l.a.createElement(g.a.Next,{onClick:()=>{n!==c&&a({...t,page:n+1})}}))},b=a(75),h=a(76),D=a(52);var j=e=>{let{reqData:t,setReqData:a}=e;const{limit:n}=t;return l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{className:"pagination",as:h.a,key:n,id:"button-customs",variant:"white",title:n},[10,25,50].map(e=>l.a.createElement(D.a.Item,{eventKey:e,onClick:()=>(e=>a({...t,limit:e}))(e),active:e===n},e))))};const f=e=>{const t=e.slice(0,4),a=e.slice(4,6),n=e.slice(6,8);return"".concat(t,":").concat(a,":").concat(n)};var N=e=>{const{data:t}=e,a=(t[0],["yield_last","yield_avg"]);t.forEach(e=>{a.forEach(t=>{e[t]&&(e[t]=(100*e[t]).toFixed(2))}),e.trade_date=f(e.trade_date)});const n={isin:"ISIN",trade_date:"Trade Date",count:"Quantity",price:"Price",summa:"Total amount"},l=Object.keys(n),c=t.map(e=>E.a.pick(e,l)).reduce((e,t)=>{const a={};return Object.keys(t).map(e=>{a[n[e]]=t[e]}),e.push(a),e},[]);return{...e,data:c}};const w=e=>{switch(e.toLowerCase()){case"quantity":case"price":case"total amount":return"rigthContent";default:return"leftContent"}},O=e=>{let{tags:t}=e;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"tags"},Object.keys(t).map(e=>l.a.createElement("div",{className:w(e),key:Object(y.uniqueId)()},e))))},k=e=>{let{body:t}=e;return l.a.createElement(l.a.Fragment,null,t.map(e=>l.a.createElement("div",{className:"body",key:Object(y.uniqueId)()},Object.entries(e).map(e=>{let[t,a]=e;return l.a.createElement("div",{className:w(t),key:Object(y.uniqueId)()},a)}))))};var q=()=>{const[e,t]=Object(n.useState)({page:1,limit:25});return Object(n.useEffect)(()=>{const{page:a,limit:n}=e,l="https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/transactions?limit=".concat(n,"&page=").concat(a);(async()=>await u.a.get(l).then(e=>{let{data:a}=e;return!!a.data&&t(N(a))}))()},[e.page,e.limit]),l.a.createElement(l.a.Fragment,null,e.data&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"table"},l.a.createElement(O,{tags:e.data[0]}),l.a.createElement(k,{body:e.data})),l.a.createElement("div",{className:"pagination-limit"},0!==e.data.length&&l.a.createElement("tr",null,l.a.createElement("th",null,l.a.createElement(j,{reqData:e,setReqData:t})),l.a.createElement("th",null,l.a.createElement(v,{reqData:e,setReqData:t})))))||l.a.createElement("div",null,"Loaded"))};const F={accruedCouponEod:150,ccy:50,count:100,couponPaymentFrequency:90,dateDaily:100,duration:100,isin:150,maturityDate:100,name:120,priceAvg:90,priceDaily:90,rating:50,type:50,yieldAvg:90,yieldDaily:150},C=e=>{let{tags:t,length:a}=e;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"portfolio-tags",style:{width:a+"px"}},t.map((e,t)=>{let{oldName:a,newName:n}=e;return l.a.createElement("div",{key:Object(y.uniqueId)(),style:{width:F[a]+"px"}},n)})))},I=e=>{let{body:t,length:a}=e;return l.a.createElement(l.a.Fragment,null,t.map(e=>l.a.createElement("div",{className:"portfolio-body",key:Object(y.uniqueId)(),style:{width:a+"px"}},Object.entries(e).map((e,t)=>{let[a,n]=e;return l.a.createElement("div",{key:Object(y.uniqueId)(),style:{width:F[a]+"px"}},n)}))))},x=(e,t)=>e.map(e=>{const a=Object(y.pick)(e,t);return a.accruedCouponEod=e.accruedCouponEod/100*1e3*e.count||null,a}),P=(e,t)=>Object.keys(e).reduce((e,a)=>e=[...e,{oldName:a,newName:t[a]}],[]);var A=()=>{const[e,t]=Object(n.useState)({dateDaily:"-"}),[a,c]=Object(n.useState)(["name","priceAvg","priceDaily","yieldAvg","yieldDaily","couponPaymentFrequency","type","accruedCouponEod","count"]),r={name:"Name",priceAvg:"Price (avg)",priceDaily:"Price Daily",yieldAvg:"Yield Avg",yieldDaily:"Yield ".concat(e.dateDaily),couponPaymentFrequency:"Coupons",type:"Type",accruedCouponEod:"NKD",count:"Count",rating:"Rating",ccy:"Ccy",dateDaily:"Daily Date",duration:"Duration",isin:"ISIN",maturityDate:"Maturity Date"};Object(n.useEffect)(()=>{u.a.get("https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/portfolio").then(n=>{let{data:l}=n;t({...e,data:x(l,a),dateDaily:f(l[0].dateDaily)})})},[]);const o=e.data&&Object.keys(e.data[0]).reduce((e,t)=>e+F[t]+20,0);return l.a.createElement(l.a.Fragment,null,!!e.data&&l.a.createElement("div",{className:"table"},l.a.createElement(C,{tags:P(e.data[0],r),length:o}),l.a.createElement(I,{body:e.data,length:o})))};var _=()=>l.a.createElement(i.a,null,l.a.createElement(o.d,null,l.a.createElement(o.b,{path:"/",element:l.a.createElement(s,null)},l.a.createElement(o.b,{path:"transactions",element:l.a.createElement(q,null)}),l.a.createElement(o.b,{path:"transactions/import",element:l.a.createElement(p,null)}),l.a.createElement(o.b,{path:"*",element:l.a.createElement(A,null)}))));a(69),a(70);r.a.createRoot(document.getElementById("root")).render(l.a.createElement(_,null))}},[[53,1,2]]]);
//# sourceMappingURL=main.5c6ab72a.chunk.js.map