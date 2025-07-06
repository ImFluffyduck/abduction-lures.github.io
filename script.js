let cartItems = {};
let total = 0;

// Load cart from localStorage
window.onload = function () {
  const savedCart = localStorage.getItem('cart');
  const savedTotal = localStorage.getItem('total');

  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  }

  if (savedTotal) {
    total = parseFloat(savedTotal);
  }

  updateCart();
};

function addToCart(itemName, price) {
  if (cartItems[itemName]) {
    cartItems[itemName].quantity += 1;
  } else {
    cartItems[itemName] = { price: price, quantity: 1 };
  }

  total += price;
  saveCart();
  updateCart();
}

function removeFromCart(itemName) {
  if (cartItems[itemName]) {
    total -= cartItems[itemName].price * cartItems[itemName].quantity;
    delete cartItems[itemName];
    saveCart();
    updateCart();
  }
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  cartList.innerHTML = '';

  Object.keys(cartItems).forEach(itemName => {
    const item = cartItems[itemName];
    const li = document.createElement('li');
    li.innerHTML = `
      ${itemName} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart('${itemName}')">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
  localStorage.setItem('total', total.toFixed(2));
}

function clearCart() {
  cartItems = {};
  total = 0;
  localStorage.removeItem('cart');
  localStorage.removeItem('total');
  updateCart();
}

// Scroll to top when logo is clicked
document.getElementById('logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
