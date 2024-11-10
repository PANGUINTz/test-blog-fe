import React from "react";
import WriterPerson from "@/components/elements/WriterPerson";
import { timeAgo } from "@/lib/utils";

type Props = {
  comment: string;
  username: string;
  createdAt: string;
};

const Comment = (props: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <WriterPerson
          image="https://github.com/shadcn.png"
          name={props.username}
        />
        <span className="text-gray300 text-lg">{timeAgo(props.createdAt)}</span>
      </div>
      <p className="mb-5 ml-12">{props.comment}</p>
    </div>
  );
};

export default Comment;
