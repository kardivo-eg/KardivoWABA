import express from "express"; import {config} from "./config.js"; import {sendText} from "./whatsapp.js"; import {replyToCustomer} from "./gemini.js";
const app=express();
app.get("/",(_req,res)=>res.json({service:"Kardivo",status:"online"})); app.get("/health",(_req,res)=>res.json({ok:true}));
app.get("/webhook",(req,res)=>{if(req.query["hub.mode"]==="subscribe"&&req.query["hub.verify_token"]===config.verifyToken)return res.status(200).send(req.query["hub.challenge"]);res.sendStatus(403)});
app.post("/webhook",express.json({limit:"10mb"}),async(req,res)=>{res.sendStatus(200);try{for(const entry of req.body?.entry||[])for(const change of entry.changes||[]){if(change.field!=="messages")continue;for(const msg of change.value?.messages||[]){const from=msg.from;if(msg.type==="text"){await sendText(from,await replyToCustomer(msg.text?.body||""))}else if(msg.type==="image"){await sendText(from,"وصلت صورة الدفع. هراجع بياناتها، لكن تأكيد استلام المبلغ لازم يتم يدويًا من رصيد Kardivo قبل التسليم.")}}}}catch(e){console.error("[webhook]",e)}});
app.listen(config.port,()=>console.log(`Kardivo listening on ${config.port}`));
