import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import LA from "../assets/Hfs.jpg";
import Hfs from "../assets/Hfs.jpg";
import bitmesra from "../assets/BIT.png";
import  './index.css';



export const HERO_CONTENT = `
I am a Computer Science Engineering student at BIT Mesra, currently holding a <span className='italic text-xl text-gradient'>Specialist rank on Codeforces (Max Rating: 1410)</span> and <span className='italic text-xl text-gradient'>4 star at Codechef (Max Rating: 1528)</span>.
My competitive programming journey includes solving 100+ problems on Codeforces and achieving notable ranks like<span className='italic text-xl text-gradient'><a href='https://codeforces.com/contest/2103/standings/participant/187434533#p187434533'>Global rank 1484 in codeforces Div 2 Round 1019</a></span>.<br><br> 

In addition to competitive programming,I am an open source contributor and I also excel in full-stack web development, specializing in  <span className='italic text-bold text-gradient'> Next.js, React.js, and databases like MongoDB and MySQL</span>. 
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
    title: "NoName",
    image: project1,
    description:
      "Developed a powerful Telegram-based mirror and leech bot with advanced file management capabilities and MongoDB integration for user data storage. Supports downloading from torrents, direct links, and streaming sites using ARIA2C, YT-DLP, and various scraping techniques. Integrated Google Drive, MEGA, and Rclone for seamless cloud storage management. Features a hash and direct download link generator, RSS feed support, customizable user and bot settings, and a suite of miscellaneous audio tools. Implements bypass mechanisms for protected links and supports multiple URL shortener services. Designed for flexible deployment on Heroku, VPS, and Docker, leveraging Python and Flask for a scalable and high-performance backend.",
    technologies: [
      "Python",
      "HTML",
      "JavaScript",
      "Telegram API(Pyrogram)",
      "Flask",
      "Dockerfile",
      "MongoDB",
    ],
    demoLink: "https://minato98-3f97e3e22de1.herokuapp.com/",
    githubLink: "https://github.com/DarkDemon1854/NoName",
  },
  {
    title: "Stream",
    image: project2,
    description: 
      "Developed a dynamic web-based movie streaming platform that fetches films from a Telegram channel, leveraging The Movie Database (TMDb) API for enriched metadata, including posters, thumbnails, and detailed movie information. Enabled seamless online streaming alongside playback options via MX Player and VLC, with a direct file download feature. Designed an intuitive user interface with smooth navigation, optimized video performance, and real-time content updates.",
    technologies: [
      "Python",
      "HTML",
      "JavaScript",
      "TMDb API",
      "Telegram API(Pyrogram)",
      "Dockerfile",
      "LocalStorage",
      "MongoDB",
    ],
    demoLink: "https://convinced-manya-nopemkmlm-e3a7583c.koyeb.app/",
    githubLink: "https://github.com/DarkDemon1854/Stream"
  },
];

export const CONTACT = {
  address: "Ranchi, Jharkhand, India ",
  phoneNo: "+91 9508943068 ",
  email: "rajshreer80@gmail.com",
};
