/* ==========================================
   STYLEHUB - SCRIPT.JS PART 1
   Products Database + Display Products
==========================================*/


// ================= PRODUCT DATA =================


const products = [

{
id:1,
name:"Floral Summer Dress",
category:"women",
price:1499,
sizes:["S","M","L","XL"],
colors:["Pink","White","Blue"],
image:"floral.jpg",
description:"Elegant floral summer dress perfect for casual outings.",
rating:5
},

{
id:2,
name:"Classic Denim Jeans",
category:"men",
price:1999,
sizes:["30","32","34","36"],
colors:["Blue","Black"],
image:"jeans.jpg",
description:"Premium denim jeans with comfortable fitting.",
rating:4
},

{
id:3,
name:"Premium Cotton Shirt",
category:"men",
price:999,
sizes:["M","L","XL"],
colors:["White","Black","Blue"],
image:"shirt.jpg",
description:"Stylish cotton shirt for modern fashion.",
rating:5
},

{
id:4,
name:"Designer Evening Gown",
category:"women",
price:2999,
sizes:["S","M","L"],
colors:["Red","Pink","Black"],
image:"Gown.jpg",
description:"Luxury evening gown for special occasions.",
rating:5
},

{
id:5,
name:"Kids Casual Wear",
category:"kids",
price:799,
sizes:["S","M","L"],
colors:["Blue","Yellow"],
image:"kids.jpg",
description:"Comfortable casual clothes for kids.",
rating:4
},

{
id:6,
name:"Sports Shoes",
category:"men",
price:2499,
sizes:["7","8","9","10"],
colors:["Black","White"],
image:"shoes.jpg",
description:"Lightweight sports shoes with premium comfort.",
rating:5
},

{
id:7,
name:"Women's Handbag",
category:"women",
price:1299,
sizes:["Free"],
colors:["Pink","Black"],
image:"bag.jpg",
description:"Trendy handbag for daily use.",
rating:4
},

{
id:8,
name:"Kids Hoodie",
category:"kids",
price:899,
sizes:["S","M","L"],
colors:["Red","Blue"],
image:"hoodie.jpg",
description:"Warm hoodie designed for kids.",
rating:4
},

{
id:9,
name:"Formal Blazer",
category:"men",
price:3999,
sizes:["M","L","XL"],
colors:["Black","Grey"],
image:"blazer.jpg",
description:"Premium formal blazer collection.",
rating:5
},

{
id:10,
name:"Party Wear Top",
category:"women",
price:1199,
sizes:["S","M","L"],
colors:["Pink","White"],
image:"Party.jpg",
description:"Beautiful party wear top.",
rating:4
}

];


// ================= GLOBAL VARIABLES =================


let cart = [];

let wishlist = [];

let selectedProduct = null;


// ================= DISPLAY PRODUCTS =================


const productGrid =
document.getElementById("productGrid");



function displayProducts(items){

productGrid.innerHTML="";


items.forEach(product=>{


let stars="";

for(let i=0;i<product.rating;i++){

stars += "⭐";

}



productGrid.innerHTML += `


<div class="product-card">


<div class="sale">

SALE

</div>


<img src="${product.image}">


<div class="product-info">


<h3>${product.name}</h3>


<p>

${product.category.toUpperCase()}

</p>


<div class="rating">

${stars}

</div>


<div class="price">

₹${product.price}

</div>


<div class="product-buttons">


<button class="cart-btn"
onclick="viewProduct(${product.id})">

View

</button>



<button class="wish-btn"
onclick="addWishlist(${product.id})">

❤

</button>


</div>


</div>


</div>


`;

});


}


// Initial Load

displayProducts(products);
/* ==========================================
   STYLEHUB - SCRIPT.JS PART 2
   Search + Filters + Product Details
==========================================*/


// ================= SEARCH =================


const searchInput = document.getElementById("searchInput");


function searchProduct(){


let value =
searchInput.value.toLowerCase();


let filtered =
products.filter(product=>


product.name
.toLowerCase()
.includes(value)


);



displayProducts(filtered);


}



// Live Search

if(searchInput){

searchInput.addEventListener(
"keyup",
searchProduct
);

}



// ================= FILTER SYSTEM =================



function applyFilters(){


let category =
document.getElementById(
"categoryFilter"
).value;



let size =
document.getElementById(
"sizeFilter"
).value;



let color =
document.getElementById(
"colorFilter"
).value;



let price =
document.getElementById(
"priceFilter"
).value;



let filteredProducts =
products.filter(product=>{


let categoryMatch =
category === ""
||
product.category === category;



let sizeMatch =
size === ""
||
product.sizes.includes(size);



let colorMatch =
color === ""
||
product.colors.includes(color);



let priceMatch=true;



if(price==="0-500"){

priceMatch =
product.price < 500;

}


else if(price==="500-1000"){

priceMatch =
product.price >=500
&&
product.price <=1000;

}


else if(price==="1000-5000"){

priceMatch =
product.price >1000;

}



return (

categoryMatch
&&
sizeMatch
&&
colorMatch
&&
priceMatch

);


});



displayProducts(filteredProducts);


}




// ================= PRODUCT DETAILS =================



function viewProduct(id){



selectedProduct =
products.find(
product=>product.id===id
);



document
.getElementById("productDetails")
.scrollIntoView({
behavior:"smooth"
});



document
.getElementById("detailImage")
.src =
selectedProduct.image;



document
.getElementById("detailTitle")
.innerHTML =
selectedProduct.name;



document
.getElementById("detailDescription")
.innerHTML =
selectedProduct.description;



document
.getElementById("detailPrice")
.innerHTML =
"₹"+selectedProduct.price;



// SIZE OPTIONS


let sizeBox =
document.getElementById(
"detailSize"
);


sizeBox.innerHTML="";



selectedProduct.sizes.forEach(size=>{


sizeBox.innerHTML += `

<option value="${size}">
${size}
</option>

`;


});




// COLOR OPTIONS


let colorBox =
document.getElementById(
"detailColor"
);



colorBox.innerHTML="";



selectedProduct.colors.forEach(color=>{


colorBox.innerHTML += `

<option value="${color}">
${color}
</option>

`;



});



}





// ================= SHOP BUTTON =================



function scrollProducts(){


document
.getElementById("products")
.scrollIntoView({

behavior:"smooth"

});


}



// ================= LOGIN MODAL =================



function openLogin(){


document
.getElementById("loginModal")
.style.display="flex";


}



function closeLogin(){


document
.getElementById("loginModal")
.style.display="none";


}



// Close modal outside click


window.onclick=function(event){


let modal =
document.getElementById(
"loginModal"
);



if(event.target===modal){

modal.style.display="none";

}


}
/* ==========================================
   STYLEHUB - SCRIPT.JS PART 3
   Cart System
==========================================*/


// ================= ADD TO CART =================


function addToCart(){


if(!selectedProduct){

alert("Please select a product");

return;

}



let size =
document.getElementById(
"detailSize"
).value;



let color =
document.getElementById(
"detailColor"
).value;




let existingItem =
cart.find(item=>

item.id===selectedProduct.id
&&
item.size===size
&&
item.color===color

);




if(existingItem){


existingItem.quantity++;


}

else{


cart.push({

id:selectedProduct.id,

name:selectedProduct.name,

price:selectedProduct.price,

image:selectedProduct.image,

size:size,

color:color,

quantity:1


});


}



saveCart();


displayCart();


updateCartCount();



alert("Product added to cart");


}




// ================= DISPLAY CART =================


function displayCart(){



let cartBox =
document.getElementById(
"cartItems"
);



if(cart.length===0){


cartBox.innerHTML =
"<h3>Your cart is empty</h3>";



document.getElementById(
"cartTotal"
).innerHTML="0";


return;


}




cartBox.innerHTML="";



let total=0;



cart.forEach((item,index)=>{


total +=
item.price *
item.quantity;



cartBox.innerHTML += `


<div class="cart-item">


<img src="${item.image}">



<div class="cart-info">


<h3>${item.name}</h3>


<p>

Size: ${item.size}

</p>


<p>

Color: ${item.color}

</p>



<p>

₹${item.price}

</p>


</div>



<div class="qty-box">


<button onclick="changeQuantity(${index},-1)">
-
</button>



<span>

${item.quantity}

</span>



<button onclick="changeQuantity(${index},1)">
+
</button>



</div>



<button class="remove-btn"
onclick="removeCart(${index})">

Remove

</button>



</div>



`;



});



document.getElementById(
"cartTotal"
).innerHTML =
total;



}




// ================= CHANGE QUANTITY =================


function changeQuantity(index,value){



cart[index].quantity += value;



if(cart[index].quantity <=0){


cart.splice(index,1);


}



saveCart();


displayCart();


updateCartCount();



}




// ================= REMOVE ITEM =================



function removeCart(index){



cart.splice(index,1);



saveCart();


displayCart();


updateCartCount();



}



// ================= CART COUNT =================



function updateCartCount(){



let count =
0;



cart.forEach(item=>{


count += item.quantity;


});



let cartCount =
document.getElementById(
"cartCount"
);



if(cartCount){

cartCount.innerHTML=count;

}



}




// ================= TOTAL PRICE =================



function getCartTotal(){



let total=0;



cart.forEach(item=>{


total +=
item.price *
item.quantity;


});



return total;


}




// ================= CHECKOUT =================



function checkout(){



if(cart.length===0){


alert(
"Your cart is empty"
);


return;


}



document
.getElementById(
"checkout"
)
.scrollIntoView({

behavior:"smooth"

});



}




// ================= LOCAL STORAGE =================



function saveCart(){



localStorage.setItem(

"stylehubCart",

JSON.stringify(cart)

);



}




function loadCart(){



let savedCart =
localStorage.getItem(
"stylehubCart"
);



if(savedCart){


cart =
JSON.parse(savedCart);


}



displayCart();


updateCartCount();



}



// Load cart when website opens

loadCart();
/* ==========================================
   STYLEHUB - SCRIPT.JS PART 4
   Wishlist + User + Orders + Checkout
==========================================*/


// ================= WISHLIST =================


function addWishlist(id){


let product =
products.find(
item=>item.id===id
);



let exists =
wishlist.find(
item=>item.id===id
);



if(exists){


alert("Already in wishlist");

return;


}



wishlist.push(product);



saveWishlist();


updateWishlistCount();


displayWishlist();



alert("Added to wishlist ❤️");



}




function displayWishlist(){



let box =
document.getElementById(
"wishlistItems"
);



if(!box) return;



if(wishlist.length===0){


box.innerHTML =
"No wishlist items";


return;


}



box.innerHTML="";



wishlist.forEach(item=>{


box.innerHTML += `


<div class="cart-item">


<img src="${item.image}">


<div>

<h3>${item.name}</h3>

<p>
₹${item.price}
</p>


</div>


<button class="remove-btn"
onclick="removeWishlist(${item.id})">

Remove

</button>


</div>


`;



});



}




function removeWishlist(id){



wishlist =
wishlist.filter(
item=>item.id!==id
);



saveWishlist();


displayWishlist();


updateWishlistCount();


}



function updateWishlistCount(){



let count =
document.getElementById(
"wishlistCount"
);



if(count){

count.innerHTML =
wishlist.length;

}



}



function saveWishlist(){


localStorage.setItem(

"stylehubWishlist",

JSON.stringify(wishlist)

);


}



function loadWishlist(){


let data =
localStorage.getItem(
"stylehubWishlist"
);



if(data){


wishlist =
JSON.parse(data);


}



displayWishlist();

updateWishlistCount();


}



// ================= USER SYSTEM =================



let user = {

name:"",
email:"",
loggedIn:false

};




function registerUser(){



let name =
document.querySelector(
".modal-content input:nth-of-type(1)"
).value;



let email =
document.querySelector(
".modal-content input:nth-of-type(2)"
).value;



user.name=name;

user.email=email;

user.loggedIn=true;



localStorage.setItem(

"stylehubUser",

JSON.stringify(user)

);



alert(
"Registration successful"
);



closeLogin();



}




function loginUser(){


let email =
document.querySelector(
".modal-content input[type=email]"
).value;



user.email=email;

user.loggedIn=true;



localStorage.setItem(

"stylehubUser",

JSON.stringify(user)

);



alert(
"Login successful"
);



closeLogin();


}





function loadUser(){



let data =
localStorage.getItem(
"stylehubUser"
);



if(data){


user =
JSON.parse(data);


}



}



// ================= COUPON SYSTEM =================



let discount=0;



function applyCoupon(){



let coupon =
document.getElementById(
"coupon"
).value;



if(coupon==="STYLE10"){


discount=10;


alert(
"10% discount applied"
);


}

else{


alert(
"Invalid coupon"
);


}



}



// ================= ORDER SYSTEM =================



let orders=[];




function placeOrder(){



if(cart.length===0){


alert(
"Cart is empty"
);


return;


}



let order={


id:
Date.now(),


items:cart,


amount:getCartTotal(),


date:
new Date()
.toLocaleDateString()



};




orders.push(order);



localStorage.setItem(

"stylehubOrders",

JSON.stringify(orders)

);



cart=[];



saveCart();


displayCart();


displayOrders();



alert(

"Order placed successfully 🎉"

);



}




function displayOrders(){



let box =
document.getElementById(
"orders"
);



if(!box)return;



if(orders.length===0){


box.innerHTML =
"No orders yet";


return;


}



box.innerHTML="";



orders.forEach(order=>{


box.innerHTML += `


<div class="success">


Order ID:
${order.id}


<br>


Date:
${order.date}


<br>


Amount:
₹${order.amount}


</div>


`;


});



}



function loadOrders(){


let data =
localStorage.getItem(
"stylehubOrders"
);



if(data){


orders =
JSON.parse(data);


}



displayOrders();


}



// ================= INITIAL LOAD =================



window.onload=function(){


loadCart();


loadWishlist();


loadUser();


loadOrders();


displayProducts(products);


};
