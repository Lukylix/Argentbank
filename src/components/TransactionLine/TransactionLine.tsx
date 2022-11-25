import { useState, useMemo } from "react";

import { useSelector } from "react-redux";

import { RootSate } from "../../utils/redux/store";

import addCommaEvery3Digits from "../../utils/formatAmount";

import Spinner from "../Spinner";

import "./TransactionLine.css";
import useTransactionLineLogic from "./useTransactionLineLogic";

const formatDate = (date: string) => {
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

export default function TransactionLine({
  date,
  id,
  description,
  amount,
  balance,
  type,
  category,
  note,
}: ITransactionLineProps) {
  const [showSelect, setShowSelect] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);

  const { handleSelect, handleNoteForm, updateCategoryLoading, updateNoteLoading } = useTransactionLineLogic({
    setShowSelect,
    setShowTextarea,
    transactionId: id,
  });

  const categories = useSelector((state: RootSate) => state.categories);
  const categoriesSorted = useMemo(
    () => [...categories].sort((a) => (a.id === category.id ? -1 : 0)),
    [categories, category]
  );

  return (
    <details className="transaction">
      <summary>
        <i className="fa fa-chevron-down" />
        <span>{formatDate(date)}</span>
        <span>{description}</span>
        <span style={{ color: amount > 0 ? "#5BA095" : "inherit" }}>{`${amount > 0 ? "+" : "-"}$${addCommaEvery3Digits(
          Math.abs(amount)
        )}`}</span>
        <span>{`${balance > 0 ? "+" : "-"}$${addCommaEvery3Digits(Math.abs(balance))}`}</span>
      </summary>
      <div className="transaction-detail">
        <p>Transaction Type: {type}</p>
        {updateCategoryLoading ? (
          <Spinner />
        ) : showSelect ? (
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
        {updateNoteLoading ? (
          <Spinner />
        ) : showTextarea ? (
          <form onSubmit={handleNoteForm} className="formNote">
            <label className="labelNote">Note: </label>
            <textarea id="note" name="note" rows={5} placeholder={note} />
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
      </div>
    </details>
  );
}
