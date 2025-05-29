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

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        ソーシャルログインボタン
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <SocialButton
          provider="apple"
          onClick={handleAppleLogin}
          testId="apple-login-button"
        />

        <SocialButton
          provider="google"
          onClick={handleGoogleLogin}
          testId="google-login-button"
        />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>無効状態</h3>

        <SocialButton provider="apple" onClick={handleAppleLogin} disabled />

        <SocialButton provider="google" onClick={handleGoogleLogin} disabled />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          ローディング状態
        </h3>

        <SocialButton provider="apple" onClick={handleAppleLogin} isLoading />

        <SocialButton provider="google" onClick={handleGoogleLogin} isLoading />
      </div>
    </div>
  );
}
