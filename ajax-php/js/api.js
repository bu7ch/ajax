export const getPosts = () =>
    fetch('api.php?action=posts').then(async r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });