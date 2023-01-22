import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getAllTrainsById,
  getInterestedTrainByUserId,
} from "~/models/train.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  trains: NonNullable<Awaited<ReturnType<typeof getAllTrainsById>>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const interestedTrainByUserId = await getInterestedTrainByUserId({ userId });
  const interestedTrains = await getAllTrainsById(
    interestedTrainByUserId.map((train) => train.trainId)
  );
  if (interestedTrains) {
    return json<LoaderData>({ trains: interestedTrains });
  } else {
    return json<LoaderData>({ trains: [] });
  }
};

export default function InterestedLines() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      <h1>Interested Trains</h1>
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
