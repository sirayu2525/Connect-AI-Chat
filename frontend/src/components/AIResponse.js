import React from 'react';

function AIResponse({ aiName, response }) {
  return (
    <div className="ai-response">
      <div className="ai-name">{aiName}からの回答</div>
      <div className="response-text">{response}</div>
    </div>
  );
}

export default AIResponse;