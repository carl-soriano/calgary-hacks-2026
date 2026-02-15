export interface Article {
  id: number
  title: string
  source: string
  description: string
  url: string
  category: string
}

const articles: Article[] = [
  // --- Learn About AI ---
  {
    id: 1,
    title: "Artificial Intelligence",
    source: "Britannica Kids",
    description:
      "A kid-friendly introduction to what artificial intelligence is, how it works, and where it shows up in everyday life.",
    url: "https://kids.britannica.com/kids/article/artificial-intelligence/390648",
    category: "Learn About AI",
  },
  {
    id: 2,
    title: "What Is AI? (Grades 5–8)",
    source: "NASA",
    description:
      "NASA explains how artificial intelligence helps scientists explore space, analyze data, and solve problems beyond human speed.",
    url: "https://www.nasa.gov/learning-resources/what-is-ai-grades-5-8/",
    category: "Learn About AI",
  },
  {
    id: 3,
    title: "Artificial Intelligence (AI)",
    source: "Britannica Students",
    description:
      "A more in-depth encyclopedia entry covering the history, types, and future of artificial intelligence for older students.",
    url: "https://kids.britannica.com/students/article/artificial-intelligence-AI/272968",
    category: "Learn About AI",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    source: "Fact Monster",
    description:
      "Quick-reference overview of AI concepts including machine learning, neural networks, and how computers can learn from data.",
    url: "https://www.factmonster.com/dk/encyclopedia/science/artificial-intelligence",
    category: "Learn About AI",
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    source: "Kiddle",
    description:
      "A simple, visual encyclopedia article that breaks down AI into easy-to-understand sections with images and examples.",
    url: "https://kids.kiddle.co/Artificial_intelligence",
    category: "Learn About AI",
  },
  {
    id: 6,
    title: "Explore the Exciting World of AI",
    source: "Nat Geo Kids",
    description:
      "Discover how AI is used in nature research, wildlife tracking, and more — plus hands-on activities with the Raspberry Pi Foundation.",
    url: "https://www.natgeokids.com/uk/discover/science/explore-the-exciting-world-of-ai-with-the-raspberry-pi-foundation/",
    category: "Learn About AI",
  },
  {
    id: 7,
    title: "How Artificial Intelligence Works",
    source: "Code.org",
    description:
      "A curriculum-aligned explainer from Code.org that walks through the fundamentals of how AI systems learn and make decisions.",
    url: "https://code.org/en-US/curriculum/how-artificial-intelligence-works",
    category: "Learn About AI",
  },
  {
    id: 8,
    title: "Training Artificial Intelligence",
    source: "PBS / NOVA",
    description:
      "A short video resource from NOVA exploring how AI systems are trained using large datasets and pattern recognition.",
    url: "https://www.pbslearningmedia.org/resource/nvair-sci-trainingai/training-artificial-intelligence-nova/",
    category: "Learn About AI",
  },

  // --- AI in Society ---
  {
    id: 9,
    title: "Is AI Good for Society? (Grades 3–4)",
    source: "Time for Kids",
    description:
      "Two sides of the debate — young readers explore whether artificial intelligence helps or hurts the world around us.",
    url: "https://www.timeforkids.com/g34/is-ai-good-for-society-g3/",
    category: "AI in Society",
  },
  {
    id: 10,
    title: "Is AI Good for Society? (Grades 5–6)",
    source: "Time for Kids",
    description:
      "An age-appropriate debate article letting older kids weigh the benefits and risks of AI in schools, jobs, and daily life.",
    url: "https://www.timeforkids.com/g56/is-ai-good-for-society-g5/",
    category: "AI in Society",
  },
  {
    id: 11,
    title: "Should Kids Use AI to Do Schoolwork?",
    source: "Time for Kids",
    description:
      "A thought-provoking article asking whether using AI tools like chatbots for homework is helpful learning or just cheating.",
    url: "https://www.timeforkids.com/g56/should-kids-use-ai-to-do-schoolwork-g5/",
    category: "AI in Society",
  },
  {
    id: 12,
    title: "Could a Robot Become President?",
    source: "National Geographic Kids",
    description:
      "A fun, imaginative look at whether robots and AI could ever hold political office — and what that would mean for democracy.",
    url: "https://kids.nationalgeographic.com/books/article/could-a-robot-become-president",
    category: "AI in Society",
  },
  {
    id: 13,
    title: "Will Robots Take Over?",
    source: "National Geographic Education",
    description:
      "Explores the future of robotics and AI in the workforce, asking big questions about automation, creativity, and human jobs.",
    url: "https://education.nationalgeographic.org/resource/will-future-robots-and-i-take-over/",
    category: "AI in Society",
  },
  {
    id: 14,
    title: "The Rise of AI",
    source: "Scholastic Storyworks",
    description:
      "A feature article for middle schoolers covering how AI burst onto the scene and what it means for the next generation.",
    url: "https://storyworks.scholastic.com/issues/2024-25/030125/the-rise-of-ai.html",
    category: "AI in Society",
  },
  {
    id: 15,
    title: "5 Big Questions About Artificial Intelligence",
    source: "Scholastic News",
    description:
      "Answers the five questions kids ask most about AI — from 'Can it think?' to 'Will it replace teachers?'",
    url: "https://sn56.scholastic.com/issues/2023-24/041524/5-big-questions-about-artificial-intelligence.html",
    category: "AI in Society",
  },
  {
    id: 16,
    title: "The Rise of AI",
    source: "Scholastic Scope",
    description:
      "A deep-dive article for teens examining how AI is reshaping industries, raising ethical dilemmas, and sparking debate.",
    url: "https://scope.scholastic.com/issues/2023-24/040124/the-rise-of-ai.html",
    category: "AI in Society",
  },
  {
    id: 17,
    title: "Recognizing AI-Generated Content",
    source: "PBS NewsHour Classroom",
    description:
      "A lesson plan that teaches students how to spot deepfakes, AI-written text, and synthetic media in the wild.",
    url: "https://www.pbs.org/newshour/classroom/lesson-plans/2025/04/recognizing-ai-generated-content",
    category: "AI in Society",
  },

  // --- Interactive AI Tools ---
  {
    id: 18,
    title: "Quick, Draw!",
    source: "Google",
    description:
      "Can a neural network learn to recognize your doodles? Draw something and watch AI try to guess what it is in real time!",
    url: "https://quickdraw.withgoogle.com/",
    category: "Interactive Tools",
  },
  {
    id: 19,
    title: "Quick, Draw! — AI Experiment",
    source: "Google AI Experiments",
    description:
      "Explore the dataset behind Quick, Draw! — millions of doodles used to train a machine-learning model to recognize sketches.",
    url: "https://experiments.withgoogle.com/quick-draw",
    category: "Interactive Tools",
  },
  {
    id: 20,
    title: "Teachable Machine",
    source: "Google",
    description:
      "Train your own machine-learning model right in the browser — no coding required. Teach it to recognize images, sounds, or poses.",
    url: "https://teachablemachine.withgoogle.com/",
    category: "Interactive Tools",
  },
  {
    id: 21,
    title: "Machine Learning for Kids",
    source: "machinelearningforkids.co.uk",
    description:
      "A hands-on tool that lets kids build AI projects in Scratch, Python, or App Inventor — learning by doing.",
    url: "https://machinelearningforkids.co.uk/",
    category: "Interactive Tools",
  },
  {
    id: 22,
    title: "ML for Kids — Worksheets",
    source: "machinelearningforkids.co.uk",
    description:
      "Step-by-step activity worksheets to guide kids through building their own machine-learning projects from scratch.",
    url: "https://machinelearningforkids.co.uk/worksheets",
    category: "Interactive Tools",
  },
  {
    id: 23,
    title: "Scratch Machine Learning Path",
    source: "Raspberry Pi Foundation",
    description:
      "A guided learning pathway that teaches machine-learning concepts through fun Scratch programming projects.",
    url: "https://projects.raspberrypi.org/en/pathways/scratch-machine-learning",
    category: "Interactive Tools",
  },

  // --- Curriculum & Lessons ---
  {
    id: 24,
    title: "AI Learning Resources",
    source: "PBS Learning Media",
    description:
      "A curated collection of videos, interactives, and lesson plans about artificial intelligence and computational thinking.",
    url: "https://www.pbslearningmedia.org/subjects/engineering--technology/systems--technologies/computational/artificial-intelligence/",
    category: "Curriculum & Lessons",
  },
  {
    id: 25,
    title: "Day of AI — Curriculum Resources",
    source: "Day of AI",
    description:
      "Free, ready-to-use lesson plans designed for a single class period to introduce K-12 students to AI concepts.",
    url: "https://dayofai.org/curriculum-resources",
    category: "Curriculum & Lessons",
  },
  {
    id: 26,
    title: "AI & ChatGPT Lesson Collection",
    source: "Science Journal for Kids",
    description:
      "Lesson ideas built around real scientific papers on AI and ChatGPT, adapted for younger readers and classroom discussion.",
    url: "https://www.sciencejournalforkids.org/articles/lesson-ideas/ai-and-chatgpt-collection/",
    category: "Curriculum & Lessons",
  },
  {
    id: 27,
    title: "Artificial Intelligence Articles",
    source: "Science Journal for Kids",
    description:
      "Browse research-backed articles about AI topics written at a level kids can actually understand and learn from.",
    url: "https://www.sciencejournalforkids.org/key-word/artificial-intelligence/",
    category: "Curriculum & Lessons",
  },
  {
    id: 28,
    title: "AI Education",
    source: "Raspberry Pi Foundation",
    description:
      "Teaching resources and guides for educators to bring AI and machine learning into the classroom with confidence.",
    url: "https://www.raspberrypi.org/teach/ai-education",
    category: "Curriculum & Lessons",
  },
  {
    id: 29,
    title: "Foundations of AI — Lesson 1",
    source: "Experience AI",
    description:
      "The first lesson in a structured AI course covering what AI is, how it learns, and why it matters to young people.",
    url: "https://experience-ai.org/en/units/foundations-of-ai/lessons/1",
    category: "Curriculum & Lessons",
  },
  {
    id: 30,
    title: "AI Projects, Lessons & Activities",
    source: "Science Buddies",
    description:
      "Hands-on science fair projects and classroom activities that let students experiment with AI and machine learning.",
    url: "https://www.sciencebuddies.org/projects-lessons-activities/artificial-intelligence",
    category: "Curriculum & Lessons",
  },
  {
    id: 31,
    title: "AI Unlocked",
    source: "PBS NewsHour Classroom",
    description:
      "A growing series of classroom-ready resources exploring AI's impact on media, politics, jobs, and everyday life.",
    url: "https://www.pbs.org/newshour/classroom/tag/ai-unlocked",
    category: "Curriculum & Lessons",
  },
  {
    id: 32,
    title: "AI for Education",
    source: "Khan Academy",
    description:
      "Khan Academy's hub for understanding how AI is transforming education — with courses, tools, and teacher guides.",
    url: "https://www.khanacademy.org/college-careers-more/ai-for-education",
    category: "Curriculum & Lessons",
  },
  {
    id: 33,
    title: "AI4K12 Initiative",
    source: "AI4K12",
    description:
      "National guidelines for teaching AI in K-12, including the 'Five Big Ideas in AI' framework used by educators worldwide.",
    url: "https://ai4k12.org/",
    category: "Curriculum & Lessons",
  },
  {
    id: 34,
    title: "Big Ideas in AI — Poster",
    source: "AI4K12",
    description:
      "A visual poster summarizing the Five Big Ideas in AI — perception, representation, learning, interaction, and impact.",
    url: "https://ai4k12.org/resources/big-ideas-poster/",
    category: "Curriculum & Lessons",
  },
  {
    id: 35,
    title: "AI Activities for Students",
    source: "AI4K12",
    description:
      "A library of unplugged and digital activities aligned to the Five Big Ideas, organized by grade level and topic.",
    url: "https://ai4k12.org/activities/",
    category: "Curriculum & Lessons",
  },

  // --- Parent & Teacher Guides ---
  {
    id: 36,
    title: "Parents' Ultimate Guide to Generative AI",
    source: "Common Sense Media",
    description:
      "Everything parents need to know about ChatGPT, image generators, and other generative AI tools their kids may be using.",
    url: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-generative-ai",
    category: "Parent & Teacher Guides",
  },
  {
    id: 37,
    title: "AI Tips and Videos",
    source: "Common Sense Media",
    description:
      "Short, practical videos and tips for families to navigate AI safely, set boundaries, and have informed conversations.",
    url: "https://www.commonsensemedia.org/ai/tips-and-videos",
    category: "Parent & Teacher Guides",
  },
  {
    id: 38,
    title: "AI Essentials — Teacher Guide",
    source: "BBC Bitesize",
    description:
      "A downloadable PDF with teacher notes and revision material for the BBC Bitesize Guide to AI Essentials.",
    url: "https://teach.files.bbci.co.uk/AI%20Essentials/Teacher%20notes%20-%20Bitesize%20Guide%20to%20AI%20Essentials%20-%20Revision.pdf",
    category: "Parent & Teacher Guides",
  },
  {
    id: 39,
    title: "Supporting Teenagers with the BBC AI Guide",
    source: "STEM Community",
    description:
      "A blog post sharing practical strategies for using the BBC Bitesize AI guide to support teenage learners in the classroom.",
    url: "https://community.stem.org.uk/blogs/tim-bradbury1/2025/10/27/supporting-teenagers-with-the-bbc-bitesize-guide",
    category: "Parent & Teacher Guides",
  },
]

export const categories = [
  "All",
  "Learn About AI",
  "AI in Society",
  "Interactive Tools",
  "Curriculum & Lessons",
  "Parent & Teacher Guides",
] as const

export default articles
