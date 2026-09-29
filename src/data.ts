export const resumeUrl =
  "https://drive.google.com/file/d/1upDGlALbQ2gzdtGEZpzHpH524VkU4V7z/view?usp=sharing";

export const socials = {
  email: "mailto:shristi278@gmail.com",
  linkedin: "https://www.linkedin.com/in/shristi-suman-37034a1a1/",
  instagram: "https://www.instagram.com/builtbyshristi/",
  x: "https://x.com/shristydesign",
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
    image: "/work/lockdown-scene.webp",
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
    image: "/work/rack-request-scene.webp",
    imageAlt: "3D mockup of the Rack request inbox on a phone, with blue scene around the device",
  },
  {
    id: "03",
    metric: "Personal project",
    title: "Building a Digital Identity for Pet",
    blurb:
      "Designing a pet profile experience that preserves a pet’s personality, routines, health history and milestones while making adoption and breeding more informed and trustworthy.",
    tags: ["Pet Profiles", "Marketplace", "Community"],
    href: "https://www.figma.com/deck/eaH4cGZtzzzBsAJRF5HiPi",
    locked: false,
    image: "/work/pet-mockup.webp",
    imageAlt: "3D mockup of a pet profile app on a phone, with a golden retriever beside it",
  },
  {
    id: "04",
    comingSoon: true,
    title: "Still in process. It will be added here soon.",
    image: "/work/coming-soon.webp",
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
    image: "/work/glance-app-store.webp",
    imageAlt: "Laptop on a desk showing the me mate app store dashboard",
    video: "/work/glance_app_store.mp4",
    contain: true,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=317%2C90%2C0.06&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A785&show-proto-sidebar=1",
  },
  {
    year: "Illustration design",
    text:
      "I developed a new illustration style that communicates connectivity, efficiency, trust, diversity, technology and modularity. Inspired by visual systems from brands like CRED, Endel and Robinhood, I explored geometric forms and isometric compositions to create a distinctive and scalable visual language.\n\nI used Figma’s Fast Isometric plugin to transform shapes into isometric perspectives and build the illustrations efficiently. Also set Guideline for usage",
    result: "Isometric illustrations",
    image: "/work/glance-ui-isometrics.webp",
    imageAlt: "Isometric 3D illustrations of apps, files, settings, and devices",
    dialogImage: "/work/glance-ui-isometrics-full.webp",
    contain: true,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-1550%2C846%2C0.08&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=137%3A54439&show-proto-sidebar=1",
  },
  {
    year: "Game design",
    text:
      "I am designing a business board game inspired by Indian visual motifs and cultural elements. Each card represents a city, featuring its local currency and iconic architecture, while service cards such as the Post Office, Airplane and other utilities draw from vintage Indian design references.\n\nThe visual system combines nostalgia, cultural identity and playful game mechanics to create a cohesive board game experience.",
    result: "Business board game",
    image: "/work/glance-board-game.webp",
    imageAlt: "Hands playing an Indian city board game with cards, dice, and play money",
    dialogImage: "/work/glance-board-game-dialog.webp",
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-114%2C-1680%2C0.23&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A12217&show-proto-sidebar=1",
  },
  {
    year: "Hackathon",
    text:
      "### Label Designer\n\nAs part of a **2-day hackathon at SOTI**, I designed a label designer tool for warehouse managers to create and print product labels.\n\nThe tool supports **text, lines, icons, barcode and images**, along with AI-powered label generation through **text, voice prompts or uploaded reference images**. Users can also connect data through **REST APIs**, preview labels and export them as PDFs for printing.",
    result: "End-to-end label design software",
    image: "/work/glance-labelynk-desk.webp",
    imageAlt: "Laptop showing the SOTI LABELYNK label designer",
    video: "/work/label_designer.mp4",
    contain: true,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-71%2C514%2C0.03&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=137%3A44701&show-proto-sidebar=1",
  },
  {
    year: "App design",
    text:
      "I designed a mood-tracking feature for expecting and new moms, helping them recognise and reflect on emotional changes during pregnancy and postpartum.\n\nMoms can log how they feel, track mood patterns over time and access contextual suggestions based on emotions such as sadness, anger or stress. The app also includes community, journaling and e-commerce features, but this prototype focuses on the mood-tracking experience.",
    result: "Mood tracker for moms",
    image: "/work/glance-floom.webp",
    imageAlt: "Three phones showing Floom profile, mood tracker, and journal screens",
    video: "/work/moodtracker.mp4",
    contain: true,
    href: "https://www.figma.com/proto/aoD1eBc6KPq0Q7RX1AreGN/Projects-for-portfolio?node-id=0-1&p=f&viewport=-68%2C-5267%2C0.29&t=TKsmv9K0OBzWqZIi-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A22530&show-proto-sidebar=1",
  },
  {
    year: "Sketching",
    text:
      "A personal side project exploring the connection between birth flowers, months and personality. I hand-sketched 12 flowers, each representing a month, and transformed them into a visual calendar.\n\nEach month also includes personality traits and behaviours associated with its birth flower, combining illustration, storytelling and calendar design into one cohesive experience.",
    result: "Birth flower illustrations",
    image: "/work/glance-sketches.webp",
    imageAlt: "Hand sketching labeled botanical flower studies on paper",
    dialogImage: "/work/glance-birth-calendar.webp",
    href: "https://www.figma.com/proto/wbEJrqHyy1mVxpqSQoCYYR/ICAI-Website-1?node-id=0-1&p=f&viewport=-922%2C376%2C0.22&t=antZOwZ7oktD9hKc-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=183%3A639",
  },
];

export const quotes = [
  {
    name: "Manu Kamath",
    role: "Product design manager, SOTI · ex-BookMyShow",
    photo: "/quotes/manu.webp",
    quote:
      "Shristi has quickly become a key contributor, shaping the design of SOTI Snap. She has also become the go-to person for developers, ensuring seamless collaboration between teams. If you think the SOTI Snap UI looks sharper, it’s because Shristi worked closely with our developers to aim for pixel perfection.",
  },
  {
    name: "Deepak Kumar",
    role: "Lead product manager, SOTI",
    photo: "/quotes/deepak.webp",
    quote:
      "Her commitment, creativity, and meticulous attention to detail have greatly enriched the user experience of the recent features she’s been involved in. She delivers UX with multiple variations, advocates for improvements, and grasps requirements in the first meeting.",
  },
  {
    name: "Eric Lo",
    role: "Technical product marketing manager, SOTI",
    photo: "/quotes/eric.webp",
    quote:
      "She's great to work with, especially with the time zone difference. Very responsive, works outside of her core hours to accommodate requests, and is making a difference in our SOTI Snap features.",
  },
  {
    name: "Priyanshi Jain",
    role: "Senior product manager, SOTI",
    photo: "/quotes/priyanshi.webp",
    quote:
      "I appreciate Shristi for the fresh perspective that she brings. Her attention to detail and the usage of such beautiful icons is so new. Also, she respects the deadlines, which are always pressing in MobiControl.",
  },
];

export const aboutRibbon =
  "Nominated MVP for shipping design system — SOTI";

export const aboutRibbonAlt =
  "Recognised in Global PM meet at SOTI for New illustration style";

export const aboutPicksCopy = {
  title: "Who am I?",
  paragraphs: [
    "Hi, I’m Shristi.",
    "I’m a product designer who likes figuring out why something feels complicated, then making it feel obvious.",
    "I’ve worked across research, consumer products and complex B2B software. Today, I design enterprise experiences at SOTI, where the problems are rarely small and the interfaces definitely aren’t simple.",
    "I studied Fashion Communication at NIFT, which probably explains why I care a little too much about typography, visual details and how things feel.",
    "I’m interested in the space where systems, technology and human behaviour meet.",
    "When I’m not designing, I’m usually watching K dramas, playing badminton, experimenting with visuals or wondering why someone decided that particular button should be there.",
  ],
};

export type AboutPick = {
  title: string;
  image: string;
  imageAlt: string;
  caption: string;
  video?: string;
  focus?: string;
};

export const aboutPicks: AboutPick[] = [
  {
    title: "Chai in the hills",
    caption: "chai",
    image: "/about/polaroids/chai.jpg",
    imageAlt: "Hand holding a small cup of chai against mountain hills",
    focus: "center 58%",
  },
  {
    title: "Palm sunset",
    caption: "sunset",
    image: "/about/polaroids/sunset.jpg",
    imageAlt: "Palm trees against an ocean sunset",
    focus: "center 62%",
  },
  {
    title: "Badminton night",
    caption: "badminton",
    image: "/about/polaroids/badminton.jpg",
    imageAlt: "Playing badminton indoors on a green court",
    focus: "center 22%",
  },
  {
    title: "Pangong lake",
    caption: "pangong",
    image: "/about/polaroids/pangong.jpg",
    imageAlt: "Standing by a turquoise mountain lake in Ladakh",
    focus: "center 28%",
  },
  {
    title: "Jaipur fort",
    caption: "jaipur",
    image: "/about/polaroids/jaipur.jpg",
    imageAlt: "Amber Fort courtyard in Jaipur",
    focus: "center 72%",
  },
  {
    title: "Old town lanes",
    caption: "lanes",
    image: "/about/polaroids/lanes.jpg",
    imageAlt: "A narrow street with scooters and tiled rooftops",
    focus: "center 55%",
  },
  {
    title: "A tiny daisy",
    caption: "daisy",
    image: "/about/polaroids/daisy.jpg",
    imageAlt: "Hand holding a small white daisy",
    focus: "center 52%",
  },
  {
    title: "Go-karting",
    caption: "karting",
    image: "/about/polaroids/karting.jpg",
    imageAlt: "Sitting on a go-kart at the track at night",
    focus: "center 32%",
  },
  {
    title: "Hill rain",
    caption: "rain",
    image: "/about/polaroids/rain.jpg",
    imageAlt: "Standing on a wet mountain road in the rain",
    focus: "center 28%",
  },
  {
    title: "Coastline",
    caption: "coast",
    image: "/about/polaroids/coast.jpg",
    imageAlt: "Palm-lined beach and ocean under a wide blue sky",
    focus: "center 68%",
  },
  {
    title: "Stepwell",
    caption: "stepwell",
    image: "/about/polaroids/stepwell.jpg",
    imageAlt: "Stone stepwell with geometric staircases and water",
    focus: "center 42%",
  },
  {
    title: "Graduation",
    caption: "graduation",
    image: "/about/polaroids/saree.jpg",
    imageAlt: "Wearing a cream saree with a grey stole at night",
    focus: "center 8%",
  },
  {
    title: "Paddle boats",
    caption: "boats",
    image: "/about/polaroids/boats.jpg",
    imageAlt: "Dragon paddle boats on a hill lake at dusk",
    focus: "center 48%",
  },
  {
    title: "Kayak palms",
    caption: "kayak",
    image: "/about/polaroids/kayak.jpg",
    imageAlt: "Kayaking through a coconut palm canal",
    focus: "center 70%",
  },
  {
    title: "Gym hour",
    caption: "gym",
    image: "/about/polaroids/gym.jpg",
    imageAlt: "Gym mirror selfie in workout gloves",
    focus: "center 12%",
  },
  {
    title: "Ladakh horse",
    caption: "ladakh",
    image: "/about/polaroids/ladakh.jpg",
    imageAlt: "A horse standing in a high-altitude desert under clouds",
    focus: "center 68%",
  },
  {
    title: "City stroll",
    caption: "stroll",
    image: "/about/polaroids/stroll.jpg",
    imageAlt: "Walking under a tree with a tote bag and white sneakers",
    focus: "center 48%",
  },
  {
    title: "Park cricket",
    caption: "cricket",
    image: "/about/polaroids/cricket.jpg",
    imageAlt: "Friends playing cricket in a sunny park",
    focus: "center 52%",
  },
  {
    title: "Golden hour",
    caption: "sun",
    image: "/about/polaroids/sun.jpg",
    imageAlt: "Hand covering the face in warm sunlight",
    focus: "center 22%",
  },
  {
    title: "Prayer flags",
    caption: "flags",
    image: "/about/polaroids/flags.jpg",
    imageAlt: "Tall pines strung with colorful prayer flags",
    focus: "center 35%",
  },
  {
    title: "Haridwar ghat",
    caption: "haridwar",
    image: "/about/polaroids/haridwar.jpg",
    imageAlt: "Clock tower and river ghats seen through carved arches",
    focus: "center 38%",
  },
  {
    title: "River bridge",
    caption: "bridge",
    image: "/about/polaroids/bridge.jpg",
    imageAlt: "Standing on a wooden bridge over a mountain river",
    focus: "center 32%",
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

export const essayHref = "/writing/portfolio-with-ai";

export const essay = {
  slug: essayHref,
  title: "How I Built My Portfolio With AI",
  subtitle:
    "A year of rejected designs, one very specific visual direction and a month of building with ChatGPT + Cursor.",
  meta: "PROCESS / AI × DESIGN / 2026",
  description:
    "How Shristi Suman spent a year rejecting polished portfolios, landed on Neo-Y2K × digital brutalism, and built the live site in a month with ChatGPT, Cursor, GitHub and Vercel.",
  author: "Shristi Suman",
  date: "2026",
  keywords: [
    "product design",
    "AI-assisted design",
    "AI prototyping",
    "Cursor",
    "ChatGPT",
    "Neo-Y2K",
    "digital brutalism",
    "portfolio design",
  ],
  thumbnail: {
    src: "/writing/experiment-thumb-b.webp",
    alt: "A designer at a laptop looking up at a night sky of floating screens, sketches, and 3D objects.",
  },
  hero: {
    src: "/hero/girl.webp",
    alt: "Final portfolio hero character: a 3D illustrated woman looking aside, the centrepiece of the live site.",
  },
  collage: [
    {
      src: "/writing/rejected-notebook.webp",
      alt: "Earlier newspaper-style portfolio: Designer’s Notebook, serif type, and a high-contrast portrait.",
    },
    {
      src: "/writing/rejected-dark.webp",
      alt: "Earlier dark portfolio with pixel-art flower, pixel type, and SOTI-focused intro copy.",
    },
    {
      src: "/writing/rejected-curiosity.webp",
      alt: "Earlier minimal portfolio with stacked headlines and a painted landscape hero.",
    },
  ],
  mood: [
    {
      src: "/writing/moodboard-type.webp",
      alt: "Figma type sheet with Champ for headings and Degular for body.",
    },
    {
      src: "/writing/moodboard-color.webp",
      alt: "Figma color palette and Neo-Brutalism visual-language references.",
    },
    {
      src: "/writing/moodboard-layout.webp",
      alt: "Figma visual-language board of bold poster layouts and type-led compositions.",
    },
    {
      src: "/writing/moodboard-language.webp",
      alt: "Figma visual-language board of stickers, illustration, and Y2K graphic references.",
    },
  ],
  process: [
    {
      src: "/hero/composite.webp",
      alt: "Early hero composition with the 3D character and floating objects.",
      label: "Hero concept",
    },
    {
      src: "/hero/stripes.webp",
      alt: "Bold stripe graphic from an animation-led hero idea that did not ship.",
      label: "Animation miss",
    },
    {
      src: "/about/stickers/five-years.webp",
      alt: "Holographic five-year experience sticker from the asset experiments.",
      label: "Stickers",
    },
    {
      src: "/hero/girl.webp",
      alt: "Custom 3D character developed after Pinterest references and ChatGPT prompts.",
      label: "3D character",
    },
    {
      src: "/hero/star.webp",
      alt: "Chrome star object from the final Neo-Y2K visual language.",
      label: "Final language",
    },
  ],
  cursor: {
    src: "/hero/girl-work.webp",
    alt: "The portfolio character in a working pose, standing in for the shift from Figma into Cursor and the browser.",
  },
  failures: [
    {
      src: "/writing/fail-balloons.webp",
      alt: "Cursor thread iterating the footer balloon letters: delayed rise, uneven heights, then a hitch while they float to the top edge.",
    },
    {
      src: "/writing/fail-checker.webp",
      alt: "Cursor thread fixing the About checker: clipped half-squares, side gaps, then leftover white space under the last row.",
    },
    {
      src: "/writing/fail-banners.webp",
      alt: "Cursor thread removing a banner overlay and smoothing a glitchy settle animation on scroll.",
    },
    {
      src: "/writing/fail-overflow.webp",
      alt: "Cursor thread fixing horizontal overflow from the banners and leftover space between Favourite work and the footer.",
    },
  ],
  finale: {
    src: "/hero/composite.webp",
    alt: "Full hero of the finished portfolio, with the 3D character, charms and the live visual language.",
  },
};

export const essayDifferentHref = "/writing/being-different-in-an-ai-world";

export const essayDifferent = {
  slug: essayDifferentHref,
  title: "Being Different in an AI World",
  subtitle:
    "The easier it becomes to make things, the harder it becomes to make something that feels like you.",
  meta: "THOUGHT / AI × DESIGN / 2025",
  description:
    "Shristi Suman on taste, point of view, and why being a designer in an AI world is less about tools and more about having something personal to say.",
  author: "Shristi Suman",
  date: "2025",
  keywords: [
    "product design",
    "AI",
    "design taste",
    "point of view",
    "AI-assisted design",
  ],
  thumbnail: {
    src: "/writing/experiment-different.webp",
    alt: "A human hand and a robotic hand drawing toward the same point on a blank sheet of paper.",
  },
};

export const essays = [essay, essayDifferent];
