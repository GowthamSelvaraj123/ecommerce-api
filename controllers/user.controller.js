const usersList = (req, res) => {
    res.send("Get Users Successfully");
}
const singleUser = (req, res) => {
    res.send("Get single user");
}
const addUser = (req, res) => {
    res.send("Post User Successfully");
}

module.exports = {usersList, singleUser, addUser}