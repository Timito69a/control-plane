window.AdminChat = {
  send: async function(msg){
    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({message:msg})
    });
    return await res.json();
  }
};
