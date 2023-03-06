const myForm = document.querySelector('form');
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');


const API_ENDPOINTS = {
    post: 'https://testapi.io/api/Arvydas/resource/Blogs',
    get: 'https://testapi.io/api/Arvydas/resource/Blogs',
    delete: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`,
    put: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`,
    getId: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`
}



const createBlogAPI = (title, content, account) => {
    fetch(API_ENDPOINTS.post, {
      method: 'POST',
      body: JSON.stringify({title, content, account}),
      
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
      console.log('Blog created:', data);
    })
    .catch(error => {
      console.error('Error creating a blog:', error);
    });
  };

const errorParagraph = document.createElement('p');
errorParagraph.style.color = 'rgb(255, 90, 90)';
myForm.prepend(errorParagraph);

const updateErrorParagraph = (errorMessage) => {
  
  errorParagraph.textContent = errorMessage;
};

const createBlog = (e) => {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    e.preventDefault();
    if(title === "" || content === "") {
        updateErrorParagraph('All fields are required')
    }
    else{
    createBlogAPI(title, content, username);
    }
    

  }

myForm.addEventListener('submit', (e) => {
    createBlog(e);

});

const sendBack = document.querySelector('.sendBack');

sendBack.addEventListener('click', () => {
  window.location.href = `loggedInBlog.html?username=${username}`
});