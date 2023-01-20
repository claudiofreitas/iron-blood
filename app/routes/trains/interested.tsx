import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getInterestedTrain } from "~/models/train.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  trains: NonNullable<Awaited<ReturnType<typeof getInterestedTrain>>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  // Get interested trains
  const userId = await requireUserId(request);
  console.log("userId", userId);
  const interestedTrains = await getInterestedTrain({ userId });

  return json<LoaderData>({ trains: interestedTrains });
};

export default function InterestedLines() {
  const data = useLoaderData() as LoaderData;
  console.log(data.trains);
  return (
    <div>
      <h1>Interested Trains</h1>
    </div>
  );
}
