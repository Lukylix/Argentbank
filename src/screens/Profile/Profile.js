import AccountLine from "../../components/AccountLine";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { setAlert } from "../../utils/alert";

import useApi from "../../hooks/useApi";
import { updateUserProfile } from "../../utils/api";

import "./Profile.css";

export default function UserProfile() {
  const { firstName, lastName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);
  const [updateUserProfileRequest] = useApi(updateUserProfile);

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
      <AccountLine title="Checking (x8349)" amount={2082.79} description="Available Balance" />
      <AccountLine title="Savings (x6712)" amount={10928.42} description="Available Balance" />
      <AccountLine title="Credit Card (x8349)" amount={184.3} description="Current Balance" />
    </main>
  );
}
