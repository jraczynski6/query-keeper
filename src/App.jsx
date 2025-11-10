import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { DashboardProvider } from './contexts/DashboardContext';

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
      <DashboardProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route
              path='/' element={
                <Layout
                  isAuthenticated={isAuthenticated}
                  setAuthenticated={setAuthenticated}
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
                  >
                    <Author />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </DashboardProvider>
    </>
  )
}

export default App