import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import MdStock from './Pages/mdStock';
import MedicalDevices from './Pages/medicalDevices';
import Consumption from './Pages/consumption';
import Replishement from './Pages/replishement';
import Order from './Pages/order';
import PeriodicAlert from './Components/periodicAlert';
import MedicalDeviceDetails from './Pages/medicalDeviceDetails';
import AppLayout from './layout/appLayout';
import MedicalDevicesLayout from './layout/medicalDevicesLayout'
import Inventory from './Pages/inventory';
import ReceivedOrder from './Pages/receivedOrder';
import ReceivedOrderNotification from './Components/receivedOrderNotification';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<Navigate to="/consommableMedicalDevices" />} />
      <Route path='consommableMedicalDevices' element={<MedicalDevices />} />
      <Route path='inventory' element={<MedicalDevicesLayout />} >
        <Route index element={<Inventory />} />
        <Route path=":id" element={<MedicalDeviceDetails />} />
      </Route>
      <Route path='stock' element={<MdStock />} />
      <Route path='consumption' element={<Consumption />} />
      <Route path='replishement' element={<Replishement />} />
      <Route path='order' element={<Order />} />
      <Route path='ReceivedOrder' element={<ReceivedOrder />} />
    </Route>
  ))


function App() {
  return (
    <div className="container-fluid d-flex flex-column subContainer p-0" style={{ minHeight: '94vh' }}>
      <PeriodicAlert />
      <ReceivedOrderNotification />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
