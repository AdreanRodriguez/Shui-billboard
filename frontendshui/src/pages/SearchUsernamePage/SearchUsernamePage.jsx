import { useState } from "react";
import "./searchUsernamePage.css";
import Slogo from "../../components/Slogo/Slogo";
import Button from "../../components/Button/Button";
import { getAllMessages } from "../../API/GetApi/GetApi";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow.svg";

function SearchUsernamePage() {
  const [username, setUsername] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [searchedUsername, setSearchedUsername] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const allMessages = await getAllMessages();

    const foundMessages = allMessages.filter((msg) =>
      msg.username.toLowerCase().includes(username.toLowerCase())
    );

    setSearchedUsername(username);
    setUserMessages(foundMessages);
  };

  return (
    <section className="searchUsernamePage__section">
      <Slogo />
      <Link className="searchUsernamePage__link-btn" to="/">
        <Button title="Alla meddelanden" />
      </Link>
      <form onSubmit={handleSearch}>
        <section className="searchUsernamePage__input-btn--wrapper">
          <input
            className="searchUsernamePage__input-field"
            type="text"
            value={username}
            placeholder="Sök användare"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button title="Sök" onClick={handleSearch} />
        </section>
        {searchedUsername && (
          <h3 className="searchUsernamePage__searched-for">
            Sökresultat för:
            <span className="searchUsernamePage__searched-username">{searchedUsername}</span>
          </h3>
        )}
      </form>
      {userMessages.length > 0 &&
        userMessages.map((msg, index) => (
          <article className="searchUsernamePage__article" key={index}>
            <p className="searchUsernamePage__createdAt">{msg.createdAt}</p>
            <p className="searchUsernamePage__message">{msg.message}</p>
            <section className="searchUsernamePage__wrapper-for-line-and-username">
              <hr className="searchUsernamePage__line-before--username" />
              <p className="searchUsernamePage__username">{msg.username}</p>
            </section>
          </article>
        ))}
    </section>
  );
}

export default SearchUsernamePage;
