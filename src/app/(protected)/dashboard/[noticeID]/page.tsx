import NoticeDetails from "@/components/noticeBoard/NoticeDetails";
import React from "react";

interface NoticeDetailsPageProps {
  params: {
    noticeID: string;
  };
}   
const NoticeDetailsPage = ({params}: NoticeDetailsPageProps) => {
  return <NoticeDetails noticeID={params.noticeID} />;
};

export default NoticeDetailsPage;
