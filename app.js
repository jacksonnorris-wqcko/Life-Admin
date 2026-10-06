const STORE="lifeAdminV2";
const cats={
 home:{name:"Home",icon:"home"},car:{name:"Car",icon:"car"},money:{name:"Money",icon:"money"},
 personal:{name:"Personal",icon:"personal"},family:{name:"Family",icon:"family"},other:{name:"Other",icon:"other"},income:{name:"Income",icon:"income"}
};
const icons={
home:`<svg viewBox="0 0 24 24"><path d="M3.5 10.5 12 3l8.5 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>`,
car:`<svg viewBox="0 0 24 24"><path d="M5 17.5h14l-1-7H6l-1 7Z"/><path d="m7 10.5 1.5-4h7l1.5 4"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/></svg>`,
money:`<svg viewBox="0 0 24 24"><path d="M4 7.5h16v11H4z"/><path d="M7 7.5V5h13v10h-3"/><circle cx="12" cy="13" r="2.5"/></svg>`,
personal:`<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 15c.8-1.4 4.2-1.4 5 0M14 10h4M14 13h4"/></svg>`,
family:`<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="2.5"/><circle cx="16" cy="8" r="2"/><path d="M4.5 18c.8-3.5 8.2-3.5 9 0M13 17c.5-2.8 6-2.8 6.5 0"/></svg>`,
other:`<svg viewBox="0 0 24 24"><path d="M4 7h6l1.5 2H20v10H4z"/><path d="M4 7V5h6l1.5 2"/></svg>`,
settings:`<svg viewBox="0 0 24 24"><path d="M9.8 3.8h4.4l.6 2a7.7 7.7 0 0 1 1.6.9l2-.6 2.2 3.8-1.5 1.5a7.6 7.6 0 0 1 0 1.9l1.5 1.5-2.2 3.8-2-.6a7.7 7.7 0 0 1-1.6.9l-.6 2H9.8l-.6-2a7.7 7.7 0 0 1-1.6-.9l-2 .6-2.2-3.8L5 13.1a7.6 7.6 0 0 1 0-1.9L3.5 9.7l2.2-3.8 2 .6a7.7 7.7 0 0 1 1.6-.9z"/><circle cx="12" cy="12.1" r="2.6"/></svg>`,
calendar:`<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16"/></svg>`,
repeat:`<svg viewBox="0 0 24 24"><path d="M18.5 7.5A7 7 0 0 0 6 6l-2 2M4 5v3h3"/><path d="M5.5 16.5A7 7 0 0 0 18 18l2-2M20 19v-3h-3"/></svg>`,
warning:`<svg viewBox="0 0 24 24"><path d="m12 4 9 16H3z"/><path d="M12 9v5M12 17.5v.2"/></svg>`,
check:`<svg viewBox="0 0 24 24"><path d="m5 12 4.2 4.2L19 6.5"/></svg>`,
search:`<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m16 16 4.5 4.5"/></svg>`,
close:`<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
add:`<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
grid:`<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>`,
items:`<svg viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
chart:`<svg viewBox="0 0 24 24"><path d="M5 20V11M12 20V5M19 20v-8"/></svg>`,
income:`<svg viewBox="0 0 24 24"><path d="M12 20V4M7 9l5-5 5 5"/><path d="M5 20h14"/></svg>`,
paperclip:`<svg viewBox="0 0 24 24"><path d="m8 12.5 6.8-6.8a3.2 3.2 0 0 1 4.5 4.5L10 19.5a4.5 4.5 0 0 1-6.4-6.4l9-9"/></svg>`,
edit:`<svg viewBox="0 0 24 24"><path d="m5 19 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L9 18z"/><path d="m14.5 6.5 3 3"/></svg>`,
trash:`<svg viewBox="0 0 24 24"><path d="M5 7h14M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></svg>`
};
let state=loadState();
let view={category:"all",filter:"attention",search:""};

function loadState(){
 try{const s=JSON.parse(localStorage.getItem(STORE));if(s&&Array.isArray(s.items))return s}catch{}
 return {name:"",items:[],settings:{notifications:false}};
}
function save(){localStorage.setItem(STORE,JSON.stringify(state));render()}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function today(){let d=new Date();d.setHours(0,0,0,0);return d}
function dateObj(s){return new Date(s+"T00:00:00")}
function daysUntil(s){return Math.ceil((dateObj(s)-today())/86400000)}
function formatDate(s){return dateObj(s).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}
function money(v){return "$"+Number(v||0).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2})}
function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random().toString(16).slice(2)}
function iconFor(cat){return icons[cats[cat]?.icon||"other"]}
function repeatDays(r){return {Weekly:7,Monthly:30,"Every 3 months":91,"Every 6 months":182,Yearly:365}[r]||0}
function status(i){if(i.completed)return"complete";const d=daysUntil(i.due);return d<0?"overdue":d<=14?"soon":""}
function nextDue(item){
 const step=repeatDays(item.repeat);if(!step)return null;
 let d=dateObj(item.due), now=today(); while(d<=now)d=new Date(d.getTime()+step*86400000);
 return d.toISOString().slice(0,10)
}
function installIcons(){
 document.querySelectorAll("[data-icon]").forEach(el=>{const k=el.dataset.icon;if(icons[k])el.innerHTML=icons[k]});
}
function filteredItems(){
 let arr=state.items.filter(i=>view.category==="all"||i.category===view.category);
 const q=view.search.trim().toLowerCase();
 if(q)arr=arr.filter(i=>[i.title,i.notes,i.provider,i.category].join(" ").toLowerCase().includes(q));
 if(view.filter==="overdue")arr=arr.filter(i=>!i.completed&&daysUntil(i.due)<0);
 if(view.filter==="soon")arr=arr.filter(i=>!i.completed&&daysUntil(i.due)<=14);
 if(view.filter==="completed")arr=arr.filter(i=>i.completed);
 if(view.filter==="cost")arr=arr.filter(i=>!i.completed&&i.moneyType!=="income"&&Number(i.cost)>0&&daysUntil(i.due)<=30);
 if(view.filter==="income")arr=arr.filter(i=>!i.completed&&i.moneyType==="income"&&Number(i.cost)>0);
 return arr.sort((a,b)=>{
   if(a.completed!==b.completed)return a.completed?1:-1;
   return dateObj(a.due)-dateObj(b.due)
 });
}
function render(){
 $("#userName").textContent=state.name?", "+esc(state.name):"";
 const active=state.items.filter(i=>!i.completed), overdue=active.filter(i=>daysUntil(i.due)<0), soon=active.filter(i=>daysUntil(i.due)<=14), completed=state.items.filter(i=>i.completed);
 const outgoing30=active.filter(i=>i.moneyType!=="income"&&daysUntil(i.due)>=0&&daysUntil(i.due)<=30).reduce((a,i)=>a+Number(i.cost||0),0);
 const outgoing365=active.filter(i=>i.moneyType!=="income"&&daysUntil(i.due)>=0&&daysUntil(i.due)<=365).reduce((a,i)=>a+Number(i.cost||0),0);
 const incoming30=active.filter(i=>i.moneyType==="income"&&daysUntil(i.due)>=0&&daysUntil(i.due)<=30).reduce((a,i)=>a+Number(i.cost||0),0);
 const incoming365=active.filter(i=>i.moneyType==="income"&&daysUntil(i.due)>=0&&daysUntil(i.due)<=365).reduce((a,i)=>a+Number(i.cost||0),0);
 const weeklyIncome=active.filter(i=>i.moneyType==="income"&&i.repeat==="Weekly").reduce((a,i)=>a+Number(i.cost||0),0);
 const monthlyIncome=active.filter(i=>i.moneyType==="income"&&i.repeat==="Monthly").reduce((a,i)=>a+Number(i.cost||0),0);
 const annualIncome=active.filter(i=>i.moneyType==="income"&&i.repeat==="Yearly").reduce((a,i)=>a+Number(i.cost||0),0);
 const score=state.items.length?Math.max(0,Math.round(((active.length-overdue.length)/state.items.length)*100)):100;
 $("#score").textContent=score+"%";$("#ringValue").textContent=score;$("#scoreProgress").style.width=score+"%";$("#scoreRing").style.setProperty("--score",score+"%");
 $("#scoreText").textContent=score>=90?"Under control":score>=70?"Nearly there":"Needs attention";
 $("#scoreDetail").textContent=state.items.length?`${overdue.length} overdue · ${soon.length} due within 14 days · ${completed.length} completed`:"Nothing added yet — you're all caught up.";
 $("#overdueCount").textContent=overdue.length;$("#soonCount").textContent=soon.length;$("#completeCount").textContent=completed.length;$("#costCount").textContent=money(outgoing30);$("#incomeCount").textContent=money(incoming30);
 $("#upcomingCost").textContent=money(outgoing30);$("#monthCost").textContent=money(outgoing30);$("#yearCost").textContent=money(outgoing365);
 $("#incomingTotal").textContent=money(incoming30);$("#weeklyIncome").textContent=money(weeklyIncome);$("#monthlyIncome").textContent=money(monthlyIncome);$("#annualIncome").textContent=money(annualIncome);
 const list=filteredItems();
 const titles={attention:["Needs attention","Things coming up soon"],all:["All items","Your life admin in one place"],overdue:["Overdue","These need your attention"],soon:["Due soon","The next 14 days"],completed:["Completed","Finished life admin"],cost:["Upcoming costs","Outgoing money due soon"],income:["Incoming money","Money coming into your life"]};
 const t=titles[view.filter]||titles.all;$("#listTitle").textContent=t[0];$("#listSubtitle").textContent=t[1];
 $("#viewAllBtn").textContent=view.filter==="attention"?"View all":"Reset";
 renderList(list);
 installIcons();
}
function renderList(list){
 const el=$("#itemList");
 if(!list.length){el.innerHTML=`<div class="empty">${view.search?"No items match your search.":view.filter==="attention"?"No upcoming items. Nice work.":"Nothing to show here."}</div>`;return}
 el.innerHTML=list.map(i=>{
   const d=daysUntil(i.due),c=cats[i.category]||cats.other, st=status(i);
   const date=i.completed?`Completed ${formatDate(i.completedAt||i.due)}`:d<0?`${Math.abs(d)}d late`:d===0?"Today":d===1?"Tomorrow":formatDate(i.due);
   return `<div class="item ${st}" data-id="${i.id}">
     <button class="check-button" data-complete="${i.id}" aria-label="${i.completed?"Reopen":"Complete"}">${i.completed?icons.check:""}</button>
     <button class="item-icon" data-open="${i.id}" aria-label="Open ${esc(i.title)}">${iconFor(i.category)}</button>
     <button class="item-main" data-open="${i.id}"><div class="item-title">${esc(i.title)}</div>
     <div class="item-meta"><span>${esc(c.name)}</span>${i.repeat&&i.repeat!=="Doesn't repeat"?`<span>· ${icons.repeat} ${esc(i.repeat)}</span>`:""}${Number(i.cost)>0?`<span class="${i.moneyType==="income"?"income-text":""}">· ${i.moneyType==="income"?"+":"-"}${money(i.cost)}</span>`:""}</div></button>
     <button class="item-date" data-open="${i.id}"><div class="date-label">${i.completed?"Done":d<0?"Overdue":d<=14?"Coming up":"Due"}</div><div class="date-value">${date}</div></button>
   </div>`}).join("");
 el.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openDetail(b.dataset.open));
 el.querySelectorAll("[data-complete]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleComplete(b.dataset.complete)});
}
function openModal(html){$("#modal").innerHTML=html;$("#modalBackdrop").classList.remove("hidden");installIcons()}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function categoryOptions(selected){return Object.entries(cats).map(([k,v])=>`<option value="${k}" ${k===selected?"selected":""}>${v.name}</option>`).join("")}
function repeatOptions(selected){return ["Doesn't repeat","Weekly","Monthly","Every 3 months","Every 6 months","Yearly"].map(x=>`<option ${x===selected?"selected":""}>${x}</option>`).join("")}
function formHtml(item={}){
 const isEdit=!!item.id, due=item.due||new Date().toISOString().slice(0,10);
 return `<div class="modal-header"><h3>${isEdit?"Edit item":"Add life admin"}</h3><button class="close" id="close">${icons.close}</button></div>
 <form id="itemForm"><div class="form-grid">
 <div class="field"><label>What needs remembering?</label><input id="title" required maxlength="100" value="${esc(item.title)}" placeholder="e.g. Car registration"></div>
 <div class="field"><label>Category</label><select id="category">${categoryOptions(item.category||"home")}</select></div>
 <div class="field"><label>Due date</label><input id="due" type="date" required value="${due}"></div>
 <div class="field"><label>Repeat</label><select id="repeat">${repeatOptions(item.repeat||"Doesn't repeat")}</select></div>
 <div class="field"><label>Money <span class="muted">(optional)</span></label>
   <select id="moneyType"><option value="expense" ${item.moneyType!=="income"?"selected":""}>Outgoing — this costs me money</option><option value="income" ${item.moneyType==="income"?"selected":""}>Incoming — this pays me money</option></select>
 </div>
 <div class="field"><label id="moneyLabel">${item.moneyType==="income"?"Amount coming in":"Amount going out"}</label><input id="cost" type="number" min="0" step="0.01" value="${Number(item.cost||0)||""}" placeholder="0.00"></div>
 <div class="field"><label>Provider / company <span class="muted">(optional)</span></label><input id="provider" maxlength="80" value="${esc(item.provider)}" placeholder="e.g. NRMA"></div>
 <div class="field"><label>Notes <span class="muted">(optional)</span></label><textarea id="notes" maxlength="500" placeholder="Anything worth remembering...">${esc(item.notes)}</textarea></div>
 </div>
 <div class="form-actions">${isEdit?`<button type="button" class="danger-btn" id="delete">${icons.trash} Delete</button>`:""}<button type="button" class="secondary" id="cancel">Cancel</button><button class="primary">Save ${isEdit?"changes":"item"}</button></div>
 </form>`;
}
function openAdd(category="home"){openModal(formHtml({category}));bindForm()}
function openEdit(id){const i=state.items.find(x=>x.id===id);if(i){openModal(formHtml(i));bindForm(i)}}
function bindForm(existing){
 $("#close").onclick=closeModal;$("#cancel").onclick=closeModal;
 if(existing)$("#delete").onclick=()=>{if(confirm("Delete this item?")){state.items=state.items.filter(x=>x.id!==existing.id);closeModal();save()}};
 $("#moneyType").onchange=()=>{$("#moneyLabel").textContent=$("#moneyType").value==="income"?"Amount coming in":"Amount going out"};
 $("#itemForm").onsubmit=e=>{e.preventDefault();
   const data={title:$("#title").value.trim(),category:$("#category").value,due:$("#due").value,repeat:$("#repeat").value,cost:Number($("#cost").value||0),moneyType:$("#moneyType").value,provider:$("#provider").value.trim(),notes:$("#notes").value.trim()};
   if(existing)Object.assign(existing,data);else state.items.push({id:uid(),...data,completed:false,createdAt:new Date().toISOString(),attachments:[]});
   closeModal();save();toast(existing?"Item updated":"Item added");
 };
}
function openDetail(id){
 const i=state.items.find(x=>x.id===id);if(!i)return;
 const d=daysUntil(i.due),c=cats[i.category]||{name:"Income",icon:"income"};
 const atts=i.attachments||[];
 openModal(`<div class="modal-header"><h3>Life admin</h3><button class="close" id="close">${icons.close}</button></div>
 <div class="detail-hero"><div class="detail-icon">${iconFor(i.category)}</div><div><h3>${esc(i.title)}</h3><p>${esc(c.name)}${i.provider?" · "+esc(i.provider):""}</p></div></div>
 <div class="detail-grid"><div class="detail-box"><small>Due date</small><b>${formatDate(i.due)}</b></div><div class="detail-box"><small>Status</small><b>${i.completed?"Completed":d<0?"Overdue":d<=14?"Due soon":"Upcoming"}</b></div><div class="detail-box"><small>Repeat</small><b>${esc(i.repeat||"Doesn't repeat")}</b></div><div class="detail-box"><small>${i.moneyType==="income"?"Incoming":"Outgoing"}</small><b>${Number(i.cost)>0?(i.moneyType==="income"?"+":"-")+money(i.cost):"Not set"}</b></div></div>
 ${i.notes?`<div class="field"><label>Notes</label><p class="detail-note">${esc(i.notes)}</p></div>`:""}
 <div class="field"><label>Attachments</label><div class="attachment-list">${atts.length?atts.map((a,n)=>`<div class="attachment">${icons.paperclip}<span>${esc(a.name)}</span><button data-remove-attachment="${n}">Remove</button></div>`).join(""):`<div class="empty">No attachments yet.</div>`}</div></div>
 <div class="form-actions"><button class="secondary" id="edit">${icons.edit} Edit</button><button class="secondary" id="attach">${icons.paperclip} Attach</button><button class="primary" id="done">${i.completed?"Reopen":"Complete"}</button></div>`);
 $("#close").onclick=closeModal;$("#edit").onclick=()=>openEdit(id);$("#attach").onclick=()=>attachFile(id);
 $("#done").onclick=()=>{toggleComplete(id);closeModal()};
 document.querySelectorAll("[data-remove-attachment]").forEach(b=>b.onclick=()=>{i.attachments.splice(Number(b.dataset.removeAttachment),1);save();openDetail(id)});
 installIcons();
}
function toggleComplete(id){
 const i=state.items.find(x=>x.id===id);if(!i)return;
 if(!i.completed){i.completed=true;i.completedAt=new Date().toISOString().slice(0,10);
   const next=nextDue(i);if(next){state.items.push({...i,id:uid(),due:next,completed:false,completedAt:null,attachments:[]})}
 }else{i.completed=false;i.completedAt=null}
 save();toast(i.completed?"Completed":"Reopened");
}
function attachFile(id){
 const input=$("#fileInput");input.value="";
 input.onchange=async()=>{const f=input.files?.[0];if(!f)return;const i=state.items.find(x=>x.id===id);if(!i)return;
   // Store small files directly for V2. Large files keep metadata only to avoid bloating localStorage.
   const rec={name:f.name,type:f.type,size:f.size};
   if(f.size<=750000){rec.data=await readDataUrl(f)}
   i.attachments=i.attachments||[];i.attachments.push(rec);save();openDetail(id);toast("Attachment added");
 };input.click();
}
function readDataUrl(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
function openSettings(){
 openModal(`<div class="modal-header"><h3>Settings</h3><button class="close" id="close">${icons.close}</button></div>
 <div class="setting-row"><div><b>Your name</b><small>Used on the home screen</small></div><button class="text-btn" id="nameEdit">${state.name?esc(state.name):"Add name"}</button></div>
 <div class="setting-row"><div><b>Notifications</b><small>Request browser permission where supported</small></div><button class="toggle ${state.settings.notifications?"on":""}" id="notify"><i></i></button></div>
 <div class="setting-row"><div><b>Backup</b><small>Export your data or restore a previous backup</small></div><div><button class="text-btn" id="export">Export</button> <button class="text-btn" id="import">Import</button></div></div>
 <div class="setting-row"><div><b>Data</b><small>Stored locally on this device/browser</small></div><button class="text-btn" id="clearData">Clear all</button></div>
 <p style="font-size:11px;color:#667085;margin-top:18px">Life Admin V2 · Local-first testing build</p>`);
 $("#close").onclick=closeModal;
 $("#nameEdit").onclick=()=>{const n=prompt("What should we call you?",state.name);if(n!==null){state.name=n.trim();save();openSettings()}};
 $("#notify").onclick=async()=>{if("Notification" in window){const p=await Notification.requestPermission();state.settings.notifications=p==="granted";save();openSettings()}};
 $("#export").onclick=exportData;$("#import").onclick=()=>{$("#fileInput").accept=".json,application/json";$("#fileInput").onchange=importData;$("#fileInput").click()};
 $("#clearData").onclick=()=>{if(confirm("Delete every Life Admin item? This cannot be undone.")){state={name:state.name,items:[],settings:{notifications:false}};save();closeModal()}};
}
function exportData(){
 const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="life-admin-backup.json";a.click();URL.revokeObjectURL(url);toast("Backup exported");
}
function importData(e){
 const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x.items))throw Error();state={name:x.name||"",items:x.items,settings:x.settings||{notifications:false}};save();closeModal();toast("Backup restored")}catch{alert("That file isn't a valid Life Admin backup.")}};r.readAsText(f)
}
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add("show"));setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.remove(),220)},1800)}
$("#addBtn")?.addEventListener("click",()=>openAdd());
$("#navAdd").onclick=()=>openAdd();
$("#settingsBtn").onclick=openSettings;
$("#modalBackdrop").onclick=e=>{if(e.target.id==="modalBackdrop")closeModal()};
$("#searchInput").oninput=e=>{view.search=e.target.value;$("#clearSearch").classList.toggle("hidden",!view.search);view.filter="all";render()};
$("#clearSearch").onclick=()=>{$("#searchInput").value="";view.search="";$("#clearSearch").classList.add("hidden");render()};
document.querySelectorAll(".category-chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".category-chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");view.category=b.dataset.category;render()});
document.querySelectorAll(".stat-card").forEach(b=>b.onclick=()=>{view.filter=b.dataset.filter==="all"?"all":b.dataset.filter==="cost"?"cost":b.dataset.filter;render();window.scrollTo({top:250,behavior:"smooth"})});
$("#viewAllBtn").onclick=()=>{view.filter=view.filter==="attention"?"all":"attention";render()};
$("#incomingTotal").parentElement.parentElement.onclick=()=>{view.filter="income";render();window.scrollTo({top:250,behavior:"smooth"})};
document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 if(b.dataset.tab==="settings"){openSettings();return}
 if(b.dataset.tab==="items"){view.filter="all";view.category="all";document.querySelectorAll(".category-chip").forEach(x=>x.classList.toggle("active",x.dataset.category==="all"));render();document.querySelector(".section-head").scrollIntoView({behavior:"smooth"});return}
 if(b.dataset.tab==="categories"){view.filter="all";render();document.querySelector(".category-strip").scrollIntoView({behavior:"smooth"});return}
 view.filter="attention";render();window.scrollTo({top:0,behavior:"smooth"});
});
installIcons();render();
