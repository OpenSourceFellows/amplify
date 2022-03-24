# amplify

## Getting Started

This repo contains both the frontend and backend portions of the Amplify application.

The frontend code is stored in the `src/` directory.

The backend (API) code is stored in the `server/` directory.

The repository uses Codespaces (Development Containers) to create a working development environment, enabling developers to open the project and start working immediately.

**Project Workflow:**

[Enablement Deck](https://docs.google.com/presentation/d/1llJgeTU1EzRSYB8kL-IQeAdoq7p6xb4ApEac5E3M8Qo/edit?usp=sharing)

<img width="792" alt="Screen Shot 2021-05-15 at 11 26 45 AM" src="https://user-images.githubusercontent.com/9143339/118374352-79d68a80-b570-11eb-9f21-703ce12a9638.png">

- [Overall Project Board](https://github.com/ProgramEquity/amplify/projects?type=beta)
- [Feature Breakdown](https://github.com/ProgramEquity/amplify/discussions/62)
- [OSS Architecture](https://github.com/ProgramEquity/amplify/discussions/61)
- [Wiki](https://github.com/ProgramEquity/amplify/wiki): API methods, Data Structures

**Resources:**
- We meet every: 
-  - [Tuesday from 2:00-3:00pm PT](https://calendar.google.com/event?action=TEMPLATE&tmeid=NWh1NzdqYmRncXJsbzVlMTVocXBkMXFkZ2JfMjAyMTExMjNUMjIwMDAwWiBjX2FpcHRzdTR0djNlZnRrbzEwZWNodDd2cmIwQGc&tmsrc=c_aiptsu4tv3eftko10echt7vrb0%40group.calendar.google.com&scp=ALL) to pair program
  - [Thursday from 2:00-2:30pm PT](https://calendar.google.com/event?action=TEMPLATE&tmeid=dDBvbWYxNDcyMjgyZ3E5M2FqcWU4aWExYWNfMjAyMTExMThUMjIwMDAwWiBjX2FpcHRzdTR0djNlZnRrbzEwZWNodDd2cmIwQGc&tmsrc=c_aiptsu4tv3eftko10echt7vrb0%40group.calendar.google.com&scp=ALL) for [product standup](https://github.com/ProgramEquity/amplify/discussions/63)
  - Sign up for an [orientation](https://forms.gle/4miQJ8ccuWdeJha16)


## Project setup

https://user-images.githubusercontent.com/9143339/159093687-6fc90733-0599-445c-b08b-a6378d988e4b.mov

Would you like to become a contributor? Please check out our [contributors guide](.github/CONTRIBUTING.md)! 💝 

Make sure to review the contributors guide to understand the development environment.

This repository supports [Codespaces](https://docs.github.com/en/codespaces/overview) and VS Code [Development Containers](https://code.visualstudio.com/docs/remote/containers). If you are using Codespaces, the environment will be automatically provisioned and configured with a sample `.env` file. You will need to configure the keys in this file to enable the full functionality. Run `npm run dev` to launch a development server.

If you are developing locally using Visual Studio Code, you will need the **[Visual Studio Code Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)** extension. You should also meet the related Docker [System Requirements](https://code.visualstudio.com/docs/remote/containers#_system-requirements). Opening VS Code will prompt you to relaunch the environment in its fully configured container. This environment will have a sample `.env` file. You will need to configure the keys in this file to enable the full functionality.  Run `npm run dev` to launch a development server. **Note:** For Windows users, it is recommended that you use [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install) for best performance. To further improve performance, ensure the Git repo is cloned into a subfolder of the home (`~/`) directory.

We strongly encourage you to use one of these container solutions; however, if you want to develop locally without a container, you can manually configure your environment by running the included Bash script:

```shell
script/bootstrap
```
You will need to copy the `.env.example` file and create a `.env` file. This file will then need to be configured with additional keys to enable the full functionality.

## Using NPM
To configure the development environment and start the local application, you will need to use NPM. **Note**: you should run `npm run dev` to start the environment and initialize the pre-commit hooks required for contributing code.

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

### Build and run as if in prod
```shell
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## App Walkthrough

**App Structure**

Current Structure:

<img width="772" alt="Screen Shot 2022-01-26 at 1 31 37 PM" src="https://user-images.githubusercontent.com/9143339/153340605-dd7fd6e6-a5f3-466f-95e2-d941f8c0c2ee.png">

Goal Structure:

<img width="739" alt="Screen Shot 2022-01-26 at 1 31 28 PM" src="https://user-images.githubusercontent.com/9143339/153340595-f749e711-2e42-4069-aad6-3e949efda7d9.png">


**User Journey:**

https://user-images.githubusercontent.com/9143339/159093855-c01e1d77-0d6a-4f6e-b691-81491830001a.mp4


<img width="1561" alt="Screen Shot 2021-11-11 at 1 51 44 PM" src="https://user-images.githubusercontent.com/9143339/141374196-a32d140f-885c-4e45-8bba-99696f81ee80.png">


Try out our [demo](https://www.figma.com/file/46c9cmuTiCpFA4DHB8OK0H/Amplify-User-Interface-%2B-Design-Guide?node-id=1585%3A653) or review [App Research](https://www.notion.so/programequity/Dare-to-Dream-Civic-Engagement-is-key-to-change-595ca4db3a2948c6b44569b58d530c8c)
