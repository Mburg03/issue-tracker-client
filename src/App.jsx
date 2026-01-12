import React, { useState, useEffect } from "react";
import axios from "axios";
import IssueForm from "./components/IssueForm";
import IssueList from "./components/IssueList";

const API_URL = "https://localhost:7018/api/issues"; 

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // can be open, resolved, or all

  useEffect(() => {
    fetchIssues();
  }, []);

  // fetch issues from API
  const fetchIssues = async () => {
    try {
      const response = await axios.get(API_URL);
      const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setIssues(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // add new issue to API
  const handleAddIssue = async (newIssue) => {
    try {
      await axios.post(API_URL, { ...newIssue, isResolved: false });
      fetchIssues(); // refresh issues list to show new issue, same logic for handleResolveIssue
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  // resolve issue in API
  const handleResolveIssue = async (issue) => {
    try {
      const updatedIssue = { ...issue, isResolved: true };
      await axios.put(`${API_URL}/${issue.id}`, updatedIssue);
      fetchIssues();
    } catch (error) {
      console.error("Error resolving issue:", error);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'open') return !issue.isResolved;
    if (filter === 'resolved') return issue.isResolved;
    return true; 
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Issue Tracker
          </h1>
        </header>

        <IssueForm onAdd={handleAddIssue} />

        <div className="flex justify-center gap-2 mb-6">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            All Issues
          </button>
          <button 
            onClick={() => setFilter('open')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'open' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Open Only
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'resolved' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Resolved Only
          </button>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500">Loading issues...</div>
        ) : (
          <IssueList issues={filteredIssues} onResolve={handleResolveIssue} />
        )}
      </div>
    </div>
  );
}

export default App;