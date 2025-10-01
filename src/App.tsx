import BitterballenCard from './components/BitterballenCard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Dutch Bitterballen API</h1>
        <p>Discover the traditional Dutch delicacy with detailed nutritional information</p>
      </header>
      <main>
        <BitterballenCard />
      </main>
      <footer className="app-footer">
        <p>React, TypeScript, and Axios</p>
      </footer>
    </div>
  )
}

export default App
