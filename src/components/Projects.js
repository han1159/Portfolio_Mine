import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showGithubLinks, setShowGithubLinks] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/han1159/repos');
        setProjects(response.data);
        // Initialize showGithubLinks state with false for each project
        const initialShowGithubLinks = {};
        response.data.forEach(project => {
          initialShowGithubLinks[project.id] = false;
        });
        setShowGithubLinks(initialShowGithubLinks);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Object containing riddles and answers for each project
  const riddles = {
    // Sample riddles and answers for demonstration
    747253008: { riddle: "I am a programming language often used for web development. What am I?", answer: "javascript" },
    732874858: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    558454329: { riddle: "I am a programming language often used for web development. What am I?", answer: "JavaScript" },
    622512794: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    558376120: { riddle: "I am a programming language often used for web development. What am I?", answer: "javascript" },
    685193094: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    684728463: { riddle: "I am a programming language often used for web development. What am I?", answer: "JavaScript" },
    619096049: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    680920024: { riddle: "I am a programming language often used for web development. What am I?", answer: "javascript" },
    774295360: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    634786253: { riddle: "I am a programming language often used for web development. What am I?", answer: "JavaScript" },
    622586230: { riddle: "I am a version control system popular among developers. What am I?", answer: "Git" },
    774392785: { riddle: "I am a programming language often used for web development. What am I?", answer: "JavaScript" },
  };

  // Function to handle user's answer submission
  const handleAnswerSubmission = (projectId, answer) => {
    const correctAnswer = riddles[projectId].answer.toLowerCase();
    if (answer.toLowerCase() === correctAnswer) {
      const updatedShowGithubLinks = { ...showGithubLinks, [projectId]: true };
      setShowGithubLinks(updatedShowGithubLinks);
    }
    // Clear user's answer after submission
    setUserAnswers({ ...userAnswers, [projectId]: '' });
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 shadow-md rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p>{project.description}</p>
            {/* Display riddle for the project */}
            <p className="text-gray-600 text-sm mt-2">Riddle: {riddles[project.id]?.riddle}</p>
            {/* Input field for user to submit their answer */}
            <input 
              type="text"
              className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Crack it to view"
              value={userAnswers[project.id] || ''}
              onChange={(e) => setUserAnswers({ ...userAnswers, [project.id]: e.target.value })}
            />
            {/* Button to submit answer */}
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
              onClick={() => handleAnswerSubmission(project.id, userAnswers[project.id])}
            >
              Submit
            </button>
            {/* Display GitHub link if the answer is correct */}
            {showGithubLinks[project.id] && (
              <a href={project.html_url} className="text-blue-600 hover:underline block mt-2">View on GitHub</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;