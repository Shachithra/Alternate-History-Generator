import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hello, React! 🚀</h1>
      <p>Start typing to see React's state in action:</p>
      
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      
      {name && <h2 style={{ marginTop: '1rem', color: '#646cff' }}>Welcome, {name}!</h2>}
    </div>
  )
}

export default App