import db from "../firebase";
import { ref, push, serverTimestamp } from "firebase/database";

const dbRef = ref(db, "/subscribers");

const addSubscriber = (email) => {
  return push(dbRef, {
    email: email,
    timestamp: serverTimestamp()
  });
};

export default {
  addSubscriber
};
