const logOutButton = document.querySelector(".logOut");
const accountButton = document.querySelector(".account");
const home = document.querySelector('.home');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log(username);


logOutButton.addEventListener('click', () => {
    window.location.href = '../HomeLoggedOff/indexBlog.html';
});

accountButton.addEventListener('click', () => {
    window.location.href = `../AccountTab/account.html?username=${username}`
});

home.addEventListener('click', () => {
    window.location.href = `../HomeLoggedIn/loggedInBlog.html?username=${username}`
});


const blogContainer = document.querySelector('.blogsContainer')

const API_ENDPOINTS = {
    post: 'https://testapi.io/api/Arvydas/resource/Blogs',
    get: 'https://testapi.io/api/Arvydas/resource/Blogs',
    delete: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`,
    put: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`,
    getId: (id) => `https://testapi.io/api/Arvydas/resource/Blogs/${id}`
  };

const postTemplate = (data) => {
    
    const div = document.createElement('div');
    div.classList.add('post');
    const h3 = document.createElement('h3');
    h3.classList.add('postTitle');
    h3.textContent = data.title;
    const p = document.createElement('p');
    p.classList.add('postContent')
    p.textContent = data.content;
    div.append(h3);
    div.append(p);
    blogContainer.append(div);
}

const getPost = () => {
    const url = API_ENDPOINTS.get
    return fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(posts => {
        console.log(posts.data);
        posts.data.forEach(post => {
            postTemplate(post);
          });
    })
    .catch(err => console.log(err))
}

getPost();

const blogsBtn = document.querySelector('.blogs');


blogsBtn.addEventListener('click', () => {
    blogContainer.scrollIntoView({ behavior: 'smooth' });
  });

const aboutBtn = document.querySelector('.aboutBtn');
const aboutContainer = document.querySelector('.about')


aboutBtn.addEventListener('click', () => {
    aboutContainer.scrollIntoView({ behavior: 'smooth' });
  });