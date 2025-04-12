# Amplify

The Amplify is an open-source application designed to empower users to actively engage in the fight against climate change. It allows users to select relevant climate campaigns, locate political representatives based on their ZIP code, and send personalized letters to support these causes. The main goal of Amplify is to facilitate civic engagement by promoting concrete actions that create a positive impact in combating climate change. Developed by Program Equity, the project combines technology and community activism to create an accessible and effective platform for climate justice.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
   1. [Frontend Code](#21-frontend-code)
   2. [Backend Code](#22-backend-code))
   3. [Project Workflow](#23-project-workflow)
3. [Project Setup](#3-project-setup)
   1. [Cloning the Repository](#31-cloning-the-repository)
   2. [Codespaces Setup](#32-codespaces-setup)
4. [Customize Configuration](#4-customize-configuration)
5. [App Walkthrough](#5-app-walkthrough)
   1. [App Structure](#51-app-structure)
   2. [User Journey](#52-user-journey)
6. [Roadmap](#6-roadmap)
   1. [Current Features](#61-current-features)
   2. [Short-Term Goals](#62-short-term-goals)
   3. [Mid-Term Goals](#63-mid-term-goals)
   4. [Long-Term Goals](#64-long-term-goals)
7. [Contributing](#7-contributing)
   1. [Setup Instructions](#71-setup-instructions)
   2. [Development Commands](#72-development-commands)

---

## 1. Introduction


---

## 2. Getting Started

This repo contains both the frontend and backend portions of the Amplify application.

### 2.1. Frontend Code

The frontend code is stored in the src/ directory.

### 2.2. Backend Code

The backend (API) code is stored in the server/ directory.

### 2.3. Project Workflow

*Project Workflow:*

[Enablement Deck](https://docs.google.com/presentation/d/1llJgeTU1EzRSYB8kL-IQeAdoq7p6xb4ApEac5E3M8Qo/edit?usp=sharing)

<img width="792" alt="Screen Shot 2021-05-15 at 11 26 45 AM" src="https://user-images.githubusercontent.com/9143339/118374352-79d68a80-b570-11eb-9f21-703ce12a9638.png">

- [Overall Project Board](https://github.com/ProgramEquity/amplify/projects?type=beta)
- [Feature Breakdown](https://github.com/ProgramEquity/amplify/discussions/62)
- [OSS Architecture](https://github.com/ProgramEquity/amplify/discussions/61)
- [Wiki](https://github.com/ProgramEquity/amplify/wiki): API methods, Data Structures

*Resources:*
- We meet every *Wednesday from 12-1 p.m. PT and Thursdays from 8-8:30 p.m. PT*. Sign up for an [orientation](https://forms.gle/4miQJ8ccuWdeJha16)
- Try out our [demo](https://www.figma.com/file/46c9cmuTiCpFA4DHB8OK0H/Amplify-User-Interface-%2B-Design-Guide?node-id=1585%3A653) or review [App Research](https://www.notion.so/programequity/Dare-to-Dream-Civic-Engagement-is-key-to-change-595ca4db3a2948c6b44569b58d530c8c)

---

## 3. Project Setup

### 3.1. Cloning the Repository

In order to get started, you can clone, download a ZIP, or fork this repository to work on your local machine.

### 3.2. Codespaces Setup

If you would like to get started with Codespaces instead, the video below will walk you through setting up your Codespace.

https://user-images.githubusercontent.com/9143339/159093687-6fc90733-0599-445c-b08b-a6378d988e4b.mov

<b>Codespaces Set Up</b>

---

## 4. Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

## 5. App Walkthrough

### 5.1. App Structure

Current Structure:

<img width="772" alt="Current_Structure" src="https://github.com/ProgramEquity/amplify/assets/109990289/e973f2ca-15c4-4c8f-b6de-0de4d02163c0">

Goal Structure:

<img width="739" alt="Goal_Structure" src="https://github.com/ProgramEquity/amplify/assets/109990289/36652da8-51e1-4666-af6b-bea8c9ea5041">

### 5.2. User Journey

*User Journey:*

https://user-images.githubusercontent.com/9143339/159093855-c01e1d77-0d6a-4f6e-b691-81491830001a.mp4

<img width="1561" alt="MVP_Screenshot" src="https://github.com/ProgramEquity/amplify/assets/109990289/3c9e074a-0fad-43af-a08b-1da6c0e7c1d1">

---

## 6. Roadmap

### 6.1. Current Features
- Campaign selection and representative lookup by zip code.
- Donation-based letter-sending functionality.
- Frontend and backend integration for seamless user experience.

### 6.2. Short-Term Goals
- *Bug Fixes*: Address known issues and improve app stability.
- *UI/UX Enhancements*: Refine the user interface for better usability.
- *Campaign Expansion*: Add support for more climate campaigns and regions.

### 6.3. Mid-Term Goals
- *API Integration*: Connect with additional APIs to enhance representative data accuracy.
- *Analytics Dashboard*: Implement tools to track campaign impact and user engagement.
- *Payment Options*: Expand donation methods to include more payment gateways.

### 6.4. Long-Term Goals
- *Global Scaling*: Support campaigns and representatives worldwide.
- *Community Features*: Introduce forums or collaboration tools for users to engage with each other.

---

## 7. Contributing

### 7.1. Setup Instructions

Would you like to become a contributor? Please check out our [contributors guide](./CONTRIBUTING.md)! 💝

Run the following script first:
shell
script/bootstrap


You will need to copy the .env.example file to a .env file in this repo. You can use the following command in your terminal:
shell
cp .env.example .env


### 7.2. Development Commands

#### Compiles and hot-reloads full app for development
shell
npm run dev


#### Compiles and minifies for production
shell
npm run build


#### Lints and fixes files
shell
npm run lint


#### Runs Prettier and fixes files
shell
npm run format


#### Build and run as if in prod
shell
npm start
