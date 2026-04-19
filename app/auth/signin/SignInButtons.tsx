"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface Props {
  callbackUrl?: string;
  hasGoogle: boolean;
  hasGitHub: boolean;
}

export function SignInButtons({ callbackUrl, hasGoogle, hasGitHub }: Props) {
  const redirectTo = callbackUrl || "/";
  return (
    <div className="flex flex-col gap-3">
      {hasGoogle && (
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => signIn("google", { callbackUrl: redirectTo })}
        >
          <GoogleIcon /> Google でログイン
        </Button>
      )}
      {hasGitHub && (
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => signIn("github", { callbackUrl: redirectTo })}
        >
          <GitHubIcon /> GitHub でログイン
        </Button>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.78-.07-1.54-.2-2.27H12v4.3h6.2c-.27 1.42-1.08 2.62-2.3 3.42v2.85h3.72c2.18-2 3.44-4.95 3.44-8.3z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.11 0 5.72-1.03 7.62-2.8l-3.72-2.85c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.75H1.7v2.94A11.5 11.5 0 0 0 12 23.5z"
      />
      <path
        fill="#FBBC04"
        d="M5.55 14.2a6.91 6.91 0 0 1 0-4.4V6.86H1.7a11.5 11.5 0 0 0 0 10.28l3.85-2.94z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.69 0 3.2.58 4.4 1.72l3.29-3.29C17.72 1.3 15.11.5 12 .5A11.5 11.5 0 0 0 1.7 6.86l3.85 2.94C6.46 6.77 9 4.75 12 4.75z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.75-1.34-1.75-1.08-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}
