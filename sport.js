document.addEventListener('DOMContentLoaded', () => {

  const productsData = [
    {name:"Whey Protein 1kg",category:"protein",price:4500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdwuyRW7e0qHzdIwu_PZZhej1ZIqZyWyX1EQ&s"},
    {name:"Casein Protein 900g",category:"protein",price:4800,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-pIyUaFRz9orA5EvHCO3TbNH9ROo8lSZ6g&s"},
    {name:"BCAA 500g",category:"amino",price:3200,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQuKiiiCVafbddW-ef2MzjE8IcwSWSHnTkHA&s"},
    {name:"Creatine 300g",category:"amino",price:2500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkdgQV7zHGvtzMFD1PNlm_SYjMsTAmHtXyg&s"},
    {name:"Gainer 2kg",category:"gainer",price:5400,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GtFl9THgCkZJaxKEAOItPj8WFcJFZ57Flg&s"},
    {name:"Vitamin Complex",category:"vitamins",price:1500,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxPEVfmdWCBtqBpfXgAGL1WkISAwKXM9Sug&s"}
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
    if(q.trim()!=="") list=list.filter(p=>p.name.toLowerCase().includes(q));
    if(sortEl.value==="price-asc") list.sort((a,b)=>a.price-b.price);
    if(sortEl.value==="price-desc") list.sort((a,b)=>b.price-a.price);
    productsEl.innerHTML = list.map((p,i)=>`
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="meta">Категория: ${p.category}</div>
        <div class="price">${p.price} сом</div>
        <button class="btn" onclick="addToCart(${i})">Добавить в корзину</button>
      </div>
    `).join("") || `<div style="grid-column:1/-1;text-align:center;color:#888">Товары не найдены</div>`;
  }

  window.addToCart = function(i){
    const p = productsData[i];
    const item = cart.find(x=>x.name===p.name);
    if(item) item.qty++;
    else cart.push({name:p.name,price:p.price,qty:1,img:p.img});
    saveCart();
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
      box.innerHTML=`<div style="padding:12px;color:#888">Корзина пуста</div>`;
      totalEl.textContent="0";
      countEl.textContent="0";
      return;
    }
    let sum=0;
    box.innerHTML=cart.map((c,i)=>{
      sum+=c.price*c.qty;
      return `
        <div class="cart-item">
          <img src="${c.img}" alt="${c.name}">
          <div style="flex:1">
            <div>${c.name}</div>
            <div class="qty">
              <button onclick="decQty(${i})">-</button>
              <span>${c.qty}</span>
              <button onclick="incQty(${i})">+</button>
              <button onclick="removeItem(${i})" style="margin-left:5px;">Удалить</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
    totalEl.textContent=sum+"сом";
    countEl.textContent=cart.reduce((a,b)=>a+b.qty,0);
  }

  window.incQty=function(i){cart[i].qty++;saveCart();}
  window.decQty=function(i){cart[i].qty--; if(cart[i].qty<=0) cart.splice(i,1); saveCart();}
  window.removeItem=function(i){cart.splice(i,1); saveCart();}

  document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
    currentFilter=btn.dataset.filter;
    renderProducts();
  });

  searchEl.oninput=renderProducts;
  sortEl.onchange=renderProducts;
  document.getElementById("clearStorage").onclick=()=>{
    searchEl.value="";
    sortEl.value="default";
    currentFilter="all";
    renderProducts();
  }

  document.getElementById("openCart").onclick=()=>document.getElementById("cartPanel").classList.add("open");
  document.getElementById("closeCart").onclick=()=>document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("clearCart").onclick=()=>{cart=[];saveCart();}

  renderProducts();
  renderCart();
});