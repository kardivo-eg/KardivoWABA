import fs from "node:fs/promises"; import path from "node:path"; import crypto from "node:crypto";
const dir=path.resolve("data"), pf=path.join(dir,"products.json"), of=path.join(dir,"orders.json");
async function read(f,d){try{return JSON.parse(await fs.readFile(f,"utf8"))}catch{return d}}
async function write(f,d){await fs.mkdir(dir,{recursive:true});await fs.writeFile(f,JSON.stringify(d,null,2))}
export async function activeProducts(){const d=await read(pf,{products:[]});return(d.products||[]).filter(p=>p.active)}
export async function createOrder(customerPhone,product,discountPercent=0){const d=await read(of,{orders:[]});const finalPrice=Number((product.price*(1-discountPercent/100)).toFixed(2));const order={id:`KDV-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,customerPhone,productId:product.id,productName:product.name,originalPrice:product.price,discountPercent,finalPrice,status:"payment_pending",createdAt:new Date().toISOString()};d.orders.push(order);await write(of,d);return order}
