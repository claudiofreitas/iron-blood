import {
  Form,
  Link,
  useSubmit,
  useTransition,
  useLoaderData,
} from "@remix-run/react";
import { getUserId, requireUserId } from "~/session.server";
import { useState } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { TrainLine } from "~/models/train.server";
import {
  getInterestedTrainByUserId,
  interestTrain,
  rideTrain,
  getAllTrains,
} from "~/models/train.server";
import { getAllPrefectures } from "~/models/prefectures.server";
import TrainLineCard from "~/components/TrainLineCard";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const trainIdInterest = formData.get("trainIdInterest");
  const trainIdRide = formData.get("trainIdRide");

  if (trainIdInterest) {
    interestTrain({ userId, trainId: trainIdInterest as string });
  }

  if (trainIdRide) {
    rideTrain({ userId, trainId: trainIdRide as string });
  }

  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const trains = await getAllTrains();
  const prefectures = await getAllPrefectures();
  const userId = await getUserId(request);
  if (userId) {
    const interestedTrains = await getInterestedTrainByUserId({ userId });
    return {
      lines: trains,
      prefectures,
      interestedTrains,
    };
  } else {
    return {
      lines: trains,
      prefectures,
      interestedTrains: [],
    };
  }
};

export default function AllTrains() {
  const submit = useSubmit();
  const data = useLoaderData();

  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <section>
      <Form method="post" onChange={handleChange}>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {data.lines.slice(0, 40).map((line: TrainLine) => (
            <TrainLineCard
              key={line.trainId}
              trainId={line.trainId}
              label={line.name}
              lineColor={""}
              numberOfStations={line.stations.length}
              isRidden={false}
              isInterested={
                !!data.interestedTrains.find(
                  (t: { userId: string; trainId: string }) =>
                    t.trainId === line.trainId
                )
              }
            />
          ))}
        </div>
      </Form>
    </section>
  );
}
