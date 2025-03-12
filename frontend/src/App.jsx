// frontend/src/App.jsx (continued)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import LogForm from './components/LogForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-purple-600">ADHD Energy Tracker</h1>
        {error && <div className="p-3 mb-4 text-white bg-red-500 rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && <Header />}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/log" element={
            <ProtectedRoute>
              <LogForm />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;