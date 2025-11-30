:root{
  --accent:#2c7be5;
  --bg:#f5f7fa;
}

body{
  margin:0;
  background:var(--bg);
  font-family:Arial;
}

/* MOBILE HEADER */
header{
  background:white;
  padding:10px;
  display:flex;
  flex-direction:column;
  gap:10px;
  position:sticky;
  top:0;
  z-index:20;
  box-shadow:0 2px 6px rgba(0,0,0,.1);
}

.logo{
  display:flex;
  align-items:center;
  gap:8px;
  font-weight:700;
  font-size:22px;
}

.logo-icon{
  width:40px;
  height:40px;
}

/* Search */
.search input{
  width:100%;
  padding:14px;
  border-radius:10px;
  border:1px solid #ddd;
  font-size:16px;
}

/* Buttons */
.btn{
  background:var(--accent);
  color:white;
  padding:14px 18px;
  border-radius:12px;
  border:none;
  font-size:16px;
}
.btn.ghost{
  background:white;
  color:var(--accent);
  border:1px solid var(--accent);
}

.cart-btn{
  width:100%;
  margin-top:5px;
  text-align:center;
}

.badge{
  background:red;
  padding:3px 8px;
  border-radius:50%;
  color:white;
  font-size:13px;
}

/*** Filters ***/
.filters{
  display:flex;
  overflow-x:auto;
  gap:8px;
  padding:10px 0;
}
.filter{
  background:white;
  padding:8px 14px;
  border-radius:20px;
  border:1px solid #ccc;
  font-size:14px;
}

/* Grid */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:12px;
  padding:10px;
}

/* Product Cards */
.card{
  background:white;
  padding:10px;
  border-radius:12px;
  box-shadow:0 4px 15px rgba(0,0,0,.07);
}
.card img{
  width:100%;
  height:150px;
  object-fit:cover;
  border-radius:10px;
}

/* Cart Panel */
.cart-panel{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  height:80%;
  background:white;
  border-radius:20px 20px 0 0;
  transform:translateY(110%);
  transition:.3s;
  padding:15px;
}
.cart-panel.open{
  transform:translateY(0);
}

.cart-items{
  height:55%;
  overflow:auto;
  margin:10px 0;
}

.cart-item{
  display:flex;
  gap:10px;
  margin-bottom:10px;
}
.cart-item img{
  width:65px;
  height:65px;
  border-radius:10px;
  object-fit:cover;
}

.qty button{
  padding:3px 8px;
}

/* WhatsApp */
.phone-order{
  margin:20px;
  background:white;
  padding:20px;
  border-radius:12px;
  text-align:center;
  box-shadow:0 4px 12px rgba(0,0,0,.1);
}
.call-btn{
  padding:14px 20px;
  background:#25D366;
  border:none;
  border-radius:12px;
  color:white;
  font-size:18px;
}
