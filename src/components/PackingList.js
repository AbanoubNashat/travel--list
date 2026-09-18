import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClickClear }) {
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
