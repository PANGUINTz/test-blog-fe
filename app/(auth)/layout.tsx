import React from "react";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-green500 h-screen flex justify-between lg:flex-row flex-col-reverse">
      {children}
      <div className="bg-green300 lg:h-screen h-4/5 lg:w-1/2 lg:rounded-s-[4rem] relative rounded-b-[4rem]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={"/images/notebook.png"}
            alt="notebook"
            width={300}
            height={300}
          />
          <p className="font-castoro italic text-3xl text-white text-center mt-7">
            a Board
          </p>
        </div>
      </div>
    </div>
  );
};

export default layout;
