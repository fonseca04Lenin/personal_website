import { useRef, useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(() => {
    // Get download count from localStorage or default to 0
    const saved = localStorage.getItem('resume_download_count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showStats, setShowStats] = useState(false);

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

  // Add keyboard shortcut for admin panel (Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowStats(!showStats);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showStats]);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleResumeDownload = () => {
    const newCount = downloadCount + 1;
    const timestamp = new Date().toISOString();
    
    setDownloadCount(newCount);
    localStorage.setItem('resume_download_count', newCount.toString());
    localStorage.setItem('last_download_time', new Date().toLocaleString());
    
    // Trrack resume download with Vercel Analytics
    if (window.va) {
      window.va.track('Resume Downloaded', {
        timestamp: timestamp,
        source: 'portfolio_website',
        downloadNumber: newCount
      });
    }
    
    
    
    console.log(`Resume downloaded! Total downloads: ${newCount} at:`, timestamp);
  };

  const projects = [
    {
      id: 1,
      name: "Stock Market App",
      description: "A comprehensive stock tracking application with real-time data and analytics",
      date: "April 2024 - May 2024",
      tech: ["Python", "Tkinter", "Matplotlib", "API Integration", "JSON", "Pickle"],
      images: ["/stock-app-placeholder.jpg"],
      details: "Spearheaded the conceptualization and development of a stock market app by integrating modules such as Tkinter, Matplotlib, datetime, pickle and an API resulting in a streamlined user experience that improved information retrieval speed by 40%. Executed a systematic timeline for app development, including idea generation, concept creation, building the app with real-time data visualization and user-friendly interface design.",
      github: "https://github.com/fonseca04Lenin/Project-2",
      live: ""
    },
    {
      id: 2,
      name: "UV Index Checker Web App",
      description: "Interactive web application providing instant UV index updates through geolocation",
      date: "August 2024",
      tech: ["Python", "Flask", "HTML", "CSS", "Jinja2", "RESTful APIs", "JSON", "Geolocation"],
      images: ["/uv-checker-placeholder.jpg"],
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
      details: "Designed and developed a fully responsive personal portfolio website from scratch using React and Vite, featuring a modern gradient-based design system, smooth scrolling navigation, and interactive animations. Implemented a dynamic project timeline with modal overlays, mobile-first responsive design, and optimized performance. The site showcases advanced CSS techniques including custom animations, gradient text effects, and glassmorphism design elements. Integrated Vercel Analytics for visitor tracking and deployed with modern web development best practices.",
      github: "https://github.com/fonseca04Lenin/personal_website",
      live: "elvinfonseca.com"
    }
  ];

  const skills = {
    "Frontend": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vue.js", "Responsive Design", "UI/UX Design"],
    "Backend": ["Python", "Flask", "Laravel", "Node.js", "RESTful APIs", "JSON", "Firebase"],
    "Mobile": ["React Native", "Cross-platform Development", "iOS Development"],
    "Tools & Technologies": ["Git", "CI/CD", "Vite", "Vercel", "Render", "Matplotlib", "API Integration"],
    "Databases": ["Firebase", "MySQL", "JSON Data Processing"],
    "Soft Skills": ["Team Collaboration", "Agile Development", "Problem Solving", "Code Review", "Performance Optimization"]
  };

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
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
              { label: 'Contact', ref: contactRef }
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
              { label: 'Contact', ref: contactRef }
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
          </div>
        </div>
      </nav>

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
          src="/854277-hd_1280_720_30fps.mp4"
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
          <h1 className="gradient_text hero-title" style={{ fontSize: '5rem', fontWeight: 'bold', margin: '0', lineHeight: 1.1 }}>
            Hello<br />I'm Elvin
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: '#fff', marginTop: '20px' }}>
            I'm a passionate software engineer building cool things with code.
          </p>
          <p style={{ fontSize: '1.2rem', color: '#ddd', marginBottom: '40px' }}>
            React • Python • TypeScript • Laravel • Vue.js
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
              🚀 View Projects
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="chevron-container" style={{
          position:'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          width: '80px',
        }}>
          <svg 
            width="60" 
            height="47" 
            viewBox="0 0 60 47"
            className='chevron-bounce'
            style={{ display: 'block', cursor: 'pointer' }}
            onClick={() => scrollToSection(aboutRef)}
          >
            <polyline
              points="15, 15 30, 30 45, 15"
              style={{ 
                fill: 'none', 
                stroke: 'white', 
                strokeWidth: 4, 
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
              }}
            />
          </svg>
          <span 
            style={{ 
              marginTop: '8px', 
              fontSize: '1.2rem', 
              color: '#fff', 
              cursor: 'pointer',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
            onClick={() => scrollToSection(aboutRef)}
          >
            Click Me
          </span>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
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
              I'm Elvin Fonseca, a upcoming senior studying Computer Science at the University of Nebraska Omaha with a deep passion for software engineering. I love turning ideas into real world solutions — whether it's building full stack apps, exploring new technologies, or contributing to projects that make people's lives easier.
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
        <h2 className="gradient_text" style={{ 
          fontSize: '3.5rem', 
          marginBottom: '50px', 
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(248, 87, 166, 0.3)';
            }}
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
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Work Experience
        </h2>
        
        <div style={{
          position: 'relative',
          maxWidth: '800px',
          width: '100%',
        }}>
          {/* Vertical Timeline Line */}
          <div style={{
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
            padding: '20px 0',
          }}>
            
            {/* Mutual of Omaha - Current Position */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
              {/* Timeline Node */}
              <div style={{
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
              <div style={{
                width: '45%',
                marginLeft: '55%',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                border: '1px solid rgba(248, 87, 166, 0.4)',
                borderRadius: '15px',
                backdropFilter: 'blur(15px)',
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
                {/* Current Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  Current
                </div>
                
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
                  May 2025 – Present
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
                    Maintained and enhanced 3 high traffic websites, supporting CI/CD workflows to deliver accessible, high-performance updates to 10K+ daily senior users seeking life insurance and retirement solutions.
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
                    Contribute to Mutual of Omaha's mission to serve 19+ million customers nationwide, building reliable and accessible digital experiences aligned with its 100+ year legacy of excellence.
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
                    Contributing to front and back end feature development and bug fixes using Laravel, Vue.js, JavaScript, focusing on accessibility and performance improvements for elderly users.
                  </li>
                </ul>
              </div>
            </div>

            {/* Take2 - Previous Position */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
              {/* Timeline Node */}
              <div style={{
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
              
              {/* Experience Card - Left Side */}
              <div style={{
                width: '45%',
                marginRight: '55%',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                border: '1px solid rgba(255, 88, 88, 0.4)',
                borderRadius: '15px',
                backdropFilter: 'blur(15px)',
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
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '60px',
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
          marginBottom: '30px', 
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          marginTop: '40px'
        }}>
          My Projects
        </h2>
        
        <div className="timeline-container" style={{
          position: 'relative',
          maxWidth: '100%',
          width: '100%',
          overflowX: 'auto',
          padding: '20px 40px',
        }}>
          {/* Central Timeline Line - Now Horizontal */}
          <div className="timeline-line" style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            height: '6px',
            background: 'linear-gradient(to right, #ff5858, #ffcc70, #f857a6)',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 15px rgba(248, 87, 166, 0.6)',
            borderRadius: '3px',
            zIndex: 1,
          }} />
          
          {/* Projects Container - Horizontal Layout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            minWidth: `${projects.length * 420}px`,
            padding: '60px 0',
            position: 'relative',
          }}>
            {projects.map((project, index) => (
              <div key={project.id} className="timeline-item" style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 60px',
                minWidth: '320px',
              }}>
                {/* Project Node */}
                <div 
                  className="project-node"
                  onClick={() => openProject(project)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(45deg, #f857a6, #ff5858)',
                    borderRadius: '50%',
                    border: '3px solid #222',
                    cursor: 'pointer',
                    zIndex: 3,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(248, 87, 166, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    e.target.style.boxShadow = '0 0 30px rgba(248, 87, 166, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                    e.target.style.boxShadow = '0 0 20px rgba(248, 87, 166, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    background: 'linear-gradient(45deg, #222, #333)',
                    borderRadius: '50%',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
                  }} />
                </div>
                
                {/* Project Card - Above or Below the line */}
                <div 
                  className="project-card"
                  onClick={() => openProject(project)}
                  style={{
                    width: '300px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.95))',
                    border: '1px solid rgba(248, 87, 166, 0.3)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.2)',
                    marginTop: index === 1 ? '400px' : (index % 2 === 0 ? '-220px' : '160px'),
                    marginLeft: index === 0 ? '0px' : index === 1 ? '70px' : '70px',
                    position: 'relative',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-5px)';
                    e.target.style.boxShadow = '0 15px 50px rgba(248, 87, 166, 0.3), 0 0 0 2px rgba(248, 87, 166, 0.5)';
                    e.target.style.border = '1px solid rgba(248, 87, 166, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(248, 87, 166, 0.2)';
                    e.target.style.border = '1px solid rgba(248, 87, 166, 0.3)';
                  }}
                >
                  {/* Subtle gradient overlay for extra depth */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(248, 87, 166, 0.05) 0%, rgba(255, 88, 88, 0.03) 50%, rgba(255, 204, 112, 0.05) 100%)',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }} />
                  <h3 className="gradient_text" style={{
                    fontSize: '1.4rem',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    color: '#ddd',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    marginBottom: '10px',
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    color: '#f857a6',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}>
                    {project.date}
                  </div>
                </div>
                
                {/* Connecting Line - From circle to the card pain in the ass line */}
                <div style={{
                  position: 'absolute',
                  left: '55%',
                  top: index === 1 ? 'calc(50% + 20px)' : (index % 2 === 0 ? 'calc(50% - 180px)' : 'calc(50% + 20px)'),
                  width: '3px',
                  height: index === 1 ? '180px' : (index % 2 === 0 ? '200px' : '140px'),
                  background: index % 2 === 0 
                    ? 'linear-gradient(to top, #f857a6, rgba(248, 87, 166, 0.3))' 
                    : 'linear-gradient(to bottom, #f857a6, rgba(248, 87, 166, 0.3))',
                  transform: 'translateX(-50%)',
                  borderRadius: '2px',
                  zIndex: 2,
                }} />
              </div>
            ))}
          </div>
        </div>
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
            background: 'rgba(0, 0, 0, 0.9)',
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
              {selectedProject.github && (
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
      
      {/* Footer Section with Contributors */}
      <footer
        ref={contactRef}
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
            Let's Build Something Amazing Together
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#ddd',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px auto',
            lineHeight: '1.6',
          }}>
            Ready to bring technical excellence and innovation to your team. Let's discuss how I can contribute to your next project.
          </p>

          {/* Contributors Section */}
          <div style={{ 
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
          }}>
            {/* Left Side - Contributors */}
            <div style={{
              flex: '1',
              minWidth: '300px',
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
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(25, 25, 25, 0.8))',
                  borderRadius: '15px',
                  border: '1px solid rgba(248, 87, 166, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  maxWidth: '220px',
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
                    fontSize: '0.8rem',
                    lineHeight: '1.3',
                    textAlign: 'center',
                    maxWidth: '180px',
                  }}>
                    Supervising all content with the highest standards of quality.
                  </p>
                </div>
              </div>
            </div>

            {/* rtight Side - Contact Me */}
            <div style={{
              flex: '1',
              minWidth: '300px',
              textAlign: 'center',
            }}>
              <h3 className="gradient_text" style={{
                fontSize: '2rem',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}>
                Contact Me
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  padding: '25px',
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(25, 25, 25, 0.8))',
                  borderRadius: '15px',
                  border: '1px solid rgba(248, 87, 166, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  maxWidth: '280px',
                  width: '100%',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                  }}>
                    {/* Email */}
                    <a
                      href="mailto:efonseca@unomaha.edu"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#ddd',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'rgba(248, 87, 166, 0.05)',
                        border: '1px solid rgba(248, 87, 166, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.15)';
                        e.target.style.transform = 'translateX(5px)';
                        e.target.style.color = '#f857a6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                        e.target.style.color = '#ddd';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📧</span>
                      <span>efonseca@unomaha.edu</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/elvin-fonseca"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#ddd',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'rgba(248, 87, 166, 0.05)',
                        border: '1px solid rgba(248, 87, 166, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.15)';
                        e.target.style.transform = 'translateX(5px)';
                        e.target.style.color = '#f857a6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                        e.target.style.color = '#ddd';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>💼</span>
                      <span>LinkedIn Profile</span>
                    </a>

                    {/* gitHub */}
                    <a
                      href="https://github.com/fonseca04Lenin"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#ddd',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'rgba(248, 87, 166, 0.05)',
                        border: '1px solid rgba(248, 87, 166, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.15)';
                        e.target.style.transform = 'translateX(5px)';
                        e.target.style.color = '#f857a6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                        e.target.style.color = '#ddd';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>💻</span>
                      <span>GitHub Profile</span>
                    </a>

                    {/* resume-Download */}
                    <a
                      href="/Elvin_Fonseca_Resume.pdf"
                      download="Elvin_Fonseca_Resume.pdf"
                      onClick={handleResumeDownload}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#ddd',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(248, 87, 166, 0.05)',
                        border: '1px solid rgba(248, 87, 166, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.15)';
                        e.target.style.transform = 'translateX(5px)';
                        e.target.style.color = '#f857a6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 87, 166, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                        e.target.style.color = '#ddd';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📄</span>
                      <span>Download Resume</span>
                    </a>
                  </div>
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
          </div>
        </div>
      </footer>
      
      {/* secret stuff*/}
      {showStats && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(34, 34, 34, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(248, 87, 166, 0.3)',
          borderRadius: '10px',
          padding: '20px',
          zIndex: 10000,
          color: '#fff',
          minWidth: '250px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <h3 className="gradient_text" style={{ margin: 0, fontSize: '1.2rem' }}>
              📊 Admin Stats
            </h3>
            <button
              onClick={() => setShowStats(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f857a6',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '5px',
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#f857a6' }}>Resume Downloads:</strong>
              <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>
                {downloadCount}
              </span>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#f857a6' }}>Last Download:</strong>
              <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#ddd' }}>
                {localStorage.getItem('last_download_time') || 'Never'}
              </span>
            </div>
            
            <div style={{ 
              fontSize: '0.7rem', 
              color: '#999', 
              marginTop: '15px',
              borderTop: '1px solid rgba(248, 87, 166, 0.2)',
              paddingTop: '10px'
            }}>
              Press Ctrl+Shift+S to toggle this panel
            </div>
          </div>
        </div>
      )}
      
      <Analytics />
    </div>
  )
}

export default App
