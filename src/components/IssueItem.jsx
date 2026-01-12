import React from 'react';

const IssueItem = ({ issue, onResolve }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`p-4 mb-3 rounded-lg border shadow-sm transition-all duration-200 
      ${issue.isResolved ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:shadow-md"}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
             <h3 className={`font-bold text-lg ${issue.isResolved ? "text-gray-500 line-through" : "text-gray-800"}`}>
               {issue.title}
             </h3>
             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
               {formatDate(issue.createdAt)}
             </span>
          </div>
          
          <p className="text-gray-600 text-sm">{issue.description}</p>
          
        </div>

        <div className="ml-4 flex flex-col items-end">
          {issue.isResolved ? (
            <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded-full">
              Resolved
            </span>
          ) : (
            <button
              onClick={() => onResolve(issue)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueItem;