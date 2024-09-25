import "./writePage.css";
import arrow from "../../assets/arrow.svg";
import { useEffect, useState } from "react";
import remove from "../../assets/remove.svg";
import Slogo from "../../components/Slogo/Slogo";
import messages from "../../assets/messages.svg";
import { Link, useLocation } from "react-router-dom";
import { getAllMessages } from "../../API/GetApi/GetApi";
import { deletePost } from "../../API/DeleteApi/DeleteApi";
import { createOrUpdatePost } from "../../API/PostApi/PostApi";

const WritePage = () => {
  const location = useLocation();
  const [post, setPost] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorUsername, setErrorUsername] = useState("");

  // Knapp som ska visas om man vill ta bort meddelande
  const editMessage = location.state && location.state.clickedMsg;

  useEffect(() => {
    if (editMessage) {
      const { username, message } = editMessage;
      setUsername(username);
      setPost(message);
    }
  }, [editMessage, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (post.length < 10) {
      return setErrorMsg("Meddelandet måste innehålla minst 10 tecken");
    }

    if (username.length < 3) {
      return setErrorUsername("Användarnamnet måste vara minst 3 tecken långt!");
    }

    if (post.length < 10 || username.length < 3) {
      return;
    }

    try {
      // Om det finns ett redigerbart meddelande, uppdatera istället för att skapa nytt
      if (editMessage) {
        await createOrUpdatePost(username, post, editMessage.postId);
      } else {
        await createOrUpdatePost(username, post);
      }

      // Tömma post & username efter man tryckt på knappen
      setPost("");
      setUsername("");
      setErrorMsg("");
      setErrorUsername("");
    } catch (error) {
      console.error(error.message);
      setErrorMsg(errorMsg);
    }
  };

  const handleDelete = async () => {
    try {
      const postId = location.state.clickedMsg.postId;

      await deletePost(postId);

      getAllMessages();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="writePage__wrapper" onSubmit={handleSubmit}>
      <Link to="/search">
        <Slogo />
      </Link>
      <Link className="writePage__link-btn" to="/">
        <img className="writePage__messages-icon" src={messages} alt="All messages icon" />
      </Link>
      <h2 className="writePage__err-msg--message">{errorMsg}</h2>;
      <form className="writePage__form">
        <textarea
          id="textarea-message"
          className="writePage__message-input"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <img className="writePage__arrow" src={arrow} alt="talk arrow" />
        <section className="writePage__section">
          {editMessage && (
            <Link className="writePage__delete-link" to="/" onClick={handleDelete}>
              <img
                className="writePage__delete-icon"
                src={remove}
                alt="Person throwing something in trashcan"
              />
              Ta bort meddelande
            </Link>
          )}
          <h2 className="writePage__err-msg--username">{errorUsername}</h2>;
          <input
            id="input-username"
            className="writePage__username-input"
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="writePage__btn" type="submit" value="Publicera" />
        </section>
      </form>
    </section>
  );
};

export default WritePage;
