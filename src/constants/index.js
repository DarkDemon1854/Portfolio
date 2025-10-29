import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import LA from "../assets/Hfs.jpg";
import Hfs from "../assets/Hfs.jpg";
import bitmesra from "../assets/BIT.png";
import  './index.css';



export const HERO_CONTENT = `
I am a Computer Science Engineering student at BIT Mesra, currently holding a <span className='italic text-xl text-gradient'>Specialist rank on Codeforces (Max Rating: 1476)</span> and <span className='italic text-xl text-gradient'>4 star at Codechef (Max Rating: 1863)</span>.
My competitive programming journey includes solving 100+ problems on Codeforces and achieving notable ranks like <span className='italic text-xl text-gradient'><a href='https://codeforces.com/contest/2103/standings/participant/208764572#p208764572'>Global rank 1484 in codeforces Div 2 Round 1019</a></span>.<br><br> 

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
    title: "Mirror Leech Telegram Bot",
    image: project1,
    description:
      "Developed an advanced Telegram-based automation bot designed to simplify and accelerate file mirroring, downloading, and management across multiple cloud platforms. The bot integrates the Google Drive API and Rclone API to support high-speed mirroring to Google Drive, Mega, and other remote destinations, reducing manual upload efforts by up to 80%. It can fetch files from torrents, direct download links, or streaming sources using Aria2c, Qbittorrent, and YT-DLP. A custom FFmpeg-powered media toolkit enables pre-processing operations such as trimming, merging, conversion, and compression before upload, reducing manual editing overhead by 30–40%. To enhance efficiency, the bot implements API-based scraping and multithreading to automatically extract direct download links from popular movie sites like Cinevood, Movies4u, and SkymoviesHD, minimizing the time needed to prepare and share content by more than half. A built-in RSS automation pipeline continuously monitors new movie releases and triggers instant download workflows, ensuring 24/7 unattended operation. Beyond automation, the bot features a web-connected streaming UI built with JavaScript and Telegram indexing, allowing users to preview and stream media directly. It also includes a comprehensive misc toolkit offering OCR (Optical Character Recognition), TTS (Text-to-Speech), WebSS (Website Screenshot), Translate (message translation), Pahe search, VidSS, Thumb generation, and file conversion utilities — all seamlessly accessible within Telegram. The system is containerized with Docker for easy deployment and uses MongoDB for persistent user and task management, delivering a scalable, production-grade leeching ecosystem.",
    technologies: [
      "Python",
      "JavaScript",
      "MongoDB",
      "Docker",
      "Rclone",
      "QbitTorrent",
      "FFmpeg",
      "Telegram API(Pyrogram)",
      "Flask",
      "RSS Feeds",
    ],
    demoLink: "https://noname-stream.onrender.com/",
    githubLink: "https://github.com/DarkDemon1854/WZML-X",
  },
  {
    title: "Stream Live Link",
    image: project2,
    description:
      "Engineered a high-performance, full-stack movie streaming platform that indexes and streams content directly from Telegram channels, combining real-time database syncing with a visually immersive and responsive UI. The platform leverages The Movie Database (TMDB) API to dynamically fetch and display detailed metadata including movie posters, cast information, genres, and release details — creating a cinematic browsing experience. A robust backend, built with Node.js and MongoDB, integrates Telegram APIs to fetch and index media files, while the frontend, powered by React and Tailwind CSS, provides intuitive search, filtering, and category-based navigation. Google Firebase powers user authentication, session handling, and real-time updates, ensuring a secure and seamless viewing experience. To support monetization, the system incorporates URL shortener APIs such as ShrinkMe and Linkvertise to generate revenue through user access points, integrated cleanly into both frontend and backend flows. Users can stream directly from their browsers or external players like VLC, MX Player, and Stremio, or choose to download the files for offline access. The design emphasizes performance and scalability, with optimized loading pipelines, lazy thumbnail rendering, and cached metadata retrievals to deliver smooth playback even under heavy traffic. The platform is fully containerized using Docker and deployable on Vercel, ensuring high uptime and portability across environments. Overall, Stream Live Link demonstrates a complete ecosystem of content discovery, metadata enrichment, streaming flexibility, and monetization in a single, modern full-stack solution.",
    technologies: [
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "MongoDB",
      "Firebase",
      "Docker",
      "TMDB API",
      "Telegram API(Pyrogram)",
      "Node.js",
      "Vercel",
    ],
    demoLink: "https://songoku.vercel.app/",
    githubLink: {
      frontend: "https://github.com/DarkDemon1854/Frontend",
      backend: "https://github.com/DarkDemon1854/Stream-Backend",
    },
  },
];

export const CONTACT = {
  address: "Ranchi, Jharkhand, India ",
  phoneNo: "+91 9508943068 ",
  email: "rajshreer80@gmail.com",
};
