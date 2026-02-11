function Header() {
    return (
        <>
            <header className="main-header">
                <div className="header-content">
                    <h1 className="logo">TWIN GALAXIES</h1>
                    <div id="hamburger" className="hamburger">
                        <i className="fa-solid fa-bars"></i>
                    </div>

                    <nav id="main-nav" className="main-nav">
                        <a href="#about">ABOUT</a>
                        <a href="#hall-of-fame">HALL OF FAME</a>
                        <a href="#gallery">GALLERY</a>
                        <a href="#records">RECORDS</a>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;