import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof FontAwesome6>["name"];

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({
  name,
  size = 18,
  color = "#fff",
  className,
}: IconProps) => {
  return (
    <FontAwesome6 name={name} size={size} color={color} className={className} />
  );
};
