// frontend/src/components/LogForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const LogForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    energy_level: '',
    focus_level: '',
    notes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/api/logs/', formData);
      toast.success('Energy log saved successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save energy log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Log Your Energy</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="energy_level">
            Energy Level
          </label>
          <select
            id="energy_level"
            name="energy_level"
            value={formData.energy_level}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
            required
          >
            <option value="">Select Energy Level</option>
            <option value="🔥 High">🔥 High</option>
            <option value="⚖️ Medium">⚖️ Medium</option>
            <option value="🪫 Low">🪫 Low</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="focus_level">
            Focus Level
          </label>
          <select
            id="focus_level"
            name="focus_level"
            value={formData.focus_level}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
            required
          >
            <option value="">Select Focus Level</option>
            <option value="🎯 Focused">🎯 Focused</option>
            <option value="🔄 Scattered">🔄 Scattered</option>
            <option value="🛑 Unfocused">🛑 Unfocused</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="notes">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
            rows="4"
          ></textarea>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Log'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogForm;