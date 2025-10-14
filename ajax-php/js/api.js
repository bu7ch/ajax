export const getPosts = () =>
    fetch('api.php?action=posts').then(async r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
export const getStats = () =>
    fetch('api.php?action=stats').then(async r => {
        if (!r.ok) throw new Error ('HTTP '+ r.status)            
        return r.json()
    })