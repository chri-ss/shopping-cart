const Pages = ({ cards, setPage }) => {
  return (
    <ul className="pages">
      {cards.data.map((chunk) => (
        <li
          className="page"
          onClick={() => setPage(cards.data.indexOf(chunk) + 1)}
        >
          {cards.data.indexOf(chunk) + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pages;
