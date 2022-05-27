import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useApi from "../../hooks/useApi";
import { updateTransaction } from "../../utils/api";
import formatAmount from "../../utils/formatAmount";

import Spinner from "../Spinner";

import "./TransactionLine.css";

const formatDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  return `${monthNames[monthIndex]} ${day}th, ${year}`;
};

export default function TransactionLine({ date, id, description, amount, balance, type, category, note, categories }) {
  const { accountId } = useParams();
  const token = useSelector((state) => state.token);
  const [showSelect, setShowSelect] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [updateTransactionRequest, updateTransactionLoading] = useApi(updateTransaction);
  const refTextarea = useRef();
  const categoriesSorted = [...categories].sort((a, b) => (a.id === category.id ? -1 : 0));

  const handleSelect = (e) => {
    setShowSelect(false);
    const categoryId = e.target.value;
    updateTransactionRequest(token, accountId, id, { categoryId });
  };

  const handleTextarea = (e) => {
    e.preventDefault();
    setShowTextarea(false);
    const note = refTextarea.current.value;
    updateTransactionRequest(token, accountId, id, { note });
  };

  return (
    <details className="transaction">
      <summary>
        <i className="fa fa-chevron-down" />
        <span>{formatDate(date)}</span>
        <span>{description}</span>
        <span style={{ color: amount > 0 ? "#5BA095" : "inherit" }}>{`${amount > 0 ? "+" : "-"}$${formatAmount(
          Math.abs(amount)
        )}`}</span>
        <span>{`${balance > 0 ? "+" : "-"}$${formatAmount(Math.abs(balance))}`}</span>
      </summary>
      <div className="transaction-detail">
        <p>Transaction Type: {type}</p>
        {updateTransactionLoading ? (
          <Spinner />
        ) : (
          <>
            {showSelect ? (
              <p>
                Category:{" "}
                <select onChange={handleSelect} onBlur={() => setShowSelect(false)}>
                  {categoriesSorted.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </p>
            ) : (
              <p>
                Category: {category.name} <i onClick={() => setShowSelect(true)} className="fa fa-pencil" />
              </p>
            )}
            {showTextarea ? (
              <form onSubmit={handleTextarea} className="formNote">
                <label className="labelNote">Note: </label>
                <textarea ref={refTextarea} rows={5} placeholder={note} />
                <div className="buttonContainer">
                  <button>Save</button>
                  <button type="button" className="cancel" onClick={() => setShowTextarea(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p>
                Note: {note} <i onClick={() => setShowTextarea(true)} className="fa fa-pencil" />
              </p>
            )}
          </>
        )}
      </div>
    </details>
  );
}
