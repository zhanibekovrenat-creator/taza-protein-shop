document.addEventListener('DOMContentLoaded', () => {

const productsData = [
  {name:"Whey Protein",category:"protein",price:7500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdwuyRW7e0qHzdIwu_PZZhej1ZIqZyWyX1EQ&s", description:"Высококачественный сывороточный протеин для набора массы."},
  {name:"Casein Protein",category:"protein",price:4800,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-pIyUaFRz9orA5EvHCO3TbNH9ROo8lSZ6g&s", description:"Медленно усваиваемый казеин для ночного восстановления."},
  {name:"BCAA",category:"amino",price:3200,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQuKiiiCVafbddW-ef2MzjE8IcwSWSHnTkHA&s", description:"Аминокислоты BCAA для восстановления мышц."},
  {name:"Creatine",category:"amino",price:2500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkdgQV7zHGvtzMFD1PNlm_SYjMsTAmHtXyg&s", description:"Креатин для увеличения силы и выносливости."},
  {name:"Gainer",category:"gainer",price:5400,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GtFl9THgCkZJaxKEAOItPj8WFcJFZ57Flg&s", description:"Гейнер для быстрого набора массы."},
  {name:"Vitamin Complex",category:"vitamins",price:1500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxPEVfmdWCBtqBpfXgAGL1WkISAwKXM9Sug&s", description:"Комплекс витаминов для поддержания здоровья."}
];

let currentFilter = "all";
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const productsEl = document.getElementById("products");
const searchEl = document.getElementById("q");
const sortEl = document.getElementById("sort");

function renderProducts(){
  let list = [...productsData];
  if(currentFilter!=="all") list=list.filter(p=>p.category===currentFilter);
  const q = searchEl.value.toLowerCase();
  if(q) list=list.filter(p=>p.name.toLowerCase().includes(q));
  if(sortEl.value==="price-asc") list.sort((a,b)=>a.price-b.price);
  if(sortEl.value==="price-desc") list.sort((a,b)=>b.price-a.price);

  productsEl.innerHTML = list.map((p,i)=>`
    <div class="card">
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <div class="price">${p.price} сом</div>
      <button class="btn" onclick="addToCart(${i})">Добавить</button>
      <button class="btn ghost" onclick="showModal('${p.name}','${p.description}')">Подробнее</button>
    </div>
  `).join("") || `<div style="grid-column:1/-1;text-align:center;color:#888">Товары не найдены</div>`;
}

function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

window.addToCart = function(i){
  const p = productsData[i];
  const item = cart.find(x=>x.name===p.name);
  if(item) item.qty++;
  else cart.push({name:p.name,price:p.price,qty:1,img:p.img});
  saveCart();
  showToast(`${p.name} добавлен в корзину!`);
}

function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const box=document.getElementById("cartItems");
  const totalEl=document.getElementById("cartTotal");
  const countEl=document.getElementById("cartCount");

  if(cart.length===0){
    box.innerHTML=`<div style="text-align:center;color:#888;padding:20px">Корзина пуста</div>`;
    totalEl.textContent="0";
    countEl.textContent="0";
    return;
  }

  let sum=0;
  box.innerHTML=cart.map((c,i)=>{
    sum+=c.price*c.qty;
    return `
      <div class="cart-item">
        <img src="${c.img}">
        <div style="flex:1">
          <strong>${c.name}</strong><br>
          <div class="qty">
            <button onclick="decQty(${i})">−</button>
            <span>${c.qty}</span>
            <button onclick="incQty(${i})">+</button>
            <button onclick="removeItem(${i})" style="margin-left:10px;">Удалить</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = sum + " сом";
  countEl.textContent = cart.reduce((a,b)=>a+b.qty,0);
}

window.incQty=i=>{cart[i].qty++;saveCart();}
window.decQty=i=>{cart[i].qty--; if(cart[i].qty<=0) cart.splice(i,1); saveCart();}
window.removeItem=i=>{cart.splice(i,1); saveCart();}

document.querySelectorAll(".filter").forEach(btn=>{
  btn.onclick=()=>{
    currentFilter=btn.dataset.filter;
    renderProducts();
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
  }
});

searchEl.oninput=renderProducts;
sortEl.onchange=renderProducts;

document.getElementById("openCart").onclick=()=>document.getElementById("cartPanel").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartPanel").classList.remove("open");
document.getElementById("backCart").onclick = () => { document.getElementById("cartPanel").classList.remove("open"); }
document.getElementById("clearCart").onclick=()=>{cart=[];saveCart();}
document.getElementById("homeCart").onclick = () => { document.getElementById("cartPanel").classList.remove("open"); window.scrollTo({ top: 0, behavior: 'smooth' }); }

document.getElementById("checkoutBtn").onclick = () => {
  if(cart.length === 0){ alert("Корзина пуста!"); return; }
  const name = prompt("Введите ваше имя:");
  if(!name){ alert("Имя обязательно."); return; }
  const phone = prompt("Введите номер телефона:");
  if(!phone){ alert("Телефон обязателен."); return; }
  const address = prompt("Введите адрес:");
  if(!address){ alert("Адрес обязателен."); return; }

  let summary = `Ваш заказ:\n\n`;
  cart.forEach(item => summary += `${item.name} × ${item.qty} = ${item.price*item.qty} сом\n`);
  summary += `\nИтого: ${cart.reduce((a,b)=>a+b.price*b.qty,0)} сом`;
  summary += `\n\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}`;
  const message = encodeURIComponent(summary);
  window.open(`https://wa.me/996550904390?text=${message}`, "_blank");

  cart = [];
  saveCart();
  document.getElementById("cartPanel").classList.remove("open");
}

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
document.getElementById("modalClose").onclick = () => { modal.style.display = "none"; }
window.showModal = (title, desc) => {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.style.display = "flex";
}

renderProducts();
renderCart();

});
