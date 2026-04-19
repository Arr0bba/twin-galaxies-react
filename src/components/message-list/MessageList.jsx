import { useState, useEffect, useRef } from "react";
import { FaRegTrashAlt, FaPencilAlt, FaFileImport, FaFileExport } from 'react-icons/fa';
import MessageService from "../../services/message.service";
import { importFileToInternalJson } from "../../services/file-import";
import { saveFileInFormat } from "../../services/file-export";
import "./MessageList.css";

const CATEGORIES = ["Contests", "New Game Releases", "Relevant Players"];

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [keyUpdate, setKeyUpdate] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [importExportStatus, setImportExportStatus] = useState("");
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


  const handleImport = async () => {
    try {
      setImportExportStatus("Selecting file...");
      const result = await importFileToInternalJson();
      let messagesArray = [];

      if (result.format === "csv") {

        messagesArray = result.data;
      } else if (result.format === "ods") {

        messagesArray = result.data;
      } else if (result.format === "json") {

        messagesArray = result.data.messages || result.data;
      } else if (result.format === "xml") {

        const xmlData = result.data.messages || result.data;
        const rawMessages = xmlData.message || xmlData;
        messagesArray = Array.isArray(rawMessages) ? rawMessages : [rawMessages];
      } else if (["txt", "md", "pdf"].includes(result.format)) {
        messagesArray = result.data;
      }

      if (!Array.isArray(messagesArray) || messagesArray.length === 0) {
        setImportExportStatus("Error: no valid messages found in the file.");
        return;
      }

      setImportExportStatus(`Importing ${messagesArray.length} messages...`);
      await MessageService.importMessages(messagesArray);
      getAllMessages();
      setImportExportStatus(`✓ ${messagesArray.length} messages imported successfully!`);
      setTimeout(() => setImportExportStatus(""), 3000);
    } catch (err) {
      if (err?.name === "AbortError") {
        setImportExportStatus("");
        return;
      }
      setImportExportStatus(`Error: ${err.message}`);
    }
  };


  const handleExport = async (format) => {
    try {
      if (messages.length === 0) {
        setImportExportStatus("No messages to export.");
        setTimeout(() => setImportExportStatus(""), 3000);
        return;
      }

      const { jsonData, xmlData, csvData, txtData, mdData } = MessageService.formatMessagesForExport(messages);

      switch (format) {
        case "json":
          await saveFileInFormat("json", jsonData, "datos.json");
          break;
        case "xml":
          await saveFileInFormat("xml", xmlData, "datos.xml");
          break;
        case "csv":
          await saveFileInFormat("csv", csvData, "datos.csv");
          break;
        case "txt":
          await saveFileInFormat("txt", txtData, "datos.txt");
          break;
        case "md":
          await saveFileInFormat("md", mdData, "datos.md");
          break;
        case "pdf": {
          const { jsPDF } = await import("jspdf");
          const doc = new jsPDF();
          doc.text(txtData, 10, 10);
          const pdfData = doc.output("blob");
          await saveFileInFormat("pdf", pdfData, "datos.pdf");
          break;
        }
        case "ods": {
          const XLSX = await import("xlsx");
          const cleanMessages = messages.map(({ nick, content, category }) => ({ nick, content, category }));
          const worksheet = XLSX.utils.json_to_sheet(cleanMessages);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");
          const odsData = XLSX.write(workbook, { bookType: "ods", type: "array" });
          await saveFileInFormat("ods", odsData, "datos.ods");
          break;
        }
      }

      setImportExportStatus(`✓ Exported as ${format.toUpperCase()} successfully!`);
      setTimeout(() => setImportExportStatus(""), 3000);
    } catch (err) {
      if (err?.name === "AbortError") {
        setImportExportStatus("");
        return;
      }
      setImportExportStatus(`Error: ${err.message}`);
    }
  };

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

        {/* Import / Export controls */}
        <div className="import-export-container">
          <div className="import-section">
            <button className="import-export-btn import-btn" onClick={handleImport}>
              <FaFileImport /> Import File
            </button>
          </div>
          <div className="export-section">
            <span className="export-label">Export:</span>
            <button className="import-export-btn export-btn" onClick={() => handleExport("json")}>
              <FaFileExport /> JSON
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("xml")}>
              <FaFileExport /> XML
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("csv")}>
              <FaFileExport /> CSV
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("ods")}>
              <FaFileExport /> ODS
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("txt")}>
              <FaFileExport /> TXT
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("md")}>
              <FaFileExport /> MD
            </button>
            <button className="import-export-btn export-btn" onClick={() => handleExport("pdf")}>
              <FaFileExport /> PDF
            </button>
          </div>
          {importExportStatus && (
            <p className={`import-export-status ${importExportStatus.startsWith("Error") ? "status-error" : "status-success"}`}>
              {importExportStatus}
            </p>
          )}
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