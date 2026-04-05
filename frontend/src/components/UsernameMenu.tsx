import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import { Separator } from "./ui/separator";
const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem className="justify-center">
          <Link
            to="/user-profile"
            className="flex flex-1 justify-center font-bold hover:text-orange-500"
          >
            Hồ sơ người dùng
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="justify-center">
          <Button
            onClick={() => logout()}
            className="flex flex-1 justify-center font-bold bg-orange-500 text-white hover:bg-gray-500 hover:text-white"
          >
            Đăng xuất
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
