import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import morgan from "morgan"


const app= express()

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
function getproxy(sandboxId){

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
  

app.use((req, res, next) => {
    const hostname = req.get("host").split(":")[0];
   

    if (!hostname) {
        return res.status(400).send("Missing Host header");
    }

   const sandboxId = hostname.split(".")[0]; 

    return getproxy(sandboxId)(req, res, next);
});

export default app