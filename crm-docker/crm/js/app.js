import { getUsers, addUser, editUser, deleteUser } from './api.js';
import { buildRows, showAlert } from './dom.js';

const userTable = document.getElementById('userTable');
const userForm  = document.getElementById('userForm');
const userIdInp = document.getElementById('userId');
const nameInp   = document.getElementById('name');
const emailInp  = document.getElementById('email');
const addBtn    = document.getElementById('addBtn');

const modal = new bootstrap.Modal(document.getElementById('userModal'));

let users = [];

// Chargement initial
async function loadUsers() {
  users = await getUsers();
  render();
}
function render() {
  userTable.innerHTML = buildRows(users);
}

// Ouverture modal « Ajouter »
addBtn.addEventListener('click', () => {
  userIdInp.value = '';
  nameInp.value = '';
  emailInp.value = '';
  document.querySelector('.modal-title').textContent = 'Ajouter utilisateur';
  modal.show();
});

// Édition
userTable.addEventListener('click', e => {
  const tr = e.target.closest('tr');
  if (!tr) return;
  const id = tr.dataset.id;
  if (e.target.classList.contains('editBtn')) {
    const u = users.find(x => x.id == id);
    userIdInp.value = u.id;
    nameInp.value   = u.name;
    emailInp.value  = u.email;
    document.querySelector('.modal-title').textContent = 'Modifier utilisateur';
    modal.show();
  }
  if (e.target.classList.contains('delBtn')) {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    deleteUser(id)
      .then(() => {
        users = users.filter(u => u.id != id);
        render();
        showAlert('Utilisateur supprimé', 'success');
      })
      .catch(err => showAlert(err.error || 'Erreur', 'danger'));
  }
});

// Submit modal (ajout ou édition)
userForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = { name: nameInp.value.trim(), email: emailInp.value.trim() };
  const id   = userIdInp.value;

  const promise = id ? editUser(id, data) : addUser(data);

  promise
    .then(u => {
      if (id) { // édition
        const idx = users.findIndex(x => x.id == id);
        users[idx] = u;
      } else {  // ajout
        users.unshift(u);
      }
      render();
      modal.hide();
      showAlert(id ? 'Utilisateur modifié' : 'Utilisateur créé', 'success');
    })
    .catch(err => showAlert(err.error || 'Erreur serveur', 'danger'));
});

loadUsers();