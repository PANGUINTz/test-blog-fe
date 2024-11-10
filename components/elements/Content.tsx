import React from "react";

type Props = { title: string; content: string; ellipsis?: boolean };

const Content = ({ title, content, ellipsis = true }: Props) => {
  return (
    <div className="mb-3">
      <h3 className="text-xl font-bold">{title}</h3>
      <p
        className={`${
          ellipsis && "text-ellipsis line-clamp-2 max-h-12 overflow-hidden"
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default Content;
