import Link from "next/link";
import React from "react";

const Heder = () => {
  return (
    <div>
      <nav className="container  flex justify-around items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyWebsite
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/about" className={`hover:text-gray-400 `}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`hover:text-gray-400 }`}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Heder;
