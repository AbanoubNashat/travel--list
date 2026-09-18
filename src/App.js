import React, { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    // we used a callback because the state depends on the previous value of the state and used spread operator here as React prevent mutability
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  function handleClearAll() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?",
    );
    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItem={handleAddItem}></Form>
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClickClear={handleClearAll}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}
