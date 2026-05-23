// async function checkSign() {


//     const response = await fetch(
//         "checkSignIn",
//     );

//     if (response.ok) {
//         const json = await response.json();
//         //        console.log(json);
//         const response_dto = json.response_dto;


//         if (response_dto.success) {

//             const user = response_dto.content;
//             //            console.log(user);

//             let st_quick_link = document.getElementById("st-quick-link");

//             st_quick_link.innerHTML = user.fisrt_name + " " + user.last_name;



//             let logIn = document.getElementById("logIn");
//             logIn.href = "#";
//             logIn.innerHTML = "";

//             let signUp = document.getElementById("signUp");
//             signUp.href = "SignOut";
//             signUp.innerHTML = "Sign Out";


//         }



//     } else {
//         document.getElementById("massage").innerHTML = "Please try again later";
//     }
// }

// async function loadhomepageproduct() {

//     let ProductHtml = document.getElementById("product");
//     document.getElementById("product-main").innerHTML = "";

//     const response = await fetch("LoadhomeProduct");
//     if (response.ok) {
//         const json = await response.json();

//         //        console.log( json.productList);

//         json.productList.forEach(item => {

//             let ProductCloneHtml = ProductHtml.cloneNode(true);

//             ProductCloneHtml.querySelector("#product-image1").src = "product_images/" + item.id + "/image1.png";
//             ProductCloneHtml.querySelector("#product-image2").src = "product_images/" + item.id + "/image2.png";
//             ProductCloneHtml.querySelector("#product-a1").href = "details.html?id=" + item.id;
//             ProductCloneHtml.querySelector("#product-a2").href = "details.html?id=" + item.id;
//             ProductCloneHtml.querySelector("#product-a3").href = "details.html?id=" + item.id;
//             ProductCloneHtml.querySelector("#product-title").innerHTML = item.title;

//             ProductCloneHtml.querySelector("#product-price").innerHTML = "Rs." + new Intl.NumberFormat(
//                 "en-US", {
//                 minimumFractionDigits: 2
//             }).format(item.price);


//             ProductCloneHtml.querySelector("#add-to-cart-other").addEventListener(
//                 "click", (e) => {
//                     addToCart(item.id, "1");
//                 });

//             ProductCloneHtml.querySelector("#add-to-wish-other").addEventListener(
//                 "click", (e) => {
//                     addToWish(item.id);
//                 });

//             document.getElementById("product-main").appendChild(ProductCloneHtml);

//         });
//     } else {
//         console.log("error");

//     }

// }



// async function addToCart(id, qty) {



//     const response = await fetch(
//         "AddToCart?id=" + id + "&qty=" + qty

//     );

//     if (response.ok) {

//         const json = await response.json();

//         if (json.success) {
//             Swal.fire({
//                 title: 'Success!',
//                 text: json.content,
//                 icon: 'succses',
//                 confirmButtonText: 'Cool'
//             })
//         } else {
//             Swal.fire({
//                 title: 'Error!',
//                 text: json.content,
//                 icon: 'error',
//                 confirmButtonText: 'Cool'
//             })
//         }

//     } else {

//     }
// }


// async function addToWish(id) {



//     const response = await fetch(
//         "AddToWish?id=" + id

//     );

//     if (response.ok) {

//         const json = await response.json();

//         if (json.success) {
//             Swal.fire({
//                 title: 'Success!',
//                 text: json.content,
//                 icon: 'succses',
//                 confirmButtonText: 'Cool'
//             })
//         } else {
//             Swal.fire({
//                 title: 'Error!',
//                 text: json.content,
//                 icon: 'error',
//                 confirmButtonText: 'Cool'
//             })
//         }

//     } else {

//     }
// }





/* ============================================================
   index.js  –  Homepage logic
   Handles: checkSign | loadhomepageproduct | Search
   ============================================================ */

/* ── Sample product data (replace / extend with your API/DB) ── */
const PRODUCTS = [
  { id: 1,  title: "Colorful Pattern Shirts",  category: "Clothing",  price: 238.85, oldPrice: null,  badge: "Hot",       img1: "assets/img/product-1-1.jpg",  img2: "assets/img/product-1-2.jpg",  link: "details.html" },
  { id: 2,  title: "Classic White Blouse",      category: "Clothing",  price: 89.99,  oldPrice: 119.99, badge: "Sale",      img1: "assets/img/product-7-1.jpg",  img2: "assets/img/product-7-2.jpg",  link: "details.html" },
  { id: 3,  title: "Winter Jacket Pro",         category: "Outerwear", price: 349.00, oldPrice: 420.00, badge: "New",       img1: "assets/img/product-8-1.jpg",  img2: "assets/img/product-8-2.jpg",  link: "details.html" },
  { id: 4,  title: "Formal Striped Shirt",      category: "Clothing",  price: 149.00, oldPrice: null,  badge: "",          img1: "assets/img/product-12-2.jpg", img2: "assets/img/product-12-1.jpg", link: "details.html" },
  { id: 5,  title: "Slim Fit Trousers",         category: "Bottoms",   price: 119.00, oldPrice: 160.00, badge: "Sale",      img1: "assets/img/product-2-1.jpg",  img2: "assets/img/product-2-2.jpg",  link: "details.html" },
  { id: 6,  title: "Casual Jumpsuit",           category: "Clothing",  price: 199.00, oldPrice: null,  badge: "Hot",       img1: "assets/img/product-3-1.jpg",  img2: "assets/img/product-3-2.jpg",  link: "details.html" },
  { id: 7,  title: "Denim Shorts",              category: "Bottoms",   price: 59.99,  oldPrice: 79.99,  badge: "",          img1: "assets/img/product-4-1.jpg",  img2: "assets/img/product-4-2.jpg",  link: "details.html" },
  { id: 8,  title: "Floral Summer Dress",       category: "Dresses",   price: 179.00, oldPrice: null,  badge: "New",       img1: "assets/img/product-5-1.jpg",  img2: "assets/img/product-5-2.jpg",  link: "details.html" },
];

/* ── Badge colour map ── */
const BADGE_CLASS = { Hot: "light-pink", Sale: "light-blue", New: "light-green" };

/* ============================================================
   1. checkSign  –  Show/hide Login|SignUp vs username
   ============================================================ */
function checkSign() {
  const user   = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const logIn  = document.getElementById("logIn");
  const signUp = document.getElementById("signUp");

  if (user) {
    if (logIn)  { logIn.textContent  = user.name || "My Account"; logIn.href = "accounts.html"; }
    if (signUp) { signUp.textContent = "Log Out";  signUp.href = "#"; signUp.onclick = logOut; }
  }
}

function logOut() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

/* ============================================================
   2. loadhomepageproduct  –  Render product cards
   ============================================================ */
function loadhomepageproduct() {
  const container = document.getElementById("product-main");
  if (!container) return;
  container.innerHTML = "";           // clear placeholder card

  PRODUCTS.forEach(p => {
    container.insertAdjacentHTML("beforeend", buildProductCard(p));
  });
}

function buildProductCard(p) {
  const badgeHTML  = p.badge
    ? `<div class="product__badge ${BADGE_CLASS[p.badge] || "light-pink"}">${p.badge}</div>` : "";
  const oldPriceHTML = p.oldPrice
    ? `<span class="old__price">$${p.oldPrice.toFixed(2)}</span>` : "";

  return `
    <div class="product__item" data-id="${p.id}">
      <div class="product__banner">
        <a href="${p.link}" class="product__images">
          <img src="${p.img1}" alt="${p.title}" class="product__img default" onerror="this.src='assets/img/product-1-1.jpg'">
          <img src="${p.img2}" alt="${p.title}" class="product__img hover"   onerror="this.src='assets/img/product-1-2.jpg'">
        </a>
        <div class="product__actions">
          <a href="${p.link}" class="action__btn" aria-label="Quick View"><i class="fi fi-rs-eye"></i></a>
          <a href="#" class="action__btn" aria-label="Add to Wishlist" onclick="addToWishlist(${p.id}); return false;">
            <i class="fi fi-rs-heart"></i>
          </a>
          <a href="#" class="action__btn" aria-label="Compare"><i class="fi fi-rs-shuffle"></i></a>
        </div>
        ${badgeHTML}
      </div>
      <div class="product__content">
        <span class="product__category">${p.category}</span>
        <a href="${p.link}"><h3 class="product__title">${p.title}</h3></a>
        <div class="product__rating">
          ${'<i class="fi fi-rs-star"></i>'.repeat(5)}
        </div>
        <div class="product__price flex">
          <span class="new__price">$${p.price.toFixed(2)}</span>
          ${oldPriceHTML}
        </div>
        <a href="#" class="action__btn cart__btn" aria-label="Add To Cart"
           onclick="addToCart(${p.id}); return false;">
          <i class="fi fi-rs-shopping-bag-add"></i>
        </a>
      </div>
    </div>`;
}

/* ============================================================
   3. Wishlist helper
   ============================================================ */
function addToWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  if (wishlist.find(p => p.id === id)) {
    showToast("Already in wishlist!", "info"); return;
  }
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  showToast(`${product.title} added to wishlist!`, "success");
}

/* ============================================================
   4. Search  –  Live dropdown + button/Enter full filter
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const input   = document.querySelector(".header__search .form__input");
  const btn     = document.querySelector(".header__search .search__btn");
  if (!input) return;

  /* Build dropdown container once */
  const dropdown = document.createElement("div");
  dropdown.id = "search-dropdown";
  dropdown.style.cssText = `
    position:absolute; top:100%; left:0; right:0;
    background:#fff; border:1px solid #e0e0e0; border-top:none;
    border-radius:0 0 8px 8px; z-index:999; display:none;
    max-height:280px; overflow-y:auto;
    box-shadow:0 8px 24px rgba(0,0,0,.12);`;
  input.parentElement.style.position = "relative";
  input.parentElement.appendChild(dropdown);

  /* Live search on keystroke */
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.style.display = "none"; return; }
    renderDropdown(q);
  });

  /* Enter key */
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); doSearch(); }
  });

  /* Button click */
  if (btn) btn.addEventListener("click", e => { e.preventDefault(); doSearch(); });

  /* Close dropdown on outside click */
  document.addEventListener("click", e => {
    if (!e.target.closest(".header__search")) dropdown.style.display = "none";
  });

  /* ── render dropdown results ── */
  function renderDropdown(q) {
    const matches = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (!matches.length) {
      dropdown.innerHTML = `<div style="padding:12px 16px;color:#999;font-size:13px;">No results for "<b>${q}</b>"</div>`;
    } else {
      dropdown.innerHTML = matches.map(p => `
        <div onclick="location.href='${p.link}'" style="
          display:flex; align-items:center; gap:12px;
          padding:10px 14px; cursor:pointer; font-size:13px;
          border-bottom:1px solid #f5f5f5; transition:background .15s;"
          onmouseover="this.style.background='#f9f9f9'"
          onmouseout="this.style.background=''">
          <img src="${p.img1}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;"
               onerror="this.src='assets/img/product-1-1.jpg'">
          <span style="flex:1;font-weight:500;">${highlight(p.title, q)}</span>
          <span style="color:#e02c6d;font-weight:700;">$${p.price.toFixed(2)}</span>
        </div>`).join("");
    }
    dropdown.style.display = "block";
  }

  /* ── full-page filter (redirects to shop.html with query) ── */
  function doSearch() {
    const q = input.value.trim();
    dropdown.style.display = "none";
    if (!q) return;
    /* Option A – redirect to shop page with query param */
    window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
    /* Option B – filter homepage grid (comment out line above, uncomment below) */
    // filterHomepageGrid(q);
  }
});

/* ── keyword highlighter ── */
function highlight(text, q) {
  return text.replace(new RegExp(`(${q})`, "gi"),
    '<mark style="background:#fde8ef;border-radius:2px;padding:0 1px">$1</mark>');
}

/* ── Optional: filter the homepage product grid in place ── */
function filterHomepageGrid(q) {
  const matches = q
    ? PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase()))
    : PRODUCTS;

  const container = document.getElementById("product-main");
  if (!container) return;
  container.innerHTML = "";
  matches.forEach(p => container.insertAdjacentHTML("beforeend", buildProductCard(p)));
}

/* ============================================================
   5. Toast helper  (used by wishlist & cart)
   ============================================================ */
function showToast(msg, type = "success") {
  /* Use SweetAlert2 if loaded */
  if (window.Swal) {
    Swal.fire({ toast: true, position: "top-end", icon: type,
      title: msg, showConfirmButton: false, timer: 2000, timerProgressBar: true });
    return;
  }
  /* Fallback plain toast */
  let t = document.getElementById("_toast");
  if (!t) {
    t = document.createElement("div"); t.id = "_toast";
    t.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(60px);
      background:#222;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;
      opacity:0;transition:all .3s;z-index:9999;white-space:nowrap;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1"; t.style.transform = "translateX(-50%) translateY(0)";
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = "0"; t.style.transform = "translateX(-50%) translateY(60px)";
  }, 2500);
}


