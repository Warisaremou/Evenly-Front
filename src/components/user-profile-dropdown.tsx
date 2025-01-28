import LogoutButton from "@/components/logout-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { CircleUser } from "lucide-react";
import { Link } from "react-router";

export default function UserProfileDropdown({ firstname }: { firstname: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative size-10 rounded-full"
        >
          <Avatar className="border border-primary-100">
            <AvatarFallback>{firstname.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 px-3"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-body-medium">
          <p className="text-sm py-2 leading-none text-grey-500">johndoe@gmail.com</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="cursor-pointer text-grey-400 px-4 h-10"
          >
            <Link
              to={siteConfig.accountNav[0].href}
              className="font-body-medium flex items-center gap-2"
            >
              <CircleUser
                className="size-5"
                aria-hidden="true"
              />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="pl-0">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
