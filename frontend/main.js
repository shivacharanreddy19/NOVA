const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const fetchAllBtn = document.getElementById('fetch-all-btn');
const promptEl = document.getElementById('prompt');
const responseWindowsEl = document.getElementById('response-windows');

let firebaseUser = null;

// Auth state listener
auth.onAuthStateChanged((user) => {
    if (user) {
        firebaseUser = user;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        firebaseUser = null;
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
});

// Login
loginBtn.addEventListener('click', () => {
    const provider = new firebase.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Fetch all
fetchAllBtn.addEventListener('click', async () => {
    if (!firebaseUser) {
        alert('Please login first!');
        return;
    }

    const question = promptEl.value;
    const selectedModels = Array.from(document.querySelectorAll('input[name="model"]:checked')).map(el => el.value);

    if (!question || selectedModels.length === 0) {
        alert('Please enter a prompt and select at least one model.');
        return;
    }

    responseWindowsEl.innerHTML = '';

    for (const model of selectedModels) {
        showLoading(model);
        try {
            const idToken = await firebaseUser.getIdToken();
            const response = await fetch(`/api/ask/${model}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ question, history: [] })
            });
            const data = await response.json();
            showResponse(model, data.response);
        } catch (error) {
            showError(model, error);
        }
    }
});

function showLoading(model) {
    const window = document.createElement('div');
    window.className = 'response-window';
    window.innerHTML = `<h3>${model}</h3><p>Loading...</p>`;
    responseWindowsEl.appendChild(window);
}

function showResponse(model, response) {
    const window = responseWindowsEl.querySelector(`:nth-child(${Array.from(document.querySelectorAll('input[name="model"]:checked')).findIndex(el => el.value === model) + 1})`);
    window.innerHTML = `<h3>${model}</h3><p>${response}</p>`;
}

function showError(model, error) {
    const window = responseWindowsEl.querySelector(`:nth-child(${Array.from(document.querySelectorAll('input[name="model"]:checked')).findIndex(el => el.value === model) + 1})`);
    window.innerHTML = `<h3>${model}</h3><p>Error: ${error.message}</p>`;
}
