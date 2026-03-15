import { useState, useEffect, useRef } from "react";
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import MessageService from "../../services/message.service";
import "./MessageList.css";

const CATEGORIES = ["Contests", "New Game Releases", "Relevant Players"];

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [keyUpdate, setKeyUpdate] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const refForm = useRef();

  const getAllMessages = () => {
    MessageService.getAllMessages()
      .then((items) => {
        let allMessages = [];
        items.forEach(item => {
          const key = item.key;
          const data = item.val();
          allMessages.push({
            key: key,
            nick: data.nick,
            content: data.content,
            category: data.category || ""
          });
        });
        setMessages([...allMessages]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const removeMessage = (key) => {
    MessageService.removeMessage(key).then(() => {
      getAllMessages();
    });
  }

  const beginUpdateMessage = (key) => {
    const entry = messages.find(e => e.key === key);
    refForm.current.elements["nick"].value = entry.nick;
    refForm.current.elements["content"].value = entry.content;
    refForm.current.elements["category"].value = entry.category;
    setKeyUpdate(key);
  }

  const addMessage = (e) => {
    e.preventDefault();
    const nick = e.target.nick.value;
    const content = e.target.content.value;
    const category = e.target.category.value;
    if (keyUpdate !== null) {
      MessageService.updateMessage(keyUpdate, nick, content, category).then(() => {
        refForm.current.reset();
        setMessages(oldValues => oldValues.map(ov => ov.key === keyUpdate ? { key: keyUpdate, nick, content, category } : ov));
        setKeyUpdate(null);
      });
    } else {
      MessageService.addMessage(nick, content, category).then((res) => {
        refForm.current.reset();
        setMessages(oldValues => [...oldValues, { key: res.key, nick, content, category }]);
      });
    }
  }

  const toggleFilter = (category) => {
    setActiveFilter(prev => prev === category ? null : category);
  }

  const filteredMessages = activeFilter
    ? messages.filter(m => m.category === activeFilter)
    : messages;

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <>
      <div className="message-list-main-container">
        <div className="message-form-container">
          <form id="message-form" onSubmit={addMessage} ref={refForm}>
            <input className="rounded-input" type="text" name="nick" placeholder="nick" />
            <input className="rounded-input" type="text" name="content" placeholder="content" />
            <select className="rounded-input category-select" name="category" defaultValue="">
              <option value="" disabled>Select category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input className="rounded-input" type="submit" value={(keyUpdate ? "Update" : "Add") + " Message"} />
          </form>
        </div>

        <div className="filter-container">
          <span className="filter-label">Filter:</span>
          <button
            className={`filter-tag ${activeFilter === null ? "filter-tag-active" : ""}`}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tag ${activeFilter === cat ? "filter-tag-active" : ""}`}
              onClick={() => toggleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="message-list">
          {filteredMessages.map(b =>
            <div className="message-item" key={b.key}>
              <div className="message-content">
                <p>[{b.nick}]: {b.content}</p>
                {b.category && <span className="message-category-tag">{b.category}</span>}
              </div>
              <div className="message-actions">
                <FaRegTrashAlt className="delete-message" onClick={() => removeMessage(b.key)} />
                <FaPencilAlt className="update-message" onClick={() => beginUpdateMessage(b.key)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MessageList;