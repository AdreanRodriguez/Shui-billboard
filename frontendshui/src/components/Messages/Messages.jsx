import "./messages.css";
import axios from "axios";
import arrow from "../../assets/arrow.svg";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAllMessages } from "../../API/GetApi/GetApi";

const Messages = () => {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await getAllMessages();
        setAllMessages(messages);
      } catch (error) {
        console.error(error.message);
      }
    };
    getMessages();
  }, []);

  return (
    <section className="msg__section">
      {allMessages.length > 0 ? (
        allMessages.map((msg, index) => (
          <article key={index} className="msg__article">
            <p className="msg__createdAt">{msg.createdAt}</p>
            <p className="msg__post">{msg.message}</p>
            <section className="msg__username-and-btn-section">
              <section className="msg__username-section">
                <hr className="msg__line-before--username" />
                <p className="msg__username">{msg.username}</p>
              </section>
              <Link to="/write" state={{ clickedMsg: msg }}>
                <button className="msg__change-message">Ändra meddelande</button>
              </Link>
            </section>
            <img className="msg__arrow" src={arrow} alt="talk arrow" />
          </article>
        ))
      ) : (
        <p className="msg__errorMsg">Inga meddelanden att visa</p>
      )}
    </section>
  );
};

export default Messages;
