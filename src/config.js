require('dotenv').config();

const getToken = () => {
    return process.env.GITHUB_TOKEN || null;
}


module.exports = { getToken };