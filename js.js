const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});
const cartInfo = document.querySelector('#cart-info');
const cartBox = document.querySelector('.cartBox');
//show cart
cartInfo.addEventListener("click",function(){
    cartBox.classList.toggle('show-cart')
    });
    //catch the btn of each item
   let carts = document.querySelectorAll(".store-item-icon");
console.log(carts);
// declaration of each of the products
let products = [
  {
      name:'Birthday Cakes',
      tag:'Birthday Cakes',
      price:2000,
      incart:0
  },
  {
      name:'Wedding Cakes',
      tag:'Wedding Cakes',
      price:6000,
      incart:0
  },
  {
    name:'Ordinary Cakes',
    tag:'Ordinary Cakes',
    price:1000,
    incart:0
}
];
//create a for loop to loop through each of the item
for(let i=0; i < carts.length; i++){
carts[i].addEventListener("click", (e)=>{
  
  alert('item added to the cart');
  e.preventDefault();
  cartNumbers(products[i]);
  totalCost(products[i]);
})
}
//to prevent relooad of cart items which does check the localstorage for any value in it
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
  document.querySelector('#item-count').textContent = productNumbers;
}
}
//create a function to add the items  to the shooping cart and the local storage
function cartNumbers(product){
  console.log("This is my products",product);
let productNumbers = localStorage.getItem('cartNumbers');
productNumbers = parseInt(productNumbers);
if (productNumbers) {
 localStorage.setItem('cartNumbers',productNumbers + 1 );
  document.querySelector('#item-count').textContent = productNumbers + 1;
}else{
  localStorage.setItem('cartNumbers',1);
document.querySelector('#item-count').textContent = 1;
}
setItems(product);
}
//we create a function to know exactly which item have been clicked
function setItems(product) {
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);
//to check whether they exist some values you first write a condition and increment it by one and register the tag value
if(cartItems != null){
//if the tag had not been defined you create another if conditions inside it
if(cartItems[product.tag] == undefined){
cartItems = {
  ...cartItems,
  [product.tag] : product
}
}
cartItems[product.tag].incart += 1
}else{
//being the first time we are clicking
product.incart = 1;
cartItems = {
  [product.tag]: product
}
}
  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
//you create a function to show the totals
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost") ;
  //we do an if statement to check if there exist a cost in the localstorage
  if(cartCost != null)
  {
    cartCost = parseInt(cartCost);
localStorage.setItem("totalCost",cartCost + product.price);
  }else{
    localStorage.setItem("totalCost",product.price);
  }
}
//you create a function to display the cart
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems =  JSON.parse(cartItems);
  console.log(cartItems);
  let cartContainer =  document.querySelector('#cart');
  let cartCost = localStorage.getItem("totalCost") ;
  if(cartItems && cartContainer){
    cartContainer.innerHTML = '';
    Object.values(cartItems).map(item=>{
      cartContainer.innerHTML +=`
      <div class = "text-align left">
      <img src = "./img/${item.tag}.jpeg" style="width:50px;height:50px;" >
      <span class = "text-align center">${item.name}</span>
      <div>
      <span class="text red">Ksh${item.price}</span>
      <span class = "quantity">
       <i class="fa fa-chevron-up"></i>
    <span>${item.incart}</span>
      <i class="fa fa-chevron-down"></i></span>
      <span class="total text teal">= Ksh${item.incart*item.price}</span>
      <button class="btn pink">delete</button>
      </div>
      </div>
      `;
    });
cartContainer.innerHTML +=`
<div class="carttotal">
<h4>Shopping Total</h4>
<h4>${cartCost}</h4>
</div>
<div class =" ">
<span class="btn pink clear cart">Clear cart</span>
<span class="btn yellow">Purchase</span>
</div>
`;
  }
}
displayCart();
onLoadCartNumbers();