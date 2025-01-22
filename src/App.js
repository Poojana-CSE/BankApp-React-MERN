
import React, { useState } from "react";
import './App.css';

const App = () => {
  const [transaction, setTransaction] = useState("");
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userid, setUserId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  function bank(e) {
    e.preventDefault();
    if (!transaction) {
      alert("Select Transaction");
      return;
    }

    if (!selectedUserId) {
      alert("Select a user for the transaction");
      return;
    }

    const updatedAccounts = accounts.map((account) => {
      if (account.userid === selectedUserId) {
        if (transaction === "Deposit") {
          return { ...account, amount: account.amount + Number(value) };
        } else if (transaction === "Withdraw") {
          if (account.amount < Number(value)) {
            alert("Insufficient Balance");
            return account;
          }
          return { ...account, amount: account.amount - Number(value) };
        }
      }
      return account;
    });

    setAccounts(updatedAccounts);
    setValue("");
  }

  function createAccount(e) {
    e.preventDefault();
    if (!username || !usermail || !userid) {
      alert("Please fill all account details");
      return;
    }
    const newAccount = { username, usermail, userid, amount: 0 };
    setAccounts([...accounts, newAccount]);
    alert(`Account Created for ${username}`);
    setUsername("");
    setUsermail("");
    setUserId("");
  }

  function deleteAccount(index) {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
    if (selectedUserId === accounts[index]?.userid) {
      setSelectedUserId("");
    }
    alert("Account Deleted Successfully");
  }

  return (
    <div>
      <h2>Bank Application</h2>
      <form onSubmit={createAccount}>
        <h3>Create Account</h3>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
        <br />
        <label>User Mail:</label>
        <input
          type="email"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          placeholder="Enter User Mail"
        />
        <br />
        <label>User ID:</label>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <br />
        <button type="submit">Create Account</button>
      </form>

      {accounts.length > 0 && (
        <div>
          <h3>Account Details</h3>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>
                <div>
                  <p>Name: {account.username}</p>
                  <p>Email: {account.usermail}</p>
                  <p>ID: {account.userid}</p>
                  <p>Balance: Rs.{account.amount}</p>
                  <button onClick={() => deleteAccount(index)}>Delete Account</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {accounts.length > 0 && (
        <div>
          <h3>Make a Transaction</h3>
          <form onSubmit={bank}>
            <label>Select User ID:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select</option>
              {accounts.map((account) => (
                <option key={account.userid} value={account.userid}>
                  {account.userid}
                </option>
              ))}
            </select>
            <br />
            <label>Choose Your Transaction:</label>
            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <br />
            <h3>Enter The Amount</h3>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
