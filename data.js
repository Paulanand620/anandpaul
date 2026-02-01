// data.js
window.PORTFOLIO = {
    person: {
      fullName: "Anand Paul Nayak Banavath",
      headline: "Front-End / Web Developer | UI/UX Enthusiast | MS Graduate – University of North Texas | AWS Certified | Open to Full-Time Roles",
      location: "Denton, Texas, United States",
      email: "paulanand620@gmail.com",
      phone: "940-808-8674",
      linkedin: "https://www.linkedin.com/in/anand-paul-nayak-banavath",
      instagram: "https://www.instagram.com/b.anand_29_?igsh=cHgxNDZuZGZ4bWkz&utm_source=qr",
      facebook: "https://www.facebook.com/profile.php?id=100021958144854",
      portfolio: "https://anand-paul.vercel.app/",
      // Replace this with an actual hosted PDF URL when you have it:
      resumeUrl: "./assets/APNB_F_Resume_page-0001.jpg"
    },
  
    about: {
      summary: "",
      whatIDo: [
        "Build responsive, accessible UI with modern front-end tools (React, TypeScript, HTML/CSS/JS).",
        "Improve UX through testing, iteration, and consistency in components and design systems.",
        "Create dashboards and reporting (Power BI, Tableau) that translate data into decisions.",
        "Apply SEO, performance optimization, and WCAG-aligned accessibility practices."
      ],
      certifications: [
        "AWS Certified Cloud Practitioner (CLF-C02) Cert Prep",
        "Basics of JavaScript Programming Bootcamp",
        "HTML, CSS, & JavaScript - Certification Course for Beginners",
        "MySQL Essential Training",
        "The Complete 2023 Web Development Bootcamp"
      ]
    },
  
    stats: [
      { k: "3", v: "Primary roles (Zizmu, UNT, Globifye)" },
      { k: "4", v: "Featured projects (BI, Social, E-learning, IoT)" }
    ],
  
    miniTimeline: [
      { when: "Jan 2023 – Dec 2023", what: "Web Developer — Zizmu Software Solutions" },
      { when: "Jan 2024 – Jun 2025", what: "Web Developer — University of North Texas" },
      { when: "Feb 2025 – Jul 2025", what: "UI/UX Designer (Intern) — Globifye" }
    ],
  
    skills: [
      {
        group: "Web Development",
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Node.js", "Angular"]
      },
      {
        group: "Data & BI",
        items: ["Power BI (DAX, Data Modeling)", "Tableau", "Excel", "Data Cleaning & Transformation", "Data Visualization"]
      },
      {
        group: "Programming & Databases",
        items: ["Python", "SQL", "Java", "C++", "MySQL", "RDBMS", "Amazon RDS"]
      },
      {
        group: "Cloud & DevOps",
        items: ["AWS", "Azure", "GCP", "Git", "GitHub", "Jenkins", "Docker"]
      },
      {
        group: "Collaboration & UX",
        items: ["Figma", "Miro", "Lucidchart", "Zeplin", "Agile/Scrum", "Usability Testing"]
      }
    ],
  
    projects: [
      {
        id: "healthcare-dashboard",
        title: "Healthcare Dashboard — Frontend Assessment (Coalition Technologies)",
        subtitle: "Responsive UI build with Chart.js health metrics.",
        description:
          "Converted an Adobe XD design into a fully responsive HTML, CSS, and JavaScript interface with pixel-accurate implementation and dynamic UI behaviors, including Chart.js visualizations for patient health metrics.",
        image: "./assets/H_D.png",
        tags: ["HTML", "CSS", "JavaScript", "Chart.js", "Responsive"],
        highlights: [
          "Built pixel-accurate UI from Adobe XD with responsive layouts.",
          "Integrated Chart.js for blood pressure and health metrics.",
          "Kept structure clean and maintainable for scalability.",
          "Deployed via Netlify and tracked with GitHub."
        ],
        links: { demo: "https://lnkd.in/gu7EpHCD", github: "https://lnkd.in/g4ZSGJcS" }
      },
      {
        id: "ensureguard",
        title: "InsureGuard — Fraud Detection in Car Insurance Claims",
        subtitle: "Power BI dashboards + geospatial risk visuals for investigative insights.",
        description:
          "Designed Power BI dashboards to visualize claim trends and highlight suspicious clusters. Integrated multiple datasets to automate reporting and deliver actionable insights for examiners.",
        image: "./assets/I_C.png",
        tags: ["Power BI", "DAX", "Analytics", "Geospatial"],
        highlights: [
          "Built dashboards that surface fraud signals (trends, clusters, anomalies).",
          "Used mapping + advanced charts to identify high-risk areas.",
          "Integrated internal/external sources to improve reporting accuracy."
        ],
        links: { demo: "", github: "" }
      },
      {
        id: "ride-nest",
        title: "Ride Nest — Mobile Car Rental App (UI/UX Case Study)",
        subtitle: "Mobile-first UX with full booking journey in Figma.",
        description:
          "Designed a mobile-first car rental experience in Figma, covering the complete journey from onboarding to booking confirmation with a reusable design system and polished UI screens.",
        image: "./assets/R_N_M.png",
        tags: ["UI/UX", "Figma", "Design System", "Mobile"],
        highlights: [
          "Mapped end-to-end user flows and wireframes to high-fidelity screens.",
          "Built a reusable design system with typography, colors, and spacing.",
          "Applied UX best practices for forms, auth, and error handling.",
          "Prioritized usability, accessibility, and modern visual design."
        ],
        links: { demo: "https://www.figma.com/design/tL6rPWKYREBWD0QeuyD2IA/RideNest?node-id=0-1&t=GAXydvlngPVCkZEh-1", github: "" }
      },
      {
        id: "timewasters",
        title: "Timewasters on Social Media",
        subtitle: "Python cleaning + Tableau dashboards to understand usage behaviors.",
        description:
          "Cleaned and analyzed user engagement datasets with Python, then built interactive Tableau dashboards to track time allocation, engagement patterns, and trends by demographics.",
        image: "./assets/T_W_S.png",
        tags: ["Python", "Tableau", "Data Cleaning", "Visualization"],
        highlights: [
          "Produced interactive dashboards to explore engagement behaviors.",
          "Converted raw data into clear recommendations for productivity."
        ],
        links: { demo: "", github: "" }
      },
      {
        id: "elearning",
        title: "E-Learning Platform for School",
        subtitle: "React-based learning UI with real-time API integrations (front-end focus).",
        description:
          "Developed a scalable e-learning experience using React and real-time APIs, optimized for accessibility and cross-device usability. Coordinated milestones and documentation for enhancements.",
        image: "./assets/E_L_P.png",
        tags: ["React", "Accessibility", "APIs", "UI/UX"],
        highlights: [
          "Focused on navigation clarity for students/teachers/admins.",
          "Designed for accessibility and consistency across devices."
        ],
        links: { demo: "", github: "" }
      },
      {
        id: "iot-home",
        title: "IoT Smart Home Automation System",
        subtitle: "End-to-end prototype: lighting, security, climate controls with training & rollout.",
        description:
          "Led development of a smart home automation prototype integrating multiple device categories. Managed phases from architecture to deployment and user training; tracked inventory and usage reporting.",
        image: "./assets/I_O_T.png",
        tags: ["IoT", "System Design", "Prototyping"],
        highlights: [
          "Coordinated architecture + device integration + rollout.",
          "Created usage reporting and managed inventory/logistics."
        ],
        links: { demo: "", github: "" }
      }
    ],
  
    experience: [
      {
        role: "UI/UX Designer (Intern)",
        company: "Globifye",
        location: "Atlanta, Georgia, United States",
        dates: "Feb 2025 – Jul 2025",
        bullets: [
          "Designed user-centric interfaces with wireframing and prototyping.",
          "Built responsive web designs using HTML/CSS/JS and React.",
          "Conducted user research and usability testing to inform UI improvements.",
          "Improved performance, SEO, and accessibility using WCAG-aligned practices."
        ]
      },
      {
        role: "Web Developer",
        company: "University of North Texas (KNTU & NT Daily)",
        location: "Denton, Texas, United States",
        dates: "Jan 2024 – Jun 2025",
        bullets: [
          "Developed responsive interfaces using HTML/CSS/JS, React, and TypeScript.",
          "Worked with REST APIs and third-party integrations for dynamic web apps.",
          "Optimized UX for performance, cross-browser compatibility, and accessibility.",
          "Handled updates, bug fixes, and front-end improvements in Agile/Scrum."
        ]
      },
      {
        role: "Web Developer / Frontend Developer",
        company: "Zizmu Software Solutions Pvt Ltd",
        location: "Hyderabad, Telangana, India",
        dates: "Jan 2023 – Dec 2023",
        bullets: [
          "Built and enhanced web apps using HTML, CSS, JavaScript, and React.",
          "Collaborated cross-functionally to deliver responsive, user-friendly UI.",
          "Improved performance and implemented SEO/accessibility best practices.",
          "Conducted code reviews and shipped features based on feedback."
        ]
      }
    ],
  
    education: [
      {
        school: "University of North Texas",
        degree: "Master of Science in Information Science (Information Systems)",
        dates: "Jan 2024 – Dec 2025",
        details: ["GPA: 3.8"]
      },
      {
        school: "Narasaraopeta Engineering College",
        degree: "BTech, Mechanical Engineering",
        dates: "Jun 2019 – Jul 2022",
        details: ["GPA: 3.5"]
      },
      {
        school: "GVR & S College Of Engineering & Technology",
        degree: "Diploma, Mechanical Engineering",
        dates: "Jun 2015 – Jul 2019",
        details: ["GPA: 3.5"]
      }
    ],
  
    volunteering: [
      "BSM (Baptist Student Ministry) — media support (flyers, AV materials), events support",
      "Christian Campus Community (CCC) — media + events support",
      "APNA Hope — media + events support",
      "Swagath (UNT) — Treasurer & Coordinator; outreach/mentorship/international student support"
    ]
  };
  
