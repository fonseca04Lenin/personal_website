import { useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  const aboutRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClick = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      id: 2,
      name: "Stock Market App",
      description: "A comprehensive stock tracking application with real-time data and analytics",
      date: "April 2024 - May 2024",
      tech: ["Python", "Tkinter", "Matplotlib", "API Integration", "JSON", "Pickle"],
      images: ["/stock-app-placeholder.jpg"],
      details: "Spearheaded the conceptualization and development of a stock market app by integrating modules such as Tkinter, Matplotlib, datetime, pickle and an API resulting in a streamlined user experience that improved information retrieval speed by 40%. Executed a systematic timeline for app development, including idea generation, concept creation, building the app with real-time data visualization and user-friendly interface design.",
      github: "https://github.com/fonseca04Lenin/Project-2.git",
      live: "https://your-stock-app.com"
    },
    {
      id: 3,
      name: "UV Index Checker Web App",
      description: "Interactive web application providing instant UV index updates through geolocation",
      date: "August 2024",
      tech: ["Python", "Flask", "HTML", "CSS", "Jinja2", "RESTful APIs", "JSON", "Geolocation"],
      images: ["/uv-checker-placeholder.jpg"],
      details: "Designed an interactive web application employing Python and Flask to provide instant UV index updates through geolocation services; streamlined data retrieval process, reducing load times by 60% and increasing user satisfaction. Created an intuitive and user-friendly interface with HTML, CSS, and Jinja2 templating to provide users with clear visual indicators of UV levels using color-coded categories for low, moderate, and high UV indexes. Implemented RESTful API calls to obtain current and forecasted UV index data, leveraging JSON data parsing to handle and display relevant information.",
      github: "https://github.com/fonseca04Lenin/UV-Index-Web-Project.git",
      live: "https://your-uv-checker.com"
    }
  ];

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {/* first Section with Video */}
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
          <p className="hero-small-text" style={{ fontSize: '.75rem', color: '#fff', marginTop: '20px' }}>
            This website is work in progress.
          </p>
        </div>
        {/* the chevron and Click Me */}
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
            onClick={handleClick}
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
            onClick={handleClick}
          >
            Click Me
          </span>
        </div>
        {/* the black divide bwtween the video and the about me section */}
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

      {/* About Me Section-page backfgorund etc */}
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
          {/* image container and actual image  */}
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
          
          {/* Text and Paragraphsin the about me section */}
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

      {/* Projects Timeline Section */}
      <section
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
        <h2 className="gradient_text" style={{ 
          fontSize: '3.5rem', 
          marginBottom: '30px', 
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
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
            background: 'linear-gradient(to right, #f857a6, #ff5858, #ffcc70)',
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
                
                {/* Connecting Line - From circle to the card */}
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

      {/* Project Modal */}
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
            
            {/* Action Buttons */}
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
      
      <Analytics />
    </div>
  )
}

export default App
