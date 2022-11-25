import { useState } from "react";
import { useSelector } from "react-redux";

import { AccountLine, Spinner } from "../../components";

import "./Profile.css";

import { RootSate } from "../../utils/redux/store";
import useProfileLogic from "./useProfileLogic";

export default function UserProfile() {
  const [displayForm, setDisplayForm] = useState(false);
  const { accountsLoading, updateProfileLoading, handleSubmit } = useProfileLogic(setDisplayForm);

  const { firstName, lastName } = useSelector((state: RootSate) => state.user);
  const accounts = useSelector((state: RootSate) => state.accounts);

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
                  <input type="text" id="firstName" name="firstName" placeholder={firstName} />
                  <input type="text" id="lastName" name="lastName" placeholder={lastName} />
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
