import { AuthForm } from "./AuthForm";
import { AuthShowcase } from "./AuthShowcase";

export function AuthScreen({ mode }: { mode: "signin" | "signup" }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fdf6f9] text-[#1f1f1f] transition-colors duration-300 dark:bg-[#111111] dark:text-[#f6f1f3]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.34),_transparent_34%),linear-gradient(180deg,_#fffafb_0%,_#fdf6f9_52%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.13),_transparent_35%),linear-gradient(180deg,_#171214_0%,_#111111_55%,_#181818_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(244,114,158,0.2),_transparent_44%)] dark:bg-[radial-gradient(circle_at_top_center,_rgba(188,231,213,0.11),_transparent_44%)]" />
      </div>

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <AuthShowcase mode={mode} />
        <AuthForm mode={mode} />
      </section>
    </main>
  );
}
