import "./searchUsernamePage.css";
import edit from "../../assets/edit.svg";
import { useEffect, useState } from "react";
import Slogo from "../../components/Slogo/Slogo";
import messages from "../../assets/messages.svg";
import Button from "../../components/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { getAllMessages } from "../../API/GetApi/GetApi";

function SearchUsernamePage() {
  const location = useLocation();
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

  const editMessage = location.state && location.state.clickedMsg;

  useEffect(() => {
    if (editMessage) {
      const { username, message } = editMessage;
      setUsername(username);
      setPost(message);
    }
  }, [editMessage, location.state]);

  return (
    <section className="searchUsernamePage__section">
      <Slogo />
      <Link className="searchUsernamePage__link-btn" to="/">
        <img className="searchUsernamePage__message-icon" src={messages} alt="All messages icon" />
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
            <section className="searchUsernamePage__wrapper">
              <section className="searchUsernamePage__wrapper__for-line-and-username">
                <hr className="searchUsernamePage__line-before--username" />
                <p className="searchUsernamePage__username">{msg.username}</p>
              </section>
              <Link to="/write" state={{ clickedMsg: msg }}>
                <img className="msg__edit-btn" src={edit} alt="pen for editing message" />
              </Link>
            </section>
          </article>
        ))}
    </section>
  );
}

export default SearchUsernamePage;
