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
                ? "text-zinc-900 font-bold"
                : "text-zinc-500 hover:text-zinc-700",
            ].join(" ")}
          >
            {item.label}
            {isActive ? (
              <motion.div
                layoutId="navbar-underline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0041c8]"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
