import React from "react";
import { Button } from "../ui/button";
import { Config } from "@/config/Config";
import NextImage from "next/image";

const SocialLogin = () => {
  const handleSocailLogin = () => {
    location.replace(`${Config.BACKEND_BASE_URL}/auth/google`);
  };

  //ahonkhan.vercel.app/auth/process

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Button onClick={handleSocailLogin} variant="outline" type="button">
          <span className="relative h-5 w-5 mr-2">
            <NextImage
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              fill
              sizes="20px"
            />
          </span>
          Google
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
