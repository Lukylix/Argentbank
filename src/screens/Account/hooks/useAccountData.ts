import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootSate } from "../../../utils/redux/store";

export default function useAccountData() {
  const { accountId } = useParams();

  const accounts = useSelector((state: RootSate) => state.accounts);
  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId]);
  const { transactions, page, totalPage } = useSelector((state: RootSate) => state.transactions);

  return { account, transactions, page, totalPage };
}
