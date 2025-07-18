import {cart, calculateCartItems, removeItem, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, getDeliveryDay} from '../../data/deliveryOptions.js';

import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutItems } from './checkoutHeader.js';

renderOrderSummary();

export function renderOrderSummary(){
let cartItemHTML = '';

// generating the html for the checkout page
cart.forEach((cartItem) =>{
  const productId = cartItem.productId;
  
  const matchingProduct = getProduct(productId);

  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

  const deliveryDay = getDeliveryDay(deliveryOption);
  

    cartItemHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDay}
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
                
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
             
              </div>
            </div>
          </div>`
  document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
  renderCheckoutItems();
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
            renderPaymentSummary();
            renderOrderSummary();
             renderCheckoutItems();
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
      renderCheckoutItems();
    
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
    })
  })
}

// a function to generate the html for delivery options
function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    const dateString = getDeliveryDay(deliveryOption);
   

    const priceString = deliveryOption.priceCents === 0 
    ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
    

    html += `
         <div class="delivery-option js-delivery-option"
         data-product-id = "${matchingProduct.id}"
         data-delivery-option-id = "${deliveryOption.id}"
         >
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>
    `
  })
  return html;
}

// calling the updateDeliveryOption function when selecting an option.
 document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () =>{
        const {productId, deliveryOptionId} = element.dataset;  
        
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    });

}

