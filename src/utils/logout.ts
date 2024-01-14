const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
}
export default handleLogout;