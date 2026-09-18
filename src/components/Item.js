export default function Item({ item, onDeleteItem, onToggleItem }) {
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
