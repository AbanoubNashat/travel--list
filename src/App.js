import React, { useState } from "react";

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

function PackingList({ items, onDeleteItem, onToggleItem, onClickClear }) {
  const [sortBy, setSortBy] = useState("input");

  // sorted list container
  let sortedList;
  if (sortBy === "input") {
    sortedList = items;
  }

  if (sortBy === "description") {
    // .slice() makes a copy of the list and make our operations on that copy as we can mutate the items as it's a state.
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedList = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
        <button onClick={onClickClear}>Clear Items</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* If we didn't make a new function here with the onlcick event we will pass the event object only by default. */}
      <input type="checkbox" onClick={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* If we didn't make a new function here with the onlcick event we will pass the event object only by default. */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        {" "}
        <em>Start Adding Items To Your List</em>
      </footer>
    );
  }

  const numItems = items.length;
  const packedNum = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedNum / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You Got Everything Ready To Go"
          : `You have ${numItems} items on your list , you packed ${packedNum} (
        ${percentage}%)`}
      </em>
    </footer>
  );
}
