import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Image from "next/image";

type CategoryBadgeProps = {
  label: string;
  icon?: { src: string };
  selected: boolean;
  onClick: () => void;
};

const CategoryBadge = ({
  label,
  icon,
  selected,
  onClick,
}: CategoryBadgeProps) => (
  <Badge
    onClick={onClick}
    variant="secondary"
    className={cn(
      "px-4 py-2 rounded-full cursor-pointer text-sm flex items-center gap-2",
      { "bg-green-700 text-white": selected }
    )}
  >
    {icon && (
      <Image src={icon.src} alt={`${label} icon`}  width={20} height={20} />
    )}
    {label}
  </Badge>
);

export default CategoryBadge;