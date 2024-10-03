import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    
    const [quizzes, setQuizzes] = useState([]);
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [quizSelected, setQuizSelected] = useState(false);
    const [userName, setUserName] = useState('');
    const [nameInput, setNameInput] = useState(''); 

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('http://localhost:3001/quizzes');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchQuizData();
    }, []);

    const saveUserScore = async () => {
        const scoreData = {
            userName,
            score,
            quizTitle: quizData.title,
        };

        try {
            await fetch('http://localhost:3001/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scoreData),
            });
            setResultMessage(`You have completed the quiz! Your score is: ${score} / ${quizData.questions.length}. Your score has been saved!`);
        } catch (error) {
            console.error("Error saving score:", error);
            setResultMessage("Score could not be saved. Please try again.");
        }
    };

    const handleQuizSelect = (quiz) => {
        setQuizData(quiz);
        setQuizSelected(true);
    };

    const handleOptionSelect = (option) => {
        const question = quizData.questions[currentQuestionIndex];
        const isCorrect = option === question.answer;
        setSelectedOption(option);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        setResultMessage(isCorrect ? "Correct answer!" : "Wrong answer. Try again!");
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setResultMessage('');
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleSubmit = () => {
        saveUserScore();
        setIsSubmitted(true);
    };

    const handleLogout = () => {
        alert('Logged out successfully!');
        navigate('/');
    };

    const handleBack = () => {
        if (quizSelected) {
            setQuizSelected(false);
            setQuizData(null);
            setCurrentQuestionIndex(0);
            setScore(0);
            setIsSubmitted(false);
            setResultMessage('');
            setSelectedOption(null);
            setNameInput(''); 
        } else {
            navigate('/');
        }
    };

    const handleNameSubmit = () => {
        setUserName(nameInput);
    };

    if (quizzes.length === 0) {
        return <div className="text-center p-6">Loading quizzes...</div>;
    }

    if (!userName) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-white">
                <div className="bg-gray-100 bg-opacity-75 p-8 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Enter Your Name</h2>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="border border-gray-300 p-2 mb-4 w-full rounded"
                        placeholder="Your Name"
                    />
                    <button
                        onClick={handleNameSubmit}
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    if (!quizSelected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-white">
                <div className="bg-gray-100 bg-opacity-75 p-8 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Select a Quiz</h2>
                    {quizzes.map((quiz) => (
                        <button
                            key={quiz.id}
                            onClick={() => handleQuizSelect(quiz)}
                            className="block w-full p-3 mb-4 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                        >
                            {quiz.title}
                        </button>
                    ))}
                    <button
                        onClick={handleBack}
                        className="mt-4  bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-purple-400 p-4 rounded-lg shadow-lg w-[100%] text-center bg-opacity-40">

                <h2 className="text-2xl font-bold mb-4 text-gray-700">Welcome, {userName}!</h2>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{quizData.title}</h2>
                <p className="mb-4 text-gray-600">Score: {score} / {currentQuestionIndex}</p>
                <p className="mb-4 text-gray-600">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>

                {!isSubmitted && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">{currentQuestion.question}</h3>
                        <div>
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`block w-full text-left p-3 mb-2 rounded-lg transition duration-200 
                                        ${selectedOption === option ? (option === currentQuestion.answer ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-200 hover:bg-gray-300'}`}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {resultMessage && <p className="mt-4 text-lg text-gray-600">{resultMessage}</p>}
                        {selectedOption && currentQuestionIndex < quizData.questions.length - 1 && (
                            <button
                                onClick={handleNextQuestion}
                                className="mt-2 bg-blue-500 text-white py-3 px-3 rounded-lg hover:bg-green-400 transition duration-200"
                            >
                                Next Question
                            </button>
                        )}
                    </div>
                )}

                {currentQuestionIndex === quizData.questions.length - 1 && !isSubmitted && (
                    <button
                        onClick={handleSubmit}
                        className="mt-1 bg-green-500 text-white py-3 px-5 rounded-lg hover:bg-green-600 transition duration-200 mr-2"
                    >
                        Submit
                    </button>
                )}

                {isSubmitted && (
                    <div className="mt-1">
                        <p className="text-lg text-gray-600">{resultMessage}</p>
                    </div>
                )}

                <button
                    onClick={handleBack}
                    className="mt-1 mr-2 bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                    Back
                </button>

                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
