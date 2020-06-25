const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});
const cartInfo = document.querySelector('#cart-info');
const cartBox = document.querySelector('.cartBox');
//show cart
cartInfo.addEventListener("click",function(){
    cartBox.classList.toggle('show-cart')
    });
    //add items to the cart

   (function(){
     const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function(btn){
 btn.addEventListener("click",function(event){
 //console.log(event.target);
 if(event.target.parentElement.classList.contains('store-item-icon')){
let fullPath = event.target.parentElement.previousElementSibling.src;
let pos = fullPath.indexOf("img") + 3;
let partPath = fullPath.slice(pos);

const item = {};
item.img = `img-cart${partPath}`;
let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
//console.log(name);
item.name = name;
let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

let finalPrice = price.slice(3).trim();
item.price = finalPrice;
//console.log(finalPrice);
//console.log(price);
//console.log(item);


const cartItem = document.createElement('div');
cartItem.classList.add('cart-item','d-flex','justify-content-between');

cartItem.innerHTML = `  
<img src="${item.img}" id="item-img">
<div class="item-text">
  <p id="cart-item-title" class="font-weight-bold">
    ${item.name}</p>
    <span>Ksh</span>
    <span id="cart-item-price" class="cart-item-price">${item.price}</span>
</div>
<button  class="cart-item-remove" type="button">Remove</button></div>
</div>`;

//select the cart
const cart = document.getElementById("cart");
const total = document.querySelector('.cart-total-container');

cart.insertBefore(cartItem, total);
alert('item added to the cart');
showTotals();
 }
});
    });
    //show ttotal
    function showTotals(){
      const total = [];
      const items = document.querySelectorAll(".cart-item-price");
      items.forEach(function(item){
        total.push(parseFloat(item.textContent));
      });
     // console.log(total);
     const totalMoney = total.reduce(function(total,item){
       total += item;
     return total;
     },0)
     const finalMoney = totalMoney.toFixed(2);
     //console.log(finalMoney);

     document.getElementById('cart-total').textContent = finalMoney;
     document.querySelector('.item-total').textContent = finalMoney;
     document.getElementById('item-count').textContent = total.length;
     clearBtn();
    }
  })();
var modals = document.querySelector('.modal');
 M.Modal.init(modals);
 const purchase = document.querySelector('.submit');
purchase.addEventListener('submit', function(e){
e.preventDefault();
});
function clearBtn() {
  var removeCartItemButtons = document.getElementsByClassName("cart-item-remove");
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function(){
      console.log('clicked');
    });
  }
}
