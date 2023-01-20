import arc from "@architect/functions";
import { prefectures, lines, stations } from "japan-train-data";

// seed the arc table "train" with all "lines"
export async function seed() {
  const db = await arc.tables();
  const train = db.train;

  // delete all existing data
  await train.delete({});

  for (const line of lines) {
    await train.put({
      trainId: line.id,
      name: line.name,
    });
  }
}
