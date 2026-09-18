export default function Stats({ items }) {
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
