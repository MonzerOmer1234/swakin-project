
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SideTabs from './components/sidebar/SideTabs';
import Navbar from './components/sidebar/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Cars from './components/cars/Cars';
import Shipment from './components/shipment/Shipment';
import Bookings from './components/bookings/Bookings';


function App() {
  return (
    <div>
      
      <SideTabs/>
     
     
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/shipment' element={<Shipment/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
      </Routes>
    
     
    </div>
  );
}

export default App;
