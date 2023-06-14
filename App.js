import React, { useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Navy Blue Armanis Tshirt',
      description: '100% cotton',
      price: 1299,
      quantities: {
        large: 100,
        medium: 19,
        small: 1
      }
    },
    {
      id: 2,
      name: 'Gucci Tshirt',
      description: '100% cotton',
      price: 2000,
      quantities: {
        large: 10,
        medium: 5,
        small: 1
      }
    }
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (productId, size) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantities: {
              ...product.quantities,
              [size]: product.quantities[size] - 1
            }
          };
        }
        return product;
      });
    });

    const product = products.find(product => product.id === productId);
    const selectedSize = size.toUpperCase();
    const existingCartItem = cart.find(item => item.id === productId && item.size === selectedSize);

    if (existingCartItem) {
      const updatedCart = cart.map(item => {
        if (item.id === productId && item.size === selectedSize) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const newCartItem = {
        ...product,
        size: selectedSize,
        quantity: 1
      };
      setCart([...cart, newCartItem]);
    }
  };

  const handleAddProduct = () => {
    // Logic for adding a new product goes here
    console.log('Add Product button clicked');
  };

  const calculateTotal = (product) => {
    const price = product.price;
    const quantity = product.quantity;
    return price * quantity;
  };

  const handlePlaceOrder = (productId) => {
    // Logic for placing an order goes here
    console.log(`Place order for product ${productId}`);
  };

  const handleCancelOrder = (productId) => {
    // Logic for canceling an order goes here
    console.log(`Cancel order for product ${productId}`);
  };

  return (
    <div>
      <h1>T-Shirt Store</h1>
      <table>
        <thead>
          <tr>
            <th>T-Shirt Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity Available (L)</th>
            <th>Quantity Available (M)</th>
            <th>Quantity Available (S)</th>
         
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                {product.quantities.large > 0 ? (
                  <button onClick={() => handleAddToCart(product.id, 'large')}>
                    Buy Large ({product.quantities.large})
                  </button>
                ) : (
                  <button disabled>Sold Out</button>
                )}
              </td>
              <td>
                {product.quantities.medium > 0 ? (
                  <button onClick={() => handleAddToCart(product.id, 'medium')}>
                    Buy Medium ({product.quantities.medium})
                  </button>
                ) : (
                  <button disabled>Sold Out</button>
                )}
              </td>
              <td>
                {product.quantities.small > 0 ? (
                  <button onClick={() => handleAddToCart(product.id, 'small')}>
                    Buy Small ({product.quantities.small})
                  </button>
                ) : (
                  <button disabled>Sold Out</button>
                )}
              </td>
              
            </tr>
          ))}
          <tr>
            <td colSpan="7">
              {cart.length > 0 && (
                <button onClick={handleAddProduct}>
                  Cart ({cart.length} items)
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>T-Shirt Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Total</th>
            <th>Place Order</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={`${product.id}-${product.size}`}>
              <td>{product.name}</td>
              <td>{product.size}</td>
              <td>${product.price}</td>
              <td>${calculateTotal(product)}</td>
              <td>
                <button onClick={() => handlePlaceOrder(product.id)}>Place Order</button>
              </td>
              <td>
                <button onClick={() => handleCancelOrder(product.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App