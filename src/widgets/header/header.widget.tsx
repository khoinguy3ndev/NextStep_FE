import { useSession } from "@/features/auth/session/session.model";
import { Button } from "@/shared/ui/button";

export function HeaderWidget() {
  const { logout } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-999 h-16 w-full border-b bg-white">
      <div className="container mx-auto max-w-[800px] flex h-full items-center justify-between px-4 ">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 11 3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Todo</h1>
        </div>

        {/* LOGOUT */}
        <div className="flex items-center gap-4">
          <Button className="border-0 bg-[#fefeff] shadow-none" onClick={logout} variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4 text-gray-700"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
            <span className="ml-2 text-gray-700">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}