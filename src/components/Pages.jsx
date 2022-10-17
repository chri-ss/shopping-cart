const Pages = ({ cards, setPage }) => {
  return (
    <ul className="pages">
      {cards.map((chunk) => (
        <li className="page" onClick={() => setPage(cards.indexOf(chunk) + 1)}>
          {cards.indexOf(chunk) + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pages;
