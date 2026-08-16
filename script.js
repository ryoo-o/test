const $=s=>document.querySelector(s);
const defaultPosts=[
 {tag:"SERVER",title:"Welcome to BlockHaven Network",body:"The community hub is live. Read the rules, meet other players and keep an eye on this page for server news.",date:"Today"},
 {tag:"UPDATE",title:"Season 4 is now live",body:"New biomes, quests, player shops and a fresh economy have arrived. Jump in and start exploring.",date:"2 days ago"},
 {tag:"STAFF",title:"Staff recruitment is open",body:"We are looking for helpful, mature community members across moderation, building and events.",date:"5 days ago"}
];
let posts=JSON.parse(localStorage.getItem("bh_posts")||"null")||defaultPosts;
let apps=JSON.parse(localStorage.getItem("bh_apps")||"[]");
let threads=JSON.parse(localStorage.getItem("bh_threads")||"[]");
let users=JSON.parse(localStorage.getItem("bh_users")||"null")||[
 {name:"BlockHavenOwner",role:"OWNER",status:"Online"},
 {name:"AlexAdmin",role:"ADMIN",status:"Online"},
 {name:"MikaMod",role:"MOD",status:"Away"},
 {name:"SteveBuilder",role:"MEMBER",status:"Online"}
];
function save(){localStorage.setItem("bh_posts",JSON.stringify(posts));localStorage.setItem("bh_apps",JSON.stringify(apps));localStorage.setItem("bh_threads",JSON.stringify(threads));localStorage.setItem("bh_users",JSON.stringify(users))}
function render(){
 $("#announcementList").innerHTML=posts.map(p=>`<article class="post"><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><time>${esc(p.date)}</time></article>`).join("");
 $("#threadList").innerHTML=threads.length?threads.map(t=>`<div class="thread"><b>${esc(t.title)}</b><span>${esc(t.author)}</span><p>${esc(t.body)}</p></div>`).join(""):"";
 $("#appCount").textContent=apps.length;
 $("#applicationList").innerHTML=apps.length?apps.slice().reverse().map((a,i)=>`<div class="application"><div><b>${esc(a.name)} — ${esc(a.role)}</b><p>${esc(a.age)} · ${esc(a.timezone)}</p><p>${esc(a.reason)}</p></div><button class="ghost" onclick="removeApp(${apps.length-1-i})">Remove</button></div>`).join(""):`<div class="empty">No local applications yet.</div>`;
 $("#userList").innerHTML=users.map((u,i)=>`<div class="user-row"><div class="user-main"><div class="avatar">${esc(u.name[0].toUpperCase())}</div><div><div class="user-name">${esc(u.name)}</div><div class="user-meta">${esc(u.status)}</div></div></div><span class="role ${u.role.toLowerCase()}">${esc(u.role)}</span></div>`).join("");
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function openModal(html){$("#modalContent").innerHTML=html;$("#modal").classList.add("open")}
function closeModal(){$("#modal").classList.remove("open")}
function openApp(role){openModal(`<h2>${role} Application</h2><p class="notice">Demo mode: submissions are stored only in your browser. For a real server, connect this form to a backend/database.</p><form class="form" onsubmit="submitApp(event,'${role}')"><label>Minecraft username<input required name="name" maxlength="32"></label><label>Age<input required name="age" type="number" min="13" max="100"></label><label>Timezone<input required name="timezone" placeholder="e.g. IST / UTC+5:30"></label><label>Why should we choose you?<textarea required name="reason" maxlength="1000"></textarea></label><button class="btn primary" type="submit">Submit application</button></form>`)}
function submitApp(e,role){e.preventDefault();let f=new FormData(e.target);apps.push({role,name:f.get("name"),age:f.get("age"),timezone:f.get("timezone"),reason:f.get("reason")});save();render();closeModal();alert("Application saved to this browser.");location.hash="admin"}
function openPostModal(){openModal(`<h2>New Announcement</h2><form class="form" onsubmit="submitPost(event)"><label>Category<select name="tag"><option>SERVER</option><option>UPDATE</option><option>STAFF</option><option>EVENT</option></select></label><label>Title<input required name="title" maxlength="80"></label><label>Message<textarea required name="body" maxlength="500"></textarea></label><button class="btn primary">Publish locally</button></form>`)}
function submitPost(e){e.preventDefault();let f=new FormData(e.target);posts.unshift({tag:f.get("tag"),title:f.get("title"),body:f.get("body"),date:"Just now"});save();render();closeModal()}
function openThreadModal(){openModal(`<h2>Start a Discussion</h2><form class="form" onsubmit="submitThread(event)"><label>Username<input required name="author" maxlength="32"></label><label>Title<input required name="title" maxlength="80"></label><label>Message<textarea required name="body" maxlength="600"></textarea></label><button class="btn primary">Post discussion</button></form>`)}
function submitThread(e){e.preventDefault();let f=new FormData(e.target);threads.unshift({author:f.get("author"),title:f.get("title"),body:f.get("body")});save();render();closeModal()}
function openUserModal(){openModal(`<h2>Add User</h2><form class="form" onsubmit="submitUser(event)"><label>Username<input required name="name" maxlength="32"></label><label>Role<select name="role"><option>MEMBER</option><option>MOD</option><option>ADMIN</option><option>OWNER</option></select></label><button class="btn primary">Add to demo panel</button></form>`)}
function submitUser(e){e.preventDefault();let f=new FormData(e.target);users.push({name:f.get("name"),role:f.get("role"),status:"Online"});save();render();closeModal()}
function removeApp(i){apps.splice(i,1);save();render()}
function clearApps(){apps=[];save();render()}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
$("#profileBtn").onclick=()=>openModal(`<h2>Your Profile</h2><p class="notice">This GitHub Pages template does not include real authentication. Connect GitHub OAuth, Supabase, Firebase or your own backend for secure accounts and permissions.</p><div class="form"><label>Display name<input value="GuestPlayer" disabled></label><label>Current role<select disabled><option>MEMBER</option></select></label></div>`);
render();
