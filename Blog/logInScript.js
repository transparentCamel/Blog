const username = document.querySelector('.username');
const password = document.querySelector('.password');
const submitButton = document.querySelector('.submitButton');
const myForm = document.querySelector('form');

const API_ENDPOINTS = {
  post: 'https://testapi.io/api/Arvydas/resource/accounts',
  get: 'https://testapi.io/api/Arvydas/resource/accounts',
  delete: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`,
  put: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`,
  getId: (id) => `https://testapi.io/api/Arvydas/resource/accounts/${id}`
};

export const accExist = () => {
  const url = `${API_ENDPOINTS.get}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const accountArray = data.data;
      const account = accountArray.find(element => {
        const accName = element.username;
        const accPass = element.password;
        return accName === username.value && accPass === password.value;
      });
      if (account) {
        const username = account.username;
        window.location.href = `loggedInBlog.html?username=${username}`;
      } else {
        updateErrorParagraph('Invalid username or password');
        console.log('Invalid username or password');
        return null;
      }
    });
};

const errorParagraph = document.createElement('p');
errorParagraph.style.color = 'rgb(255, 148, 148)';
myForm.prepend(errorParagraph);

const updateErrorParagraph = (errorMessage) => {
  errorParagraph.textContent = errorMessage;
};

const logIn = (event) => {
  event.preventDefault();
  if (username.value === '') {
    updateErrorParagraph('Please enter your username.');
  } else if (password.value === '') {
    updateErrorParagraph('Please enter your password.');
  } else {
    accExist();
    
  }
};

myForm.addEventListener('submit', (event) => {
  logIn(event);
});