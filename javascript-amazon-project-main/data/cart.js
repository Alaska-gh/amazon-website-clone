
// getting the cart items from local storage using the retrieveCartFromStorage finction
export let cart = retrieveCartFromStorage() || []

// a function to save the cart to local storage
export function saveCartToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
 
}

// a function to retrieve cart items from local storage
function retrieveCartFromStorage(){
 return JSON.parse(localStorage.getItem('cart'));
}
// a function to add items to the cart 
export function addToCart(productId){
  const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`)
  
  const quantity = Number(quantitySelectorElement.value)

  let matchingItem;
  cart.forEach((item) => {
    if(item.productId === productId){
      matchingItem = item;
    }
  })

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity
    })
  }
  // calling the function to save items to the cart
  saveCartToStorage();
}

// a function to calculate items in the cart
export function calculateCartItems(){
  let cartQuantity = 0
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  
  return cartQuantity;
}

export function updateCartQuantity(productId, newQuantity){
  cart.forEach((item) => {
    if(item.productId === productId){
     item.quantity = newQuantity
    }

  })
  saveCartToStorage();
}

export function removeItem(productId){
  let newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveCartToStorage();
}
