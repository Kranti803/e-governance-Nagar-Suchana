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

