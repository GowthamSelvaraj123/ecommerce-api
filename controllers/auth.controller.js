const register = (req, res) => {
    res.send("Register Successfully");
}
const login = (req, res) => {
    res.send("Login Successfully");
}
const profile = (req, res) => {
    res.send("Profile Show Successfully");
}

module.exports = {register, login, profile}
