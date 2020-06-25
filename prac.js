const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

const iconShopping = document.querySelector('.iconShopping');
const cartCloseBtn = document.querySelector('.fa-close');
const cartBox = document.querySelector('.cartBox')
iconShopping.addEventListener("click",function(){
cartBox.classList.add('active')
});
cartCloseBtn.addEventListener("click",function(){
    cartBox.classList.remove('active')
    });

    //add data to localstorage
    const addToCartBtn = document.getElementsByClassName('store-item-icon');
    const itemName = document.getElementById('store-item-name');
    const itemPrice = document.getElementsByClassName('"store-item-value');
    //console.log(addToCartBtn);
    let items = [];
    //loop through the collection
    for(let i=0; i<addToCartBtn.length; i++){
        addToCartBtn[i].addEventListener('click',function(e){
            if (typeof(Storage) !== 'undefined'){
              let item = {
                  id:i+1,
                 name:e.target.parentElement.nextElementSibling.textContent,
                 price:e.target.parentElement.nextElementSibling.nextElementSibling.textContent,
                 no:1
              };
              // //add data to localstorage and to ensure increase of the no of items  upon clicking to the cart


           if(JSON.parse(localStorage.getItem('items')) == null){
               items.push(item);
               localStorage.setItem("items",JSON.stringify(items));
               window.location.reload();
           }else{
               const localItems = JSON.parse(localStorage.getItem('items'));
               localItems.map(data=>{
                if(item.id == data.id){
                    item.no = data.no + 1;
                }else{
                    items.push(data);
                }
                });
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
                window.location.reload();
            }
            }else{
                console.log('storage is not working');
            }
        });
    }
    //adding data to the shopping cart icon
    const iconShoppingP = document.querySelector('.iconshopping span');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data=>{
        no = no+data.no;
    });
    iconShopping.innerHTML = no;
   
    //adding cartBox data table
    const cartBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th> S no.</th><th>Item name</th><th> item No</th><th>Item price</th><th></th></tr>';
    if(JSON.parse(localStorage.getItem('items'))[0] == null){
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    }else{
        JSON.parse(localStorage.getItem('items')).map(data=>
            {
                tableData+= '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+
                data.no+'</th><th>'+data.price+'</th><th><a href="#"onclick=Delete(this);>Delete</a></th></tr>';
            });
       
    }
    cartBoxTable.innerHTML = tableData;