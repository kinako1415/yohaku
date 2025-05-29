"use client";
import { Button } from "@/components/elements/Button";
import { SocialButton } from "@/components/elements/SocialButton";

export default function Home() {
  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return <div>homeです</div>;
}
