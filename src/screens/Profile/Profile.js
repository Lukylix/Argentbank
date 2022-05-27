import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAlert } from "../../utils/alert";
import useApi from "../../hooks/useApi";
import { updateUserProfile, getAccounts } from "../../utils/api";

import AccountLine from "../../components/AccountLine";
import Spinner from "../../components/Spinner";

import "./Profile.css";

export default function UserProfile() {
  const [displayForm, setDisplayForm] = useState(false);
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const accounts = useSelector((state) => state.accounts);

  const [updateUserProfileRequest, updateProfileLoading] = useApi(updateUserProfile);
  const [getAccountsRequest, accountsLoading] = useApi(getAccounts);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    for (const element of event.target.elements) {
      if (element.nodeName === "INPUT") {
        formData[element.id] = element.value;
      }
    }
    let { firstName: formFirstName, lastName: formLastName } = formData;
    if (!formFirstName && !formLastName) return dispatch(setAlert("Please fill at least one field.", "warning"));
    const { error } = await updateUserProfileRequest(token, formFirstName || firstName, formLastName || lastName);
    if (error) return;
    setDisplayForm(false);
  };

  useEffect(() => {
    if (!token) return;
    getAccountsRequest(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main className="main bg-dark">
      <div className="header">
        {firstName && lastName && !updateProfileLoading ? (
          <>
            <h1>
              Welcome back
              {!displayForm && (
                <>
                  <br />
                  <span>
                    {firstName} {lastName}!
                  </span>
                </>
              )}
            </h1>
            {displayForm ? (
              <form onSubmit={handleSubmit}>
                <div className="form-line">
                  <input type="text" id="firstName" placeholder={firstName} />
                  <input type="text" id="lastName" placeholder={lastName} />
                </div>
                <div className="form-line">
                  <button>Save</button>
                  <button type="button" className="cancel" onClick={() => setDisplayForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button onClick={() => setDisplayForm(true)} className="edit-button">
                Edit Name
              </button>
            )}
          </>
        ) : (
          !accountsLoading && <Spinner />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accountsLoading ? (
        <Spinner />
      ) : (
        <>
          {accounts.map((account) => (
            <AccountLine
              key={account.id}
              id={account.id}
              type={account.type}
              transactions={account.transactions}
              amount={account.amount}
            />
          ))}
        </>
      )}
    </main>
  );
}
