import { getPosts, addPost } from './api.js';
import { buildList } from './dom.js';

const list   = document.getElementById('posts');
const form   = document.getElementById('postForm');
const search = document.getElementById('search');
let allPosts = [];                       // mémorisé pour le filtre

// chargement initial
async function loadPosts() {
  allPosts = await getPosts();
  render(allPosts);
}
function render(posts) {
  list.innerHTML = buildList(posts);
}

// ajout
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form)); // strictement en mode formumaire
  const newPost = await addPost(data);
  allPosts.push(newPost);
  render(allPosts);
  form.reset();
});


// recherche dynamique
search.addEventListener('input', () => {
  const filt = allPosts.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  );
  render(filt);
});
// async function loadStats() {
//   try {
//     const s = await getStats();
//     document.getElementById('stats').textContent =
//     `Total posts : ${s.totalsPosts} – Total users : ${s.totalsUsers}`;
//     console.log(s);
//   } catch (e) {
//     document.getElementById('stats').textContent = "Stats indisponibles";
//   }
// }
loadPosts();


