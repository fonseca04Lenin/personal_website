import { useRef, useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'

const projects = [
  {
    id: 1,
    name: "Stock Market App",
    description: "Real-time portfolio tracker with live stock prices, visual animations, and AI-powered investment advice.",
    status: "Currently Working On",
    progress: 85,
    date: "April 2024 - May 2024",
    tech: ["Python", "Flask", "Flask-SocketIO", "Flask-CORS", "React 19", "JavaScript", "HTML", "CSS", "Firebase", "Firestore", "Yahoo Finance API", "Alpaca API", "Google Gemini AI", "Recharts", "WebSockets", "REST APIs", "Railway", "Vercel", "Gunicorn"],
    images: ["/stock-app-placeholder.jpg"],
    screenshot: "/screenshots/Stock-Watchlist.png",
    details: "Spearheaded the conceptualization and development of a stock market app by integrating modules such as Tkinter, Matplotlib, datetime, pickle and an API resulting in a streamlined user experience that improved information retrieval speed by 40%. Executed a systematic timeline for app development, including idea generation, concept creation, building the app with real-time data visualization and user-friendly interface design.",
    live: "https://www.aistocksage.com/"
  },
  {
    id: 2,
    name: "UV Index Checker Web App",
    description: "Interactive web application providing instant UV index updates through geolocation",
    date: "August 2024",
    tech: ["Python", "Flask", "HTML", "CSS", "Jinja2", "RESTful APIs", "JSON", "Geolocation"],
    images: ["/uv-checker-placeholder.jpg"],
    screenshot: "/screenshots/Weather-App.png",
    details: "Designed an interactive web application employing Python and Flask to provide instant UV index updates through geolocation services; streamlined data retrieval process, reducing load times by 60% and increasing user satisfaction. Created an intuitive and user-friendly interface with HTML, CSS, and Jinja2 templating to provide users with clear visual indicators of UV levels using color-coded categories for low, moderate, and high UV indexes. Implemented RESTful API calls to obtain current and forecasted UV index data, leveraging JSON data parsing to handle and display relevant information.",
    github: "https://github.com/fonseca04Lenin/UV-Index-Web-Project",
    live: "https://uv-index-web-project.onrender.com/"
  },
  {
    id: 3,
    name: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with React and Vite featuring interactive animations and professional design",
    date: "May 2025",
    tech: ["React", "Vite", "JavaScript", "CSS3", "HTML5", "Vercel Analytics", "Responsive Design", "Modern UI/UX"],
    images: ["/portfolio-website-placeholder.jpg"],
    screenshot: "/screenshots/Portfolio-Website .png",
    details: "Designed and developed a fully responsive personal portfolio website from scratch using React and Vite, featuring a modern gradient-based design system, smooth scrolling navigation, and interactive animations. Implemented a dynamic project timeline with modal overlays, mobile-first responsive design, and optimized performance. The site showcases advanced CSS techniques including custom animations, gradient text effects, and glassmorphism design elements. Integrated Vercel Analytics for visitor tracking and deployed with modern web development best practices.",
    github: "https://github.com/fonseca04Lenin/personal_website",
    live: "https://elvinfonseca.com"
  },
  {
    id: 4,
    name: "Algorithm Visualizer",
    description: "Interactive educational tool for learning computer science algorithms through step-by-step visual demonstrations",
    date: "September 2025",
    tech: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Vite", "Vercel", "Graph Algorithms", "Sorting Algorithms"],
    images: ["/algorithm-visualizer-placeholder.jpg"],
    screenshot: "/screenshots/Algorithm-visualizer.png",
    details: "Built a comprehensive algorithm visualization platform that helps students and developers understand fundamental computer science algorithms through interactive demonstrations. Features sorting algorithms (Bubble Sort, Merge Sort, Quick Sort) and graph traversal algorithms (BFS, DFS) with step-by-step execution, real-time highlighting, and customizable input data. Implemented with React 19 and TypeScript for type safety, styled with Tailwind CSS for responsive design, and uses D3.js for advanced graph rendering. The application provides educational value for CS students, coding bootcamp participants, and interview preparation with clear visual feedback and explanations.",
    github: "https://github.com/fonseca04Lenin/collaborative-algorithm-visualizer",
    live: "https://frontend-sandy-six-30.vercel.app/"
  }
];

const currentProject = projects[0];


const skills = {
  "Languages": ["JavaScript", "TypeScript", "Python", "C", "HTML5", "CSS3"],
  "Frontend": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vue.js", "Angular", "Responsive Design"],
  "Backend": ["Python", "Flask", "Laravel", "Node.js", "PHP", "RESTful APIs", "JSON", "Firebase"],
  "Mobile": ["React Native", "Cross-platform Development", "iOS Development"],
  "Tools & Technologies": ["Git", "CI/CD", "GitHub Actions", "Docker", "Postman", "Linux", "Xcode", "Jira", "Excel", "Vite", "Vercel", "Render", "Matplotlib", "Pandas", "Jupyter Notebooks", "API Integration"],
  "Databases": ["Firebase", "MySQL", "PostgreSQL", "MongoDB", "JSON Data Processing"],
  "Soft Skills": ["Team Collaboration", "Agile Development", "Problem Solving", "Code Review", "Performance Optimization", "Gambling"]
};

const excludedHeroCategories = new Set(["Soft Skills"]);
const seenHeroSkills = new Set();
const rotatingSkillsForHero = Object.entries(skills)
  .filter(([cat]) => !excludedHeroCategories.has(cat))
  .flatMap(([, list]) => list)
  .filter((skill) => {
    if (seenHeroSkills.has(skill)) return false;
    seenHeroSkills.add(skill);
    return true;
  });

const rotatingSkillSets = (() => {
  const chunkSize = 4;
  const grouped = [];
  for (let i = 0; i < rotatingSkillsForHero.length; i += chunkSize) {
    grouped.push(rotatingSkillsForHero.slice(i, i + chunkSize));
  }
  return grouped.length > 0 ? grouped : [rotatingSkillsForHero];
})();

function App() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProjectVisible, setCurrentProjectVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [contributions, setContributions] = useState([]);
  const [contributionsLoading, setContributionsLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  //Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setContributionsLoading(true);
        const username = 'fonseca04Lenin';

        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const data = await response.json();

        if (data && data.contributions) {
          const allContributions = data.contributions.flat();
          const last371 = allContributions.slice(-371);

          setContributions(last371);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);
        const fallbackData = generateFallbackContributions();
        setContributions(fallbackData);
      } finally {
        setContributionsLoading(false);
      }
    };

    const generateFallbackContributions = () => {
      const contributions = [];
      const today = new Date();

      for (let i = 370; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Create realistic patterns - more activity on weekdays
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseChance = isWeekend ? 0.3 : 0.6;

        let count = 0;
        if (Math.random() < baseChance) {
          // Weighted distribution favoring lower counts
          const rand = Math.random();
          if (rand < 0.5) count = Math.floor(Math.random() * 3) + 1;
          else if (rand < 0.8) count = Math.floor(Math.random() * 5) + 3;
          else count = Math.floor(Math.random() * 8) + 5;
        }

        contributions.push({
          date: date.toISOString().split('T')[0],
          count,
          level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4
        });
      }

      return contributions;
    };

    fetchContributions();
  }, []);

  // Handle body scroll when mobile menu is open could be improved
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
 
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);



  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const [currentSkillSetIndex, setCurrentSkillSetIndex] = useState(0);

  // Animated text state
  const [animatedText, setAnimatedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    if (rotatingSkillSets.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentSkillSetIndex((prev) => (prev + 1) % rotatingSkillSets.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Teext animation effect - triggers on first load
  useEffect(() => {
    const fullText = "Hello\nI'm Elvin";
    let currentIndex = 0;
    
    const animateText = () => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(animateText, 100);
      } else {
        setIsAnimating(false);
        setTimeout(() => setShowSubtitle(true), 300);
        setTimeout(() => setShowSkills(true), 600);
      }
    };
    
    // Starsts animation after a short delay
    const startDelay = setTimeout(() => {
      animateText();
    }, 500);
    
    return () => clearTimeout(startDelay);
  }, []); // Empty dependency array means this runs only once on mount

  const currentHeroSkills = rotatingSkillSets[currentSkillSetIndex] || [];

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  // Shared hover handlers for standard cards
  const cardHoverEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
  };
  const cardHoverLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.3)';
  };
  const cardHoverEnterWithShadow = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
    e.currentTarget.style.boxShadow = '0 20px 50px rgba(248, 87, 166, 0.15)';
  };
  const cardHoverLeaveWithShadow = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.3)';
    e.currentTarget.style.boxShadow = 'none';
  };

  // Hoisted GitHub contribution color helpers
  const getContribColor = (count) => {
    if (count === 0) return 'rgba(50, 50, 50, 0.8)';
    if (count <= 2) return 'rgba(248, 87, 166, 0.35)';
    if (count <= 5) return 'rgba(248, 87, 166, 0.55)';
    if (count <= 8) return 'rgba(255, 88, 88, 0.75)';
    return 'rgba(255, 204, 112, 0.9)';
  };
  const getContribBorderColor = (count) => {
    if (count === 0) return 'transparent';
    if (count <= 2) return 'rgba(248, 87, 166, 0.4)';
    if (count <= 5) return 'rgba(248, 87, 166, 0.5)';
    if (count <= 8) return 'rgba(255, 88, 88, 0.6)';
    return 'rgba(255, 204, 112, 0.7)';
  };

  // Shared styles for project screenshot cards
  const screenshotImgStyle = {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    objectFit: 'cover', zIndex: 0,
  };
  const screenshotOverlayStyle = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)',
    zIndex: 1,
  };

  return (
    <div>
      {/* Professional Navigation Header */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(34, 34, 34, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(248, 87, 166, 0.3)',
        zIndex: 1000,
        padding: '15px 0',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}>
          <div className="gradient_text" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }} onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}>
            Elvin Fonseca
          </div>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
          }}>
            {[
              { label: 'About', ref: aboutRef },
              { label: 'Experience', ref: workRef },
              { label: 'Skills', ref: skillsRef },
              { label: 'Projects', ref: projectsRef },
              { label: 'Certifications', ref: certificationsRef },

            ].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.ref)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(248, 87, 166, 0.2)';
                  e.target.style.color = '#f857a6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#fff';
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Social Media Icons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              alignItems: 'center',
              marginLeft: '20px',
              paddingLeft: '20px',
              borderLeft: '1px solid rgba(248, 87, 166, 0.3)'
            }}>
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/elvin-fonseca/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0077b5';
                  e.target.style.background = 'rgba(0, 119, 181, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com/fonseca04Lenin"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#333';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Resume Download Button */}
              <a
                href="/Elvin_Fonseca_Resume.pdf"
                download="Elvin_Fonseca_Resume.pdf"
                style={{
                  background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ff5858, #ffcc70)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(248, 87, 166, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #f857a6, #ff5858)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Resume
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: '24px',
              height: '18px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <span style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#fff',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transformOrigin: 'center',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0deg)',
              }} />
              <span style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#fff',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? '0' : '1',
              }} />
              <span style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#fff',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transformOrigin: 'center',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0deg)',
              }} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className="mobile-nav-menu"
          style={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(34, 34, 34, 0.98)',
            backdropFilter: 'blur(15px)',
            borderBottom: '1px solid rgba(248, 87, 166, 0.3)',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            opacity: mobileMenuOpen ? 1 : 0,
            visibility: mobileMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease',
            padding: '20px 0',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '0 20px',
          }}>
            {[
              { label: 'About', ref: aboutRef },
              { label: 'Experience', ref: workRef },
              { label: 'Skills', ref: skillsRef },
              { label: 'Projects', ref: projectsRef },
              { label: 'Certifications', ref: certificationsRef },

            ].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.ref)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(248, 87, 166, 0.2)';
                  e.target.style.color = '#f857a6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#fff';
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Social Media Icons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(248, 87, 166, 0.3)'
            }}>
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/elvin-fonseca/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  padding: '10px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0077b5';
                  e.target.style.background = 'rgba(0, 119, 181, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com/fonseca04Lenin"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  padding: '10px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#333';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Mobile Resume Download Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px',
              }}>
                <a
                  href="/Elvin_Fonseca_Resume.pdf"
                  download="Elvin_Fonseca_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(45deg, #ff5858, #ffcc70)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(248, 87, 166, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(45deg, #f857a6, #ff5858)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {currentProjectVisible && (
        <div 
          className="current-project-floating"
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 999,
            maxWidth: '350px',
            background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
            borderRadius: '20px',
            padding: '25px',
            border: '1px solid rgba(248, 87, 166, 0.4)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.2)',
            animation: 'slideInFromRight 0.6s ease-out',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(248, 87, 166, 0.3), 0 0 0 2px rgba(248, 87, 166, 0.5)';
            e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.2)';
            e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.4)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(248, 87, 166, 0.08) 0%, rgba(255, 88, 88, 0.05) 50%, rgba(255, 204, 112, 0.08) 100%)',
            borderRadius: '20px',
            pointerEvents: 'none',
            zIndex: -1,
          }} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentProjectVisible(false);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(248, 87, 166, 0.1)',
              border: '1px solid rgba(248, 87, 166, 0.3)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              color: '#f857a6',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(248, 87, 166, 0.2)';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.border = '1px solid rgba(248, 87, 166, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(248, 87, 166, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.border = '1px solid rgba(248, 87, 166, 0.3)';
            }}
          >
            ✕
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #22c55e, #16a34a)',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              color: '#22c55e',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {currentProject.status}
            </span>
          </div>

          <h3 className="gradient_text" style={{
            fontSize: '1.3rem',
            marginBottom: '10px',
            fontWeight: 'bold',
            lineHeight: '1.2',
          }}>
            {currentProject.name}
          </h3>

          <p style={{
            color: '#ddd',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '15px',
          }}>
            {currentProject.description}
          </p>

          <div style={{ marginBottom: '15px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{
                color: '#f857a6',
                fontSize: '0.8rem',
                fontWeight: '600',
              }}>
                Progress
              </span>
              <span style={{
                color: '#ffcc70',
                fontSize: '0.8rem',
                fontWeight: '600',
              }}>
                {currentProject.progress}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(248, 87, 166, 0.2)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${currentProject.progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #f857a6, #ff5858)',
                borderRadius: '3px',
                transition: 'width 0.8s ease',
                boxShadow: '0 0 10px rgba(248, 87, 166, 0.5)',
              }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {currentProject.tech.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(248, 87, 166, 0.15)',
                    color: '#f857a6',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    border: '1px solid rgba(248, 87, 166, 0.3)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {currentProject.tech.length > 3 && (
                <span style={{
                  background: 'rgba(255, 204, 112, 0.15)',
                  color: '#ffcc70',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 204, 112, 0.3)',
                }}>
                  +{currentProject.tech.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            {currentProject.live && (
              <a
                href={currentProject.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(248, 87, 166, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                View Demo
              </a>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '80px',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          src="/854277-hd_1280_720_30fps.webm"
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'transparent',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h1 className="gradient_text hero-title" style={{ fontSize: '5rem', fontWeight: 'bold', margin: '0', lineHeight: 1.1, whiteSpace: 'pre-line' }}>
            {animatedText || "Hello\nI'm Elvin"}
            {isAnimating && <span style={{ 
              borderRight: '3px solid #f857a6', 
              animation: 'blink 1s infinite',
              marginLeft: '2px'
            }}></span>}
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.5rem', 
            color: '#fff', 
            marginTop: '20px',
            opacity: showSubtitle ? 1 : 0,
            transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease'
          }}>
            I'm a passionate software engineer building cool things with code.
          </p>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#fff', 
            marginBottom: '40px', 
            textShadow: '0 0 8px rgba(0,0,0,0.6)',
            opacity: showSkills ? 1 : 0,
            transform: showSkills ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease'
          }}>
            {currentHeroSkills.join(' • ')}
          </p>
          
          {/* View Projects Button */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '30px',
          }}>
            <button
              onClick={() => scrollToSection(projectsRef)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '30px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.6)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Projects
            </button>
          </div>
        </div>
        

        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, #222 100%)',
          zIndex: 2,
        }} />
      </section>

      {/* About Me Section */}
      <section
        ref={aboutRef}
        id="next-section"
        style={{
          minHeight: '100vh',
          background: '#222',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          className="about-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1000px',
            gap: '40px',
          }}
        >
          <div
            className="about-image"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              backgroundColor: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="head_shot.jpeg"
              alt="Elvin"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          <div className="about-text" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#fff' }}>
              About Me
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ddd' }}>
              I'm Elvin Fonseca, an upcoming senior studying Computer Science at the University of Nebraska Omaha with a deep passion for software engineering. I love turning ideas into real world solutions — whether it's building full stack apps, exploring new technologies, or contributing to projects that make people's lives easier.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ddd', marginTop: '16px' }}>
              I've worked with everything from mobile development to cloud tools, and I'm always eager to learn, improve, and make an impact. My goal is simple: to grow as a developer and help build software that matters.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        style={{
          background: '#222',
          color: '#fff',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 className="gradient_text technical-skills-heading" style={{
          fontSize: '3.5rem',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Technical Skills
        </h2>
        
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {Object.entries(skills).map(([category, skillList], index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(25, 25, 25, 0.8))',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(248, 87, 166, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
            >
              <h3 className="gradient_text" style={{
                fontSize: '1.4rem',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}>
                {category}
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {skillList.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    style={{
                      background: 'rgba(248, 87, 166, 0.15)',
                      color: '#f857a6',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid rgba(248, 87, 166, 0.3)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(248, 87, 166, 0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(248, 87, 166, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section
        ref={workRef}
        className="work-experience-section"
        style={{
          background: '#222',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          position: 'relative',
        }}
      >
        <h2 className="gradient_text" style={{
          fontSize: '3.5rem',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Work Experience
        </h2>
        
        <div style={{
          position: 'relative',
          maxWidth: '800px',
          width: '100%',
        }}>
          {/* Vertical Timeline Line */}
          <div className="timeline-line-vertical" style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            bottom: '0',
            width: '4px',
            background: 'linear-gradient(to bottom, #f857a6, #ff5858)',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(248, 87, 166, 0.6)',
            borderRadius: '2px',
            zIndex: 1,
          }} />
          
          {/* Experience Items */}
          <div className="experience-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
            padding: '20px 0',
          }}>
            
            {/* Omaha Public Schools - Current Position */}
            <div className="experience-item" style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
              {/* Timeline Node */}
              <div className="timeline-node" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '24px',
                background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                borderRadius: '50%',
                border: '4px solid #222',
                zIndex: 3,
                boxShadow: '0 0 20px rgba(248, 87, 166, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
              }} />

              {/* Experience Card - Right Side */}
              <div className="experience-card" style={{
                width: '45%',
                marginLeft: '55%',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                border: '1px solid rgba(248, 87, 166, 0.4)',
                borderRadius: '15px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(248, 87, 166, 0.3), 0 0 0 2px rgba(248, 87, 166, 0.5)';
                e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.3)';
                e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.4)';
              }}
              >
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(135deg, rgba(248, 87, 166, 0.08) 0%, rgba(255, 88, 88, 0.05) 50%, rgba(255, 204, 112, 0.08) 100%)',
                  borderRadius: '15px',
                  pointerEvents: 'none',
                  zIndex: -1,
                }} />

                <h3 className="gradient_text" style={{ fontSize: '1.6rem', marginBottom: '8px', fontWeight: 'bold' }}>
                  Omaha Public Schools
                </h3>

                <p style={{ color: '#f857a6', fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>
                  IT Systems &amp; Infrastructure Technician · Part-time
                </p>

                <p style={{ color: '#ffcc70', fontSize: '0.9rem', fontWeight: '500', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Feb 2026 – Present
                </p>

                <p style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '14px', lineHeight: '1.4' }}>
                  Nebraska's largest school district — 52,000+ students across 112 schools (nearly 1 in 6 students statewide). Based at TAC headquarters, supporting elementary, middle, and high schools district-wide.
                </p>

                <ul style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6', paddingLeft: '0', listStyle: 'none' }}>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0', color: '#f857a6', fontWeight: 'bold' }}>•</span>
                    Deploy, configure, and maintain 52,000+ student iPads, Windows/macOS endpoints, and network peripherals across the district fleet.
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0', color: '#f857a6', fontWeight: 'bold' }}>•</span>
                    Diagnose hardware/software failures using root-cause analysis — applying the same systematic debugging mindset used in software engineering.
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0', color: '#f857a6', fontWeight: 'bold' }}>•</span>
                    Manage asset inventory, apply security patches, and maintain infrastructure — building operational security awareness relevant to backend and cloud work.
                  </li>
                  <li style={{ paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0', color: '#f857a6', fontWeight: 'bold' }}>•</span>
                    Bridge end-user needs with system requirements across schools district-wide, sharpening cross-functional communication essential to full-stack development.
                  </li>
                </ul>
              </div>
            </div>

            {/* Mutual of Omaha - Previous Position */}
            <div className="experience-item" style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
              {/* Timeline Node */}
              <div className="timeline-node" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '24px',
                background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                borderRadius: '50%',
                border: '4px solid #222',
                zIndex: 3,
                boxShadow: '0 0 20px rgba(248, 87, 166, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
              }} />
              
              {/* Experience Card - Left Side */}
              <div className="experience-card" style={{
                width: '45%',
                marginRight: '55%',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                border: '1px solid rgba(248, 87, 166, 0.4)',
                borderRadius: '15px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(248, 87, 166, 0.3), 0 0 0 2px rgba(248, 87, 166, 0.5)';
                e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.3)';
                e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.4)';
              }}
              >

                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(248, 87, 166, 0.08) 0%, rgba(255, 88, 88, 0.05) 50%, rgba(255, 204, 112, 0.08) 100%)',
                  borderRadius: '15px',
                  pointerEvents: 'none',
                  zIndex: -1,
                }} />

                <h3 className="gradient_text" style={{
                  fontSize: '1.6rem',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}>
                  Mutual of Omaha
                </h3>
                
                <p style={{
                  color: '#f857a6',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}>
                  Full-Stack Software Development Intern
                </p>
                
                <p style={{
                  color: '#ffcc70',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  marginBottom: '15px',
                  letterSpacing: '0.5px',
                }}>
                  May 2025 – August 2025
                </p>
                
                <ul style={{
                  color: '#ddd',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  paddingLeft: '0',
                  listStyle: 'none',
                }}>
                  <li style={{ 
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#f857a6',
                      fontWeight: 'bold',
                    }}>•</span>
                    Contributed full-stack feature development and bug fixes on life insurance websites using Laravel, Vue.js, and PHP serving thousands of daily senior users and supporting 19M+ customers by converting JPG to WebP for faster page loads, authoring SEO driven articles, optimizing metadata, and enhancing accessibility.
                  </li>
                  <li style={{ 
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#f857a6',
                      fontWeight: 'bold',
                    }}>•</span>
                    Migrated Laravel ratings/reviews service from BazaarVoice to Yext proxy API, refactoring controllers/models, adding contract-driven fetch methods with caching, and implementing unit tests for reliability and scalability.
                  </li>
                  <li style={{ 
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#f857a6',
                      fontWeight: 'bold',
                    }}>•</span>
                    Contribute to Mutual of Omaha's mission to serve 19+ million customers nationwide, building reliable and accessible digital experiences aligned with its 100+ year legacy of excellence.
                  </li>
                </ul>
              </div>
            </div>

            {/* Take2 - Previous Position */}
            <div className="experience-item" style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
              {/* Timeline Node */}
              <div className="timeline-node" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                background: 'linear-gradient(45deg, #ff5858, #ffcc70)',
                borderRadius: '50%',
                border: '3px solid #222',
                zIndex: 3,
                boxShadow: '0 0 15px rgba(255, 88, 88, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
              }} />
              
              {/* Experience Card - Right Side */}
              <div className="experience-card" style={{
                width: '45%',
                marginLeft: '55%',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                border: '1px solid rgba(255, 88, 88, 0.4)',
                borderRadius: '15px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 88, 88, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 88, 88, 0.3), 0 0 0 2px rgba(255, 88, 88, 0.5)';
                e.currentTarget.style.border = '1px solid rgba(255, 88, 88, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 88, 88, 0.3)';
                e.currentTarget.style.border = '1px solid rgba(255, 88, 88, 0.4)';
              }}
              >
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 88, 88, 0.08) 0%, rgba(255, 204, 112, 0.05) 50%, rgba(248, 87, 166, 0.08) 100%)',
                  borderRadius: '15px',
                  pointerEvents: 'none',
                  zIndex: -1,
                }} />
                
                <h3 className="gradient_text" style={{
                  fontSize: '1.6rem',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}>
                  Take2
                </h3>
                
                <p style={{
                  color: '#ff5858',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}>
                  Full-Stack Software Development Start Up Intern
                </p>
                
                <p style={{
                  color: '#ffcc70',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  marginBottom: '15px',
                  letterSpacing: '0.5px',
                }}>
                  Dec 2024 – Mar 2025
                </p>
                
                <ul style={{
                  color: '#ddd',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  paddingLeft: '0',
                  listStyle: 'none',
                }}>
                  <li style={{ 
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#ff5858',
                      fontWeight: 'bold',
                    }}>•</span>
                    Collaborated with a team of 4 developers to build and deploy a cross-platform movie-tracking app using React, TypeScript, and Firebase, now used by 3,000+ users across iOS.
                  </li>
                  <li style={{ 
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#ff5858',
                      fontWeight: 'bold',
                    }}>•</span>
                    Designed and implemented 10+ front-end components and their back end, enhancing mobile responsiveness and UI performance by 30%, based on user interaction metrics.
                  </li>
                  <li style={{ 
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#ff5858',
                      fontWeight: 'bold',
                    }}>•</span>
                    Resolved 20+ pre-launch bugs and added critical features such as the import feature, notification tracking system and real-time updates, directly contributing to successful app deployment.
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Timeline Section */}
      <section
        ref={projectsRef}
        style={{
          background: '#222',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        {/* Timeline Connection from Work Experience */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '160px',
          background: 'linear-gradient(to bottom, #f857a6, #ff5858)',
          zIndex: 1,
        }} />

        {/* Curved Transition from Vertical to Horizontal */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '0 0 40px 40px',
          border: '4px solid transparent',
          borderBottomColor: '#ff5858',
          borderLeftColor: '#ff5858',
          borderRightColor: '#ffcc70',
          background: 'transparent',
          zIndex: 1,
        }} />
        
        <h2 className="gradient_text" style={{
          fontSize: '3.5rem',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px'
        }}>
          My Projects
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: '#ddd',
          fontSize: '1.1rem',
          marginBottom: '60px',
          maxWidth: '600px',
          margin: '0 auto 60px auto',
        }}>
          Things I've built — click any card to learn more
        </p>
        
        {isMobile ? (
          /* Mobile: simple stacked cards via flexbox */
          <div style={{
            width: '100%',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {[
              { project: projects[0], accentColor: '#f857a6', tagBg: 'rgba(248,87,166,0.15)', tagBorder: 'rgba(248,87,166,0.4)', tagColor: '#f9b8d8' },
              { project: projects[1], accentColor: '#ff5858', tagBg: 'rgba(255,88,88,0.15)', tagBorder: 'rgba(255,88,88,0.4)', tagColor: '#ffb3b3' },
              { project: projects[2], accentColor: '#ffcc70', tagBg: 'rgba(255,204,112,0.15)', tagBorder: 'rgba(255,204,112,0.4)', tagColor: '#ffe4a8' },
              { project: projects[3], accentColor: '#667eea', tagBg: 'rgba(102,126,234,0.15)', tagBorder: 'rgba(102,126,234,0.4)', tagColor: '#b3bcf5' },
            ].map(({ project, accentColor, tagBg, tagBorder, tagColor }) => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                style={{
                  width: '100%',
                  height: '220px',
                  background: '#111',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  flexShrink: 0,
                }}
              >
                {project.screenshot && (
                  <>
                    <img
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        zIndex: 0,
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)',
                      zIndex: 1,
                      borderRadius: '12px',
                    }} />
                  </>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '18px',
                  zIndex: 2,
                }}>
                  <p style={{ color: accentColor, fontSize: '0.7rem', marginBottom: '4px', letterSpacing: '0.3px' }}>
                    {project.date}
                  </p>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '6px', lineHeight: '1.2' }}>
                    {project.name}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} style={{
                        padding: '2px 7px',
                        background: tagBg,
                        border: `1px solid ${tagBorder}`,
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        color: tagColor,
                        fontFamily: 'monospace',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Bento Grid */
          <div style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(4, 200px)',
            gap: '20px',
          }}>
            {/* Project 1 - Stock Market App */}
            <div
              onClick={() => openProject(projects[0])}
              style={{
                gridColumn: 'span 3',
                gridRow: 'span 2',
                background: '#111',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {projects[0].screenshot && (
                <>
                  <img src={projects[0].screenshot} alt={projects[0].name} style={screenshotImgStyle} />
                  <div style={screenshotOverlayStyle} />
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <p style={{ color: '#f857a6', fontSize: '0.72rem', marginBottom: '6px' }}>{projects[0].date}</p>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>{projects[0].name}</h3>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '14px' }}>{projects[0].description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects[0].tech.slice(0, 6).map((tech, i) => (
                    <span key={i} style={{ padding: '3px 8px', background: 'rgba(248,87,166,0.15)', border: '1px solid rgba(248,87,166,0.4)', borderRadius: '4px', fontSize: '0.7rem', color: '#f9b8d8', fontFamily: 'monospace' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2 - UV Index */}
            <div
              onClick={() => openProject(projects[1])}
              style={{
                gridColumn: 'span 3',
                gridRow: 'span 2',
                background: '#111',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {projects[1].screenshot && (
                <>
                  <img src={projects[1].screenshot} alt={projects[1].name} style={screenshotImgStyle} />
                  <div style={screenshotOverlayStyle} />
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <p style={{ color: '#ff5858', fontSize: '0.72rem', marginBottom: '6px' }}>{projects[1].date}</p>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px' }}>{projects[1].name}</h3>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '14px' }}>{projects[1].description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects[1].tech.slice(0, 3).map((tech, i) => (
                    <span key={i} style={{ padding: '3px 8px', background: 'rgba(255,88,88,0.15)', border: '1px solid rgba(255,88,88,0.4)', borderRadius: '4px', fontSize: '0.7rem', color: '#ffb3b3', fontFamily: 'monospace' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 3 - Portfolio */}
            <div
              onClick={() => openProject(projects[2])}
              style={{
                gridColumn: 'span 3',
                gridRow: 'span 2',
                background: '#111',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {projects[2].screenshot && (
                <>
                  <img src={projects[2].screenshot} alt={projects[2].name} style={screenshotImgStyle} />
                  <div style={screenshotOverlayStyle} />
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <p style={{ color: '#ffcc70', fontSize: '0.72rem', marginBottom: '6px' }}>{projects[2].date}</p>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px' }}>{projects[2].name}</h3>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '14px' }}>{projects[2].description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects[2].tech.slice(0, 4).map((tech, i) => (
                    <span key={i} style={{ padding: '3px 8px', background: 'rgba(255,204,112,0.15)', border: '1px solid rgba(255,204,112,0.4)', borderRadius: '4px', fontSize: '0.7rem', color: '#ffe4a8', fontFamily: 'monospace' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 4 - Algorithm Visualizer */}
            <div
              onClick={() => openProject(projects[3])}
              style={{
                gridColumn: 'span 3',
                gridRow: 'span 2',
                background: '#111',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {projects[3].screenshot && (
                <>
                  <img src={projects[3].screenshot} alt={projects[3].name} style={screenshotImgStyle} />
                  <div style={screenshotOverlayStyle} />
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <p style={{ color: '#667eea', fontSize: '0.72rem', marginBottom: '6px' }}>{projects[3].date}</p>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px' }}>{projects[3].name}</h3>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '14px' }}>{projects[3].description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects[3].tech.slice(0, 4).map((tech, i) => (
                    <span key={i} style={{ padding: '3px 8px', background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.4)', borderRadius: '4px', fontSize: '0.7rem', color: '#b3bcf5', fontFamily: 'monospace' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Project Modall*/}
      {selectedProject && (
        <div 
          className="project-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
            padding: '20px',
          }}
          onClick={closeProject}
        >
          <div 
            className="project-modal-content"
            style={{
              background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '700px',
              border: '1px solid rgba(248, 87, 166, 0.3)',
              position: 'relative',
              overflow: 'auto',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(248, 87, 166, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(248, 87, 166, 0.05) 0%, rgba(255, 88, 88, 0.03) 50%, rgba(255, 204, 112, 0.05) 100%)',
              borderRadius: '20px',
              pointerEvents: 'none',
              zIndex: -1,
            }} />

            {/* Close Button */}
            <button
              onClick={closeProject}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(248, 87, 166, 0.1)',
                border: '1px solid rgba(248, 87, 166, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#f857a6',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(248, 87, 166, 0.2)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.border = '1px solid rgba(248, 87, 166, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(248, 87, 166, 0.1)';
                e.target.style.transform = 'scale(1)';
                e.target.style.border = '1px solid rgba(248, 87, 166, 0.3)';
              }}
            >
              ✕
            </button>
            
            {/* Project Title */}
            <div style={{ marginBottom: '30px' }}>
              <h2 className="gradient_text" style={{
                fontSize: '2.8rem',
                marginBottom: '10px',
                fontWeight: 'bold',
                lineHeight: '1.2',
              }}>
                {selectedProject.name}
              </h2>
              
              <div style={{
                color: '#f857a6',
                fontSize: '1rem',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {selectedProject.date}
              </div>
            </div>
            
            {/* Project Description */}
            <div style={{ marginBottom: '35px' }}>
              <p style={{
                color: '#ddd',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {selectedProject.details}
              </p>
            </div>
            
            {/* Tech Stack */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ 
                color: '#fff',
                fontSize: '1.3rem',
                marginBottom: '20px',
                fontWeight: '600',
              }}>
                Technologies Used
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px' 
              }}>
                {selectedProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(248, 87, 166, 0.15)',
                      color: '#f857a6',
                      padding: '10px 18px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid rgba(248, 87, 166, 0.3)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(248, 87, 166, 0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(248, 87, 166, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {selectedProject.github && selectedProject.name !== "Stock Market App" && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 25px rgba(248, 87, 166, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  View Code
                </a>
              )}
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'transparent',
                    color: '#f857a6',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: '2px solid #f857a6',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(248, 87, 166, 0.1)';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.borderColor = '#ff5858';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.borderColor = '#f857a6';
                  }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certifications Section */}
      <section
        ref={certificationsRef}
        style={{
          background: '#222',
          color: '#fff',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 className="gradient_text" style={{
          fontSize: '3.5rem',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          Licenses &amp; Certifications
        </h2>

        <div style={{
          maxWidth: '800px',
          width: '100%',
        }}>
          {/* Anthropic Cert Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(25, 25, 25, 0.8))',
              borderRadius: '15px',
              padding: '28px',
              border: '1px solid rgba(248, 87, 166, 0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={cardHoverEnterWithShadow}
            onMouseLeave={cardHoverLeaveWithShadow}
          >
            {/* Anthropic "A" icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #c96442, #e8845a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                color: '#fff',
                fontSize: '2rem',
                fontWeight: '800',
                fontFamily: 'serif',
                lineHeight: 1,
              }}>A</span>
            </div>

            {/* Cert Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                color: '#fff',
                fontSize: '1.15rem',
                fontWeight: '700',
                marginBottom: '4px',
                lineHeight: '1.3',
              }}>
                AI Fluency: Framework &amp; Foundations
              </h3>
              <p style={{
                color: '#ffcc70',
                fontSize: '0.82rem',
                fontWeight: '500',
                marginBottom: '4px',
              }}>
                Issued Feb 2026
              </p>
              <p style={{
                color: '#f857a6',
                fontSize: '0.82rem',
                fontWeight: '600',
              }}>
                Anthropic
              </p>
            </div>
          </div>
        </div>
      </section>


      <section
        style={{
          background: '#222',
          color: '#fff',
          padding: '80px 20px',
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <h2 className="gradient_text" style={{
            fontSize: '3.5rem',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
            My Coding Journey
          </h2>

          <p style={{
            textAlign: 'center',
            color: '#aaa',
            marginBottom: '40px',
            fontSize: '1.1rem',
          }}>
            A glimpse into my daily commitment to building & learning
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(40, 40, 40, 0.95), rgba(25, 25, 25, 0.98))',
            border: '1px solid rgba(248, 87, 166, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle at top right, rgba(248, 87, 166, 0.08), transparent)',
              pointerEvents: 'none',
            }} />

            {/* Month labels */}
            <div style={{
              display: 'flex',
              marginBottom: '10px',
              marginLeft: '35px',
              gap: '0px',
            }}>
              {(() => {
                if (contributions.length === 0) return null;
                const months = [];
                let currentMonth = null;
                let weekCount = 0;

                contributions.forEach((day, index) => {
                  if (index % 7 === 0) {
                    const date = new Date(day.date);
                    const month = date.toLocaleDateString('en-US', { month: 'short' });
                    if (month !== currentMonth) {
                      if (currentMonth !== null) {
                        months.push({ month: currentMonth, weeks: weekCount });
                      }
                      currentMonth = month;
                      weekCount = 1;
                    } else {
                      weekCount++;
                    }
                  }
                });
                if (currentMonth) {
                  months.push({ month: currentMonth, weeks: weekCount });
                }

                return months.map((m, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.7rem',
                      color: '#666',
                      width: `${m.weeks * 14}px`,
                      textAlign: 'left',
                    }}
                  >
                    {m.month}
                  </span>
                ));
              })()}
            </div>

            {/* Calendar grid with day labels */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Day labels */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '8px',
                gap: '2px',
              }}>
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.65rem',
                      color: '#555',
                      height: '12px',
                      lineHeight: '12px',
                      textAlign: 'right',
                      width: '25px',
                    }}
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '3px',
                  overflowX: 'auto',
                  paddingBottom: '10px',
                }}
                className="contribution-grid"
              >
                {contributionsLoading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100px',
                    color: '#666',
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      border: '3px solid rgba(248, 87, 166, 0.2)',
                      borderTopColor: '#f857a6',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }} />
                  </div>
                ) : (
                  (() => {
                    const weeks = [];
                    for (let i = 0; i < contributions.length; i += 7) {
                      weeks.push(contributions.slice(i, i + 7));
                    }

                    return weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {week.map((day, dayIndex) => {
                          const isHovered = hoveredDay === `${weekIndex}-${dayIndex}`;

                          return (
                            <div
                              key={dayIndex}
                              onMouseEnter={() => setHoveredDay(`${weekIndex}-${dayIndex}`)}
                              onMouseLeave={() => setHoveredDay(null)}
                              style={{
                                width: '11px',
                                height: '11px',
                                borderRadius: '3px',
                                background: getContribColor(day.count),
                                border: `1px solid ${getContribBorderColor(day.count)}`,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                                boxShadow: isHovered
                                  ? `0 0 12px ${day.count > 0 ? 'rgba(248, 87, 166, 0.6)' : 'rgba(100, 100, 100, 0.3)'}`
                                  : 'none',
                                zIndex: isHovered ? 10 : 1,
                                position: 'relative',
                              }}
                              title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                            />
                          );
                        })}
                      </div>
                    ));
                  })()
                )}
              </div>
            </div>

            {/* Legend */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid rgba(248, 87, 166, 0.1)',
            }}>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Less</span>
              {[0, 1, 3, 6, 10].map((level, i) => (
                <div
                  key={i}
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '3px',
                    background: getContribColor(level),
                    border: '1px solid rgba(248, 87, 166, 0.2)',
                  }}
                />
              ))}
              <span style={{ fontSize: '0.75rem', color: '#666' }}>More</span>
            </div>

            <div style={{
              marginTop: '20px',
              textAlign: 'center',
            }}>
              <a
                href="https://github.com/fonseca04Lenin"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#888',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: '1px solid rgba(248, 87, 166, 0.2)',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f857a6';
                  e.currentTarget.style.borderColor = '#f857a6';
                  e.currentTarget.style.background = 'rgba(248, 87, 166, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#888';
                  e.currentTarget.style.borderColor = 'rgba(248, 87, 166, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View my GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section with Contributors */}
      <footer
        style={{
          background: '#222',
          color: '#fff',
          padding: '80px 20px 40px',
          borderTop: '1px solid rgba(248, 87, 166, 0.2)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Enhanced Contact Section Title */}
          <h2 className="gradient_text" style={{
            fontSize: '3rem',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            Ready to Create Something Great?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#ddd',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px auto',
            lineHeight: '1.6',
          }}>
            I love solving complex problems and building things that matter. If you have an interesting project or challenge, I'd genuinely enjoy hearing about it.
          </p>

          {/* Contributors Section */}
          <div style={{ 
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              textAlign: 'center',
            }}>
              <h3 className="gradient_text" style={{
                fontSize: '2rem',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}>
                Contributors
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}>
                {/* Chief Editor - Maggie F. */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: isMobile ? '20px' : '30px',
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(25, 25, 25, 0.8))',
                  borderRadius: '15px',
                  border: '1px solid rgba(248, 87, 166, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: isMobile ? '320px' : '500px',
                  margin: '0 auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(248, 87, 166, 0.2)';
                  e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.3)';
                }}
                >
                  {/* Dog aka Maggie the great Image Container */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '15px',
                    border: '2px solid rgba(248, 87, 166, 0.5)',
                    background: 'linear-gradient(45deg, rgba(248, 87, 166, 0.1), rgba(255, 88, 88, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img
                      src="/maggi-photo.jpg"
                      alt="Maggi F. - Chief Editor"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div style={{
                      display: 'none',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(248, 87, 166, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}>
                      🐕
                    </div>
                  </div>
                  
                  <h4 style={{
                    fontSize: '1.2rem',
                    marginBottom: '6px',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                    Maggie F.
                  </h4>
                  
                  <p style={{
                    color: '#f857a6',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}>
                    Chief Editor
                  </p>
                  
                  
                  <p style={{
                    color: '#ddd',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    maxWidth: isMobile ? '240px' : '420px',
                  }}>
                    Supervising all content with the highest standards of quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div style={{
            borderTop: '1px solid rgba(248, 87, 166, 0.2)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <p style={{
              color: '#999',
              fontSize: '0.9rem',
              margin: 0,
            }}>
              © 2024 Elvin Fonseca. Built with React & lots of redbull
            </p>
            
            {/* Small Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
            }}>
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/elvin-fonseca/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#999',
                  transition: 'all 0.3s ease',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0077b5';
                  e.target.style.background = 'rgba(0, 119, 181, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#999';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com/fonseca04Lenin"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#999',
                  transition: 'all 0.3s ease',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#999';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      

      
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App
