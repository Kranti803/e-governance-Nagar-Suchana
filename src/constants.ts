import { Bell, FileText, HeartPulse, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

import HospitalPNG from "@/assets/hospital.png";
import TaxPNG from "@/assets/money-bag.png";
import EventPNG from "@/assets/party.png";
import NoticePNG from "@/assets/speaker.png";

//features
export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Bell,
    title: "Real-time Notices",
    description: "Official updates from your ward office as they happen.",
  },
  {
    icon: FileText,
    title: "Tax & Payment Info",
    description: "Know deadlines, discounts, and how to pay locally.",
  },
  {
    icon: HeartPulse,
    title: "Health & Welfare Updates",
    description: "Camps, vaccinations, and social support information.",
  },
  {
    icon: Calendar,
    title: "Local Events",
    description: "Festivals and community programs in your neighborhood.",
  },
];

//municipalities and wards
export type Municipality = {
  id: string;
  name: string;
  wards: string[];
};

function range(count: number): string[] {
  return Array.from({ length: count }, (_, i) => String(i + 1));
}

export const municipalities: Municipality[] = [
  {
    id: "ktm",
    name: "Kathmandu Metropolitan City",
    wards: range(32),
  },
  {
    id: "lalitpur",
    name: "Lalitpur Metropolitan City",
    wards: range(29),
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur Municipality",
    wards: range(17),
  },
];

// categories
type Category = {
  category: string;
  icon?: StaticImageData;
};

export const categories:Category[] = [
  { category: "All"},           
  { category: "Tax", icon: TaxPNG },
  { category: "Health", icon: HospitalPNG },
  { category: "Events", icon: EventPNG },
  { category: "General", icon: NoticePNG },
];

// sample notices
type Notice = {
  title: string;
  desc: string;
  date: string;
  category: string;
};  
export const notices: Notice[] = [
  {
    title: "Road Maintenance Schedule",
    desc: "Ward office will conduct road maintenance on Main Street from 10th–12th. Please park vehicles accordingly. Alternative routes will be signposted.",
    date: "Sep 12, 2025",
    category: "General",
  },
  {
    title: "Property Tax Deadline Reminder",
    desc: "Citizens are requested to clear pending property taxes by the end of this month to avoid penalties. Online and in-person payment options available.",
    date: "Sep 08, 2025",
    category: "Tax",
  },
  {
    title: "Free Health Camp",
    desc: "A free health camp will be organized at the ward office premises on Sunday from 9 AM to 3 PM. Services include general checkups and vaccinations.",
    date: "Sep 05, 2025",
    category: "Health",
  },
  {
    title: "Community Festival",
    desc: "Join us for the annual community festival featuring local food, music, and cultural performances at Central Park this Saturday evening.",
    date: "Aug 28, 2025",
    category: "Events",
  },
];
