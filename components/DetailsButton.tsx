import React from "react";
import transformedData from "../models/transformedData";

type PropType = {
  children: transformedData[];
  onClick: () => void;
};

const DetailsButton: React.FC<PropType> = ({
  children,
  onClick,
}) => {
  if (children.length === 0) return null;

  return (
    <button onClick={onClick}>
      {`● ${children.length} 
      commit${children.length > 1 ? "s" : ""}`}
    </button>
  );
};

export default DetailsButton;
