import { HallOfFameCard, type HallOfFameCardProps } from "../components/HallOfFameCard";

export default function HallOfFame() {
  const recordHolders: HallOfFameCardProps[] = [
    { 
      playerName: "BILLY MITCHELL", 
      gameTitle: "PERFECT PAC-MAN" ,
      score: 1999
    },
    {
      playerName: "STEVE WIEBE",
      gameTitle: "DONKEY KONG",
      score: "1.2M"
    },
    {
      playerName: "BILLY MITCHELL", 
      gameTitle: "DRAGSTER",
      score: 5.51
    },
  ];

  return (
    <>
      <section id="hall-of-fame" className="content-section dark-bg">
        <div className="center-box">
          <h2>HALL OF FAME</h2>
          <div className="cards">
            { recordHolders.map(r => (<HallOfFameCard playerName={r.playerName} gameTitle={r.gameTitle} score={r.score}></HallOfFameCard>)) }
          </div>
        </div>
      </section>
    </>
  );
}
