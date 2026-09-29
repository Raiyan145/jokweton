const $=s=>document.querySelector(s);
const modal=$("#modal"), title=$("#modalTitle"), text=$("#modalText"), action=$("#modalAction"), result=$("#result");
let mode="send";
function open(type){mode=type;modal.classList.add("show");result.textContent="";
  if(type==="send"){title.textContent="Send imaginary money";text.textContent="Who deserves your fictional fortune?";action.textContent="Send the money →"}
  if(type==="request"){title.textContent="Request imaginary money";text.textContent="Ask a friend for some completely real-looking fake cash.";action.textContent="Request money →"}
  if(type==="double"){title.textContent="Double or disaster";text.textContent="Risk your fake balance for absolutely no reason.";action.textContent="DO IT. ×2 →"}
  if(type==="ghost"){title.textContent="Ghost mode";text.textContent="Disappear from your friends' financial radar.";action.textContent="Activate ghost mode 👻"}
  if(type==="wallet"){title.textContent="Create fake wallet";text.textContent="Enter your name and receive your totally fictional fortune.";action.textContent="Create wallet →"}
}
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>open(b.dataset.action));
$("#heroStart").onclick=()=>open("wallet");$("#openWallet").onclick=()=>open("wallet");$("#ctaBtn").onclick=()=>open("wallet");
$("#close").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
$("#demoBtn").onclick=()=>{alert("🎬 DEMO MODE\n\nYour friend just sent ৳5,000.\nYou are now 0.0001% richer.\n\n(Probably.)")};
action.onclick=()=>{
 let name=$("#friend").value.trim()||"Your friend", amount=Number($("#amount").value)||500;
 if(mode==="send"){result.textContent=`✅ ৳${amount.toLocaleString()} sent to ${name}. Transaction ID: BRO-${Math.floor(Math.random()*9000+1000)}`;flashBalance(-Math.min(amount,420))}
 else if(mode==="request"){result.textContent=`📨 Request sent to ${name}. They have 3–5 business laughs to respond.`}
 else if(mode==="double"){let win=Math.random()>.5;result.textContent=win?"🤑 JACKPOT! Your imaginary money doubled.":"💀 BRO... the money has left the universe.";if(win)flashBalance(amount||1000)}
 else if(mode==="ghost"){result.textContent="👻 Ghost mode activated. Your balance is now emotionally unavailable."}
 else {result.textContent=`🎉 Welcome, ${name}. Starting balance: ৳69,420.00. Please don't spend it all.`}
};
function flashBalance(delta){let el=$("#balance");let n=Number(el.textContent.replace(/,/g,""))+delta;el.textContent=n.toLocaleString("en-US",{minimumFractionDigits:2});el.animate([{transform:"scale(1)"},{transform:"scale(1.15)"},{transform:"scale(1)"}],{duration:500})}
setInterval(()=>{let names=["Rafi","Nabil","Siam","Mahi","Shuvo","Arif"];let n=names[Math.floor(Math.random()*names.length)];let t=document.createElement("div");t.className="tx";t.innerHTML=`<span class="avatar">${n[0]}</span><div><b>${n}</b><small>Just did something financially questionable</small></div><strong class="plus">+৳${[1,69,420,999][Math.floor(Math.random()*4)].toLocaleString()}</strong>`;$("#transactions").prepend(t);if($("#transactions").children.length>5)$("#transactions").lastElementChild.remove()},7000);
