export default function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-top">
            <h3>TWIN GALAXIES</h3>
            <p>The official high score authority since 1981</p>
          </div>

          <div className="footer-middle">
            <div className="sitemap">
              <h4>SITE MAP</h4>
              <a href="/about">About</a>
              <a href="/hall-of-fame">Hall of Fame</a>
              <a href="/gallery">Gallery</a>
              <a href="/records">Records</a>
            </div>
            <div className="logo-img">
              <img
                src="img/twin-galaxies-removebg-preview.png"
                title="Twin Galaxies"
                alt="Twin Galaxies"
                width="150"
                height="150"
              ></img>
            </div>
            <div className="social-links">
              <h4>FOLLOW THE ARCADE</h4>
              <img
                src="img/instagram-logo-removebg-preview.png"
                alt="Instagram logo"
                title="Instagram"
                width="100"
                height="100"
              ></img>
              <img
                src="img/discord-logo-removebg-preview.png"
                alt="Discord logo"
                title="Discord"
                width="90"
                height="90"
              ></img>
              <img
                src="img/white-github-logo-removebg-preview.png"
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
