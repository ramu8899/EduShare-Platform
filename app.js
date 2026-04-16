const authBtn = document.getElementById('authBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginSection = document.getElementById('loginSection');
const closeLogin = document.getElementById('closeLogin');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const modalTitle = document.getElementById('modalTitle');
const loginMessage = document.getElementById('loginMessage');
const accountStatus = document.getElementById('accountStatus');
const uploadForm = document.getElementById('uploadForm');
const searchInput = document.getElementById('search');
const subjectFilter = document.getElementById('subjectFilter');
const topicFilter = document.getElementById('topicFilter');
const searchBtn = document.getElementById('searchBtn');
const resourcesList = document.getElementById('resourcesList');

let currentUser = null;

authBtn.addEventListener('click', () => {
  showAuthModal('login');
});

closeLogin.addEventListener('click', () => {
  loginSection.classList.add('hidden');
});

loginSection.addEventListener('click', (event) => {
  if (event.target === loginSection) {
    loginSection.classList.add('hidden');
  }
});

loginTab.addEventListener('click', () => showAuthModal('login'));
signupTab.addEventListener('click', () => showAuthModal('signup'));
logoutBtn.addEventListener('click', logout);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Invalid email format');
    return;
  }
  if (password.length < 8) {
    showMessage('Password must be at least 8 characters');
    return;
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      currentUser = data;
      updateAccountState();
      loginSection.classList.add('hidden');
      loginForm.reset();
      showMessage('Logged in successfully');
    } else {
      showMessage(data.error || 'Login failed');
    }
  } catch (error) {
    console.error(error);
    showMessage('Unable to reach server');
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name) {
    showMessage('Name is required');
    return;
  }
  if (!emailRegex.test(email)) {
    showMessage('Invalid email format');
    return;
  }
  if (password.length < 8) {
    showMessage('Password must be at least 8 characters');
    return;
  }

  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      currentUser = data;
      updateAccountState();
      loginSection.classList.add('hidden');
      signupForm.reset();
      showMessage('Account created and logged in');
    } else {
      showMessage(data.error || 'Signup failed');
    }
  } catch (error) {
    console.error(error);
    showMessage('Unable to reach server');
  }
});

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) {
    alert('You must be logged in to upload resources.');
    showAuthModal('login');
    return;
  }

  const fileInput = document.getElementById('file');
  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Please select a file before uploading.');
    return;
  }

  const formData = new FormData();
  formData.append('title', document.getElementById('title').value.trim());
  formData.append('subject', document.getElementById('subject').value.trim());
  formData.append('topic', document.getElementById('topic').value.trim());
  formData.append('description', document.getElementById('description').value.trim());
  formData.append('file', fileInput.files[0]);

  try {
    const response = await fetch('/api/resources', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    const data = await response.json();
    if (response.ok) {
      alert('Resource uploaded successfully');
      loadResources();
      uploadForm.reset();
    } else {
      alert(`Upload failed: ${data.error || 'Unknown error'}`);
      if (response.status === 401) showAuthModal('login');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Upload failed: could not reach the server. Please ensure the backend is running.');
  }
});

searchBtn.addEventListener('click', loadResources);

async function loadResources() {
  const search = searchInput.value;
  const subject = subjectFilter.value;
  const topic = topicFilter.value;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (subject) params.append('subject', subject);
  if (topic) params.append('topic', topic);

  try {
    const response = await fetch(`/api/resources?${params}`);
    const resources = await response.json();
    displayResources(resources);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayResources(resources) {
  resourcesList.innerHTML = '';
  resources.forEach(resource => {
    const div = document.createElement('div');
    div.className = 'resource';
    div.innerHTML = `
      <h3>${resource.title}</h3>
      <p><strong>Subject:</strong> ${resource.subject}</p>
      <p><strong>Topic:</strong> ${resource.topic}</p>
      <p>${resource.description || ''}</p>
      <p><strong>Uploaded by:</strong> ${resource.createdByName || resource.createdByEmail || 'Unknown'}</p>
      <p><strong>Ratings:</strong> ${resource.ratings?.toFixed(1) ?? 0}</p>
      <p><strong>Usage:</strong> ${resource.usageCount ?? 0}</p>
      <div class="rating">
        <label>Rate:</label>
        <select class="rateSelect" data-id="${resource.id}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button class="rateBtn" data-id="${resource.id}">Rate</button>
        <button class="downloadBtn" data-id="${resource.id}">Download</button>
      </div>
    `;
    resourcesList.appendChild(div);
  });

  document.querySelectorAll('.rateBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const rating = e.target.previousElementSibling.value;
      try {
        await fetch(`/api/resources/${id}/rate`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: parseInt(rating) })
        });
        loadResources();
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  document.querySelectorAll('.downloadBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      window.open(`/api/resources/${id}/download`);
    });
  });
}

function showAuthModal(mode) {
  loginSection.classList.remove('hidden');
  if (mode === 'signup') {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
    modalTitle.textContent = 'Create your account';
  } else {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    modalTitle.textContent = 'Login to CampusSaathi';
  }
  loginMessage.textContent = '';
}

function showMessage(text) {
  loginMessage.textContent = text;
}

async function logout() {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      currentUser = null;
      updateAccountState();
    }
  } catch (error) {
    console.error('Logout failed', error);
  }
}

function updateAccountState() {
  if (currentUser) {
    accountStatus.textContent = `Logged in as ${currentUser.name}`;
    accountStatus.classList.remove('hidden');
    authBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    accountStatus.textContent = '';
    accountStatus.classList.add('hidden');
    authBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }
}

async function fetchCurrentUser() {
  try {
    const response = await fetch('/api/users/me', {
      credentials: 'include'
    });
    if (response.ok) {
      currentUser = await response.json();
    } else {
      currentUser = null;
    }
  } catch (error) {
    currentUser = null;
  }
  updateAccountState();
}

fetchCurrentUser();
loadResources();

const subjects = ['Math', 'Science', 'History', 'Literature'];
const topics = ['Algebra', 'Physics', 'World War II', 'Shakespeare'];

subjects.forEach(sub => {
  const option = document.createElement('option');
  option.value = sub;
  option.textContent = sub;
  subjectFilter.appendChild(option);
});

topics.forEach(top => {
  const option = document.createElement('option');
  option.value = top;
  option.textContent = top;
  topicFilter.appendChild(option);
});