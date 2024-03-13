
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
const targetLabel = parsedLabels.find(item => item.name.startsWith('originaltime-'))
const targetLabelName = targetLabel.name
const labelArr = targetLabelName.split('-')
const targetDuration = +labelArr[1]

console.log('Send time (labels): ', targetDuration)

console.log('NOTION_TOKEN: ', NOTION_TOKEN)
console.log('NOTION_DATABASE_ID: ', NOTION_DATABASE_ID)

