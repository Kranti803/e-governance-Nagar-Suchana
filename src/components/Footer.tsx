import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex justify-center gap-6 text-sm text-gray-600">
        <Link href="#" className="font-semibold md:text-lg text-md">About</Link>
        <Link href="#" className="font-semibold md:text-lg text-md">Contact</Link>
        <Link href="#" className="font-semibold md:text-lg text-md">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
