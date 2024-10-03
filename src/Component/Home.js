import React from 'react';
import { useNavigate } from 'react-router-dom';
import home from "../assets/home.jpg";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${home})` }}
        >
            <nav className="bg-white bg-opacity-90 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Online Quiz</h1>
                    <div>
                        {/* Add additional navigation items here if needed */}
                    </div>
                </div>
            </nav>

            <div className="flex items-center justify-center flex-grow">
                <div className="text-center bg-white bg-opacity-75 p-20 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>
                    
                    <div className="flex justify-center space-x-4">
                        <div className="flex flex-col items-center bg-blue-300 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2 uppercase">User</h2>
                            <div className="flex flex-col space-y-2">
                                <button 
                                    onClick={() => navigate('/login')} 
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Login / Sign Up
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center bg-pink-300 p-4 px-7 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2 uppercase">Admin</h2>
                            <button 
                                onClick={() => navigate('/admin')} 
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Admin Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
