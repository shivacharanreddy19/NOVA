// DOM Elements
const questionInput = document.querySelector('.question-input');
const sendButton = document.querySelector('.send-button');
const chatHistoryContent = document.querySelector('.history-content');
const modelOptions = document.querySelectorAll('.model-option input[type="checkbox"]');

// State
let conversations = [];

// Event Listeners
sendButton.addEventListener('click', handleSendMessage);
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

async function handleSendMessage() {
    const question = questionInput.value.trim();
    const selectedModels = Array.from(modelOptions)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (!question || selectedModels.length === 0) {
        alert('Please enter a question and select at least one model.');
        return;
    }

    // Clear input
    questionInput.value = '';

    // Add to chat history
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = question;
    chatHistoryContent.innerHTML = ''; // Clear "No history yet" message
    chatHistoryContent.appendChild(historyItem);

    // Create response containers
    const responseContainer = document.createElement('div');
    responseContainer.className = 'response-container';
    chatHistoryContent.appendChild(responseContainer);

    // Send request to each selected model
    for (const model of selectedModels) {
        try {
            const response = await fetch(`http://localhost:8080/api/ask/${model}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    question: question,
                    history: []
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            displayResponse(responseContainer, model, data);
        } catch (error) {
            displayError(responseContainer, model, error);
        }
    }
}

function displayResponse(container, model, data) {
    const responseEl = document.createElement('div');
    responseEl.className = 'model-response';
    responseEl.innerHTML = `
        <div class="model-header">
            <span class="model-name">${model.toUpperCase()}</span>
        </div>
        <div class="response-text">
            ${data.error || data.response || data.message || 'No response'}
        </div>
    `;
    container.appendChild(responseEl);
}

function displayError(container, model, error) {
    const responseEl = document.createElement('div');
    responseEl.className = 'model-response error';
    responseEl.innerHTML = `
        <div class="model-header">
            <span class="model-name">${model.toUpperCase()}</span>
        </div>
        <div class="response-text error">
            Error: ${error.message}
        </div>
    `;
    container.appendChild(responseEl);
}

// Add these styles to match the new UI
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .history-item {
        padding: 12px;
        margin: 8px 0;
        background-color: var(--secondary-bg);
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }

    .model-response {
        margin: 8px 0;
        padding: 12px;
        background-color: var(--secondary-bg);
        border-radius: 8px;
        border: 1px solid var(--accent-color);
    }

    .model-response.error {
        border-color: #ff4444;
    }

    .model-header {
        margin-bottom: 8px;
        color: var(--accent-color);
        font-weight: 500;
    }

    .response-text {
        white-space: pre-wrap;
    }

    .response-text.error {
        color: #ff4444;
    }

    .chat-history {
        overflow-y: auto;
    }

    .no-history {
        color: var(--text-secondary);
        text-align: center;
        margin-top: 20px;
    }
`;
