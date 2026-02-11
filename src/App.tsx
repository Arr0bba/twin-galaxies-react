import "./App.css";

function App() {
  return (
    <>
      <div className="parallax-wrapper">
        <div className="layer layer-mid" data-speed="0.5"></div>
        <div className="layer layer-front" data-speed="0.9"></div>
      </div>

      <div className="crt-overlay"></div>

      {/* <!-- HEADER --> */}


      <main className="main-container">
        <section className="intro-section">
          <div className="intro-content">
            <h2 className="glitch" data-text="TWIN GALAXIES">
              TWIN GALAXIES
            </h2>
            <p>OFFICIAL ARCADE RECORDS SINCE 1981</p>
            <div className="neon-bar"></div>
            <img
              className="intro-logo"
              src="../img/twin-galaxies-removebg-preview.png"
              alt="Twin Galaxies"
              title="Twin Galaxies"
            ></img>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="center-box">
            <h2>HISTORY</h2>
            <p className="paragraph-1">
              Twin Galaxies began in 1981, when Walter Day realized that arcade
              games were becoming huge, but no one really knew who the top
              players were. So he set out to create an official scoreboard that
              would track the best high scores from all over the United States.
              Think of it as the “record book” of the arcade world.
            </p>

            <p className="paragraph-1">
              Day traveled from arcade to arcade collecting scores, talking to
              players, and organizing competitions. Thanks to his work, Twin
              Galaxies quickly became the main authority for video-game records.
              If you wanted your score to be taken seriously, you sent it to
              Twin Galaxies.
            </p>

            <p className="paragraph-1">
              The organization gained even more attention in the 2000s with
              documentaries like The King of Kong, which showed the intense
              rivalries and passion behind classNameic arcade gaming. Over time,
              Twin Galaxies modernized its systems, changed owners, and improved
              how scores are verified, but its mission stayed the same.
            </p>

            <p className="paragraph-1">
              Today, Twin Galaxies is still known as one of the most important
              places for tracking world records in gaming, from old-school
              arcade classNameics to modern speedruns. It’s basically the place
              where gaming history gets written — one high score at a time.
            </p>
          </div>
        </section>

        <section id="hall-of-fame" className="content-section dark-bg">
          <div className="center-box">
            <h2>HALL OF FAME</h2>
            <div className="cards">
              <div className="card">
                BILLY MITCHELL<br></br>PERFECT PAC-MAN 1999
              </div>
              <div className="card">
                STEVE WIEBE<br></br>DONKEY KONG 1.2M
              </div>
              <div className="card">
                TODD ROGERS<br></br>DRAGSTER 5.51
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="content-section">
          <div className="center-box">
            <h2>MEMORIES</h2>
            <div className="gallery">
              <img
                src="../img/player-pacman-record.jpg"
                alt="Pac-Man"
                className="photo"
              ></img>
              <img
                src="../img/steve-wiebe-king-kong-record.webp"
                alt="Donkey Kong"
                className="photo"
              ></img>
              <img
                src="../img/games-records.jpg"
                alt="HQ"
                className="photo"
              ></img>
              <img
                src="../img/arcade.jpg"
                alt="Cabinet"
                className="photo"
              ></img>
              <img
                src="../img/twin-galaxies-international-scoreboard.webp"
                alt="international-scoreboard"
                className="photo"
              ></img>
              <img
                src="../img/centipede.jpg"
                alt="Centipede"
                className="photo"
              ></img>
              <img
                src="../img/book-records.jpg"
                alt="Book Records"
                className="photo"
              ></img>
              <img
                src="../img/scott-safran-asteroids-playing-for-world-record-1982.jpg"
                alt="Asteroids"
                className="photo"
              ></img>
              <img
                src="../img/scoreboard.jpg"
                alt="Scoreboard"
                className="photo"
              ></img>
              <img
                src="../img/walter-day.avif"
                alt="Walter Day"
                className="photo"
              ></img>
              <img
                src="../img/missile-command.jpg"
                alt="missile command"
                className="photo"
              ></img>
              <img
                src="../img/the-king-of-kong.jpg"
                alt="King of Kong"
                className="photo"
              ></img>
            </div>
          </div>
        </section>

        <section id="submit" className="content-section dark-bg">
          <div className="center-box">
            <h2>SUBMIT RECORD</h2>
            <form id="record-form" className="submit-form" noValidate>
              <input
                type="text"
                id="player-name"
                placeholder="PLAYER NAME"
              ></input>
              <span className="error-message" id="error-name"></span>
              <input
                type="text"
                id="game-title"
                placeholder="GAME TITLE"
              ></input>
              <span className="error-message" id="error-game"></span>
              <input
                type="number"
                id="player-score"
                placeholder="SCORE"
                min="0"
              ></input>
              <span className="error-message" id="error-score"></span>
              <input type="date" id="record-date"></input>
              <span className="error-message" id="error-date"></span>
              <button type="submit" id="btn-submit">
                SUBMIT
              </button>
              <button type="button" id="btn-cancel">
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
              </thead>
              <tbody id="records-tbody"></tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-top">
            <h3>TWIN GALAXIES</h3>
            <p>The official high score authority since 1981</p>
          </div>

          <div className="footer-middle">
            <div className="sitemap">
              <h4>SITE MAP</h4>
              <a href="#about">About</a>
              <a href="#hall-of-fame">Hall of Fame</a>
              <a href="#gallery">Gallery</a>
              <a href="#records">Records</a>
            </div>
            <div className="logo-img">
              <img
                src="../img/twin-galaxies-removebg-preview.png"
                title="Twin Galaxies"
                alt="Twin Galaxies"
                width="150"
                height="150"
              ></img>
            </div>
            <div className="social-links">
              <h4>FOLLOW THE ARCADE</h4>
              <img
                src="../img/instagram-logo-removebg-preview.png"
                alt="Instagram logo"
                title="Instagram"
                width="100"
                height="100"
              ></img>
              <img
                src="../img/discord-logo-removebg-preview.png"
                alt="Discord logo"
                title="Discord"
                width="90"
                height="90"
              ></img>
              <img
                src="../img/white-github-logo-removebg-preview.png"
                alt="Git Hub Logo"
                title="GitHub Profile"
                width="90"
                height="90"
              ></img>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="fb-text fbt-tg">2025 TWIN GALAXIES</span>
            <span className="fb-text fbt-dash"> - </span>
            <span className="fb-text fbt-copyright">ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;