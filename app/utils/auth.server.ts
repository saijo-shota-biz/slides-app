import type { AppLoadContext } from "@remix-run/cloudflare";
import { Authenticator, AuthorizationError } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import type { Users } from "~/__generated__/sqlc/models";
import { getSessionStorage } from "~/utils/session.server";
import {
  createUser,
  getUser,
  getUserByEmail,
} from "~/__generated__/sqlc/querier";
import { generateId } from "~/utils/generateId";
import { format } from "date-fns";

export const getAuthenticator = (context: AppLoadContext) => {
  const sessionStorage = getSessionStorage(context);
  const authenticator = new Authenticator<Omit<Users, "password">>(
    sessionStorage,
  );

  const googleStrategy = getGoogleStrategy(context);
  authenticator.use(googleStrategy);

  return authenticator;
};

const getGoogleStrategy = (context: AppLoadContext) => {
  const env = context.cloudflare.env;
  return new GoogleStrategy<Omit<Users, "password">>(
    {
      clientID: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: env.GOOGLE_CALLBACK_URL || "",
    },
    async ({ profile }) => {
      const user = await getUserByEmail(env.DB, {
        email: profile.emails[0].value,
      });

      if (user) {
        return user;
      }

      const createdUser = await createUser(env.DB, {
        id: generateId(),
        email: profile.emails[0].value,
        username: profile.displayName,
      });

      if (!createdUser) {
        throw new AuthorizationError("Failed to create user");
      }

      return createdUser;
    },
  );
};
