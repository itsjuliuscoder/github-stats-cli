const axios = require('axios');
const chalk = require('chalk');
const { getToken } = require('./config');


const fetchStats = async (repo) => {
    const token = getToken()
    const headers = token ? { Authorization: `token ${token}` } : {};

    try {

        const { data: repoData } = await axios.get(`https://api.github.com/repos/${repo}`, headers);
        const { forks_count, stargazers_count } = repoData;

        const { data: branches } = await axios.get(`https://api.github.com/repos/${repo}/branches`, headers);
        
        const { data: issuesResponse } = await axios.get(`https://api.github.com/repos/${repo}/issues`, headers);

        // Ensure issuesResponse is an array
        if (!Array.isArray(issuesResponse)) {
            throw new Error('Unexpected response format for issues.');
        }

        const pullRequests = issuesResponse.filter((issue) => issue.pull_request).length;
        const openIssues = issuesResponse.filter((issue) => !issue.pull_request).length;

        console.log(chalk.green(`📊 Statistics for ${repo}`))
        console.log(`- 🌟 Stars: ${stargazers_count}`);
        console.log(`- 🍴 Forks: ${forks_count}`);
        console.log(`- 🌲 Number of branches: ${branches.length}`);
        console.log(`- 🐛 Open issues: ${openIssues}`);
        console.log(`- 🔀 Pull requests: ${pullRequests}`);

    } catch(e) {
        console.error(chalk.red("Error fetching repository data"));
        console.error(e.response?.data?.message || e.message)
    }
}



module.exports = fetchStats;