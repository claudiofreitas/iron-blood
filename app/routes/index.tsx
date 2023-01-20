import { useOptionalUser } from "~/utils";
import type { ActionFunction } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { requireUserId } from "~/session.server";

// export const action: ActionFunction = async () => {
//   const userSession = await requireUserId();

//   if (!userSession) {
//     return redirect("/login");
//   }

//   return json({ ok: true });
// };

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">Iron Blood</div>
      </div>
    </main>
  );
}
