import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Shield, Users } from "lucide-react";
import Logo from "@/components/layouts/Logo";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <Image
        src="/village.jpg"
        alt="Ward Office"
        fill
        priority
        className="object-cover object-center w-full h-full"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <Logo className="text-white text-sm md:text-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center md:text-left">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 max-w-lg md:max-w-2xl mx-auto md:mx-0">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 md:mb-12 gap-4 md:gap-6">
            <h2 className="text-base sm:text-md text-[#0f2b66] font-medium flex items-center gap-x-2">
              <span className="p-2 bg-[#0f2b66] rounded-2xl">
                <Shield color="white" size={18} />
              </span>
              Ward Digital Notice Board
            </h2>

            <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-3">
              <Button className="rounded-xl bg-[#0f2b66] hover:!bg-[#0f2b66] hover:scale-105 text-white px-4 sm:px-6 text-sm sm:text-base">
                <Bell className="mr-2 h-4 w-4" /> Alerts
              </Button>
              <Button className="rounded-xl bg-green-900 text-white hover:!bg-green-900 hover:scale-105 px-4 sm:px-6 text-sm sm:text-base">
                <Users className="mr-2 h-4 w-4" /> Community
              </Button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2b66]">
            Stay Updated with Your Ward Notices
          </h1>

          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Receive the latest announcements, events, and municipal updates
            directly from your local ward office.
          </p>
          <Link
            href="/dashboard"
            className="bg-[#0f2b66] p-2 px-3 flex items-center text-white w-fit rounded-2xl mt-3"
          >
            Continue <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
