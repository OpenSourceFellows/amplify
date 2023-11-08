console.log('test'); // works

import github from '@actions/github';

const assignedIssues = {};

const main = async () => {
  const payload = JSON.parse(process.env.INPUT_PAYLOAD);

  if (payload.action === 'assigned') {
    const issue = payload.issue;
    assignedIssues[issue.number] = issue.assignee.login;
  }

  if (payload.action === 'unlabeled' && payload.label.name === 'assigned') {
    delete assignedIssues[payload.issue.number];
  }

  if (payload.action === 'opened') {
    const pull = payload.pull_request;
    const issueNumber = pull.title.split('#')[1];

    if (issueNumber && assignedIssues[issueNumber]) {
      const timeDelta = new Date(pull.created_at) - new Date(assignedIssues[issueNumber]);

      const comment = `Time from assignment to PR for #${issueNumber}: ${timeDelta} ms`;

      const octokit = new github.getOctokit(process.env.INPUT_GITHUB_TOKEN);

      await octokit.issues.createComment({
        owner: process.env.GITHUB_REPOSITORY_OWNER,
        repo: process.env.GITHUB_REPOSITORY,
        issue_number: pull.number,
        body: comment,
      });
    }
  }
};

main().catch((error) => {
  console.error(error.message); // Log the error message
  process.exit(1); // Set a non-zero exit code to indicate failure
});
