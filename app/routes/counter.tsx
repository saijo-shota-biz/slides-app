import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const doId = context.cloudflare.env.MY_DURABLE_OBJECT.idFromName("do");
  const doClient = context.cloudflare.env.MY_DURABLE_OBJECT.get(doId);

  console.log(
    await doClient.fetch(
      "https://slide-app-durable-object.09haws-tragedy.workers.dev",
    ),
  );

  return json({ value: 0 });
};

export default function CounterRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Counter</h1>
      <ul className="flex flex-col gap-4">{data.value}</ul>
    </div>
  );
}
