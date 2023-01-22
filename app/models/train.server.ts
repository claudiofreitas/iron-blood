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
  if (ids.length === 0) return [];

  const db = await arc.tables();
  const keys = ids.map((id) => ({ trainId: id }));
  const result = await db._doc
    .batchGet({
      RequestItems: {
        "iron-blood-b556-staging-train": {
          Keys: keys,
        },
      },
    })
    .promise();

  return result.Responses?.["iron-blood-b556-staging-train"]?.map((item) => ({
    trainId: item.trainId,
    name: item.name,
  }));
}

export async function getAllTrains(): Promise<Train[]> {
  const db = await arc.tables();
  const trains = await db.train.scan({});
  return trains.Items.map((t: any) => {
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

export async function rideTrain({
  userId,
  trainId,
}: {
  userId: string;
  trainId: string;
}): Promise<void> {
  const db = await arc.tables();
  const train = await db.train.get({ trainId });
  const ridden = await db.ridden.get({ userId, trainId });
  if (train) {
    if (ridden) {
      await db.ridden
        .delete({ userId, trainId })
        .catch((e) => console.error("error", e));
    } else {
      await db.ridden.put({ userId: userId, trainId: train.trainId });
    }
  } else {
    console.error("Could not find user or train");
  }
}

export async function getInterestedTrainByUserId({
  userId,
}: {
  userId: string;
}): Promise<{ userId: string; trainId: string }[]> {
  const db = await arc.tables();
  const trains = await db.interested.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId },
  });

  return trains.Items.map((t: any) => t);
}

export async function getRiddenTrainByUserId({
  userId,
}: {
  userId: string;
}): Promise<{ userId: string; trainId: string }[]> {
  const db = await arc.tables();
  const trains = await db.ridden.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId },
  });

  return trains.Items.map((t: any) => t);
}
