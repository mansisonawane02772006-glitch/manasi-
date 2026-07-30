/* ===========================
   OFFERS
=========================== */

.offers{
    width:90%;
    margin:70px auto;
}

.offer-box{
    background:#FF6B35;
    color:#fff;
    text-align:center;
    padding:60px 20px;
    border-radius:15px;
}

.offer-box h1{
    font-size:60px;
    margin-bottom:15px;
}

.offer-box p{
    font-size:22px;
    margin-bottom:20px;
}

.offer-box button{
    background:#fff;
    color:#FF6B35;
    border:none;
    padding:15px 35px;
    border-radius:8px;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    transition:.3s;
}

.offer-box button:hover{
    background:#2D1B12;
    color:#fff;
}

/* ===========================
   REVIEWS
=========================== */

.reviews{
    width:90%;
    margin:70px auto;
}

.review-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:30px;
}

.review{
    background:#fff;
    padding:25px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
}

.review h3{
    margin-bottom:10px;
}

.review p{
    margin:8px 0;
}

/* ===========================
   FOOTER
=========================== */

footer{
    background:#2D1B12;
    color:#fff;
    text-align:center;
    padding:30px;
    margin-top:60px;
}

footer p{
    margin:8px 0;
}

/* ===========================
   BUTTON HOVER
=========================== */

button{
    transition:.3s ease;
}

button:hover{
    transform:translateY(-3px);
    opacity:.95;
}

/* ===========================
   MOBILE
=========================== */

@media(max-width:768px){

.navbar{
    flex-direction:column;
}

.nav-links{
    flex-direction:column;
    margin-top:15px;
    text-align:center;
}

.nav-links li{
    margin:10px 0;
}

.hero{
    flex-direction:column;
    text-align:center;
}

.hero-text h1{
    font-size:38px;
}

.hero-text input{
    width:100%;
    margin-bottom:15px;
}

.hero-text button{
    width:100%;
}

.hero-image img{
    max-width:300px;
}

.offer-box h1{
    font-size:40px;
}

section h2{
    font-size:28px;
}

}

/* ===========================
   SMALL MOBILE
=========================== */

@media(max-width:480px){

.logo{
    font-size:22px;
}

.hero-text h1{
    font-size:30px;
}

.hero-text p{
    font-size:16px;
}

.category-card{
    padding:25px;
    font-size:35px;
}

.restaurant-card img,
.dish img{
    height:180px;
}

.offer-box h1{
    font-size:32px;
}

.offer-box p{
    font-size:18px;
}

}





