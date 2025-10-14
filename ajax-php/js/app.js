import { getPosts } from './api.js';

async function loadPosts() {
  const loader = document.getElementById('loader');
  const err    = document.getElementById('err');
  const list   = document.getElementById('posts');

  loader.hidden = false;
  err.textContent = '';
  list.innerHTML = '';

  try {
    const posts = await getPosts();
    list.innerHTML = posts.slice(0,5)
                 .map(p => `<li>${p.title}</li>`).join('');
  } catch (e) {
    err.textContent = 'Erreur : ' + e.message;
  } finally {
    loader.hidden = true;
  }
}

document.getElementById('loadBtn').addEventListener('click', loadPosts);