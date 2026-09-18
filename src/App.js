import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    // we used a callback because the state depends on the previous value of the state and used spread operator here as React prevent mutability
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    console.log(id);

    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItem={handleAddItem}></Form>
      <PackingList items={items} onDeleteItem={handleDeleteItem}></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What Do You Want For Your Trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* If we didn't make a new function here with the onlcick event we will pass the event object only by default. */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list , you packed X (X%)</em>
    </footer>
  );
}
