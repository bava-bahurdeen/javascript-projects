const cartbtn=document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const close=document.querySelector(".close-item");

cartbtn.addEventListener('click',()=>{
cart.classList.add("cart-active");

})
close.addEventListener('click',()=>{
    cart.classList.remove("cart-active");
})
document.addEventListener('DOMContentLoaded',loadfood);

function loadfood() {
    loadcontent();
}
function loadcontent(){
//   remove food items from cart  
//
let btnremove=document.querySelectorAll('.delete-item');
btnremove.forEach((btn)=>{
    btn.addEventListener('click',removeitem);
});
// product item change event number box
let btnqty=document.querySelectorAll('.cart-quantity');
btnqty.forEach((input)=>{
    input.addEventListener('change',switchqty);
});
updatetotal();
}

// product cart

let btncart=document.querySelectorAll('#by-icon');
btncart.forEach((btn)=>{
    btn.addEventListener('click',addcart);
})
let item=[];
// remove item
function removeitem() {
    
    let title=this.parentElement.querySelector(".cart-name");
    items=item.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadcontent();
}
// change quantity
function switchqty() {
    if (isNaN(this.value)||this.value<1) {
        this.value=1;
    }
    loadcontent();
}

let items=[];
// add cart
function addcart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-name').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let img=food.querySelector('.food-pic').src;
    // same product remove method

let newproduct={title,price,img};
if(items.find((el)=>
    el.title==newproduct.title
)){
    alert("you already add the product");
    return;
}
else{
items.push(newproduct);
}
    let newcartproduct=createcart(title,price,img);
    let element=document.createElement('div');
    element.innerHTML=newcartproduct;
    let cartcontent=document.querySelector('.cart-content');

    cartcontent.append(element);
    loadcontent();
}
function createcart(title,price,img){

return `
<div class="cart-box">
<img src="${img}" class="cart-image" >

<div class="detail-box">
<div class="cart-name">${title}</div>
<div class="price-box">
    <div class="cart-price">${price}</div>
    <div class="cart-amt">${price}</div>
</div>
<input type="number" value=1 class="cart-quantity" id="cart-quantity">
</div>
<ion-icon name="trash" class="delete-item"></ion-icon>
</div>
</div>

`;
};
// update the cart food price and total amounnt
function updatetotal(){
const cartitems=document.querySelectorAll('.cart-box');
const priceitems=document.querySelector('.total-price');
let total=0;
cartitems.forEach((product)=>{
 let sumproduct=product.querySelector('.cart-price');
let price=parseFloat(sumproduct.innerHTML.replace("RS.",""));
let qty=product.querySelector('.cart-quantity').value;
total+=(qty*price);
let add=product.querySelector('.cart-amt');
add.innerHTML="RS."+(price*qty);

});
priceitems.innerHTML='RS.'+total;

let cartcount=document.querySelector('.cart-count');

let iconvalueadd=items.length;
cartcount.innerHTML=iconvalueadd;
if(iconvalueadd==0){
    cartcount.style.display='none';
}
else{
    cartcount.style.display='block';
}
}
updatetotal();