import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound, Menu } from "lucide-react";
import MobileNavLinks from "./MoblieNavLink";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex items-center justify-center rounded-md p-1 text-orange-500 transition-colors hover:bg-orange-50"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>

      <SheetContent className="w-[320px] bg-white px-6 py-7 sm:w-[360px]">
        <div className="flex h-full flex-col">
          <div className="pr-10">
            <SheetTitle className="text-[2rem] font-bold leading-tight tracking-tight text-foreground">
              {isAuthenticated ? (
                <span className="flex items-center gap-3 text-xl">
                  <CircleUserRound className="size-6 shrink-0 text-orange-500" />
                  <span className="truncate">{user?.email}</span>
                </span>
              ) : (
                <span>Chào mừng bạn đến với MernEats.com!</span>
              )}
            </SheetTitle>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-1 flex-col gap-4">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                className="h-12 w-full rounded-xl bg-orange-500 text-lg font-bold text-white shadow-sm hover:bg-orange-600 hover:text-white"
                onClick={async () => loginWithRedirect()}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
