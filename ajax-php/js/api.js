export const ping = () =>
    fetch('api.php').then(r => r.json());