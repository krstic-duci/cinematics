import React, { ReactNode } from "react";

interface InfoTextProps {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  label?: string;
}
const InfoText: React.VFC<InfoTextProps> = ({ children, className, label, labelClassName }) => (
  <p className={className} data-testid="infoTextParagraph">
    {label && (
      <span className={labelClassName} data-testid="infoTextSpan">
        {label}
      </span>
    )}
    {children}
  </p>
);

export default InfoText;
