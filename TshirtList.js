import React, { useState } from 'react';

const TshirtList = () => {
  const [tshirts, setTshirts] = useState([
    {
      id: 1,
      name: "Navy Blue Armanis Tshirt",
      description: "100% cotton",
      price: 1299,
      sizes: {
        L: { available: 100, selected: 0 },
        M: { available: 19, selected: 0 },
        S: { available: 1, selected: 0 }
      }
    },
    {
      id: 2,
      name: "Gucci Tshirt",
      description: "100% cotton",
      price: 2000,
      sizes: {
        L: { available: 10, selected: 0 },
        M: { available: 5, selected: 0 },
        S: { available: 1, selected: 0 }
      }
    }
  ]);

  const calculateTotal = (tshirt) => {
    let total = 0;
    Object.values(tshirt.sizes).forEach((size) => {
      total += size.selected * tshirt.price;
    });
    return total;
  };

  const placeOrder = (tshirt) => {
    // Update the selected quantities and available quantities
    const updatedTshirts = tshirts.map((t) => {
      if (t.id === tshirt.id) {
        const updatedSizes = { ...t.sizes };
        Object.values(updatedSizes).forEach((size) => {
          size.available -= size.selected;
          size.selected = 0;
        });
        return { ...t, sizes: updatedSizes };
      }
      return t;
    });

    setTshirts(updatedTshirts);
  };

  const cancelOrder = (tshirt) => {
    // Reset the selected quantities to 0
    const updatedTshirts = tshirts.map((t) => {
      if (t.id === tshirt.id) {
        const updatedSizes = { ...t.sizes };
        Object.values(updatedSizes).forEach((size) => {
          size.selected = 0;
        });
        return { ...t, sizes: updatedSizes };
      }
      return t;
    });

    setTshirts(updatedTshirts);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>TshirtName</th>
            <th>L</th>
            <th>M</th>
            <th>S</th>
            <th>Price</th>
            <th>Total</th>
            <th>Place Order</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {tshirts.map((tshirt) => (
            <tr key={tshirt.id}>
              <td>{tshirt.name}</td>
              <td>{tshirt.sizes.L.available}</td>
              <td>{tshirt.sizes.M.available}</td>
              <td>{tshirt.sizes.S.available}</td>
              <td>{tshirt.price}</td>
              <td>{calculateTotal(tshirt)}</td>
              <td>
                <button onClick={() => placeOrder(tshirt)}>Place Order</button>
              </td>
              <td>
                <button onClick={() => cancelOrder(tshirt)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TshirtList;
