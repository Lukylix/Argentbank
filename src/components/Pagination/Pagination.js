import { Link, useNavigate } from "react-router-dom";

import "./Pagination.css";

export default function Pagination({ page, totalPage, baseUrl }) {
  const navigate = useNavigate();
  return (
    <div className="pagination">
      {page > 1 && <i onClick={() => navigate(`${baseUrl}${page - 1}`)} className="fa fa-chevron-left"></i>}
      {page > 2 && <Link to={`${baseUrl}1`}>1</Link>}
      {page > 3 && <span>...</span>}
      {page > 1 && <Link to={`${baseUrl}${page - 1}`}>{page - 1}</Link>}
      <Link className="activePage" to={`${baseUrl}${page}`}>
        {page}
      </Link>
      {page < totalPage && <Link to={`${baseUrl}${page + 1}`}>{page + 1}</Link>}
      {page < totalPage - 2 && <span>...</span>}
      {page < totalPage - 1 && <Link to={`${baseUrl}${totalPage}`}>{totalPage}</Link>}
      {page < totalPage && <i onClick={() => navigate(`${baseUrl}${page + 1}`)} className="fa fa-chevron-right"></i>}
    </div>
  );
}
