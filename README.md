# Amplify

Amplify is an open-source app created for users to take the initiative in being part of an actionable step in the efforts to protect against climate change. The user is able to choose a climate campaign, then using their zip code, they will be able to select a representative of their choice. The user then donates to have their letter sent out by Amplify.


## Table of Contents

  * [Getting Started](#getting-started)
  * [Project Setup](#project-setup)
  * [Customize configuration](#customize-configuration)
  * [App Walkthrough](#app-walkthrough)
  
## Getting Started

This repo contains both the frontend and backend portions of the Amplify application.

The frontend code is stored in the `src/` directory.

The backend (API) code is stored in the `server/` directory.

**Project Workflow:**

[Enablement Deck](https://docs.google.com/presentation/d/1llJgeTU1EzRSYB8kL-IQeAdoq7p6xb4ApEac5E3M8Qo/edit?usp=sharing)

<img width="792" alt="Screen Shot 2021-05-15 at 11 26 45 AM" src="https://user-images.githubusercontent.com/9143339/118374352-79d68a80-b570-11eb-9f21-703ce12a9638.png">

- [Overall Project Board](https://github.com/ProgramEquity/amplify/projects?type=beta)
- [Feature Breakdown](https://github.com/ProgramEquity/amplify/discussions/62)
- [OSS Architecture](https://github.com/ProgramEquity/amplify/discussions/61)
- [Wiki](https://github.com/ProgramEquity/amplify/wiki): API methods, Data Structures

**Resources:**
- We meet every **Wednesday from 12-1 p.m. PT and Thursdays from 8-8:30 p.m. PT**. Sign up for an [orientation](https://forms.gle/4miQJ8ccuWdeJha16)
- Try out our [demo](https://www.figma.com/file/46c9cmuTiCpFA4DHB8OK0H/Amplify-User-Interface-%2B-Design-Guide?node-id=1585%3A653) or review [App Research](https://www.notion.so/programequity/Dare-to-Dream-Civic-Engagement-is-key-to-change-595ca4db3a2948c6b44569b58d530c8c)

# Project setup
In order to get started, you can clone, download a ZIP, or fork this repository to work on your local machine. If you would like to get started with Codespaces instead, the video below will walk you through setting up your Codespace.

https://user-images.githubusercontent.com/9143339/159093687-6fc90733-0599-445c-b08b-a6378d988e4b.mov

<b>Codespaces Set Up</b>

## Contributing
Would you like to become a contributor? Please check out our [contributors guide](./CONTRIBUTING.md)! 💝

Run the following script first:
```shell
script/bootstrap
```

You will need to copy the `.env.example` file to a `.env` file in this repo. You can use the following command in your terminal:
```shell
cp .env.example .env
```

### Compiles and hot-reloads full app for development
```shell
npm run dev
```

### Compiles and minifies for production
```shell
npm run build
```

### Lints and fixes files
```shell
npm run lint
```

### Runs Prettier and fixes files
```shell
npm run format
```

### Build and run as if in prod
```shell
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# App Walkthrough

**App Structure**

Current Structure:

<img width="772" alt="Current_Structure" src="https://github.com/ProgramEquity/amplify/assets/109990289/e973f2ca-15c4-4c8f-b6de-0de4d02163c0">

Goal Structure:

<img width="739" alt="Goal_Structure" src="https://github.com/ProgramEquity/amplify/assets/109990289/36652da8-51e1-4666-af6b-bea8c9ea5041">

**User Journey:**

https://user-images.githubusercontent.com/9143339/159093855-c01e1d77-0d6a-4f6e-b691-81491830001a.mp4

<img width="1561" alt="MVP_Screenshot" src="https://github.com/ProgramEquity/amplify/assets/109990289/3c9e074a-0fad-43af-a08b-1da6c0e7c1d1">
