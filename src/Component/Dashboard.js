import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/scores");
        setUserScores(response.data);
      } catch (error) {
        console.error("Error fetching user scores:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserScores();
    fetchUsers();
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-red-400 p-6 ">
      <div className="bg-gray-400 bg-opacity-50 p-6 rounded-lg shadow-lg mb-6 mr-20 ml-20">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div>
            <button 
              onClick={() => setShowScores(!showScores)} 
              className="bg-purple-500 text-white px-8 py-2  rounded-md hover:bg-purple-600 transition duration-200 mr-2 "
            >
              {showScores ? "Hide User Scores" : "View User Scores"}
            </button>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {showScores && (
          <div className="p-4 rounded shadow-md mb-6">
            <h3 className="text-xl font-semibold">User Scores</h3>
            <ul>
              {userScores.map((user) => (
                <li key={user.id} className={`flex justify-between items-center px-2  ${user.score < 2 ? "bg-red-100" : "bg-green-100"}`}>
                  <span className="font-semibold ">{user.userName}</span> 
                  <span>{user.score}</span>
                  <span className={`font-semibold ${user.score < 2 ? "text-red-800 p-5 text-centre" : "text-green-400 p-5"}`}>
                    {user.score < 2 ? "Unsuccessful" : "Successfull"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!showScores && (
          <div>
            <label className="block mb-2">Quiz Title</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter quiz title"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />

            <label className="block mb-2">Question {currentQuestionIndex + 1}</label>
            <input
              type="text"
              value={questions[currentQuestionIndex].question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
              placeholder="Enter question"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <div className="mb-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[currentQuestionIndex].options[index] = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>

            <label className="block mb-2">Correct Option</label>
            <select
              value={questions[currentQuestionIndex].correctOption}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].correctOption = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">Select correct option</option>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <button 
              onClick={() => {
                setQuestions([...questions, { question: "", options: ["", "", "", ""], correctOption: "" }]);
                setCurrentQuestionIndex(questions.length);
              }} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-200"
            >
              Add Question
            </button>

            <button 
              onClick={async () => {
                const dataToSave = {
                  subject,
                  questions,
                };

                try {
                  await axios.post("http://localhost:3001/quizzes", dataToSave);
                  alert("Questions saved successfully!");
                  setSubject("");
                  setQuestions([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
                  setCurrentQuestionIndex(0);
                } catch (error) {
                  console.error("Error saving questions:", error);
                  alert("Error saving questions.");
                }
              }} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
