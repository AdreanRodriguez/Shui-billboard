import "./messages.css";
import { Link } from "react-router-dom";
import edit from "../../assets/edit.svg";
import date from "../../assets/date.svg";
import arrow from "../../assets/arrow.svg";
import wave1 from "../../assets/wave1.svg";
import wave2 from "../../assets/wave2.svg";
import wave3 from "../../assets/wave3.svg";
import { useEffect, useState } from "react";
import { getAllMessages } from "../../API/GetApi/GetApi";

const Messages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

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

  const handleSortDates = () => {
    const newSortOrder = sortOrder === "newest" ? "oldest" : "newest";
    setSortOrder(newSortOrder);

    const sortedMessages = [...allMessages].sort((a, b) => {
      if (newSortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setAllMessages(sortedMessages);
  };

  const formattedDate = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  };

  return (
    <section>
      <figure className="msg__sort-wrapper">
        <img className="msg__sort-icon" src={date} alt="Date icon" onClick={handleSortDates} />
      </figure>
      {allMessages.length > 0 ? (
        allMessages.map((msg, index) => {
          return (
            <article key={index} className="msg__article">
              <p className="msg__createdAt">
                {msg.updatedAt ? (
                  <span>
                    (ändrad) {new Date(msg.updatedAt).toLocaleString("sv-SE", formattedDate)}
                  </span>
                ) : (
                  new Date(msg.createdAt).toLocaleString("sv-SE", formattedDate)
                )}
              </p>
              <p className="msg__post">{msg.message}</p>
              <section className="msg__username-and-edit-section">
                <section className="msg__username-section">
                  <hr className="msg__line-before--username" />
                  <p className="msg__username">{msg.username}</p>
                </section>
                <Link to="/write" state={{ clickedMsg: msg }}>
                  <img className="msg__edit-btn" src={edit} alt="pen for editing message" />
                </Link>
              </section>
              <img className="msg__arrow" src={arrow} alt="talk arrow" />
            </article>
          );
        })
      ) : (
        <section className="msg__error-section">
          <p className="msg__errorMsg">Inga meddelanden att visa</p>
          <section className="msg__wave-wrapper">
            <img className="msg__error-wave1" src={wave1} alt="Blue wave" />
            <img className="msg__error-wave2" src={wave2} alt="Blue wave" />
            <img src={wave3} alt="Blue wave" />
          </section>
        </section>
      )}
    </section>
  );
};

export default Messages;
