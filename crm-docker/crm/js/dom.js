export function buildRows(users) {
    return users.map(u => `
      <tr data-id="${u.id}">
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
          <button class="btn btn-sm btn-warning editBtn">✏️</button>
          <button class="btn btn-sm btn-danger delBtn">🗑️</button>
        </td>
      </tr>`).join('');
  }
  
  export function showAlert(msg, type = 'success') {
    const box = document.getElementById('alertBox');
    box.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show">${msg}
                     <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  }