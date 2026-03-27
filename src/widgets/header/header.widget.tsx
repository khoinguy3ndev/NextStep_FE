import { Link } from "@tanstack/react-router"; // 1. Nhớ import Link
import { Briefcase, LogIn } from "lucide-react";

export function HeaderWidget() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Next Step</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            Việc Làm
          </a>
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            Công Ty
          </a>
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            Phân Tích CV
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 text-primary hover:bg-secondary transition-colors rounded-lg font-medium"
          >
            Đăng Nhập
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-medium flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Đăng Ký</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
