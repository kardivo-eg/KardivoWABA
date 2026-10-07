import {config} from "./config.js";
const endpoint=`https://graph.facebook.com/${config.graphVersion}/${config.phoneNumberId}/messages`;
export async function sendText(to,body){const r=await fetch(endpoint,{method:"POST",headers:{Authorization:`Bearer ${config.accessToken}`,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",recipient_type:"individual",to,type:"text",text:{preview_url:false,body}})});const t=await r.text();if(!r.ok)throw new Error(`WhatsApp API ${r.status}: ${t}`);return t?JSON.parse(t):{}}
