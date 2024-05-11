import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { listUsers } from "~/__generated__/sqlc/querier";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { results } = await listUsers(context.cloudflare.env.DB);
  return json({ results });
};

export default function AppIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Users.json</h1>
      <ul className="flex flex-col gap-4">
        {data.results.map((user) => (
          <li key={user.id} className="flex flex-col gap-1">
            <span className="font-bold">{user.username}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
