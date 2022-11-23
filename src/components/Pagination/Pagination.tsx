import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Pagination.css";

export default function Pagination({ page, totalPage }: IPaginationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location]);

  const getPageUrl = (page: number) => {
    searchParams.set("page", `${page}`);
    return `${location.pathname}?${searchParams.toString()}`;
  };

  return (
    <div className="pagination">
      {page > 1 && <i onClick={() => navigate(getPageUrl(page - 1))} className="fa fa-chevron-left"></i>}
      {page > 2 && <Link to={getPageUrl(1)}>1</Link>}
      {page > 3 && <span>...</span>}
      {page > 1 && <Link to={getPageUrl(page - 1)}>{page - 1}</Link>}
      <Link className="activePage" to={getPageUrl(page)}>
        {page}
      </Link>
      {page < totalPage && <Link to={getPageUrl(page + 1)}>{page + 1}</Link>}
      {page < totalPage - 2 && <span>...</span>}
      {page < totalPage - 1 && <Link to={getPageUrl(totalPage)}>{totalPage}</Link>}
      {page < totalPage && <i onClick={() => navigate(getPageUrl(page + 1))} className="fa fa-chevron-right"></i>}
    </div>
  );
}
