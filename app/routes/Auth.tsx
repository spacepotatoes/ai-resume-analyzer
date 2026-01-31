import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main
      className="
        bg-[url('/images/bg-auth.svg')] bg-cover 
        min-h-screen 
        flex items-center justify-center p-6
      "
    >
      <div
        className="
          gradient-border shadow-lg w-full 
          max-w-lg          /* ← wichtig: maximale Breite */
        "
      >
        <section
          className="
            flex flex-col items-center gap-8 
            bg-white rounded-2xl p-8 sm:p-10
            text-center
          "
        >
          <div className="space-y-4 max-w-prose">
            {/* max-w-prose ≈ 65ch → sehr angenehme Leselänge */}
            <h1 className="text-3xl font-bold">Welcome</h1>
            <h2 className="text-xl font-semibold text-gray-700">
              Log In To Continue Your Job Journey
            </h2>
            <p className="text-gray-600">
              You can log in with Puter and create a free account. It just takes a second!
            </p>
            <p className="text-gray-600 leading-relaxed">
              Puter.com is an open-source, browser-based "internet operating system" (Web OS) 
              that gives you a full desktop-like experience with files, apps, games, 
              and personal cloud storage — all running entirely in your browser, 
              with strong privacy focus and the option to self-host it.
            </p>
          </div>

          <div className="w-full max-w-xs">
            {isLoading ? (
              <button className="auth-button animate-pulse w-full py-3">
                Signing you in...
              </button>
            ) : auth.isAuthenticated ? (
              <button
                className="auth-button w-full py-3"
                onClick={auth.signOut}
              >
                Log Out
              </button>
            ) : (
              <button
                className="auth-button w-full py-3"
                onClick={auth.signIn}
              >
                Log In with Puter
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;