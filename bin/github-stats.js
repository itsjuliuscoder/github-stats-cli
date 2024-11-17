#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const axios = require('axios');
const fetchStats = require('../src/fetchStats');

const program = new Command();

program
    .name('github-stats')
    .description('CLI tool to fetch GitHub repository statistics')
    .version('1.0.0')
    .argument('<repo>', 'GitHub repository in the format owner/repo')
    .action(async (repo) => {
        await fetchStats(repo)
    });


program.parse(process.argv);