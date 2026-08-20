const $=s=>document.querySelector(s);

function showAccount(){
    location.hash="account";
    $("#ranks").classList.add("hidden");
    $("#account").classList.remove("hidden");
}

function showHome(){
    location.hash="";
    $("#account").classList.add("hidden");
    $("#ranks").classList.remove("hidden");
}

function showToast(message){
    const toast=$("#toast");
    toast.textContent=message;
    toast.style.display="block";
    setTimeout(()=>toast.style.display="none",2600);
}

if(location.hash==="#account")showAccount();

$("#searchForm").addEventListener("submit",async e=>{
    e.preventDefault();
    $("#error").textContent="";

    try{
        const response=await fetch("data/users.json",{cache:"no-store"});
        const data=await response.json();
        const username=$("#username").value.trim().toLowerCase();

        const user=data.users.find(account=>
            account.username.toLowerCase()===username
        );

        if(!user){
            $("#profile").classList.add("hidden");
            $("#error").textContent="No Gacha Heaven account found with that username.";
            return;
        }

        $("#avatar").textContent=user.avatar||"👤";
        $("#name").textContent=user.username;
        $("#bio").textContent=user.bio||"Gacha Heaven member";
        $("#discordId").textContent=user.discordId||"Not set";
        $("#rank").textContent=user.rank||"Member";
        $("#created").textContent=user.createdAt||"Unknown";
        $("#profile").classList.remove("hidden");
    }catch(error){
        $("#error").textContent="Could not load data/users.json. On GitHub Pages it will load normally.";
    }
});
