import React from 'react';
import IssueItem from './IssueItem';

const IssueList = ({ issues, onResolve }) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No issues found!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Issue List</h2>
      <div className="space-y-2">
        {issues.map((issue) => (
          <IssueItem 
            key={issue.id} 
            issue={issue} 
            onResolve={onResolve} 
          />
        ))}
      </div>
    </div>
  );
};

export default IssueList;