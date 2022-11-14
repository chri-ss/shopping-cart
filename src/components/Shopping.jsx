import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

const Shopping = ({
  currentSet,
  currentPage,
  setCurrentSet,
  setPage,
  loadCards,
}) => {
  const { set, page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentSet(set);
    setPage(1);
    navigate(`/shopping/${set}/${page}`);
  }, []);

  useEffect(() => {
    navigate(`/shopping/${currentSet}/${currentPage}`);
    console.log(set, page);
  }, [currentSet, currentPage]);

  return (
    <div className="route">
      <section className="shopping">
        <Outlet />
      </section>
    </div>
  );
};

export default Shopping;
