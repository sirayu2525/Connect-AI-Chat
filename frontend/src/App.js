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
        body: JSON.stringify({ message, selectedAI }),
      });

      if (!response.ok) {
        console.error(`HTTP エラー! ステータス: ${response.status} ${response.statusText}`); // エラーログを追加
        throw new Error('メッセージの送信に失敗しました');
      }

      const data = await response.json();
      setResponses(data);
    } catch (error) {
      console.error(error);
      alert(`エラーが発生しました: ${error.message}`); // エラーメッセージを表示
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