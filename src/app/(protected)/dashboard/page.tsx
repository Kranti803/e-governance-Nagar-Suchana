import { AppSidebar } from "@/components/layouts/app-sidebar";
import Header from "@/components/layouts/Header";
import NoticeBoard from "@/components/noticeBoard/NoticeBoard";

const MainDashboardPage = () => {
  return (
    <main className="min-h-screen p-6">
      <NoticeBoard />
    </main>
  );
};

export default MainDashboardPage;
