import { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAlert } from "../../utils/alert";
import useApi from "../../hooks/useApi";
import { updateUserProfile, getAccounts } from "../../utils/api";

import { RootSate } from "../../utils/redux/store";

export default function useProfileForm(setDisplayForm: (state: boolean) => void) {
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector((state: RootSate) => state.user);
  const token = useSelector((state: RootSate) => state.token);

  const [updateUserProfileRequest, updateProfileLoading] = useApi(updateUserProfile);
  const [getAccountsRequest, accountsLoading] = useApi(getAccounts);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());
    const { firstName: formFirstName, lastName: formLastName } = formData;
    (async () => {
      if (!formFirstName && !formLastName)
        return dispatch(setAlert("Please fill at least one field.", "warning") as any);
      const { error } = await updateUserProfileRequest(token, formFirstName || firstName, formLastName || lastName);
      if (error) return;
      setDisplayForm(false);
    })();
  };

  useEffect(() => {
    (() => {
      if (!token || !getAccountsRequest) return;
      getAccountsRequest(token);
    })();
  }, [token, getAccountsRequest]);

  return { updateProfileLoading, handleSubmit, accountsLoading };
}
