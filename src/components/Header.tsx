import { useRef } from "react";

export default function Header() {
    const hamRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const toggleNav = () => {
        hamRef.current?.classList.toggle("active");
        navRef.current?.classList.toggle("active");
    };

    return (
        <>
            <header className="main-header">
                <div className="header-content">
                    <h1 className="logo">TWIN GALAXIES</h1>
                    <div id="hamburger" className="hamburger" ref={hamRef} onClick={toggleNav}>
                        <i className="fa-solid fa-bars"></i>
                    </div>

                    <nav id="main-nav" className="main-nav" ref={navRef}>
                        <a href="/about">ABOUT</a>
                        <a href="/hall-of-fame">HALL OF FAME</a>
                        <a href="/gallery">GALLERY</a>
                        <a href="/records">RECORDS</a>
                    </nav>
                </div>
            </header>
        </>
    );
}