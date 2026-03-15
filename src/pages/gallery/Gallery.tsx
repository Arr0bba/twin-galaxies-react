import { type PhotoProps, Photo } from "../../components/photo/Photo";

export default function Gallery() {
  const photos: PhotoProps[] = [
    {
      src: "img/player-pacman-record.jpg",
      alt: "Pac-Man"
    },
    {
      src: "img/steve-wiebe-king-kong-record.webp",
      alt: "Donkey Kong"
    },
    {
      src: "img/games-records.jpg",
      alt: "HQ"
    },
    {
      src: "img/arcade.jpg",
      alt: "Cabinet"
    },
    {
      src: "img/twin-galaxies-international-scoreboard.webp",
      alt: "international-scoreboard"
    },
    {
      src: "img/centipede.jpg",
      alt: "Centipede"
    },
    {
      src: "img/book-records.jpg",
      alt: "Book Records"
    },
    {
      src: "img/scott-safran-asteroids-playing-for-world-record-1982.jpg",
      alt: "Asteroids"
    },
    {
      src: "img/scoreboard.jpg",
      alt: "Scoreboard"
    },
    {
      src: "img/walter-day.avif",
      alt: "Walter Day"
    },
    {
      src: "img/missile-command.jpg",
      alt: "missile command"
    },
    {
      src: "img/the-king-of-kong.jpg",
      alt: "King of Kong"
    }
  ];

  return (
    <>
      <section id="gallery" className="content-section">
        <div className="center-box">
          <h2>MEMORIES</h2>
          <div className="gallery">
            { photos.map(p => <Photo src={p.src} alt={p.alt} />) }
          </div>
        </div>
      </section>
    </>
  );
}
