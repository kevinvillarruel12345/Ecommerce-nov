const getConfig = () => ({
    // tomamos el token del local storage para usarlo en 
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default getConfig