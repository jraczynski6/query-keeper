import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

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

// placeholder for authentication 
// TODO: replace with useState
const isAuthenticated = true;

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path='/' element={
              <Layout>
                <Landing />
              </Layout>
            }
          />
          <Route
            path='/about' element={
              <Layout>
                <About />
              </Layout>
            }
          />

          {/* Protected Route */}
          <Route
            path='/dashboard' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/agents' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Agents />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/agents/:id' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <SelectedAgent />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/projects' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Projects />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/selected-project' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <SelectedProject />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/author' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Author />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App