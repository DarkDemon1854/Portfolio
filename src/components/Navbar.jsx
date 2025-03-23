import logo from "../assets/logo.jpg";
import React from 'react';
import { FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail, SiLeetcode, SiCodeforces } from "react-icons/si";


const Navbar = () => {
  return <nav className="mb-8 flex items-center justify-between py-6 -mt-8">
    <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10" src={logo} alt="logo" />
    </div>
    <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href="https://www.linkedin.com/in/raj-shree-a772822a7/" target="_blank">
          <FaLinkedin />
        </a>
        <a href="https://github.com/SonGoku1972" target="_blank">
          <FaGithub />
        </a>
        <a href="https://codeforces.com/profile/SonGoku2403" target="_blank">
          <SiCodeforces />
        </a>
        <a href="https://leetcode.com/u/SonGoku2403/" target="_blank">
          <SiLeetcode />
        </a>
        <a href="mailto:rajshreer80@gmail.com" target="_blank">
          <SiGmail/>
        </a>
        <a href="tel:+919508943068" target="_blank">
          <FaPhoneAlt/>
        </a>
    </div>
  </nav>
}

export default Navbar
