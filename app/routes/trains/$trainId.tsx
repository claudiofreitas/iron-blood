import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTrain } from "~/models/train.server";
import { json } from "@remix-run/node";

type LoaderData = {
  train: NonNullable<Awaited<ReturnType<typeof getTrain>>>;
};

export const loader = async ({ params }: LoaderArgs) => {
  if (params.trainId) {
    const train = await getTrain({ id: params.trainId });
    if (!train) {
      throw new Response("Not Found", { status: 404 });
    }
    return json<LoaderData>({ train });
  } else {
    throw new Response("Not Found", { status: 404 });
  }
};

export default function InterestedLines() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="flex w-full flex-col justify-center">
      <h1 className="text-center text-3xl">{data.train.name.en}</h1>
    </div>
  );
}
