import React, { useState } from "react";
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Add an item to the cart
  const addItem = () => {
    const { name, price } = newProduct;
    if (!name || !price || price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }

    const existingItem = cartItems.find((i) => i.name === name);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { name, price: parseFloat(price), quantity: 1 }]);
    }

    // Reset new product input fields
    setNewProduct({ name: "", price: "" });
  };

  // Remove an item from the cart
  const removeItem = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  // Update item quantity
  const updateQuantity = (name, quantity) => {
    if (quantity < 1) return; // Prevent invalid quantities
    setCartItems(
      cartItems.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* Add New Product */}
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button onClick={addItem}>Add to Cart</button>
      </div>

      {/* Cart Items */}
      <div>
        <h2>Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.name}>
                <p>{item.name}</p>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                <p>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.name, parseInt(e.target.value))
                    }
                  />
                </p>
                <button onClick={() => removeItem(item.name)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Summary */}
      <div className="summary">
        <h3>
          Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </h3>
        <h3>
          Total Cost: ₹
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
      </div>

      {/* Clear Cart */}
      {cartItems.length > 0 && (
        <button onClick={clearCart} className="clear-cart">
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;
