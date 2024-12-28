import React, { useState } from 'react';
import './App.css';
import MessageForm from './components/MessageForm';
import AIResponse from './components/AIResponse';

function App() {
  const [responses, setResponses] = useState({});

  const handleSend = async (message, selectedAI) => {
    try {
      // API Gatewayにメッセージを送信
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, selectedAI }), // selectedAIをそのまま送信
      });

      if (!response.ok) {
        throw new Error('メッセージの送信に失敗しました');
      }

      const data = await response.json();
      setResponses(data);
    } catch (error) {
      console.error(error);
      // TODO: エラー処理
    }
  };

  return (
    <div className="App">
      <h1>マルチAIチャット</h1>
      <MessageForm onSend={handleSend} />
      {Object.entries(responses).map(([aiName, response]) => (
        <AIResponse key={aiName} aiName={aiName} response={response} />
      ))}
    </div>
  );
}

export default App;