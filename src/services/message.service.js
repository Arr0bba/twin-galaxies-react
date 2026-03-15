import db from "../firebase";
import { ref, get, remove, push, update } from "firebase/database";

const dbRef = ref(db, "/messages");

const getAllMessages = () => {
  return get(dbRef);
};

const addMessage = (nick, content, category) => {
  return push(dbRef, {
    nick: nick,
    content: content,
    category: category
  });
};

const removeMessage = (key) => {
  const dbRefMessage = ref(db, `/messages/${key}`);
  return remove(dbRefMessage);
};

const updateMessage = (key, nick, content, category) => {
  const dbRefMessage = ref(db, `/messages/${key}`);
  return update(dbRefMessage, {
    nick: nick,
    content: content,
    category: category
  });
}

export default {
  getAllMessages,
  addMessage,
  removeMessage,
  updateMessage
};