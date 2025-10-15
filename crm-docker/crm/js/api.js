const BASE = 'api.php';

export const getUsers = () =>
  fetch(`${BASE}?action=users`).then(r => r.json());

export const addUser = data =>
  fetch(`${BASE}?action=add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async r => {
    if (!r.ok) throw { status: r.status, ...(await r.json()) };
    return r.json();
  });

export const editUser = (id, data) =>
  fetch(`${BASE}?action=edit&id=${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async r => {
    if (!r.ok) throw { status: r.status, ...(await r.json()) };
    return r.json();
  });

export const deleteUser = id =>
  fetch(`${BASE}?action=delete&id=${id}`, { method: 'DELETE' })
    .then(async r => {
      if (!r.ok) throw { status: r.status, ...(await r.json()) };
      return r.json();
    });