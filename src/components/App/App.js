import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";




function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder, setOrders) => {
    return fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newOrder.name,
        ingredients: newOrder.ingredients,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add order');
        }
        return response.json();
      })
      .then(data => {
        setOrders(prevOrders => [...prevOrders, data]);
      })
      .catch(error => {
        console.error('Error adding order:', error);
      });
  }

  useEffect(() => {
    getOrders()
    .then((response) => setOrders(response.orders))
    .catch((err) => console.error("Error fetching:", err));
  });

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
