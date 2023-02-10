import TrainLineCard from "~/components/TrainLineCard";

export default function Test() {
  return (
    <div className="mx-2 h-full py-2">
      <TrainLineCard
        isRidden={false}
        isInterested={false}
        lineColor={"yamanote-green"}
        label={{ ja: "山手線", en: "Yamanote Line" }}
        numberOfStations={12}
      />
    </div>
  );
}
