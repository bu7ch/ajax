import { ping } from './api.js';

ping()
  .then(data => {
    document.getElementById('rep').textContent   = data.message;
    document.getElementById('heure').textContent = data.time;
  })
  .catch(err => {
    document.getElementById('rep').textContent = 'Erreur serveur';
    console.error(err);
  });