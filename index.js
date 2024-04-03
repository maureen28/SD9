const url = 'https://jsonplaceholder.typicode.com/posts';
const container = document.getElementById('posts');

function get2() {
  fetch(url)
    .then(response => response.json())
    .then(posts => {
      container.innerHTML = ''; 

      posts.forEach(post => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('post');
        newDiv.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        `;
        container.appendChild(newDiv);
      });
    });
}

function addPost(event) {
  event.preventDefault();
  const titleInput = document.getElementById('titleInput').value;
  const imageInput = document.getElementById('imageInput').files[0];

  const newPost = { title: titleInput, body: 'ghdjhdh' }; 
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  };

  fetch(url, requestOptions)
    .then(response => {
      document.getElementById('titleInput').value = '';
      document.getElementById('imageInput').value = '';
      get2(); 
    });
}

function deletePost(postId) {
  const requestOptions = {
    method: 'DELETE',
  };

  fetch(`${url}/${postId}`, requestOptions)
    .then(response => {
      get2();
    });
}

function editPost(postId) {
  const newTitle = prompt('Enter new title:');

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  };

  fetch(`${url}/${postId}`, requestOptions)
    .then(response => {
      get2();
    });
}

document.getElementById('postF').addEventListener('submit', addPost);

