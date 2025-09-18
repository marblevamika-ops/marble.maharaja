import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import CollectionDetailsPage from './Pages/Collection/CollectionDetailsPage';

import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

// Admin Components
import AdminLogin from './Admin/AdminComponents/AdminLogin';
import AdminDashboard from './Admin/AdminComponents/AdminDashboard';
import AdminMessages from './Admin/AdminPages/AdminMessages';
import AdminFAQ from './Admin/AdminPages/AdminFAQ';
import AdminSettings from './Admin/AdminPages/AdminSettings';
import AdminProfile from './Admin/AdminPages/AdminProfile';

// Admin route protection wrapper
import AdminRoute from './Components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection/details" element={<CollectionDetailsPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <AdminRoute>
                <AdminFAQ />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
