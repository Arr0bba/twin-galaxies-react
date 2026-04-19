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

const importMessages = async (messagesArray) => {
  const results = [];
  for (const msg of messagesArray) {
    const result = await push(dbRef, {
      nick: msg.nick || "",
      content: msg.content || "",
      category: msg.category || ""
    });
    results.push(result);
  }
  return results;
};

const formatMessagesForExport = (messages) => {
  const cleanMessages = messages.map(({ nick, content, category }) => ({
    nick,
    content,
    category
  }));

  const jsonData = { messages: cleanMessages };

  let xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<messages>\n`;
  for (const msg of cleanMessages) {
    xmlData += `  <message>\n`;
    xmlData += `    <nick>${escapeXml(msg.nick)}</nick>\n`;
    xmlData += `    <content>${escapeXml(msg.content)}</content>\n`;
    xmlData += `    <category>${escapeXml(msg.category)}</category>\n`;
    xmlData += `  </message>\n`;
  }
  xmlData += `</messages>`;

  let csvData = "nick,content,category\n";
  for (const msg of cleanMessages) {
    csvData += `${escapeCsv(msg.nick)},${escapeCsv(msg.content)},${escapeCsv(msg.category)}\n`;
  }

  return { jsonData, xmlData, csvData };
};

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeCsv(str) {
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default {
  getAllMessages,
  addMessage,
  removeMessage,
  updateMessage,
  importMessages,
  formatMessagesForExport
};