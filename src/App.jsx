import { useRef } from 'react'
import './App.css'

function App() {
  const aboutRef = useRef(null);

  const handleClick = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
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
          className="hero-content"
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
          zIndex: 2
        }}>
          <svg width="60" height="47" className='chevron-bounce'>
            <polyline
              points="10, 10 30,30 50,10"
              style={{ fill: 'none', stroke: 'white', strokeWidth: 4, strokeLinecap: 'round' }}
            />
          </svg>
          <span 
            style={{ marginTop: '8px', fontSize: '1.2rem', color: '#fff', cursor: 'pointer' }}
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
              I'm Elvin Fonseca, an upcoming senior studying Computer Science and AI at the University of Nebraska Omaha with a deep passion for software engineering. I love turning ideas into real-world solutions — whether it's building full-stack apps, exploring new technologies, or contributing to projects that make people's lives easier.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ddd', marginTop: '16px' }}>
              I've worked with everything from mobile development to AI tools, and I'm always eager to learn, improve, and make an impact. My goal is simple: to grow as a developer and help build software that matters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
