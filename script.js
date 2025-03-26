function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Citim coșul
    
    let existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity++; // Creștem cantitatea
    } else {
      cart.push({ ...product, quantity: 1 }); // Adăugăm produsul
    }
  
    localStorage.setItem("cart", JSON.stringify(cart)); // Salvăm în localStorage
    alert("Produsul a fost adăugat în coș!"); // Afișăm un mesaj
    renderCart(); // Reafișăm coșul
  }
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    let productIndex = cart.findIndex(item => item.id === productId);
  
    if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--; // Scade cantitatea
      } else {
        cart.splice(productIndex, 1); // Elimină produsul complet
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // Salvăm modificările
    renderCart(); // Reafișăm coșul
  }
  
  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");
  
    cartContainer.innerHTML = ""; // Curățăm lista
    let total = 0;
  
    cart.forEach(product => {
      let item = document.createElement("li");
      item.classList.add("cart-item")
      item.innerHTML = `${product.name} x${product.quantity} - ${product.price * product.quantity} $ 
        <button onclick="removeFromCart('${product.id}')">➖</button><br> <img class="imagcart" src="${product.image}"/>`;
      cartContainer.appendChild(item);
      total += product.price * product.quantity;
    });
  
    totalContainer.textContent = `Total: ${total} $`;
  }
  
  renderCart();