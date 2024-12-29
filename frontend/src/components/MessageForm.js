import React, { useState } from 'react';

function MessageForm({ onSend }) {
  const [message, setMessage] = useState('');
  const [selectedAI, setSelectedAI] = useState([]);

  const handleAIChange = (event) => {
    const aiName = event.target.value;
    if (event.target.checked) {
      setSelectedAI([...selectedAI, aiName]);
    } else {
      setSelectedAI(selectedAI.filter((ai) => ai !== aiName));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(message, selectedAI);  // onSend props を呼び出す
    setMessage('');  // 送信後にメッセージをクリア
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="ChatGPT"
            onChange={handleAIChange}
          />
          ChatGPT
        </label>
        <label>
          <input
            type="checkbox"
            value="Gemini"
            onChange={handleAIChange}
          />
          Gemini
        </label>
        {/* Claude APIは保留 */}
        {/* <label>
          <input
            type="checkbox"
            value="Claude"
            onChange={handleAIChange}
          />
          Claude
        </label> */}
      </div>
      <button type="submit">送信</button>
    </form>
  );
}

export default MessageForm;