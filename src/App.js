import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './Components/HeaderComponents/Header';
import Sidebar from './Components/SidebarComponents/Sidebar';
import Application from './Components/ApplicationComponents/Application';
import SuccessfullyPage from './Components/ApplicationComponents/StatusComponent/SuccessfulYPage'; 

// Other route components (Dashboard, Students, etc.)
const Dashboard = () => <div>Dashboard</div>;
const Students = () => <div>Students</div>;
const Employee = () => <div>Employee</div>;
const Fleet = () => <div>Fleet</div>;
const Warehouse = () => <div>Warehouse</div>;
const Sms = () => <div>SMS</div>;
const QuestionBank = () => <div>Question Bank</div>;
const AssetsManagement = () => <div>Assets Management</div>;
const PaymentsService = () => <div>Payment Services</div>;
const Cctv = () => <div>CCTV</div>;
const Hrms = () => <div>HRMS</div>;
const Masters = () => <div>Masters</div>;
const NotFound = () => <div>404 Page Not Found</div>; // Fallback for unknown routes

function App() {
  return (
    <div className="scope_app">
      <header className="scope_app_header">
        <Header />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Routes>
          {/* Main routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/application/*" element={<Application />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/sms" element={<Sms />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route path="/assets-management" element={<AssetsManagement />} />
          <Route path="/payments-service" element={<PaymentsService />} />
          <Route path="/cctv" element={<Cctv />} />
          <Route path="/hrms" element={<Hrms />} />
          <Route path="/masters" element={<Masters />} />
          
          {/* SuccessfullyPage Route */}
          <Route path="/successfully" element={<SuccessfullyPage />} />
          
          {/* Catch-all route for unrecognized paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
