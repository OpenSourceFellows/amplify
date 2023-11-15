console.log('test') // works

import * as core from '@actions/core'
import github from '@actions/github'

const pullNumber = process.env.PR_NUMBER; //779; // TODO: pass the PR number from the workflow file
const timeDiff = process.env.TIME_DIFF ? process.env.TIME_DIFF : 1;
const comment = `Time from assignment to PR for #${pullNumber}: ${timeDiff} ms`;

const octokit = github.getOctokit(process.env.GH_TOKEN); 

await octokit.rest.issues.createComment({
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  issue_number: pullNumber,
  body: comment
});
