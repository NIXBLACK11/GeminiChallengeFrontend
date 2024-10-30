import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';
import { FaGithub } from 'react-icons/fa';

function App() {
  return (
    <div className='pt-0 mt-0 h-screen' style={{ backgroundColor: "#000000", position: 'relative' }}>
      <div 
          className="absolute top-2 right-2"
          style={{ zIndex: 10 }}
          onClick={() => { window.open("https://github.com/NIXBLACK11/GeminiChallenge/", "_blank"); console.log("Icon clicked!");}}
      >
          <FaGithub className="text-white text-4xl" />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
