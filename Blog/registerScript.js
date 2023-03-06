const username = document.querySelector('.username');
const password = document.querySelector('.password');
const rePassword = document.querySelector('.rePassword');
const submitButton = document.querySelector('.submitButton');
const myForm = document.querySelector('form');

const API_ENDPOINTS = {
    post: 'https://testapi.io/api/Arvydas/resource/accounts',
    get: 'https://testapi.io/api/Arvydas/resource/accounts',
    delete: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`,
    put: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`,
    getId: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`
}

const createAccountAPI = (username, password) => {
    fetch(API_ENDPOINTS.post, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Account created:', data);
    })
    .catch(error => {
      console.error('Error creating account:', error);
    });
  };

const clearValues = () => {
  password.value = '';
  rePassword.value = '';
};


const errorParagraph = document.createElement('p');
errorParagraph.style.color = 'rgb(255, 90, 90)';
myForm.prepend(errorParagraph);

const updateErrorParagraph = (errorMessage) => {
  
  errorParagraph.textContent = errorMessage;
};

const createAccount = (event) => {
  event.preventDefault();

  if (username.value === '') {
    clearValues();
    updateErrorParagraph('Please enter your username.');
    
  } else if (password.value !== rePassword.value) {
    clearValues();
    updateErrorParagraph("Passwords don't match.");
    
  } else if (username.value === '' || password.value === '' || rePassword.value === '') {
    clearValues();
    updateErrorParagraph('Please enter all values.');
  } else {
    createAccountAPI(username.value, password.value);
    if (confirm("Account created successfully! Do you want to go to the login page?")) {
        window.location.href = '';
      }
    username.value = "";
    clearValues();
  }
};

myForm.addEventListener('submit', (event) => {
  createAccount(event);
});