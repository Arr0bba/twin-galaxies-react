import type { RecordData } from "../types/RecordData";

export type HallOfFameCardProps = Pick<RecordData, "playerName" | "gameTitle"> & { score: number | string };

export function HallOfFameCard({ playerName, gameTitle, score }: HallOfFameCardProps) {
  return (
    <>
      <div className="card">
        {playerName}<br></br>{gameTitle} {score}
      </div>
    </>
  );
}
