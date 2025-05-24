import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
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
          textAlign: 'left',
          maxWidth: '600px',
          margin: '0 auto',
          marginTop: '300px',
        }}
      >
        <h1 className="gradient_text" style={{ fontSize: '5rem', fontWeight: 'bold', margin: '0', lineHeight: 1.1 }}>
          Hello<br />I'm Elvin
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#fff', marginTop: '20px' }}>
          I'm a passionate software engineer building cool things with code.
        </p>
      </div>
    </div>
  )
}

export default App
