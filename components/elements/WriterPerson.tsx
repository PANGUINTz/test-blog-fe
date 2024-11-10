import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  image: string;
  name: string;
  className?: string;
  color?: string;
};

const WriterPerson = ({ image, name, className, color }: Props) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Avatar>
        <AvatarImage src={image} loading="lazy" />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <p className={`text-lg ${color ?? "text-gray300 capitalize"}`}>{name}</p>
    </div>
  );
};

export default WriterPerson;
