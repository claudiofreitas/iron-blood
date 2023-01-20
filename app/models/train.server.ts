import arc from "@architect/functions";
import { i18nText } from "./types/common";
import type { User } from "./user.server";

export type Train = {
  trainId: string;
  name: i18nText;
};

export async function getTrain({ id }: { id: string }): Promise<Train | null> {
  const db = await arc.tables();
  const result = await db.train.get({ trainId: id });
  if (result) {
    return {
      trainId: result.pk,
      name: result.name,
    };
  }
  return null;
}

export async function getAllTrainsById(ids: string[]) {
  const db = await arc.tables();
  // const result = await db.train.query({trainId: ids});
  const result = await db.train.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "train",
    },
  });
  return result.Items.map((item) => ({
    trainId: item.pk,
    name: item.name,
  }));
}

export async function getAllTrains(): Promise<Train[]> {
  const db = await arc.tables();
  const trains = await db.train.scan({});
  // TODO: Type
  return trains.Items.map((t: any) => {
    console.log(t);
    return {
      trainId: t.trainId,
      name: t.name,
    };
  });
}

export async function interestTrain({
  userId,
  trainId,
}: {
  userId: string;
  trainId: string;
}): Promise<void> {
  const db = await arc.tables();
  const train = await db.train.get({ trainId });
  const interested = await db.interested.get({ userId, trainId });
  if (train) {
    if (interested) {
      await db.interested
        .delete({ userId, trainId })
        .catch((e) => console.error("error", e));
    } else {
      await db.interested.put({ userId: userId, trainId: train.trainId });
    }
  } else {
    console.error("Could not find user or train");
    // return something?
  }
}

export async function getInterestedTrain({
  userId,
}: {
  userId: string;
}): Promise<Train[]> {
  const db = await arc.tables();
  const trains = await db.interested.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId },
  });

  return trains.Items.map((t: any) => t);
}
