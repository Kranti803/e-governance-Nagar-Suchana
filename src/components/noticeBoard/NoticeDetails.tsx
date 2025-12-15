'use client'

import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoticeDetailsProps {
  title?: string;
  date?: string;
  category?: string;
  description?: string;
  attachmentUrl?: string;
  noticeID?: string;
}

const NoticeDetails: React.FC<NoticeDetailsProps> = ({
  title = 'Free Health Camp at Ward Office',
  date = 'Sep 05, 2025',
  category = 'Health',
  description = 'A free health camp will be organized at the ward office premises on Sunday from 9 AM to 3 PM. Services include general checkups, blood pressure, diabetes screening, and vaccinations for children. Please bring your ID for registration. Share this information with neighbors and family members to ensure maximum participation.',
  attachmentUrl = '#',
  noticeID
}) => {
  const handleShare = (platform: string): void => {
    console.log(`Sharing on ${platform}`);
  };

  const handleDownload = (): void => {
    console.log('Downloading attachment');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">
            Notice Details
          </h1>
        </div>

        {/* Notice Content */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

            {/* Date + Category */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{date}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <Button
              onClick={handleDownload}
              className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
            >
              <Download size={16} />
              Download Attachment (PDF)
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NoticeDetails;
