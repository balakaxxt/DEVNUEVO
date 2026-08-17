const parts=[
{id:"p1",sku:"KIT-RL-01",name:"Kit Relação Transmissão",motorcycle:"Honda CG 160",stock:14,price:165.90,location:"Corredor A1"},
{id:"p2",sku:"PNE-TR-02",name:"Pneu Traseiro 90/90-18",motorcycle:"Yamaha YBR / CG",stock:8,price:220.00,location:"Setor Pneus"},
{id:"p3",sku:"PAS-FR-03",name:"Pastilha de Freio Dianteira",motorcycle:"Honda CB 300 / XRE",stock:3,price:59.90,location:"Balcão G4"}
];
let cart=[];

document.querySelectorAll(".nav-btn").forEach(btn=>{
 btn.addEventListener("click",()=>{
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active-tab"));
  btn.classList.add("active");
  document.getElementById(btn.dataset.tab).classList.add("active-tab");
  renderAll();
 });
});

function money(v){return "R$ "+Number(v).toFixed(2).replace(".",",")}

function filtered(){
 const q=document.getElementById("searchInput").value.toLowerCase();
 return parts.filter(p=>(p.name+" "+p.sku+" "+p.motorcycle+" "+p.location).toLowerCase().includes(q));
}
function filterParts(){renderParts();}

function renderParts(){
 document.getElementById("partsGrid").innerHTML=filtered().map(p=>`
 <div class="card">
  <div><span class="sku">${p.sku}</span><h3>${p.name}</h3><p>Moto: ${p.motorcycle}</p><p>Local: ${p.location}</p></div>
  <div class="card-bottom"><span class="price">${money(p.price)}</span><button class="sell" onclick="add(${p.id==='p1'?1:p.id==='p2'?2:3})">Vender</button></div>
 </div>`).join("");
}
function renderCatalog(){
 document.getElementById("catalog").innerHTML=parts.map((p,i)=>`
 <div class="catalog-item" onclick="add(${i+1})"><h4>${p.name}</h4><div><b class="green">${money(p.price)}</b><span>Est: ${p.stock}</span></div></div>`).join("");
}
function add(n){cart.push(parts[n-1]);renderCart();}
function renderCart(){
 const counts={}; cart.forEach(p=>counts[p.id]=(counts[p.id]||0)+1);
 document.getElementById("cart").innerHTML=Object.entries(counts).map(([id,q])=>{
  const p=parts.find(x=>x.id===id);
  return `<div class="cart-item"><div><b>${p.name}</b><br><span class="green">${money(p.price)}</span></div><div class="qty"><button onclick="change('${id}',-1)">−</button> ${q} <button onclick="change('${id}',1)">+</button></div></div>`;
 }).join("");
 const sub=cart.reduce((s,p)=>s+p.price,0), disc=Number(document.getElementById("discount").value||0);
 document.getElementById("subtotal").textContent=money(sub);
 document.getElementById("total").textContent=money(Math.max(0,sub-disc));
}
function change(id,d){
 const idx=cart.findIndex(p=>p.id===id);
 if(idx<0)return;
 if(d<0)cart.splice(idx,1); else cart.push(parts.find(p=>p.id===id));
 renderCart();
}
function renderInventory(){
 document.getElementById("inventoryTable").innerHTML=parts.map(p=>`
 <tr><td><span class="orange-text">${p.sku}</span> - ${p.name}</td><td><span class="green">${p.stock} un</span></td><td class="green">${money(p.price)}</td><td style="text-align:right"><button class="sell" onclick="alert('Entrada de estoque: ${p.name}')">＋ Entrada</button></td></tr>`).join("");
}
function renderAll(){renderParts();renderCatalog();renderInventory();renderCart();}
function toggleAdmin(){document.getElementById("adminModal").classList.toggle("show");}
function login(){
 const ok=document.getElementById("user").value==="admin"&&document.getElementById("pass").value==="moto123";
 document.getElementById("loginMsg").textContent=ok?"Acesso Admin Concedido com Sucesso!":"Credenciais inválidas!";
}
renderAll();
