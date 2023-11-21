import github from '@actions/github'

const issueNumber = process.env.ISSUE_NUMBER
const comment = `Branch: [issue-${issueNumber}](https://github.com/ProgramEquity/amplify/tree/issue-${issueNumber})`

const octokit = github.getOctokit(process.env.GH_TOKEN)

await octokit.rest.issues.createComment({
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  issue_number: issueNumber,
  body: comment
})
