import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js'
import {cart, addToCart, calculateCartItems} from '../data/cart.js'

// calling the function to display cart quantity on page load
renderCartQuantity();
 
// generated html for products
let productsHTML = '';
products.forEach((product) => {

    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`
});
// using the DOM to display the products on the page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// when clicking th add to cart button we update the cart
document.querySelectorAll('.js-add-to-cart-btn')
  .forEach((btn) =>{
    btn.addEventListener('click', () => {
    const {productId} = btn.dataset;
    addToCart(productId);
    renderCartQuantity()
    console.log(cart);
    })
   
  })

  // displaying the cart quantity on the page
  function renderCartQuantity(){
     const cartQuantity = calculateCartItems();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity 
  }