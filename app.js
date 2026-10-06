const KEY="lifeAdminV1";
const cats={
 home:{name:"Home",icon:"🏠"},car:{name:"Car",icon:"🚗"},money:{name:"Money",icon:"💰"},
 personal:{name:"Personal",icon:"📄"},family:{name:"Family",icon:"👨‍👩‍👧"},other:{name:"Other",icon:"📦"}
};
let state=JSON.parse(localStorage.getItem(KEY)||'null')||{name:"",items:[]};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));render()};
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const dateObj=s=>new Date(s+"T00:00:00");
function daysUntil(s){return Math.ceil((dateObj(s)-new Date(new Date().toDateString()))/86400000)}
function formatDate(s){return dateObj(s).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}
function dueText(d){if(d<0)return `${Math.abs(d)} day${Math.abs(d)==1?"":"s"} overdue`;if(d===0)return"Due today";if(d===1)return"Due tomorrow";if(d<30)return`Due in ${d} days`;return formatDate(currentItemDate)}
function itemStatus(item){let d=daysUntil(item.due);return d<0?"overdue":d<=14?"soon":""}
function sorted(items){return [...items].sort((a,b)=>dateObj(a.due)-dateObj(b.due))}
function render(){
  $("#userName").textContent=state.name?`, ${esc(state.name)}`:"";
  const total=state.items.length, overdue=state.items.filter(i=>daysUntil(i.due)<0).length, soon=state.items.filter(i=>daysUntil(i.due)<=14).length;
  const score=total?Math.max(0,Math.round(((total-overdue)/total)*100)):100;
  $("#score").textContent=score+"%";$("#ringValue").textContent=score;$("#scoreProgress").style.width=score+"%";$("#scoreRing").style.setProperty("--score",score+"%");
  $("#scoreText").textContent=score>=90?"Under control":score>=70?"Nearly there":"Needs attention";
  $("#scoreDetail").textContent=total?`${overdue} overdue · ${soon} due within 14 days · ${total} total item${total===1?"":"s"}`:"Nothing added yet — you're all caught up.";
  Object.keys(cats).forEach(k=>{$("#count-"+k).textContent=`${state.items.filter(i=>i.category===k).length} item${state.items.filter(i=>i.category===k).length===1?"":"s"}`});
  const sortedItems=sorted(state.items);
  renderList("#attentionList",sortedItems.filter(i=>daysUntil(i.due)<=30).slice(0,5),"No upcoming items. Nice work.");
  renderList("#allList",sortedItems.slice(0,8),"No life admin yet. Add your first item above.");
}
function renderList(sel,items,empty){
  const el=$(sel); if(!items.length){el.innerHTML=`<div class="empty">${empty}</div>`;return}
  el.innerHTML=items.map(i=>{const d=daysUntil(i.due),c=cats[i.category]||cats.other;return `<button class="item ${itemStatus(i)}" data-id="${i.id}">
    <div class="item-icon">${c.icon}</div><div class="item-main"><div class="item-title">${esc(i.title)}</div><div class="item-meta">${c.name}${i.repeat&&i.repeat!=="none"?" · "+i.repeat:""}</div></div>
    <div class="item-date"><div class="date-label">${d<0?"Overdue":d<=14?"Coming up":"Due"}</div><div class="date-value">${d<0?Math.abs(d)+"d late":d===0?"Today":d===1?"Tomorrow":formatDate(i.due)}</div></div>
  </button>`}).join("");
  $$(sel+" .item").forEach(x=>x.onclick=()=>openEdit(x.dataset.id));
}
function openModal(html){$("#modal").innerHTML=html;$("#modalBackdrop").classList.remove("hidden")}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function openAdd(category="home"){
  openModal(`<div class="modal-header"><h3>Add life admin</h3><button class="close" id="close">✕</button></div>
  <form id="itemForm"><div class="form-grid">
  <div class="field"><label>What needs remembering?</label><input id="title" required placeholder="e.g. Car registration"></div>
  <div class="field"><label>Category</label><select id="category">${Object.entries(cats).map(([k,v])=>`<option value="${k}" ${k===category?"selected":""}>${v.icon} ${v.name}</option>`).join("")}</select></div>
  <div class="field"><label>Due date</label><input id="due" type="date" required value="${new Date().toISOString().slice(0,10)}"></div>
  <div class="field"><label>Repeat</label><select id="repeat"><option value="none">Doesn't repeat</option><option>Monthly</option><option>Every 3 months</option><option>Every 6 months</option><option>Yearly</option></select></div>
  </div><div class="form-actions"><button type="button" class="secondary" id="cancel">Cancel</button><button class="primary">Save item</button></div></form>`);
  $("#close").onclick=closeModal;$("#cancel").onclick=closeModal;$("#itemForm").onsubmit=e=>{e.preventDefault();state.items.push({id:crypto.randomUUID(),title:$("#title").value.trim(),category:$("#category").value,due:$("#due").value,repeat:$("#repeat").value});closeModal();save()};
}
function openEdit(id){
 const i=state.items.find(x=>x.id===id); if(!i)return;
 openModal(`<div class="modal-header"><h3>Edit item</h3><button class="close" id="close">✕</button></div>
 <form id="itemForm"><div class="form-grid">
 <div class="field"><label>What needs remembering?</label><input id="title" required value="${esc(i.title)}"></div>
 <div class="field"><label>Category</label><select id="category">${Object.entries(cats).map(([k,v])=>`<option value="${k}" ${k===i.category?"selected":""}>${v.icon} ${v.name}</option>`).join("")}</select></div>
 <div class="field"><label>Due date</label><input id="due" type="date" required value="${i.due}"></div>
 <div class="field"><label>Repeat</label><select id="repeat"><option ${i.repeat==="none"?"selected":""}>Doesn't repeat</option><option ${i.repeat==="Monthly"?"selected":""}>Monthly</option><option ${i.repeat==="Every 3 months"?"selected":""}>Every 3 months</option><option ${i.repeat==="Every 6 months"?"selected":""}>Every 6 months</option><option ${i.repeat==="Yearly"?"selected":""}>Yearly</option></select></div>
 </div><div class="form-actions"><button type="button" class="danger-btn" id="delete">Delete</button><button class="primary">Save changes</button></div></form>`);
 $("#close").onclick=closeModal;$("#delete").onclick=()=>{if(confirm("Delete this item?")){state.items=state.items.filter(x=>x.id!==id);closeModal();save()}};
 $("#itemForm").onsubmit=e=>{e.preventDefault();Object.assign(i,{title:$("#title").value.trim(),category:$("#category").value,due:$("#due").value,repeat:$("#repeat").value});closeModal();save()};
}
function openSettings(){
 openModal(`<div class="modal-header"><h3>Settings</h3><button class="close" id="close">✕</button></div>
 <div class="setting-row"><div><b>Your name</b><small>Used on the home screen</small></div><button class="text-btn" id="nameEdit">${state.name?esc(state.name):"Add name"}</button></div>
 <div class="setting-row"><div><b>Notifications</b><small>V1 uses browser reminders when supported</small></div><button class="toggle" id="notify"><i></i></button></div>
 <div class="setting-row"><div><b>Data</b><small>Stored locally on this device/browser</small></div><button class="text-btn" id="clearData">Clear all</button></div>`);
 $("#close").onclick=closeModal;$("#nameEdit").onclick=()=>{const n=prompt("What should we call you?",state.name);if(n!==null){state.name=n.trim();save();openSettings()}};
 $("#clearData").onclick=()=>{if(confirm("Delete every Life Admin item?")){state={name:state.name,items:[]};save();closeModal()}};
 $("#notify").onclick=async()=>{if("Notification" in window){const p=await Notification.requestPermission();$("#notify").classList.toggle("on",p==="granted")}};
}
$("#addBtn").onclick=()=>openAdd();$("#navAdd").onclick=()=>openAdd();
$("#settingsBtn").onclick=openSettings;
$("#viewAllBtn").onclick=()=>window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
$$(".quick-card").forEach(b=>b.onclick=()=>openAdd(b.dataset.category));
$$(".nav-item").forEach(b=>b.onclick=()=>{if(b.dataset.tab==="settings")openSettings();else if(b.dataset.tab==="items")document.querySelector(".upcoming-head").scrollIntoView({behavior:"smooth"});else if(b.dataset.tab==="categories")document.querySelector(".quick-grid").scrollIntoView({behavior:"smooth"});else window.scrollTo({top:0,behavior:"smooth"});$$(".nav-item").forEach(x=>x.classList.toggle("active",x===b))});
$("#modalBackdrop").onclick=e=>{if(e.target.id==="modalBackdrop")closeModal()};
render();
