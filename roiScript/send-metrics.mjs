import { Client } from '@notionhq/client'
// const { Client } = require('@notionhq/client');

// console.log('entered the file')
// TODO: test and move to the secrets in the repo
// integration key
const NOTION_TOKEN = 'secret_KFNUHq8rmiuo5mQqcGlYsUCIaOdHt6rYuGkkPnflwqZ'
// database id
const NOTION_DATABASE_ID = 'cbfc4e41617b4216b9c307222233e316'

const notion = new Client({
  auth: NOTION_TOKEN
})

const commentsDataJSON = process.env.PR_PAYLOAD
const commentsUrl = JSON.parse(commentsDataJSON)
console.log('commentsUrl: ', commentsUrl)

const fetchCommentsJSON = async (commentsUrlStr) => {
  try {
    const response = await fetch(commentsUrlStr);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments. Status: ${response.status}`);
    }
    const commentsData = await response.json();
    
    return commentsData;
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    return null;
  }  
}

const commentsArr = await fetchCommentsJSON(commentsUrl)
console.log('commentsArr', commentsArr)
const targetComment = commentsArr?.find(comment => comment.body.startsWith("Time from assignment to PR for"))
console.log('targetComment: ', targetComment);

const databaseId = NOTION_DATABASE_ID

// mock data to test the connection
const newData = {
  // properties:
  issue_id: {
    rich_text: [
      {
        text: {
          content: '2'
        }
      }
    ]
  },
  gh_handle: {
    title: [
      {
        text: {
          content: 'Dunridge'
        }
      }
    ]
  },
  duration: {
    number: 15
  }
}

async function addToNotionDatabase() {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: newData
    })
    console.log(response)
  } catch (error) {
    console.error('Error adding data to Notion:', error)
  }
}

addToNotionDatabase()
