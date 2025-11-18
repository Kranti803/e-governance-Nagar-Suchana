import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";

// Helper function
const getCategoryIcon = (category: string) =>
  categories.find((c) => c.category === category)?.icon?.src || "📌";

const NoticeCard = ({ n }: any) => {
  const icon = getCategoryIcon(n.category);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5 flex items-start gap-4">
        <span className="text-green-600 border border-green-600 p-3 rounded-lg">
          <img src={icon} className="w-4 h-4" />
        </span>

        <aside className="flex flex-col gap-y-4 sm:flex-row justify-between w-full">
          <div className="space-y-2 w-3/4">
            <h2 className="text-lg font-semibold">{n.title}</h2>
            <p className="text-sm text-gray-600 font-semibold">{n.desc}</p>

            <div className="flex gap-3 items-center text-sm mt-1">
              <span className="text-gray-500 font-semibold">{n.date}</span>
              <Badge className="rounded-full px-3 py-1 text-xs bg-green-700">
                {n.category}
              </Badge>
            </div>
          </div>

          <Button className="bg-green-600 text-white rounded-full px-5 py-2 hover:bg-green-700">
            Read More
          </Button>
        </aside>
      </CardContent>
    </Card>
  );
};
export default NoticeCard;
