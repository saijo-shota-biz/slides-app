import {
  type AppLoadContext,
  createCookie,
  createWorkersKVSessionStorage,
} from "@remix-run/cloudflare";

export const getSessionStorage = (context: AppLoadContext) => {
  const env = context.cloudflare.env;

  const sessionCookie = createCookie("__session", {
    secrets: [env.SESSION_SECRET],
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return createWorkersKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: env.SESSION_KV,
    cookie: sessionCookie,
  });
};
