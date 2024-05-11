import { Link, Outlet } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export default function AppRoute() {
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
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={"/app/logout"} prefetch={"none"}>
                    Logout
                  </Link>
                </NavigationMenuLink>
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
