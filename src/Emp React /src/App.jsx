import './App.css'
import Dashboard  from './Components/Dashboard'
import SignIn from './Components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ResetPassword from './Components/ResetPassword'


function App() {
  const [Login, setLogin] = useState(localStorage.getItem('Login') === 'true'); 

  useEffect(() => {
    localStorage.setItem('Login', Login);
  }, [Login]);

  return (
    <Router>
      
        <Routes>
          
          <Route path="/"element={<SignIn Login={Login} setLogin={setLogin} />} />
          {Login && <Route path="/dashboard" element={<Dashboard Login={Login} setLogin={setLogin} />} />}
          <Route path="forgotPassword" element={<ResetPassword/>} />
        </Routes>
      
    </Router>
  );
}

export default App;
