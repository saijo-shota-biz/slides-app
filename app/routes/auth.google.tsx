import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/react";
import { getAuthenticator } from "~/utils/auth.server";

export const loader = () => redirect("/signin");
export const action = ({ request, context }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  return authenticator.authenticate("google", request);
};
