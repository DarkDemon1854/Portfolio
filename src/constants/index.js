import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import LA from "../assets/Hfs.jpg";
import Hfs from "../assets/Hfs.jpg";
import bitmesra from "../assets/BIT.png";
import  './index.css';



export const HERO_CONTENT = `
I am a Computer Science Engineering student at BIT Mesra, currently holding an <span className='italic text-xl text-gradient'>Newbie rank on Codeforces (Max Rating: 900)</span>. 

In addition to competitive programming, I excel in full-stack web development, specializing in  <span className='italic text-bold text-gradient'> Next.js, React.js,  and databases like MongoDB and MySQL</span>. 
I have developed scalable solutions, improving user experiences and system performance. 
<br><br>
`;

export const EXPERIENCES = [
  {
    year: "2023 - 2027",
    image: bitmesra,
    role: "BTech - Computer Science & Engineering",
    company: "Birla Institute of Technology, Mesra",
    description: `Pursuing a Bachelor of Technology (BTech) in Computer Science Engineering at Birla Institute of Technology, Mesra, with a current GPA of 8.16 . Currently in the second year, I am honing my skills in software development`,
    technologies: [
      "Data Structures & Algorithms",
      "DBMS",
      "OOPS",
      "Operating Systems",
    ],
  },
  {
    year: "2021 - 2022",
    image: LA,
    role: "Intermediate (Class XII)",
    company: "DAV Gandhinagar, Ranchi",
    description: `Achieved an impressive 82.2 overall, studied Physics, Chemistry, and Mathematics, showcasing a robust academic foundation and a strong commitment to academic excellence.`,
    technologies: [],
  },
  {
    year: "2019 - 2020",
    image: Hfs,
    role: "Matriculate (Class X)",
    company: "DAV PTPS, Patratu",
    description: `With a strong focus on both Science and Mathematics, I earned an impressive 94.20% in my board exams, showcasing a deep understanding of key subjects and reflecting exceptional academic dedication and achievement.`,
    technologies: [],
  },
];

export const PROJECTS = [
  {
    title: "Blog",
    image: project1,
    description:
      "Developed a full-stack blogging platform with Appwrite backend, featuring rich text editing via TinyMCE, real-time comments, and robust authentication. Implemented category-based post organization, social sharing, and advanced search functionality. Optimized for performance with responsive design and efficient data handling.",
    technologies: [
      "React",
      "Appwrite",
      "TinyMCE",
      "Tailwind",
      "HTML",
      "Javascript",
      "Node.js",
    ],
    demoLink: "https://blog-omega-ten-79.vercel.app/",
    githubLink: "https://github.com/Ankitsinghsisodya/Blog",
  },
  {
    title: "Sangeet",
    image: project2,
    description: 
      "Developed a streamlined web-based music player focused on Bhajans, featuring dynamic playlist management, responsive audio controls, and an intuitive user interface. Implemented custom audio controls, real-time progress tracking, and smooth transitions with gradient backgrounds. Built with modern web technologies for optimal performance.",
    technologies: [
      "HTML",
      "Tailwind CSS",
      "JavaScript",
      "Web Audio API",
      "LocalStorage",
      "JSON"
    ],
    demoLink: "https://sangeet-hazel.vercel.app/",
    githubLink: "https://github.com/Ankitsinghsisodya/Sangeet"
  },
];

export const CONTACT = {
  address: "Munger, Bihar, India ",
  phoneNo: "+91 9508943068 ",
  email: "rajshreer80@gmail.com",
};
