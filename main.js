const $ = s => document.querySelector(s);
const pages = document.querySelectorAll("[data-page]");
const links = document.querySelectorAll(".nav a[data-target]");
let currentUser = null;

function show(id){
  pages.forEach(p => p.classList.toggle("hidden", p.dataset.page !== id));
  links.forEach(l => l.classList.toggle("active", l.dataset.target === id));
  history.replaceState(null,"","#"+id);
  if(id==="account") renderAccount();
}
function toast(text){const t=$("#toast");t.textContent=text;t.style.display="block";setTimeout(()=>t.style.display="none",2600)}
links.forEach(l=>l.onclick=e=>{e.preventDefault();show(l.dataset.target)});
document.querySelectorAll("[data-action=discord]").forEach(b=>b.onclick=()=>toast("Add your Discord invite link in js/main.js."));
$("#playBtn").onclick=()=>show("home");

function renderAccount(){
  $("#loggedOut").classList.toggle("hidden",!!currentUser);
  $("#profileBox").classList.toggle("hidden",!currentUser);
  if(!currentUser) return;
  $("#pName").textContent=currentUser.username;
  $("#pAvatar").textContent=currentUser.avatar || currentUser.username.slice(0,1).toUpperCase();
  $("#pBio").textContent=currentUser.bio || "Gacha Heaven community member";
  $("#pDiscord").textContent=currentUser.discordId || "Not set";
  $("#pRank").textContent=currentUser.rank || "Member";
  $("#pCreated").textContent=currentUser.createdAt || "Unknown";
}

$("#loginForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const name=$("#username").value.trim();
  const error=$("#accountError");
  error.classList.add("hidden");
  try{
    const response=await fetch("data/users.json",{cache:"no-store"});
    if(!response.ok) throw new Error();
    const data=await response.json();
    currentUser=data.users.find(u=>u.username.toLowerCase()===name.toLowerCase());
    if(!currentUser){
      error.textContent="No account with that username was found.";
      error.classList.remove("hidden");
      return;
    }
    renderAccount();
  }catch{
    error.textContent="Could not load the Gacha Heaven user database.";
    error.classList.remove("hidden");
  }
});
$("#logout").onclick=()=>{currentUser=null;$("#username").value="";renderAccount();};

const hash=location.hash.slice(1);
show(["home","account","ranks","gacha","rules"].includes(hash)?hash:"home");
