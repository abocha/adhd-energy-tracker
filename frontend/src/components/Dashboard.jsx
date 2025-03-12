// frontend/src/components/Dashboard.jsx (continued and updated)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResponse, logsResponse] = await Promise.all([
                    api.get('/api/stats/'),
                    api.get('/api/logs/')
                ]);

                setStats(statsResponse.data);
                setLogs(logsResponse.data);
            } catch (error) {
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Process data for chart (Existing chart data - no changes needed for Phase 2)
    const chartData = {
        labels: logs.slice(0, 10).map(log => log.date).reverse(),
        datasets: [
            {
                label: 'Energy Level',
                data: logs.slice(0, 10).map(log => {
                    if (log.energy_level === '🔥 High') return 3;
                    if (log.energy_level === '⚖️ Medium') return 2;
                    return 1;
                }).reverse(),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3,
            },
            {
                label: 'Focus Level',
                data: logs.slice(0, 10).map(log => {
                    if (log.focus_level === '🎯 Focused') return 3;
                    if (log.focus_level === '🔄 Scattered') return 2;
                    return 1;
                }).reverse(),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 4,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        if (value === 1) return 'Low';
                        if (value === 2) return 'Medium';
                        if (value === 3) return 'High';
                        return '';
                    },
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Energy & Focus Levels Over Time',
            },
        },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-purple-700">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ... (Overview section - no changes needed) ... */}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-purple-700">Your Trends</h2>
                {logs.length > 0 ? (
                    <div className="h-64">
                        <Line options={chartOptions} data={chartData} />
                    </div>
                ) : (
                    <p className="text-gray-600">No data available yet. Start logging to see trends!</p>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-purple-700">Recent Logs</h2>

                {logs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Date</th>
                                    <th className="py-2 px-4 border-b text-left">Energy</th>
                                    <th className="py-2 px-4 border-b text-left">Focus</th>
                                    {/* --- New Table Headers - Add these --- */}
                                    <th className="py-2 px-4 border-b text-left">Overall Energy</th>
                                    <th className="py-2 px-4 border-b text-left">Mental Clarity</th>
                                    <th className="py-2 px-4 border-b text-left">Restlessness</th>
                                    <th className="py-2 px-4 border-b text-left">Initiation</th>
                                    <th className="py-2 px-4 border-b text-left">Completion</th>
                                    <th className="py-2 px-4 border-b text-left">Time Perception</th>
                                    <th className="py-2 px-4 border-b text-left">Focus Type</th>
                                    <th className="py-2 px-4 border-b text-left">Emotion Reg.</th>
                                    <th className="py-2 px-4 border-b text-left">Sensory State</th>
                                    <th className="py-2 px-4 border-b text-left">Start Prompt</th>
                                    <th className="py-2 px-4 border-b text-left">Flow State</th>
                                    <th className="py-2 px-4 border-b text-left">Move Breaks</th>

                                    <th className="py-2 px-4 border-b text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.slice(0, 7).map((log) => (
                                    <tr key={log.id}>
                                        <td className="py-2 px-4 border-b">{log.date}</td>
                                        <td className="py-2 px-4 border-b">{log.energy_level}</td>
                                        <td className="py-2 px-4 border-b">{log.focus_level}</td>
                                        {/* --- New Table Data Cells - Add these --- */}
                                        <td className="py-2 px-4 border-b">{log.overall_energy || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.mental_clarity || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.physical_restlessness || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.task_initiation || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.task_completion || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.time_perception || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.focus_type || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.emotional_regulation || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.physical_sensory_state || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.start_prompt_type || '-'}</td>
                                        <td className="py-2 px-4 border-b">{log.flow_state ? 'Yes' : 'No'}</td> {/* Boolean display */}
                                        <td className="py-2 px-4 border-b">{log.movement_breaks_taken ? 'Yes' : 'No'}</td> {/* Boolean display */}

                                        <td className="py-2 px-4 border-b">{log.notes ? log.notes.substring(0, 50) + (log.notes.length > 50 ? '...' : '') : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No logs found. Start tracking your energy levels!</p>
                )}

                {/* ... (Add New Log button - no changes) ... */}
            </div>
        </div>
    );
};

export default Dashboard;