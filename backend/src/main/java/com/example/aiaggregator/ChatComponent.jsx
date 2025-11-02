import React, { useState } from 'react';

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('gpt');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setResponse('');

        try {
            // Use the full URL to the backend, which is running on port 8080.
            // The backend's CORS configuration in SecurityConfig.java will allow this request.
            const res = await fetch(`http://localhost:8080/api/ask/${model}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.response || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.response);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Aggregator</h1>
            <form onSubmit={handleSubmit}>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                    <option value="gpt">GPT (OpenAI)</option>
                    <option value="gemini">Gemini</option>
                </select>
                <br />
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Thinking...' : 'Ask'}
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {response && <div><h2>Response:</h2><p>{response}</p></div>}
        </div>
    );
}

export default ChatComponent;