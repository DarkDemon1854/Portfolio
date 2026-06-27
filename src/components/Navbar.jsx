import logo from "../assets/logo.jpg";
import React from 'react';
import { FaLinkedin, FaPhoneAlt, FaGithub, FaGlobe } from "react-icons/fa";
import { SiGmail, SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { RippleButton } from "./ui/ripple-button.jsx";

const SOCIAL = [
  {
    href: "https://codolio.com/profile/SonGoku",
    icon: <FaGlobe />,
    label: "Codolio",
    accent: "#0a66c2",
  },
  {
    href: "https://codolio.com/profile/SonGoku",
    icon: <FaCodolio />,
    label: "Codolio",
    accent: "#0a66c2",
  },
  {
    href: "https://github.com/DarkDemon1854",
    icon: <FaGithub />,
    label: "GitHub",
    accent: "#f0f6fc",
  },
  {
    href: "https://codeforces.com/profile/SonGoku2403",
    icon: <SiCodeforces />,
    label: "Codeforces",
    accent: "#1da1f2",
  },
  {
    href: "https://www.codechef.com/users/songoku2403",
    icon: <SiCodechef />,
    label: "CodeChef",
    accent: "#c97d4e",
  },
  {
    href: "https://leetcode.com/u/SonGoku2403/",
    icon: <SiLeetcode />,
    label: "LeetCode",
    accent: "#ffa116",
  },
  {
    href: "mailto:rajshreer80@gmail.com",
    icon: <SiGmail />,
    label: "Gmail",
    accent: "#ea4335",
  },
  {
    href: "tel:+919508943068",
    icon: <FaPhoneAlt />,
    label: "Phone",
    accent: "#4ade80",
  },
];

const Navbar = () => {
  return (
    <nav className="mb-8 flex items-center justify-between py-6 -mt-8">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10" src={logo} alt="logo" />
      </div>

      <div className="m-8 flex items-center justify-center gap-1">
        {SOCIAL.map(({ href, icon, label, accent }) => (
          <RippleButton
            key={label}
            variant="hover"
            hoverBaseColor={accent}
            rippleColor={accent + "55"}
            rippleDuration={500}
            className="text-neutral-400 hover:text-white text-2xl p-2 rounded-lg transition-colors duration-200"
            onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
            aria-label={label}
          >
            {icon}
          </RippleButton>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
