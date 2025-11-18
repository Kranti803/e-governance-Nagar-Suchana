import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const CategoryBadge = ({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: any;
  selected: boolean;
  onClick: () => void;
}) => (
  <Badge
    onClick={onClick}
    variant="secondary"
    className={cn(
      "px-4 py-2 rounded-full cursor-pointer text-sm flex items-center gap-2",
      { "bg-green-700 text-white": selected }
    )}
  >
    {icon && <img src={icon.src} className="w-5 h-5" />}
    {label}
  </Badge>
);

export default CategoryBadge;