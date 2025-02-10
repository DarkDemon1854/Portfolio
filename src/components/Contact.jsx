import { motion } from "framer-motion";
import { CONTACT } from '../constants';
import { SiGmail } from "react-icons/si";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-20">
        <motion.h2 whileInView={{opacity: 1, y:0}} initial= {{opacity: 0, y:-100}} transition={{duration: 0.5}} className="my-10 text-center text-4xl">Get in Touch</motion.h2>
        <motion.div className="text-center tracking-tighter flex justify-center items-center gap-8">
            <a href="tel:+919508943068" className="border-b"><FaPhoneAlt/></a>
            <a href="mailto:rajshreer80@gmail.com" className="border-b"><SiGmail/></a>
        </motion.div>

    </div>
  )
}

export default Contact;