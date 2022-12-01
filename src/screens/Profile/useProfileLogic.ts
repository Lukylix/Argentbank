import { ChangeEvent, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addAlert } from "../../utils/redux/alertSlice";
import useApi from "../../hooks/useApi";
import { updateUserProfile, getAccounts } from "../../utils/api";

import { RootSate } from "../../utils/redux/store";

export default function useProfileLogic(setDisplayForm: (state: boolean) => void) {
  const accountsLoading = useLoadAccounts();
  const { updateProfileLoading, handleSubmit } = useProfileForm(setDisplayForm);

  return { updateProfileLoading, accountsLoading, handleSubmit };
}

function useLoadAccounts() {
  const [getAccountsRequest, accountsLoading] = useApi(getAccounts);
  const token = useSelector((state: RootSate) => state.token);

  useEffect(() => {
    (() => {
      if (!token || !getAccountsRequest) return;
      getAccountsRequest(token);
    })();
  }, [token, getAccountsRequest]);

  return accountsLoading;
}

function useProfileForm(setDisplayForm: (state: boolean) => void) {
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector((state: RootSate) => state.user);
  const token = useSelector((state: RootSate) => state.token);

  const [updateUserProfileRequest, updateProfileLoading] = useApi(updateUserProfile);

  const handleSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(event.target).entries());
      const { firstName: formFirstName, lastName: formLastName } = formData;

      (async () => {
        if (!formFirstName && !formLastName)
          return dispatch(addAlert({ message: "Please fill at least one field.", type: "warning" }));
        const { error } = await updateUserProfileRequest(token, formFirstName || firstName, formLastName || lastName);
        if (error) return;
        setDisplayForm(false);
      })();
    },
    [firstName, lastName, setDisplayForm, token, updateUserProfileRequest, dispatch]
  );
  return { handleSubmit, updateProfileLoading };
}
