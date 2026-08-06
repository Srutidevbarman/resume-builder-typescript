"use client";

import Button from "@/components/ui/Button";

interface Props {
  user: any;
  logout: () => void;
}

export default function DashboardNavbar({ user, logout }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold">
          Resume
          <span className="text-violet-400">AI</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>

            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <Button onClick={logout} className="!px-5">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
