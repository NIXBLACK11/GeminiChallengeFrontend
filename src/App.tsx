import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <div className='pt-0 mt-0 h-screen' style={{ backgroundColor: "#000000", position: 'relative' }}>
      <img 
        src="img.png" 
        alt="Description of image" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: 1
        }} 
      />
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
