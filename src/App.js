import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import MdStock from './Pages/mdStock';
import MedicalDevices from './Pages/medicalDevices';
import Consumption from './Pages/consumption';
import Replishement from './Pages/replishement';


function App() {
  return (
    <div className="container-fluid d-flex flex-column subContainer p-0" style={{ minHeight: '94vh' }}>
          <BrowserRouter>
          <Routes>
            <Route path='/consommableMedicalDevices' element= {<MedicalDevices />} />
            <Route path='/stock' element= {<MdStock />} />
            <Route path='/consumption' element= {<Consumption />} />
            <Route path='/replishement' element= {<Replishement />} /> 
            <Route path='*' element={<MedicalDevices />} />
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
