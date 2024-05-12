import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/utils/auth.server";
import React, { useCallback, useState } from "react";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  return json({ user });
};

export default function AppRoute() {
  const data = useLoaderData<typeof loader>();

  const [menuWidth, setMenuWidth] = useState(0);
  const menuRefCallback = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setMenuWidth(node.offsetWidth);
    }
  }, []);

  return (
    <div className="app h-screen">
      <header>
        <nav className="flex py-2 px-4">
          <h1 className="py-2 px-4">
            <Link to={"/app"} prefetch={"intent"}>
              SlidesApp
            </Link>
          </h1>

          <div className="grow" />

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger ref={menuRefCallback}>
                  {data.user.email}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2" style={{ width: menuWidth }}>
                    <li>
                      <NavigationMenuLink asChild>
                        <Form method={"post"} action={"/signout"}>
                          <button
                            type={"submit"}
                            className={
                              "w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            }
                          >
                            <div className="text-sm font-medium leading-none">
                              Logout
                            </div>
                          </button>
                        </Form>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </header>

      <main className="py-2 px-8" style={{ height: "calc(100% - 56px)" }}>
        <Outlet />
      </main>
    </div>
  );
}
