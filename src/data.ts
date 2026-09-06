export const resumeUrl =
  "https://drive.google.com/file/d/1upDGlALbQ2gzdtGEZpzHpH524VkU4V7z/view?usp=sharing";

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

export const glances = [
  {
    year: "SOTI, 2025",
    text: "Redesigned the app store for SOTI MobiControl with clean, easy-to-scan visuals.",
    result: "Friendlier to scan. Easier to navigate.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Person browsing apps on a smartphone",
  },
  {
    year: "SOTI, 2024",
    text: "Took initiative on screens left untouched for a decade after the legacy-to-Elevate UI update.",
    result: "Modern UX on the forgotten edges.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Product designer reviewing interface screens on a laptop",
  },
  {
    year: "SOTI, 2023",
    text: "Moved charts from 3D to 2D and reworked color and layout for faster data scanning.",
    result: "More accessible, easier-to-read analytics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Analytics charts and graphs on a display",
  },
  {
    year: "Hackathon",
    text: "Label Designer, a company hackathon app for designing, printing, and binding data to labels.",
    result: "End-to-end label workflow, designed in a sprint.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Warehouse labels and packaging on a workbench",
  },
  {
    year: "Floom, 2023",
    text: "Graduation project and full-time work at Unthinkable: a community and A-to-Z platform for new mothers.",
    result: "Community, shopping, journal, mood tracker.",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Parent holding a baby in soft natural light",
  },
  {
    year: "Unthinkable, 2022",
    text: "Audited and redesigned the ICAI official website for a client engagement.",
    result: "Clearer UI, fewer everyday experience issues.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bright office interior with people working at desks",
  },
];

export const quotes = [
  {
    name: "Manu Kamath",
    role: "Product design manager, SOTI · ex-BookMyShow",
    quote:
      "Shristy has quickly become a key contributor, shaping the design of SOTI Snap. She has also become the go-to person for developers, ensuring seamless collaboration between teams. If you think the SOTI Snap UI looks sharper, it’s because Shristy worked closely with our developers to aim for pixel perfection.",
  },
  {
    name: "Deepak Kumar",
    role: "Lead product manager, SOTI",
    quote:
      "Her commitment, creativity, and meticulous attention to detail have greatly enriched the user experience of the recent features she’s been involved in. She delivers UX with multiple variations, advocates for improvements, and grasps requirements in the first meeting.",
  },
  {
    name: "Eric Lo",
    role: "Technical product marketing manager, SOTI",
    quote:
      "She's great to work with, especially with the time zone difference. Very responsive, works outside of her core hours to accommodate requests, and is making a difference in our SOTI Snap features.",
  },
  {
    name: "Priyanshi Jain",
    role: "Senior product manager, SOTI",
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
