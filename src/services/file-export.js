import { showSaveFilePicker } from "show-open-file-picker";

export const saveFileInFormat = async (format, data, fileName = "data.json") => {

  let description = "";
  let acceptedType = {};
  let content;

  switch (format) {
    case "json":
      description = "JSON";
      acceptedType = {
        "application/json": [".json"],
      };
      content = JSON.stringify(data, null, 2);
      break;
    case "xml":
      description = "XML";
      acceptedType = {
        "application/xml": [".xml"],
        "text/xml": [".xml"],
      };
      content = data;
      break;
    case "csv":
      description = "CSV";
      acceptedType = {
        "text/csv": [".csv"],
      };
      content = data;
      break;
    case "ods":
      description = "ODS";
      acceptedType = {
        "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
      };
      content = data;
      break;
    case "txt":
      description = "Text";
      acceptedType = {
        "text/plain": [".txt"],
      };
      content = data;
      break;
    case "md":
      description = "Markdown";
      acceptedType = {
        "text/markdown": [".md"],
      };
      content = data;
      break;
    case "pdf":
      description = "PDF";
      acceptedType = {
        "application/pdf": [".pdf"],
      };
      content = data;
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  const handle = await showSaveFilePicker({
    suggestedName: fileName,
    types: [
      {
        description: description,
        accept: acceptedType
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
};