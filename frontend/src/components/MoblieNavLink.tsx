import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SheetClose } from "./ui/sheet";

const MoblieNavLink = () => {
  const { logout } = useAuth0();

  return (
    <div className="flex flex-col gap-3">
      <SheetClose asChild>
        <Link
          to="/user-profile"
          className="flex h-11 w-full items-center justify-center rounded-lg border border-orange-200 bg-white font-bold text-foreground transition-colors hover:bg-orange-50 hover:text-orange-500"
        >
          Hồ sơ người dùng
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Button
          onClick={() => logout()}
          className="h-11 w-full bg-orange-500 font-bold text-white hover:bg-orange-600 hover:text-white"
        >
          Đăng xuất
        </Button>
      </SheetClose>
    </div>
  );
};

export default MoblieNavLink;
