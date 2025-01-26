import logo from "@/assets/images/logo.svg";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to={routes.index}
      aria-label="Evenly Logo"
    >
      <img src={logo} />
    </Link>
  );
}
