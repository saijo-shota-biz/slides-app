import { Reveal } from "~/components/feature/Reveal";
import { RevealContainer } from "~/components/feature/RevealContainer";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  return json({ markdownUrl: String(formData.get("url")) });
};

export default function AppIndexRoute() {
  const data = useActionData<typeof action>();
  return (
    <div className="h-full flex flex-col gap-8">
      <Form method="post">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" name={"url"} placeholder="Gigthub markdown Url" />
          <Button type="submit">送信</Button>
        </div>
      </Form>
      {data?.markdownUrl && (
        <RevealContainer>
          <Reveal url={data.markdownUrl} />
        </RevealContainer>
      )}
    </div>
  );
}
