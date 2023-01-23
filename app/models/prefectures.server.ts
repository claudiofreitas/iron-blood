import { i18nText } from "./types/common";
import arc from "@architect/functions";

export type Prefecture = {
  prefectureId: string;
  name: i18nText;
  // lines: TrainLine[];
};

export async function getAllPrefectures(): Promise<Prefecture[]> {
  const db = await arc.tables();
  const prefectures = await db.prefectures.scan({});
  //   TODO: Type
  return prefectures.Items.map((p: any) => {
    return {
      prefectureId: p.prefectureId,
      name: p.name,
    };
  });
}
