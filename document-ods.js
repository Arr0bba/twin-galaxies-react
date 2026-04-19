import * as XLSX from 'xlsx';
import * as fs from 'fs';

const cleanMessages = [
    {
      "nick": "SpeedRunner42",
      "content": "Just beat the Pac-Man world record! 3,333,360 points!",
      "category": "Contests"
    },
    {
      "nick": "RetroGamer",
      "content": "Has anyone tried the new Donkey Kong remaster?",
      "category": "New Game Releases"
    },
    {
      "nick": "ArcadeFan",
      "content": "Billy Mitchell is back with a new Centipede score",
      "category": "Relevant Players"
    }
  ];

const worksheet = XLSX.utils.json_to_sheet(cleanMessages);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");

const odsData = XLSX.write(workbook, { bookType: 'ods', type: 'buffer' });
fs.writeFileSync('/home/ari/duplicate-twin-galaxies-react/public/datos.ods', odsData);
console.log('Successfully created datos.ods');
