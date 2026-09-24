export const resumeUrl =
  "https://drive.google.com/file/d/1upDGlALbQ2gzdtGEZpzHpH524VkU4V7z/view?usp=sharing";

export const socials = {
  email: "mailto:shristi278@gmail.com",
  linkedin: "https://www.linkedin.com/in/shristi-suman-37034a1a1",
  instagram: "https://www.instagram.com/_shristi.suman_/",
} as const;

export type Project = {
  id: string;
  title: string;
  metric?: string;
  blurb?: string;
  tags?: string[];
  href?: string;
  internal?: boolean;
  locked?: boolean;
  image?: string;
  imageAlt?: string;
  video?: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    metric: "10K → 510K devices in 4 months. Rapid scale-up post launch.",
    title: "Modernising the Lockdown Feature",
    blurb:
      "Redesigning the Lockdown home screen template experience for Snap, turning administrative friction into seamless device governance.",
    tags: ["SOTI Snap", "Enterprise", "Systems"],
    href: "https://www.figma.com/deck/calSb1vYoF3p7QbqP4OIE4/Lockdown-modernisation?node-id=1-3319",
    locked: true,
    image: "/work/lockdown-scene.jpg",
    imageAlt: "3D mockup of Create lockdown app setup with theme picker and device preview",
  },
  {
    id: "02",
    metric: "Potential to increase development velocity by 40%",
    title: "From legacy to Material 3",
    blurb:
      "Reimagined the Android experience after 15 years, from fragmented legacy UI to a unified, scalable system with Material Design 3.",
    tags: ["Android", "Material 3", "Design system"],
    href: "/work/material-3",
    internal: true,
    locked: false,
    image: "/work/rack-request-scene.jpg",
    imageAlt: "3D mockup of the Rack request inbox on a phone, with blue scene around the device",
  },
  {
    id: "03",
    metric: "Personal project",
    title: "Building a Digital Identity for Pet",
    blurb:
      "Designing a pet profile experience that preserves a pet’s personality, routines, health history and milestones while making adoption and breeding more informed and trustworthy.",
    tags: ["Pet Profiles", "Marketplace", "Community"],
    href: "https://builtbyshristi.com/project-1",
    locked: false,
    image: "/work/pet-mockup.jpg",
    imageAlt: "3D mockup of a pet profile app on a phone, with a golden retriever beside it",
  },
  {
    id: "04",
    comingSoon: true,
    title: "Still in process...\nit will be added here soon ⌚️",
    image: "/work/coming-soon.png",
    imageAlt: "3D illustration of a designer working on a laptop in an orange beanbag",
  },
];

export type Glance = {
  year: string;
  text: string;
  result: string;
  image: string;
  imageAlt: string;
  href: string;
  video?: string;
  videoRadius?: number;
  dialogImage?: string;
  contain?: boolean;
};

export const glances: Glance[] = [
  {
    year: "Web design",
    text:
      "An enterprise app management platform designed for company-managed devices. It allows IT teams to control which apps employees can access and download, while giving users a simple way to discover approved applications.\n\nApps are organized into categories like **Enterprise Apps** and **Microsoft Apps**, with clear installation and availability statuses.",
    result: "App market for B2B companies",
    image: "/work/glance-app-store.jpg",
    imageAlt: "3D workspace with a laptop showing an app store dashboard",
    video: "/work/glance-app-b2b.mov",
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=317%2C90%2C0.06&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A785&show-proto-sidebar=1",
  },
  {
    year: "Illustration design",
    text:
      "I developed a new illustration style that communicates connectivity, efficiency, trust, diversity, technology and modularity. Inspired by visual systems from brands like CRED, Endel and Robinhood, I explored geometric forms and isometric compositions to create a distinctive and scalable visual language.\n\nI used Figma’s Fast Isometric plugin to transform shapes into isometric perspectives and build the illustrations efficiently. Also set Guideline for usage",
    result: "Isometric illustrations",
    image: "/work/glance-ui-isometrics.jpg",
    imageAlt: "Isometric 3D illustrations of apps, files, settings, and devices",
    dialogImage: "/work/glance-ui-isometrics.png",
    contain: true,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-1550%2C846%2C0.08&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=137%3A54439&show-proto-sidebar=1",
  },
  {
    year: "Game design",
    text:
      "I am designing a business board game inspired by Indian visual motifs and cultural elements. Each card represents a city, featuring its local currency and iconic architecture, while service cards such as the Post Office, Airplane and other utilities draw from vintage Indian design references.\n\nThe visual system combines nostalgia, cultural identity and playful game mechanics to create a cohesive board game experience.",
    result: "Business board game",
    image: "/work/glance-board-game.jpg",
    imageAlt: "Hands playing an Indian city board game with cards, dice, and play money",
    dialogImage: "/work/glance-board-game-dialog.jpg",
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-114%2C-1680%2C0.23&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A12217&show-proto-sidebar=1",
  },
  {
    year: "Hackathon",
    text:
      "### Label Designer\n\nAs part of a **2-day hackathon at SOTI**, I designed a label designer tool for warehouse managers to create and print product labels.\n\nThe tool supports **text, lines, icons, barcode and images**, along with AI-powered label generation through **text, voice prompts or uploaded reference images**. Users can also connect data through **REST APIs**, preview labels and export them as PDFs for printing.",
    result: "End-to-end label design software",
    image: "/work/glance-labelynk-desk.jpg",
    imageAlt: "Laptop on a desk showing the SOTI LABELYNK label designer",
    video: "/work/glance-labelynk.mov",
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-71%2C514%2C0.03&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=137%3A44701&show-proto-sidebar=1",
  },
  {
    year: "App design",
    text:
      "I designed a mood-tracking feature for expecting and new moms, helping them recognise and reflect on emotional changes during pregnancy and postpartum.\n\nMoms can log how they feel, track mood patterns over time and access contextual suggestions based on emotions such as sadness, anger or stress. The app also includes community, journaling and e-commerce features, but this prototype focuses on the mood-tracking experience.",
    result: "Mood tracker for moms",
    image: "/work/glance-floom.jpg",
    imageAlt: "Three phones showing Floom profile, mood tracker, and journal screens",
    video: "/work/glance-mood-tracker.mov",
    videoRadius: 32,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-68%2C-5267%2C0.29&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A22530&show-proto-sidebar=1",
  },
  {
    year: "Sketching",
    text:
      "A personal side project exploring the connection between birth flowers, months and personality. I hand-sketched 12 flowers, each representing a month, and transformed them into a visual calendar.\n\nEach month also includes personality traits and behaviours associated with its birth flower, combining illustration, storytelling and calendar design into one cohesive experience.",
    result: "Birth flower illustrations",
    image: "/work/glance-sketches.jpg",
    imageAlt: "Hand sketching labeled botanical flower studies on paper",
    dialogImage: "/work/glance-birth-calendar.png",
    href: "https://www.figma.com/proto/wbEJrqHyy1mVxpqSQoCYYR/ICAI-Website-1?node-id=0-1&p=f&viewport=-922%2C376%2C0.22&t=antZOwZ7oktD9hKc-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=183%3A639",
  },
];

export const quotes = [
  {
    name: "Manu Kamath",
    role: "Product design manager, SOTI · ex-BookMyShow",
    photo: "/quotes/manu.jpg",
    quote:
      "Shristy has quickly become a key contributor, shaping the design of SOTI Snap. She has also become the go-to person for developers, ensuring seamless collaboration between teams. If you think the SOTI Snap UI looks sharper, it’s because Shristy worked closely with our developers to aim for pixel perfection.",
  },
  {
    name: "Deepak Kumar",
    role: "Lead product manager, SOTI",
    photo: "/quotes/deepak.jpg",
    quote:
      "Her commitment, creativity, and meticulous attention to detail have greatly enriched the user experience of the recent features she’s been involved in. She delivers UX with multiple variations, advocates for improvements, and grasps requirements in the first meeting.",
  },
  {
    name: "Eric Lo",
    role: "Technical product marketing manager, SOTI",
    photo: "/quotes/eric.jpg",
    quote:
      "She's great to work with, especially with the time zone difference. Very responsive, works outside of her core hours to accommodate requests, and is making a difference in our SOTI Snap features.",
  },
  {
    name: "Priyanshi Jain",
    role: "Senior product manager, SOTI",
    photo: "/quotes/priyanshi.jpg",
    quote:
      "I appreciate Shristy for the fresh perspective that she brings. Her attention to detail and the usage of such beautiful icons is so new. Also, she respects the deadlines, which are always pressing in MobiControl.",
  },
];

export const skills = [
  "Product design",
  "Enterprise UX",
  "Design systems",
  "Android",
  "Material 3",
  "Research",
  "Prototyping",
  "Developer collaboration",
  "Visual design",
  "Theming",
];
