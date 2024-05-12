import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAuthenticator } from "~/utils/auth.server";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/app",
  });
};

export default function SignInRoute() {
  return (
    <main className="py-32 flex flex-col items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <Form method="post" action="/auth/google" className="w-full">
            <Button type="submit" variant="outline" className="w-full">
              Login with Google
            </Button>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
