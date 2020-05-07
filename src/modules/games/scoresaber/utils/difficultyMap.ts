const difficultyMap: { [key: string]: string } = {
  _ExpertPlus_SoloStandard: "Expert+",
  _Expert_SoloStandard: "Expert",
  _Hard_SoloStandard: "Hard",
  _Normal_SoloStandard: "Normal",
  _Easy_SoloStandard: "Easy",
};

export default function mapDifficulty(diffName: string) {
  return difficultyMap[diffName] || diffName;
}
