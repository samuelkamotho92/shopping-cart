//variable
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});
const cartInfo = document.querySelector('#cart-info');
//const cartBox = document.querySelector('.cartBox');
const cartOverlay = document.querySelector('.cart-overlay');
const itemCount = document.querySelector('#item-count');
const productsDOM = document.querySelector('#store-items');
const buttons = document.querySelector('#cartBtn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const cartDOM = document.querySelector('.cart');

//create an empty array where we shall be getting information from the localstorage and place the values
let cart = [];
//create an empty array to catch all the buttons
let buttonsDOM = [];
//we create class where we shall be writing the fconstructors
//getting the products from JSON file and also content full
class Products {
async getProducts(){
  try{
    let result = await fetch('products.json');
    let data = await result.json()
    //destructure
   let products = data.items;
   products = products.map(item=>{
    const {title,price} = item.fields;
    const {id} = item.sys;
    const image = item.fields.image.fields.file.url;
    return{title,price,id,image}
   })
   return products;
  }catch(error){
    Console.log(error);
  }
}

}
//class of dispalying the products we get from the class above and localstorage and display them
class UI{
displayProducts(products){
  console.log(products)
let result = '';
products.forEach(product => {
  result += `
  <div class="col s6 l4 m4 store-items sweets" data-item="sweets">
  <div class="card single-item">
  <div class="img-container">
    <img src="${product.image}" class="card-img-top store-img">
    <button class="store-item-icon" id="cartBtn" data-id=${product.id}><i class="fa fa-shopping-cart"></i>
    add to cart
    </button>
  </div>
  <div class="card-body">
  <div class="card-text d-flex justify-content-between text-capitalise">
    <h5 id="store-item-name">${product.title}</h5>
    <h5 class="store-item-value">Ksh<strong id="store-item-price" class="font-weight-bold">${product.price}</strong></h5>
    </div>
    </div>
  </div>
  </div>
  `;
});
productsDOM.innerHTML = result;
}
//get the button
getBagButtons(){
  const buttons = [...document.querySelectorAll('#cartBtn')];
  buttonsDOM = buttons;
  console.log(cartBtn);
  buttons.forEach(button=>{
let id = button.dataset.id;
let inCart = cart.find(item => item.id === id);
  if (inCart) {
    button.innerText = 'In Cart';
    button.disabled = true;
  }
   button.addEventListener("click",(e)=>{
    e.target.innerText = "In Cart";
    e.target.disabled = true;
    //get products from the localstorage
let cartItem = {...Storage.getProduct(id),amount: 1}
console.log(cartItem)
    //add the product to the cart empty array
    cart = [...cart,cartItem];
    console.log(cart);
    //save cart in localstorage
    Storage.saveCart(cart);
    //set cart values
    this.setCartValues(cart);
    //display cart items
this.addCartItem(cartItem);
    //show the cart
    this.showCart();
   });
  });
}
setCartValues(cart){
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map(item=>{
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount
  })
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  itemCount.innerText = itemsTotal;
}
addCartItem(item){
  const div = document.createElement('div');
  div.classList.add('cart-item');
  div.innerHTML = `
  <img src=${item.image} alt="product 1"/>
    <div>
        <h4>${item.title}</h4>
        <h5>ksh${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
       <i class="fa fa-chevron-up" data-id=${item.id}></i>
       <p class="item-amount">${item.amount}</p>
       <i class="fa fa-chevron-down" data-id=${item.id}></i>
    </div>
  `;
  cartContent.appendChild(div);
}
showCart(){
  cartOverlay.classList.add('transparentBcg');
  cartDOM.classList.add('showCart');
}
setupAPP(){
cart = Storage.getCart();
this.setCartValues(cart);
this.populateCart(cart);
cartInfo.addEventListener('click',this.showCart);
closeCartBtn.addEventListener('click',this.hideCart)
}
populateCart(cart){
  cart.forEach(item=>this.addCartItem(item));
}
hideCart(){
  cartOverlay.classList.remove('transparentBcg');
  cartDOM.classList.remove('showCart');
}
cartLogic(){
  //clear cart button
  clearCartBtn.addEventListener('click',()=>{
    this.clearCart();
  });
  //cart functionality and clearing one item
  cartContent.addEventListener("click",(e)=>{
    if(e.target.classList.contains('remove-item')){
      let removeItem = e.target;
     let id = removeItem.dataset.id;
     console.log(removeItem.parentElement.parentElement)
     cartContent.removeChild(removeItem.parentElement.parentElement);
     this.removeItem(id);
    }    else if(e.target.classList.contains('fa-chevron-up')){
      let addAmount = e.target;
      let id = addAmount.dataset.id;
      let tempItem = cart.find(item => item.id===id);
      tempItem.amount = tempItem.amount + 1;
      //UPDATE the cart new value in the local storage
      Storage.saveCart(cart);
      //update new cart values as well change the shopping cart itemsCount
      this.setCartValues(cart);
      //change the item numbers
      addAmount.nextElementSibling.innerText = tempItem.amount;
          }
          else if(e.target.classList.contains('fa-chevron-down')){
            let lowerAmount = e.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item=>item.id===id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0){
            //update the localstorage
            Storage.saveCart(cart);
             //update new cart values as well change the shopping cart itemsCount
            this.setCartValues(cart);
            lowerAmount.previousElementSibling.innerText = tempItem.amount;
            }else{
              cartContent.removeChild(lowerAmount.parentElement.parentElement);
              this.removeItem(id);
            }
                }
  })
}
//clearing the entire cart
clearCart(){
let cartItems = cart.map(item => item.id);
console.log(cartItems);
cartItems.forEach(id => this.removeItem(id));
console.log(cartContent.children);
//remove from the content
while(cartContent.children.length>0){
  cartContent.removeChild(cartContent.children[0])
}
this.hideCart();
}
//removes from the cart/localstorage
removeItem(id){
  cart = cart.filter(item=> item.id !==id)
this.setCartValues(cart);
Storage.saveCart(cart);
let button = this.getSingleButton(id);
button.disabled = false;
button.innerHTML = `
<i class="fa fa-shopping-cart"></i>add to cart`;
}
getSingleButton(id){
  return buttonsDOM.find(button => button.dataset.id === id);
}
}
//localstorage
class Storage{
  //set the products in the localstorage
static saveProducts(products){
  localStorage.setItem("products",JSON.stringify(products));
}
//get the products from the localstorage and display them
static getProduct(id){
  let products = JSON.parse(localStorage.getItem('products'));
 return products.find(product => product.id === id);
}
//set cart values in the localstorage
static saveCart(cart){
  localStorage.setItem('cart',JSON.stringify(cart));
}
//get cart values  in the localstorage
static getCart(){
  return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
}
}
//create an event listener which shall be having the call back function for the class of ui 
//and Products on the instances created
document.addEventListener('DOMContentLoaded',()=>{
   const ui = new UI();
   const products = new Products();
   //set up app
   ui.setupAPP();
   products.getProducts().then(products =>{
    ui.displayProducts(products)
   Storage.saveProducts(products); 
   }).then(()=>{
     ui.getBagButtons();
     ui.cartLogic();
   })
});
//modal
var modals = document.querySelector('.modal');
M.Modal.init(modals);
//tooltipped
var toolTipped = document.querySelectorAll('.tooltipped');
M.Tooltip.init(toolTipped);
//scrollspy
var sc = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(sc, {});
