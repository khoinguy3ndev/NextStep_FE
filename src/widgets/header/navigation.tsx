import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";

type NavLinkItem = {
  label: string;
  to: string;
};

const navLinks: NavLinkItem[] = [
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-8" aria-label="Main navigation">
      {navLinks.map((item) => {
        const isActive = location.pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to as never}
            className={[
              "relative inline-flex items-center pb-2 text-sm transition-colors",
              isActive
                ? "text-foreground font-bold"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {item.label}
            {isActive ? (
              <motion.div
                layoutId="navbar-underline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
