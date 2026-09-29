const $=s=>document.querySelector(s);
let coins=10000,bet=100,selected=null,current="";
const players=[
["NOVA","48,920","67"],["RAI YAN","31,450","51"],["SHUVO","26,100","43"],["ARIF","21,850","38"],["NABIL","18,700","35"],["SIAM","15,420","29"],["MAHI","13,900","26"],["RAHAT","12,300","22"],["TANVIR","11,250","20"],["SADIA","10,890","19"]
];
function renderBoard(){let r=players.map((p,i)=>`<div class="row"><span class="rank">#${i+1}</span><span class="player"><i class="mini">${p[0][0]}</i>${p[0]}</span><span class="wins">${p[2]}</span><span class="bal">◉ ${p[1]}</span></div>`).join("");$("#rows").innerHTML=r;$("#podium").innerHTML=[players[1],players[0],players[2]].map((p,i)=>`<div class="pod"><div class="crown">${["♛","♜","♞"][i]}</div><b>${p[0]}</b><small>◉ ${p[1]}</small></div>`).join("")}
renderBoard();
function updateCoins(){let e=$("#coins");e.textContent=coins.toLocaleString();e.animate([{transform:"scale(1)"},{transform:"scale(1.3)"},{transform:"scale(1)"}],{duration:400})}
function changeBet(x){bet=Math.max(100,Math.min(coins,bet+x));$("#bet").textContent=bet.toLocaleString()}
function openGame(type){current=type;selected=null;$("#gameModal").classList.add("show");$("#stage").className="stage";$("#stageText").textContent="Make your choice.";$("#reveal").disabled=false;
let title=type==="color"?"Pick a color":type==="number"?"Pick a number from 1—10":"Choose your side";
$("#gameTitle").textContent=title;$("#gameTag").textContent=type==="color"?"COLOR RUSH":type==="number"?"NUMBER 1—10":"BLACK / WHITE";
let arr=type==="color"?[["YELLOW","yellow"],["RED","red"],["BLUE","blue"]]:type==="number"?Array.from({length:10},(_,i)=>[i+1,""]):[["BLACK","black"],["WHITE","white"]];
$("#choices").innerHTML=arr.map(a=>`<button class="choice ${a[1]}" data-v="${a[0]}" onclick="selectChoice(this)">${a[0]}</button>`).join("")}
function selectChoice(el){document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");selected=el.dataset.v;$("#stageText").textContent="Locked: "+selected}
function closeGame(){$("#gameModal").classList.remove("show")}
function reveal(){if(!selected){toast("Choose something first 😭");return} if(coins<bet){toast("Not enough virtual coins.");return}
$("#reveal").disabled=true;let stage=$("#stage");stage.className="stage active spin";$("#stageText").textContent="THE UNIVERSE IS DECIDING...";
let result=current==="color"?["YELLOW","RED","BLUE"][Math.floor(Math.random()*3)]:current==="number"?String(Math.floor(Math.random()*10)+1):["BLACK","WHITE"][Math.floor(Math.random()*2)];
setTimeout(()=>{let win=result===selected;stage.className="stage active "+(win?"win":"lose");$("#reel").textContent=current==="number"?result:result==="YELLOW"?"🟡":result==="RED"?"🔴":result==="BLUE"?"🔵":result==="BLACK"?"⚫":"⚪";$("#stageText").innerHTML=win?`<b style="color:#c7ff38">YOU GOT IT.</b> +${(bet*2).toLocaleString()} coins`:`<b style="color:#ff4f67">NOT THIS TIME.</b> Result: ${result}`;
coins=win?coins+bet:coins-bet;updateCoins(); if(win)burst();setTimeout(()=>{$("#reveal").disabled=false},800)},1250)}
function burst(){for(let i=0;i<70;i++){let p=document.createElement("i");p.className="p";p.style.left="50%";p.style.top="50%";p.style.background=["#c7ff38","#54e7ff","#fff","#ff4f67"][i%4];p.style.setProperty("--x",(Math.random()*2-1)*window.innerWidth+"px");p.style.setProperty("--y",(Math.random()*2-1)*window.innerHeight+"px");$("#particles").appendChild(p);setTimeout(()=>p.remove(),1200)}}
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
$("#profile").onclick=()=>toast("Profile system ready — connect Supabase for real accounts.");
window.onclick=e=>{if(e.target===$("#gameModal"))closeGame()}
