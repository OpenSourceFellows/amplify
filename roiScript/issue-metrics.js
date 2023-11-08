console.log('test'); // works
// TODO: rename .mjs to .js

import * as core from '@actions/core';
import github from '@actions/github';
// const core = require('@actions/core');
// const github = require('@actions/github');

// TODO: test this and debug the issue 
// --- (testing)
const issueNumber = 1;
const timeDelta = 20;
const comment = `Time from assignment to PR for #${issueNumber}: ${timeDelta} ms`;

const octokit = github.getOctokit(core.getInput('github-token'));

await octokit.issues.createComment({
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  issue_number: pull.number,
  body: comment,
});

// ---

// const assignedIssues = {};

// const main = async () => {
//   const payload = JSON.parse(core.getInput('payload'));

//   if (payload.action === 'assigned') {
//     const issue = payload.issue;
//     assignedIssues[issue.number] = issue.assignee.login;
//   }

//   if (payload.action === 'unlabeled' && payload.label.name === 'assigned') {
//     delete assignedIssues[payload.issue.number];
//   }

//   if (payload.action === 'opened') {
//     const pull = payload.pull_request;
//     const issueNumber = pull.title.split('#')[1];

//     if (issueNumber && assignedIssues[issueNumber]) {
//       const timeDelta = new Date(pull.created_at) - new Date(assignedIssues[issueNumber]);

//       const comment = `Time from assignment to PR for #${issueNumber}: ${timeDelta} ms`;

//       const octokit = github.getOctokit(core.getInput('github-token'));

//       await octokit.issues.createComment({
//         owner: github.context.repo.owner,
//         repo: github.context.repo.repo,
//         issue_number: pull.number,
//         body: comment,
//       });
//     }
//   }
// };

// main().catch((error) => {
//   core.setFailed(error.message);
// });
