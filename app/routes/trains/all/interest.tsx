import type { ActionFunction } from "@remix-run/node";
import { interestTrain, uninterestTrain } from "~/models/train.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  // const formData = await request.formData();

  // const trainId = formData.get("trainId") as string;
  // const interested = formData.get("interested");

  // if (typeof trainId !== "string") {
  //   return json<ActionData>(
  //     { errors: { title: "Title is required" } },
  //     { status: 400 }
  //   );
  // }

  // console.log({ userId, trainId, interested });
  console.log("I was hit!!!");

  // if (trainId) {
  //   // Update the database
  //   if (interested) {
  //     interestTrain({ userId, trainId });
  //   } else {
  //     uninterestTrain({ userId, trainId });
  //   }
  // }
  return null;
};
