import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

const Shopping = ({ currentSet, currentPage }) => {
  const { set, page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/shopping/${currentSet}/${currentPage}`);
    console.log(set, page);
  }, [currentSet]);

  return (
    <div className="route">
      <section className="shopping">
        <Outlet />
      </section>
    </div>
  );
};

export default Shopping;
