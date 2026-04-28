
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 51000;
const DATA = "/opt/control-plane/data";
const STATE = path.join(DATA, "central-brain-state.json");

fs.mkdirSync(DATA, {recursive:true});

function loadState(){
  if (!fs.existsSync(STATE)) {
    fs.writeFileSync(STATE, JSON.stringify({
      ok:true,
      managers:{
        "Steuerungszentrale":{
          departments:{
            "Controlplane Aufbau":{
              workers:["architektur-ai","deployment-ai","security-ai","datenanalyse-ai"]
            }
          }
        }
      },
      tasks:[],
      events:[]
    }, null, 2));
  }
  return JSON.parse(fs.readFileSync(STATE, "utf8"));
}

function saveState(s){
  fs.writeFileSync(STATE, JSON.stringify(s, null, 2));
}

app.use(express.json({limit:"5mb"}));
app.use(express.static("/opt/control-plane/public"));

app.get("/", (req,res)=>{
  res.sendFile("/opt/control-plane/public/dashboard31-konsole.html");
});

app.get("/api/health",(req,res)=>{
  res.json({ok:true, service:"controlplane", mode:"central-brain-framework"});
});

app.get("/api/state",(req,res)=>{
  res.json(loadState());
});

app.post("/api/state/save",(req,res)=>{
  const s = loadState();
  s.events.push({ts:new Date().toISOString(), type:"manual_save"});
  saveState(s);
  res.json({ok:true});
});

app.post("/api/chat",(req,res)=>{
  const message = String((req.body && req.body.message) || "");
  const s = loadState();

  let route = {manager:"Steuerungszentrale", department:"Controlplane Aufbau", worker:"architektur-ai"};

  const lower = message.toLowerCase();
  if (lower.includes("deploy") || lower.includes("systemd") || lower.includes("server")) route.worker = "deployment-ai";
  if (lower.includes("security") || lower.includes("rechte") || lower.includes("audit")) route.worker = "security-ai";
  if (lower.includes("daten") || lower.includes("analyse") || lower.includes("kpi")) route.worker = "datenanalyse-ai";

  if (lower.startsWith("erstelle task")) {
    const title = message.replace(/^erstelle task/i, "").trim() || "Neuer Task";
    s.tasks.push({id:"task_"+Date.now(), title, status:"open", route, created_at:new Date().toISOString()});
    saveState(s);
    return res.json({reply:"Task angelegt: " + title, route});
  }

  s.events.push({ts:new Date().toISOString(), type:"chat", message, route});
  saveState(s);

  res.json({
    reply:"Zentralhirn verarbeitet über " + route.worker + ": " + message,
    route
  });
});

app.listen(PORT, ()=>{
  console.log("CONTROLPLANE CENTRAL BRAIN FRAMEWORK " + PORT);
});
