import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx("glass p-6", className)}>
      {children}
    </div>
  );
}
