import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useSubmit, useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import {
  getAllTrainsById,
  getInterestedTrainByUserId,
  interestTrain,
  rideTrain,
} from "~/models/train.server";
import { requireUserId } from "~/session.server";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

type LoaderData = {
  trains: NonNullable<Awaited<ReturnType<typeof getAllTrainsById>>>;
};

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

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
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
  const submit = useSubmit();
  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }
  const [rodeLines] = useState<number[]>([]);
  const [interestedLines] = useState<number[]>([]);
  const data = useLoaderData() as LoaderData;
  return (
    <section>
      <Form method="post" onChange={handleChange}>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {data.trains.map((line: any) => (
            <div
              key={line.trainId}
              className="flex justify-between rounded border border-gray-400 p-5"
            >
              <Link to={`/trains/${line.trainId}`}>
                <label>{line.name.en}</label>
              </Link>
              <div className="flex gap-1">
                <button name="trainIdRide" value={line.trainId}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={rodeLines.includes(line.trainId) ? "green" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                <button name="trainIdInterest" value={line.trainId}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // TODO: Out transition
                    fill="yellow"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`h-6 w-6 cursor-pointer ${
                      interestedLines.includes(line.trainId) && "animate-spin"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </section>
  );
}
