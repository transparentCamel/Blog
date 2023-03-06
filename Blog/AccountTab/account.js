const logOutButton = document.querySelector(".logOut");
const h1 = document.querySelector("h1");
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const createBlogButton = document.querySelector('button');
const home = document.querySelector('.home');
const logoButton = document.querySelector('.logo')


logOutButton.addEventListener('click', () => {
    window.location.href = '../HomeLoggedOff/indexBlog.html';
});

home.addEventListener('click', () => {
    window.location.href = `../HomeLoggedIn/loggedInBlog.html?username=${username}`;
});

logoButton.addEventListener('click', () => {
    window.location.href = `../HomeLoggedIn/loggedInBlog.html?username=${username}`;
});

h1.textContent = `HELLO, ${username}`;

createBlogButton.addEventListener('click', () => {
    window.location.href = `../CreateBlog/createBlog.html?username=${username}`;
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
    const btnDelete = document.createElement('button');
    const btnEdit = document.createElement('button');
    btnDelete.classList.add('deleteBtn');
    btnEdit.classList.add('editBtn'); 
    btnDelete.textContent = "Delete";
    btnEdit.textContent = "Edit";
    div.append(h3);
    div.append(p);
    div.append(btnDelete);
    div.append(btnEdit);
    blogContainer.append(div);

    btnDelete.addEventListener('click', () => {
        const url = API_ENDPOINTS.delete(data.id);
        fetch(url, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                div.remove(); 
            } else {
                console.log('Error deleting post:', response.status);
            }
        })
        .catch(err => console.log(err));
    });

    btnEdit.addEventListener('click', () => {
        const existingForm = div.querySelector('form.edit-form');
        if (existingForm) {
            return; 
        }
        const form = document.createElement('form');
        form.classList.add('edit-form');
        const titleLabel = document.createElement('label');
        const titleInput = document.createElement('input');
        const contentLabel = document.createElement('label');
        const contentInput = document.createElement('textarea');
        const submitButton = document.createElement('button');
    
        titleLabel.textContent = "Title:";
        titleLabel.setAttribute('for', 'title');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'title');
        titleInput.setAttribute('value', data.title);
    
        contentLabel.textContent = "Content:";
        contentLabel.setAttribute('for', 'content');
        contentInput.setAttribute('name', 'content');
        contentInput.textContent = data.content;
    
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = "Save Changes";
    
        form.append(titleLabel);
        form.append(titleInput);
        form.append(contentLabel);
        form.append(contentInput);
        form.append(submitButton);
        div.append(form);
    
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const url = API_ENDPOINTS.put(data.id);
            const updatedData = {
                title: titleInput.value,
                content: contentInput.value,
                account: data.account,
                date: data.date
            };
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(updatedPost => {
                h3.textContent = updatedPost.title;
                p.textContent = updatedPost.content;
                form.remove();
            })
            .catch(err => {
                // handle error
                console.log(err);
            });
        });
    });      
};

const getPost = () => {
    const url = API_ENDPOINTS.get
    return fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(posts => {
        console.log(posts.data);
        posts.data.forEach(post => {
            if (post.account === username)
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