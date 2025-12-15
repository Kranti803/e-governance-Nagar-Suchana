'use client'

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoticeDetailsProps {
  noticeID: string;
}

type Notice = {
  _id: string;
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  publishDate?: string;
};

const NoticeDetails: React.FC<NoticeDetailsProps> = ({ noticeID }) => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/notices/${noticeID}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load notice");
        setNotice(data.notice);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notice");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [noticeID]);

  const date = notice?.publishDate
    ? new Date(notice.publishDate).toLocaleDateString()
    : "";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">
            Notice Details
          </h1>
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading notice...</p>}
        {error && (
          <p className="text-sm text-red-600" aria-live="polite">
            {error}
          </p>
        )}

        {!loading && !error && notice && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {notice.title}
              </h2>

              <div className="flex items-center gap-3">
                {date && <span className="text-sm text-gray-600">{date}</span>}
                {notice.category && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {notice.category}
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                {notice.content || notice.summary}
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => {}}
                className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
              >
                <Download size={16} />
                Download Attachment (coming soon)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetails;
