import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkUpdateBudget } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./UpdateBudget.css";

export default function UpdateBudget() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const [budget, setBudget] = useState(user.budget);
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("budget", Math.round(budget));

    let response = await dispatch(thunkUpdateBudget(formData));
    if (response) {
      setErrorMessage(response);
    } else {
      setErrorMessage({});
      closeModal();
      return history.push(`/current`);
    }
  };
  return (
    <div id="updateBudgetModal">
      <form className="updateBudgetForm" onSubmit={handleSubmit}>
        <h2>Update Budget</h2>
        <div className="budgetErrorContainer">
          {errorMessage?.budget && (
            <div className="errors">{errorMessage.budget}</div>
          )}
        </div>
        <label>
          <div className="budgetInputLabel">Budget*: ${"  "}</div>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          ></input>
        </label>
        <div>* - required field</div>
        <div className="buttonContainer">
          <button>Update Budget</button>
        </div>
      </form>
    </div>
  );
}
