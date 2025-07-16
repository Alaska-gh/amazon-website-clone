import {cart, calculateCartItems, removeItem, updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartItemHTML = '';

// generating the html for the checkout page
cart.forEach((cartItem) =>{
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) =>{
    if(product.id === productId){
      matchingProduct = product;
    };
  });

    cartItemHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class ="update-input js-update-input-${matchingProduct.id}">
                  <span class = "save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}"> </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
  document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
  updateCheckOutItems();
  deleteItemsFromCart();
  updateCartItems();
});

// a function to update the cart items quantity
  function updateCartItems(){
    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', ()=>{

        const {productId} = link.dataset;

         const saveLinkElement = document.querySelector(`.js-save-quantity-link-${productId}`);  
         saveLinkElement.innerHTML = 'Save';

          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-edditing-quantity');

          saveLinkElement.addEventListener('click', () =>{
            const newQunatityInputElement = document.querySelector(`.js-update-input-${productId}`);

            const newQuantity = Number(newQunatityInputElement.value);

            if(newQuantity <= 0 || newQuantity > 100){
              alert('Quantity must be greater than 0 and less than 100');
             
               container.classList.remove('is-edditing-quantity');
                return;
            }
            updateCartQuantity(productId, newQuantity);

            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
             updateCheckOutItems();
             container.classList.remove('is-edditing-quantity');
          })
        })
      })
}

// a funtion to delete item from the checkout page
  function deleteItemsFromCart(){ 
   document.querySelectorAll('.js-delete-quantity').forEach((btn) =>{
    btn.addEventListener('click', ()=>{
      const {productId} = btn.dataset;
      removeItem(productId);
      updateCheckOutItems();
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    })
  })
}

// a function to display the number of items in the checkout page
  function updateCheckOutItems(){
     const checkoutItems = calculateCartItems();
     document.querySelector('.js-checkout-items').innerHTML = `${checkoutItems} Items`;
  }