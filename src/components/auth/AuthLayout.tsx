import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Logo from "./Logo";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px] left-[-150px] top-[-150px]" />

        <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[120px] bottom-[-150px] right-[-100px]" />
      </div>

      <Card className="relative z-10 w-full max-w-md p-8 space-y-8">
        <Logo />

        <div className="text-center">
          <h2 className="text-3xl font-bold">{title}</h2>

          <p className="text-gray-400 mt-2">{subtitle}</p>
        </div>

        {children}
      </Card>
    </main>
  );
}
