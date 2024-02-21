import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Protected from './Components/Protected';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import CheckOut from './Components/CheckOut';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Login />} />
          <Route path='/home' element={<Protected Comp={Home} />} />
          <Route path = '/addToCart/:id' element = {<Protected Comp = {CheckOut} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
