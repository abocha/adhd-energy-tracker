// frontend/src/components/LogForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const LogForm = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        energy_level: '', // Existing
        focus_level: '', // Existing
        notes: '',       // Existing

        // --- New Metric Fields (matching backend models.py) ---
        overall_energy: '',
        mental_clarity: '',
        physical_restlessness: '',
        task_initiation: '',
        task_completion: '',
        time_perception: '',
        focus_type: '',
        impulsivity_level: '',
        procrastination: '',
        doomscrolling_overconsumption: '',
        emotional_regulation: '',
        physical_sensory_state: '',
        energy_shifts_today: '',
        start_prompt_type: '',
        start_prompt_other: '',
        flow_state: false,
        movement_breaks_taken: false,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value, // Handle checkbox values
        }));
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
                {/* --- Existing Fields (Date, Energy Level, Focus Level, Notes) - No changes here --- */}
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

                {/* --- New Metric Fields - Dropdown Selects --- */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="overall_energy">Overall Energy</label>
                    <select id="overall_energy" name="overall_energy" value={formData.overall_energy} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🟢 High">🟢 High (wired, hyper)</option>
                        <option value="🟡 Medium">🟡 Medium (engaged, fine)</option>
                        <option value="🔴 Low">🔴 Low (sluggish, drained)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="mental_clarity">Mental Clarity</label>
                    <select id="mental_clarity" name="mental_clarity" value={formData.mental_clarity} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="✨ Sharp">✨ Sharp (focused, clear)</option>
                        <option value="😵 Foggy">😵 Foggy (zoning out)</option>
                        <option value="🤯 Overwhelmed">🤯 Overwhelmed (too much input)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="physical_restlessness">Physical Restlessness</label>
                    <select id="physical_restlessness" name="physical_restlessness" value={formData.physical_restlessness} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🏃‍♂️ High">🏃‍♂️ High (pacing, fidgeting)</option>
                        <option value="🛋️ Normal">🛋️ Normal (balanced)</option>
                        <option value="🪫 Low">🪫 Low (lethargic, still)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="task_initiation">Task Initiation</label>
                    <select id="task_initiation" name="task_initiation" value={formData.task_initiation} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🚀 Easy">🚀 Easy (jumped in)</option>
                        <option value="⏳ Delayed">⏳ Delayed (hesitated)</option>
                        <option value="🛑 Stuck">🛑 Stuck (couldn’t start)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="task_completion">Task Completion</label>
                    <select id="task_completion" name="task_completion" value={formData.task_completion} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="✅ Finished">✅ Finished</option>
                        <option value="🔄 Switched tasks">🔄 Switched tasks a lot</option>
                        <option value="❌ Unfinished">❌ Left unfinished</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="time_perception">Time Perception</label>
                    <select id="time_perception" name="time_perception" value={formData.time_perception} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="⏳ Normal">⏳ Normal</option>
                        <option value="🕳️ Lost track">🕳️ Lost track</option>
                        <option value="⚡ Time sped up">⚡ Time sped up</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="focus_type">Focus Type</label>
                    <select id="focus_type" name="focus_type" value={formData.focus_type} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🎯 Hyperfocused">🎯 Hyperfocused</option>
                        <option value="🔄 Scattered">🔄 Scattered</option>
                        <option value="🛑 No focus">🛑 No focus</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="impulsivity_level">Impulsivity Level</label>
                    <select id="impulsivity_level" name="impulsivity_level" value={formData.impulsivity_level} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🚦 Controlled">🚦 Controlled</option>
                        <option value="🌀 Mildly impulsive">🌀 Mildly impulsive</option>
                        <option value="💥 Strong">💥 Strong (random actions, overspending, etc.)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="procrastination">Procrastination</label>
                    <select id="procrastination" name="procrastination" value={formData.procrastination} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🚀 No">🚀 No</option>
                        <option value="🔄 Some">🔄 Some</option>
                        <option value="⏳ Heavy">⏳ Heavy</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="doomscrolling_overconsumption">Doomscrolling/Overconsumption</label>
                    <select id="doomscrolling_overconsumption" name="doomscrolling_overconsumption" value={formData.doomscrolling_overconsumption} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="❌ None">❌ None</option>
                        <option value="📱 Some">📱 Some (mild distraction)</option>
                        <option value="⚠️ A lot">⚠️ A lot (stuck in loop)</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="emotional_regulation">Emotional Regulation</label>
                    <select id="emotional_regulation" name="emotional_regulation" value={formData.emotional_regulation} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="😊 Stable">😊 Stable</option>
                        <option value="🌊 Rollercoaster">🌊 Rollercoaster</option>
                        <option value="🔥 Agitated">🔥 Agitated</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="physical_sensory_state">Physical Sensory State</label>
                    <select id="physical_sensory_state" name="physical_sensory_state" value={formData.physical_sensory_state} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="🔊 Overstimulated">🔊 Overstimulated</option>
                        <option value="📉 Understimulated">📉 Understimulated</option>
                        <option value="⚖️ Balanced">⚖️ Balanced</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="energy_shifts_today">Energy Shifts Today</label>
                    <select id="energy_shifts_today" name="energy_shifts_today" value={formData.energy_shifts_today} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="↗️ Increased">↗️ Increased suddenly</option>
                        <option value="↘️ Dropped">↘️ Dropped suddenly</option>
                        <option value="🔄 Stable">🔄 Stable</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="start_prompt_type">Start Prompt Type</label>
                    <select id="start_prompt_type" name="start_prompt_type" value={formData.start_prompt_type} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500">
                        <option value="">Select</option>
                        <option value="⏰ Scheduled Reminder">⏰ Scheduled Reminder</option>
                        <option value="🔥 Urgency/Pressure">🔥 Urgency/Pressure</option>
                        <option value="🤝 External Accountability">🤝 External Accountability</option>
                        <option value="✨ Sudden Interest/Hyperfocus">✨ Sudden Interest/Hyperfocus</option>
                        <option value="✅ Just Did It">✅ Just Did It</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {formData.start_prompt_type === 'Other' && ( // Conditional rendering for "Other" prompt text input
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="start_prompt_other">Other Start Prompt</label>
                        <input
                            type="text"
                            id="start_prompt_other"
                            name="start_prompt_other"
                            value={formData.start_prompt_other}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
                        />
                    </div>
                )}
                

                {/* --- New Metric Fields - Checkboxes --- */}
                <div className="mb-6">
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="flow_state" checked={formData.flow_state} onChange={handleChange} className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-gray-700">Flow State?</span>
                    </label>
                </div>

                <div className="mb-6">
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="movement_breaks_taken" checked={formData.movement_breaks_taken} onChange={handleChange} className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-gray-700">Movement Breaks Taken?</span>
                    </label>
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
                    <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" disabled={loading}>
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Log'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogForm;