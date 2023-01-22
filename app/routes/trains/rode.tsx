import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import {
  getAllTrainsById,
  getRiddenTrainByUserId,
} from "~/models/train.server";

type LoaderData = {
  trains: NonNullable<Awaited<ReturnType<typeof getAllTrainsById>>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const interestedTrainByUserId = await getRiddenTrainByUserId({ userId });
  const interestedTrains = await getAllTrainsById(
    interestedTrainByUserId.map((train) => train.trainId)
  );
  if (interestedTrains) {
    return json<LoaderData>({ trains: interestedTrains });
  } else {
    return json<LoaderData>({ trains: [] });
  }
};

export default function RodeLines() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      <h1>Trains Ridden</h1>
      <div>
        {data.trains.map((train) => (
          <div key={train.trainId}>
            <h2>{train.name.en}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
