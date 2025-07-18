import { calculateCartItems, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

// a function to display the payment summary on the page
export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) =>{

    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;
 
    const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionsId);

    shippingPriceCents += deliveryOption.priceCents;
  })
  
  const totalBeforeTaxAmount = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxAmount * 0.1;

  const orderTotalCost = totalBeforeTaxAmount + taxCents;

  const items = calculateCartItems()
 
  // generating the html for the payment summary
 const paymentSummaryHTML = 
  `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxAmount)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
 
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}