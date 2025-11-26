import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { DashboardProvider } from './contexts/DashboardContext';
import "./index.css";
import { NotificationsProvider } from './contexts/NotificationsContext';
import ToastList from './components/toast/ToastList';
import ScrollToTop from "./components/ScrollToTop";


// Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import SelectedAgent from "./pages/SelectedAgent";
import Projects from "./pages/Projects";
import SelectedProject from "./pages/SelectedProject";
import Author from "./pages/Author";
import Layout from './components/Layout';


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <>
      <NotificationsProvider>
        <DashboardProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Route */}
              <Route
                path='/' element={
                  <Layout
                    isAuthenticated={isAuthenticated}
                    setAuthenticated={setAuthenticated}
                    pageTitle="Home"
                  >
                    <Landing />
                  </Layout>
                }
              />
              <Route
                path='/about' element={
                  <Layout
                    isAuthenticated={isAuthenticated}
                    setAuthenticated={setAuthenticated}
                    pageTitle="About"
                  >
                    <About />
                  </Layout>
                }
              />

              {/* Protected Route */}
              <Route
                path='/dashboard' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Dashboard"
                    >
                      <Dashboard isAuthenticated={isAuthenticated} />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/agents' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Agents"
                    >
                      <Agents />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/agents/:id' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Agent"
                    >
                      <SelectedAgent />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/projects' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Projects"
                    >
                      <Projects />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/projects/:projectId' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Project"
                    >
                      <SelectedProject />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/author' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout
                      isAuthenticated={isAuthenticated}
                      setAuthenticated={setAuthenticated}
                      pageTitle="Author"
                    >
                      <Author />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </DashboardProvider>
        <ToastList />
      </NotificationsProvider>
    </>
  )
}

export default App