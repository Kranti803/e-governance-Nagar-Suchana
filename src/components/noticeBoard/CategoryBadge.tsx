import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

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
      <img src={icon.src} alt={`${label} icon`} className="w-5 h-5" />
    )}
    {label}
  </Badge>
);

export default CategoryBadge;