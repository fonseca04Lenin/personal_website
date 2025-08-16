import { useRef, useState, useEffect, useMemo } from 'react'
import { Analytics } from '@vercel/analytics/react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  //Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const heroTexts = [
    "Software Engineer",
    "Problem Solver",
    "Innovation Driver",
    "Digital Architect"
  ];

  // Typing animation
  useEffect(() => {
    if (isTyping) return;
    
    const typeText = async () => {
      setIsTyping(true);
      const text = heroTexts[textIndex];
      
      for (let i = 0; i <= text.length; i++) {
        setCurrentText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 120));
      }
      
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsTyping(false);
      setTextIndex((prev) => (prev + 1) % heroTexts.length);
    };

    typeText();
  }, [isTyping, textIndex]);

  //Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle body scroll when mobile menu is open
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

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [aboutRef, workRef, projectsRef, skillsRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleResumeDownload = () => {
    const timestamp = new Date().toISOString();
    console.log(`Resume downloaded at: ${timestamp}`);
  };

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const SERVICE_ID = 'service_ne9y91r';
      const TEMPLATE_ID = 'template_3agcbuw';
      const PUBLIC_KEY = 'Nm-ND2J9GAp-unpH9';

      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_subject: formData.subject,
        message: formData.message,
        to_name: 'Elvin Fonseca',
        reply_to: formData.email
      };

      const emailPromise = emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email timeout after 30 seconds')), 30000)
      );

      const result = await Promise.race([emailPromise, timeoutPromise]);

      setFormStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
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
      live: "https://stock-watchlist-77bq.onrender.com/"
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
      live: "https://elvinfonseca.com"
    }
  ];

  const skills = {
    "Languages": [
      "JavaScript",
      "TypeScript",
      "Python",
      "C",
      "HTML5",
      "CSS3"
    ],
    "Frontend": [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Vue.js",
      "Angular",
      "Responsive Design"
    ],
    "Backend": [
      "Python",
      "Flask",
      "Laravel",
      "Node.js",
      "PHP",
      "RESTful APIs",
      "JSON",
      "Firebase"
    ],
    "Mobile": [
      "React Native",
      "Cross-platform Development",
      "iOS Development"
    ],
    "Tools & Technologies": [
      "Git",
      "CI/CD",
      "GitHub Actions",
      "Docker",
      "Postman",
      "Linux",
      "Xcode",
      "Jira",
      "Excel",
      "Vite",
      "Vercel",
      "Render",
      "Matplotlib",
      "Pandas",
      "Jupyter Notebooks",
      "API Integration"
    ],
    "Databases": [
      "Firebase",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "JSON Data Processing"
    ],
    "Soft Skills": [
      "Team Collaboration",
      "Agile Development",
      "Problem Solving",
      "Code Review",
      "Performance Optimization",
      "Gambling"
    ]
  };

  const [currentSkillSetIndex, setCurrentSkillSetIndex] = useState(0);
  const rotatingSkillsForHero = useMemo(() => {
    const excludedCategories = new Set(["Soft Skills"]);
    const seenSkills = new Set();
    const flattenedSkills = Object.entries(skills)
      .filter(([categoryName]) => !excludedCategories.has(categoryName))
      .flatMap(([, skillList]) => skillList)
      .filter((skillName) => {
        if (seenSkills.has(skillName)) return false;
        seenSkills.add(skillName);
        return true;
      });
    return flattenedSkills;
  }, [skills]);

  const rotatingSkillSets = useMemo(() => {
    const chunkSize = 4;
    const grouped = [];
    for (let i = 0; i < rotatingSkillsForHero.length; i += chunkSize) {
      grouped.push(rotatingSkillsForHero.slice(i, i + chunkSize));
    }
    return grouped.length > 0 ? grouped : [rotatingSkillsForHero];
  }, [rotatingSkillsForHero]);

  useEffect(() => {
    if (rotatingSkillSets.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentSkillSetIndex((prev) => (prev + 1) % rotatingSkillSets.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [rotatingSkillSets.length]);

  const currentHeroSkills = rotatingSkillSets[currentSkillSetIndex] || [];

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="app">
      {/* Luxury Navigation */}
      <nav className="luxury-nav">
        <div className="nav-container">
          <div 
            className="nav-logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
          >
            <span className="logo-text">EF</span>
            <div className="logo-line"></div>
          </div>
          
          <div className="nav-links">
            {[
              { label: 'About', ref: aboutRef, id: 'about' },
              { label: 'Experience', ref: workRef, id: 'work' },
              { label: 'Skills', ref: skillsRef, id: 'skills' },
              { label: 'Projects', ref: projectsRef, id: 'projects' },
              { label: 'Contact', ref: contactRef, id: 'contact' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.ref)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
                <div className="link-underline"></div>
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <a
              href="https://www.linkedin.com/in/elvin-fonseca/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://github.com/fonseca04Lenin"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="/Elvin_Fonseca_Resume.pdf"
              download="Elvin_Fonseca_Resume.pdf"
              onClick={handleResumeDownload}
              className="resume-btn"
            >
              Resume
            </a>
          </div>

          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
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
                className="mobile-menu-link"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-main">Elvin Fonseca</span>
              <span className="title-subtitle">
                {currentText}
                <span className="cursor">|</span>
              </span>
            </h1>
            
            <p className="hero-description">
              Full-Stack Software Engineer crafting digital experiences that push boundaries
            </p>
            
            <div className="hero-skills">
              {currentHeroSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="hero-actions">
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="cta-button primary"
            >
              Explore My Work
            </button>
            
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="cta-button secondary"
            >
              Let's Connect
            </button>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="section about-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="about-content">
            <div className="about-visual">
              <div className="profile-container">
                <div className="profile-image">
                  <img src="head_shot.jpeg" alt="Elvin Fonseca" />
                </div>
                <div className="profile-frame"></div>
              </div>
            </div>
            
            <div className="about-text">
              <h3 className="about-heading">Passionate Problem Solver</h3>
              <p className="about-description">
                I'm Elvin Fonseca, a Computer Science student at the University of Nebraska Omaha with a deep passion for software engineering. I specialize in turning complex problems into elegant, scalable solutions.
              </p>
              <p className="about-description">
                With experience across the full stack—from mobile development to cloud infrastructure—I bring a comprehensive understanding of modern software development practices. My approach combines technical expertise with creative problem-solving to deliver exceptional user experiences.
              </p>
              
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-circle">
                    <span className="stat-number">3+</span>
                  </div>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <div className="stat-circle">
                    <span className="stat-number">15+</span>
                  </div>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <div className="stat-circle">
                    <span className="stat-number">5+</span>
                  </div>
                  <span className="stat-label">Technologies Mastered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="section skills-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Technical Expertise</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="skills-showcase">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} className="skill-category">
                <div className="category-header">
                  <h3 className="category-title">{category}</h3>
                  <div className="category-line"></div>
                </div>
                
                <div className="skills-container">
                  {skillList.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="skill-item"
                      style={{ '--delay': `${skillIndex * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={workRef} id="work" className="section experience-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Professional Journey</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="experience-timeline">
            <div className="timeline-track">
              <div className="timeline-line"></div>
              
              <div className="timeline-item current">
                <div className="timeline-marker">
                  <div className="marker-core"></div>
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="card-header">
                      <h3 className="company-name">Mutual of Omaha</h3>
                      <span className="position">Full-Stack Software Development Intern</span>
                      <span className="duration">May 2025 – Present</span>
                      <div className="current-badge">Current</div>
                    </div>
                    
                    <div className="card-body">
                      <ul className="experience-details">
                        <li>Contributed full-stack feature development and bug fixes on life insurance websites using Laravel, Vue.js, and PHP serving thousands of daily senior users and supporting 19M+ customers</li>
                        <li>Migrated Laravel ratings/reviews service from BazaarVoice to Yext proxy API, refactoring controllers/models, adding contract-driven fetch methods with caching, and implementing unit tests</li>
                        <li>Contribute to Mutual of Omaha's mission to serve 19+ million customers nationwide, building reliable and accessible digital experiences</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-core"></div>
                </div>
                
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="card-header">
                      <h3 className="company-name">Take2</h3>
                      <span className="position">Full-Stack Software Development Start Up Intern</span>
                      <span className="duration">Dec 2024 – Mar 2025</span>
                    </div>
                    
                    <div className="card-body">
                      <ul className="experience-details">
                        <li>Collaborated with a team of 4 developers to build and deploy a cross-platform movie-tracking app using React, TypeScript, and Firebase, now used by 3,000+ users across iOS</li>
                        <li>Designed and implemented 10+ front-end components and their back end, enhancing mobile responsiveness and UI performance by 30%</li>
                        <li>Resolved 20+ pre-launch bugs and added critical features such as the import feature, notification tracking system and real-time updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="section projects-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="projects-showcase">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => openProject(project)}
                style={{ '--delay': `${index * 0.2}s` }}
              >
                <div className="card-visual">
                  <div className="project-image">
                    <div className="image-overlay">
                      <span className="view-project">View Details</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="tech-more">+{project.tech.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="project-date">{project.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="section contact-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Let's Build Something Amazing</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-showcase">
            <div className="contact-info">
              <h3 className="contact-heading">Ready to collaborate?</h3>
              <p className="contact-description">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-details">
                    <span className="method-label">Email</span>
                    <a href="mailto:Leninfonseca04@gmail.com" className="method-value">Leninfonseca04@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <span className="method-label">Location</span>
                    <span className="method-value">Omaha, Nebraska</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'success' && (
                  <div className="form-message success">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="form-message error">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Email"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Subject"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Your Message"
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="submit-button"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeProject}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProject}>×</button>
            
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.name}</h2>
              <span className="modal-date">{selectedProject.date}</span>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedProject.details}</p>
              
              <div className="modal-tech">
                <h3>Technologies Used</h3>
                <div className="tech-grid">
                  {selectedProject.tech.map((tech, index) => (
                    <span key={index} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-button primary">
                  View Code
                </a>
              )}
              {selectedProject.live && (
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="modal-button secondary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">EF</div>
              <p className="footer-tagline">Building the future, one line of code at a time.</p>
            </div>
            
            <div className="footer-right">
              <div className="footer-links">
                <a href="https://www.linkedin.com/in/elvin-fonseca/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/fonseca04Lenin" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="/Elvin_Fonseca_Resume.pdf" download>Resume</a>
              </div>
              
              <p className="footer-copyright">© 2024 Elvin Fonseca. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  )
}

export default App
