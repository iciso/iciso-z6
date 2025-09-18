export interface Organization {
  id: string
  name: string
  description: string
  location: string
  website: string
  themes: string[]
  opportunities: Opportunity[]
  image: string
  established: string
  languages: string[]
}

export interface Opportunity {
  id: string
  title: string
  description: string
  duration: string
  requirements: string[]
  benefits: string[]
  theme: string
  type: "volunteer" | "internship"
  remote: boolean
}

export const organizations: Organization[] = [
  {
    id: "iou",
    name: "Islamic Online University (IOU)",
    description:
      "A pioneering online Islamic university offering comprehensive Islamic education to students worldwide. IOU focuses on authentic Islamic knowledge based on the Quran and Sunnah.",
    location: "Gambia (Global Online)",
    website: "https://campus.iou.edu.gm/campus",
    themes: ["Quranic Studies", "Islamic Education"],
    image: "/islamic-university-campus-with-students-studying.jpg",
    established: "2007",
    languages: ["English", "Arabic"],
    opportunities: [
      {
        id: "iou-1",
        title: "Quran Memorization Assistant",
        description:
          "Help students with Quran memorization through online sessions and provide guidance on proper recitation techniques.",
        duration: "3-6 months",
        requirements: ["Hafiz/Hafiza certification", "Good internet connection", "Patience with students"],
        benefits: ["Certificate of service", "Teaching experience", "Spiritual reward"],
        theme: "Quranic Studies",
        type: "volunteer",
        remote: true,
      },
      {
        id: "iou-2",
        title: "Islamic Studies Research Intern",
        description:
          "Assist faculty members in research projects related to Islamic jurisprudence, history, and contemporary issues.",
        duration: "6-12 months",
        requirements: [
          "Bachelor's degree in Islamic Studies or related field",
          "Research skills",
          "Academic writing experience",
        ],
        benefits: ["Research experience", "Academic mentorship", "Publication opportunities"],
        theme: "Islamic Education",
        type: "internship",
        remote: true,
      },
    ],
  },
  {
    id: "mopa",
    name: "MOPA (Muslim Organization for Peace and Advocacy)",
    description:
      "A grassroots organization dedicated to promoting peace, justice, and positive representation of Muslims in society while combating Islamophobia.",
    location: "United States (Multiple Cities)",
    website: "https://mopacademy.org/?lang=en",
    themes: ["Islamophobia", "Dawah", "Community Service"],
    image: "/diverse-muslim-community-volunteers-working-togeth.jpg",
    established: "2015",
    languages: ["English", "Spanish", "Arabic"],
    opportunities: [
      {
        id: "mopa-1",
        title: "Community Outreach Volunteer",
        description:
          "Engage with local communities to build bridges, educate about Islam, and participate in interfaith dialogue initiatives.",
        duration: "2-4 months",
        requirements: ["Strong communication skills", "Cultural sensitivity", "Commitment to peaceful dialogue"],
        benefits: ["Community impact", "Interfaith experience", "Leadership development"],
        theme: "Dawah",
        type: "volunteer",
        remote: false,
      },
      {
        id: "mopa-2",
        title: "Anti-Islamophobia Campaign Intern",
        description:
          "Support campaigns to counter negative stereotypes about Muslims through social media, research, and community events.",
        duration: "4-8 months",
        requirements: ["Social media experience", "Research skills", "Understanding of current issues"],
        benefits: ["Campaign experience", "Social justice impact", "Professional networking"],
        theme: "Islamophobia",
        type: "internship",
        remote: true,
      },
      {
        id: "mopa-3",
        title: "Food Bank Volunteer Coordinator",
        description: "Organize and coordinate Muslim volunteers for local food banks and community service projects.",
        duration: "3-6 months",
        requirements: ["Organizational skills", "Leadership experience", "Commitment to service"],
        benefits: ["Leadership experience", "Community impact", "Service certificate"],
        theme: "Community Service",
        type: "volunteer",
        remote: false,
      },
    ],
  },
]

export const themes = [
  { id: "quranic-studies", name: "Quranic Studies", icon: "📖" },
  { id: "islamophobia", name: "Islamophobia", icon: "🤝" },
  { id: "dawah", name: "Dawah", icon: "💬" },
  { id: "islamic-education", name: "Islamic Education", icon: "🎓" },
  { id: "community-service", name: "Community Service", icon: "❤️" },
]
