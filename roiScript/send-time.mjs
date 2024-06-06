import { Client } from '@notionhq/client'

/*
TODO: extract the originaltime value and send it to Notion
labels interface (filtered labels that contain `originaltime-`): 
[
  {
    "color": "5C19CB",
    "default": false,
    "description": "",
    "id": 6666571227,
    "name": "originaltime-4000",
    "node_id": "LA_kwDOG0x5L88AAAABjVvN2w",
    "url": "https://api.github.com/repos/OpenSourceFellows/amplify/labels/originaltime-4000"
  }
]
*/

// TODO: fix the unsupported engine error
// TODO: send the original time to the Notion DB
const labelObjects = process.env.LABELS
const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

const parsedLabels = JSON.parse(labelObjects)
const targetLabel = parsedLabels.find((item) =>
  item.name.startsWith('originaltime-')
)
const targetLabelName = targetLabel.name
const labelArr = targetLabelName.split('-')
const targetDuration = +labelArr[1]
const issueNumber = process.env.ISSUE_NUMBER
const ghHandle = process.env.GH_HANDLE

console.log('Send time (labels): ', targetDuration)
console.log('issueNumber: ', issueNumber)
console.log('ghHandle: ', ghHandle)

// TODO: using this issue number find and update the notion database

console.log('NOTION_TOKEN: ', NOTION_TOKEN)
console.log('NOTION_DATABASE_ID: ', NOTION_DATABASE_ID)

// ---
// TODO: rewrite this code from the send-metrics.mjs file

const notion = new Client({
  auth: NOTION_TOKEN
})

const databaseId = NOTION_DATABASE_ID

// TODO: configure to update the existing issue ids
const newData = {
  issue_id: {
    rich_text: [
      {
        text: {
          content: issueNumber
        }
      }
    ]
  },
  gh_handle: {
    title: [
      {
        text: {
          content: ghHandle
        }
      }
    ]
  },
  original_time: {
    number: targetDuration
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
  } catch (error) {
    console.error('Error adding data to Notion:', error)
  }
}

addToNotionDatabase()
