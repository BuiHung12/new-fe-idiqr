import React from "react";
import "./Label.css";

interface LabelProps {
  decision: string;
}

const Label: React.FC<LabelProps> = ({ decision }) => {
  let labelClassName: string;

  switch (decision.toLowerCase()) {
    case "approved":
      labelClassName = "label-approved";
      break;
    case "pending":
      labelClassName = "label-pending";
      break;
    case "declined":
      labelClassName = "label-declined";
      break;
    default:
      labelClassName = "label-unknown";
      break;
  }

  return (
    <span className={`label-container ${labelClassName}`}>
      {decision}
    </span>
  );
};

export default Label;
