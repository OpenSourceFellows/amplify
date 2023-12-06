import { Client } from '@notionhq/client';
// const { Client } = require('@notionhq/client');

console.log('entered the file');
// TODO: test and move to the secrets in the repo
// integration key 
const NOTION_TOKEN='secret_KFNUHq8rmiuo5mQqcGlYsUCIaOdHt6rYuGkkPnflwqZ';
// database id 
const NOTION_DATABASE_ID='cbfc4e41617b4216b9c307222233e316';

const notion = new Client({
  auth: NOTION_TOKEN,
});

const databaseId = NOTION_DATABASE_ID;

// mock data to test the connection 
const newData = { // properties: 
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
          content: 'Dunridge',
        },
      },
    ],
  }, 
  duration: {
    number: 15
  }
};

async function addToNotionDatabase() {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: newData,
    });
    console.log(response);
  } catch (error) {
    console.error('Error adding data to Notion:', error);
  }
}

addToNotionDatabase();
