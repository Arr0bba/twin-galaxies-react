import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ParallaxWrapper from "./components/parallax-wrapper/ParallaxWrapper";
import About from "./pages/about/About";
import Gallery from "./pages/gallery/Gallery";
import HallOfFame from "./pages/hall-of-fame/HallOfFame";
import Home from "./pages/home/Home";
import Records from "./pages/records/Records";

function App() {
  return (
    <>
      <Header />
      <ParallaxWrapper midSpeed={0.5} frontSpeed={0.9} />

      <main className="main-container">
        <BrowserRouter>
          <Routes>
            <Route path="/"             element={ <Home />       } />
            <Route path="/home"         element={ <Home />       } />
            <Route path="/about"        element={ <About />      } />
            <Route path="/hall-of-fame" element={ <HallOfFame /> } />
            <Route path="/gallery"      element={ <Gallery />    } />
            <Route path="/records"      element={ <Records />    } />
          </Routes>
        </BrowserRouter>
      </main>

      <Footer />
    </>
  );
}

export default App;