import AccountLine from "../../components/AccountLine";
import { useSelector, useDispatch } from "react-redux";
import { setUserNames } from "../../utils/redux/userSlice";
import { setAccounts } from "../../utils/redux/accountsSlice";
import { useEffect, useState } from "react";
import { setAlert } from "../../utils/alert";
import api from "../../utils/api";
import "./Profile.css";

export default function UserProfile() {
  const { firstName, lastName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);

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
    if (!formFirstName) formFirstName = firstName;
    if (!formLastName) formLastName = lastName;
    const { data, error } = await api.updateUserProfile(formFirstName, formLastName, token);
    if (error?.status === 400) return dispatch(setAlert("Invalid token.", "warning"));
    if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
    if (error) return dispatch(setAlert("Something went wrong.", "warning"));
    if (data?.body) dispatch(setUserNames({ firstName: data.body.firstName, lastName: data.body.lastName }));
    setDisplayForm(false);
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      const { data, error } = await api.getAccounts(token);
      if (error?.status === 400) return dispatch(setAlert("Invalid token.", "warning"));
      if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
      if (error) return dispatch(setAlert("Something went wrong.", "warning"));
      if (data?.body) dispatch(setAccounts(data.body));
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main className="main bg-dark">
      <div className="header">
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
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <AccountLine key={account.id} type={account.type} transactions={account.transactions} amount={account.amount} />
      ))}
    </main>
  );
}
