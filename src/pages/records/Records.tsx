import { useRef, useState } from "react";
import type { RecordData } from "../../types/RecordData";

export default function Records() {
  const [records, setRecords] = useState<RecordData[]>(() => {
    const records = JSON.parse(localStorage.getItem("twinGalaxiesRecords")!) || [];
    if (records.length === 0) {
      records.push(
        {
          playerName: 'Billy Mitchell',
          gameTitle: 'Pac-Man',
          score: 333340,
          date: '1999-07-05'
        },
        {
          playerName: 'Steve Wiebe',
          gameTitle: 'Donkey Kong',
          score: 1200000,
          date: '2007-08-15'
        },
        {
          playerName: 'Todd Rogers',
          gameTitle: 'Dragster',
          score: 5.51,
          date: '1982-01-20'
        }
      );
    }

    return records;
  })

  // Form
  const recordFormRef   = useRef<HTMLFormElement | null>(null);

  // Input elements
  const inputsNameRef   = useRef<HTMLInputElement | null>(null);
  const inputsGameRef   = useRef<HTMLInputElement | null>(null);
  const inputsScoreRef  = useRef<HTMLInputElement | null>(null);
  const inputsDateRef   = useRef<HTMLInputElement | null>(null);
  const inputsValues    = () => ({
    playerName:   inputsNameRef.current!.value.trim(),
    gameTitle:   inputsGameRef.current!.value.trim(),
    score:  parseFloat(inputsScoreRef.current!.value),
    date:   inputsDateRef.current!.value
  });

  // Error elements
  const errorsNameRef   = useRef<HTMLSpanElement | null>(null);
  const errorsGameRef   = useRef<HTMLSpanElement | null>(null);
  const errorsScoreRef  = useRef<HTMLSpanElement | null>(null);
  const errorsDateRef   = useRef<HTMLSpanElement | null>(null);
  const errorsElemArray = () => ([ errorsNameRef, errorsGameRef, errorsScoreRef, errorsDateRef ]);

  // Buttons
  const btnSubmitRef    = useRef<HTMLButtonElement | null>(null);
  const btnCancelRef    = useRef<HTMLButtonElement | null>(null);

  // State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isFormValid = (): boolean => {
    let valid = true;
    const { playerName: name, gameTitle: game, score, date } = inputsValues();

    const errors = {
      name:   errorsNameRef.current!,
      game:   errorsGameRef.current!,
      score:  errorsScoreRef.current!,
      date:   errorsDateRef.current!
    }

    // Clear previous errors
    Object.values(errors).forEach(error => error.textContent = '');

    // Player's name
    if (name === '') {
      errors.name.textContent = 'Player name is required.';
      valid = false;
    } else if (name.length < 2) {
      errors.name.textContent = 'Player name must be at least 2 characters.';
      valid = false;
    }

    // Game's title
    if (game === '') {
      errors.game.textContent = 'Game title is required.';
      valid = false;
    } else if (game.length < 2) {
      errors.game.textContent = 'Game title must be at least 2 characters.';
      valid = false;
    }

    // Score
    if (isNaN(score) || score <= 0) {
      errors.score.textContent = 'Score must be a positive number.';
      valid = false;
    }

    // Date
    if (date === '') {
      errors.date.textContent = 'Date is required.';
      valid = false;
    } else {
      const dateData = new Date(date);
      const today = new Date();
      const minDate = new Date("1970-01-01")
      if (dateData < minDate) {
        errors.date.textContent = 'Date cannot be before January 1st 1970.';
        valid = false;
      } else if (dateData > today) {
        errors.date.textContent = 'Date cannot be in the future.';
        valid = false;
      }
    }

    return valid;
  }

  const saveRecords = (records: RecordData[]) => {
    localStorage.setItem('twinGalaxiesRecords', JSON.stringify(records));
    setRecords(records);
  }

  const storeRecord = () => {
    if (!isFormValid()) {
      return;
    }

    let result;
    const r = inputsValues();

    if (editingIndex === null) {
      // Create
      result = [ ...records, r ];
    } else {
      // Update
      result = records.map((oldR, i) => i === editingIndex ? r : oldR);
      setEditingIndex(null);
      btnSubmitRef.current!.textContent = 'SUBMIT';
      btnCancelRef.current!.style.display = 'none';
    }

    saveRecords(result);
    recordFormRef.current!.reset();
  }

  const editRecord = (index: number) => {
    const r = records[index];
    setEditingIndex(index);
    inputsNameRef.current!.value  = r.playerName;
    inputsGameRef.current!.value  = r.gameTitle;
    inputsScoreRef.current!.value = r.score.toString();
    inputsDateRef.current!.value  = r.date;

    btnSubmitRef.current!.textContent   = "UPDATE";
    btnCancelRef.current!.style.display = "block";
  }

  const cancelEdit = () => {
    recordFormRef.current!.reset();
    btnSubmitRef.current!.textContent   = "SUBMIT";
    btnCancelRef.current!.style.display = "none";
    setEditingIndex(null);

    errorsElemArray().forEach(e => e.current!.textContent = "");
  }

  const deleteRecord = (index: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      records.splice(index, 1);
      saveRecords(records);
    }
  }

  return (
    <>
      <section id="submit" className="content-section dark-bg">
        <div className="center-box">
          <h2>SUBMIT RECORD</h2>
          <form id="record-form" className="submit-form" noValidate ref={recordFormRef} onSubmit={(e) => {
            e.preventDefault();
            storeRecord();
          }}>
            <input
              type="text"
              id="player-name"
              placeholder="PLAYER NAME"
              ref={inputsNameRef}
            ></input>
            <span className="error-message" id="error-name" ref={errorsNameRef}></span>
            <input type="text" id="game-title" placeholder="GAME TITLE" ref={inputsGameRef}></input>
            <span className="error-message" id="error-game" ref={errorsGameRef}></span>
            <input
              type="number"
              id="player-score"
              placeholder="SCORE"
              min="0"
              ref={inputsScoreRef}
            ></input>
            <span className="error-message" id="error-score" ref={errorsScoreRef}></span>
            <input type="date" id="record-date" ref={inputsDateRef}></input>
            <span className="error-message" id="error-date" ref={errorsDateRef}></span>
            <button type="submit" id="btn-submit" ref={btnSubmitRef} onClick={() => storeRecord()}>
              SUBMIT
            </button>
            <button type="button" id="btn-cancel" ref={btnCancelRef} onClick={() => cancelEdit()} style={{display: "none"}}>
              CANCEL
            </button>
          </form>
        </div>
      </section>

      <section id="records" className="content-section records-section">
        <div className="center-box">
          <h2>RECORDS LIST</h2>
          <table className="records-table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Game Title</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
              { records.map((record, index) => (
                <tr key={index}>
                  <td>{record.playerName}</td>
                  <td>{record.gameTitle}</td>
                  <td>{record.score}</td>
                  <td>{record.date}</td>
                  <td>
                    <button className="btn-edit" onClick={() => editRecord(index)}>EDIT</button>
                    <button className="btn-delete" onClick={() => deleteRecord(index)}>DELETE</button>
                  </td>
                </tr>
              )) }
            </thead>
            <tbody id="records-tbody"></tbody>
          </table>
        </div>
      </section>
    </>
  );
}
