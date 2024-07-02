import './App.css'
import Dashboard  from './Components/Dashboard'
import SignIn from './Components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      
        <Routes>
          
          <Route path="/"element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      
    </Router>
  );
}

export default App;
