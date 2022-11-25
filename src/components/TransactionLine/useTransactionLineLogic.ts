import { ChangeEvent, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useApi from "../../hooks/useApi";
import { updateTransaction } from "../../utils/api";

import { RootSate } from "../../utils/redux/store";

interface useTransactionLineLogicParams {
  setShowSelect: (state: boolean) => void;
  setShowTextarea: (state: boolean) => void;
  transactionId: string;
}

export default function useTransactionLineLogic({
  setShowSelect,
  setShowTextarea,
  transactionId,
}: useTransactionLineLogicParams) {
  const { handleSelect, updateCategoryLoading } = useSelectLogic(setShowSelect, transactionId);
  const { handleNoteForm, updateNoteLoading } = useNoteLogic(setShowTextarea, transactionId);

  return { handleSelect, handleNoteForm, updateCategoryLoading, updateNoteLoading };
}

function useSelectLogic(setShowSelect: (state: boolean) => void, transactionId: string) {
  const { accountId } = useParams();
  const token = useSelector((state: RootSate) => state.token);
  const [updateTransactionRequest, updateCategoryLoading] = useApi(updateTransaction);

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setShowSelect(false);
      const categoryId = e.target.value;
      updateTransactionRequest(token, accountId, transactionId, { categoryId });
    },
    [accountId, setShowSelect, token, transactionId, updateTransactionRequest]
  );
  return { handleSelect, updateCategoryLoading };
}

function useNoteLogic(setShowTextarea: (state: boolean) => void, transactionId: string) {
  const [updateTransactionRequest, updateNoteLoading] = useApi(updateTransaction);
  const { accountId } = useParams();
  const token = useSelector((state: RootSate) => state.token);

  const handleNoteForm = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setShowTextarea(false);
      const formData = Object.fromEntries(new FormData(e.target).entries());
      const note = formData.note.toString();
      updateTransactionRequest(token, accountId, transactionId, { note });
    },
    [accountId, setShowTextarea, token, transactionId, updateTransactionRequest]
  );
  return { handleNoteForm, updateNoteLoading };
}
