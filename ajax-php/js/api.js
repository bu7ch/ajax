const BASE = 'api.php';

export const getPosts = () =>
  fetch(`${BASE}?action=posts`).then(r => r.json());// recupérer le resultat du JSON des posts

export const addPost = data =>
  fetch(`${BASE}?action=add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(r => r.json());
export const delPost = id =>
  fetch(`${BASE}?action=delete&id=${id}`, {
    method: 'DELETE'
}).then(r => r.json());

export const getStats = () =>
  fetch(`${BASE}?action=stats`).then(r => r.json());