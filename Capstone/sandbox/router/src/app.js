import express from "express"
import morgan from "morgan"
import {createProxyMiddleware} from "http-proxy-middleware"


const app =express()

app.use(express.json())

app.use(morgan("combined"))

app.get("/api/router/status/healthz", (req, res) => {
  res.status(200).json({
    message: "Router service is healthy",
    status: "ok"
  });
});

app.get("/api/router/status/readyz", (req, res) => {
  res.status(200).json({
    message: "Router service is ready",
    status: "ready"
  });
});

const proxies={}
const agentProxies={}
function createProxy(sandboxId){

    const target= `http://sandbox-service-${sandboxId}`

   if(!proxies[sandboxId]){
    proxies[sandboxId]= createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true
    })
       }
      return proxies[sandboxId]
}


function createAgentProxy(sandboxId){

    const target= `http://sandbox-service-${sandboxId}:3000`

   if(!agentProxies[sandboxId]){
    agentProxies[sandboxId]= createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true
    })
    }
    return agentProxies[sandboxId]
}


app.use((req,res,next)=>{

     const hostname = req.get("host").split(":")[0];

     if(!hostname){
        return res.status(400).json({error:"Invalid hostname"})
     }
     const sandboxId= hostname.split(".")[0]

     if(hostname.split(".")[1] === "agent"){
        return createAgentProxy(sandboxId)(req,res,next)
     }

     if(hostname.split(".")[1] === "preview"){
        return createProxy(sandboxId)(req,res,next)
     }

})

export default app