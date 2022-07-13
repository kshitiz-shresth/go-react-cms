# GO REACT CMS (RTW Website Content Management System)
This repository is for practicing react and golanguage with gin framework. This Project is all about managing content of website, i.e, converting static website to dynamic. For a reference i took the readytowork website https://readytowork.jp to make content dynamic. It was good learning and research.

## Backend Setup Steps:
- goto `backend-web-go` if you are not there yet. `cd backend-web-go` from the root of this project.
- clone .env.example file and rename duplicated file to .env (.env.example shouldn't be deleted)
- create database for your project, for default as given inside .env.example, you can make `rtw_rnd_golang_crud`
- put your db name and other credentials in .env file
- run `go run main.go`. That's it for the backend ( Server should have run in port `8080` ).

## Frontend React Setup Steps:
- goto `admin-react` if you are not there yet. `cd admin-react` from the root of this project
- run `yarn install` or `npm install` or any other package manager you are comfortable in
- after that just run `yarn start` ( you will be redirected in browser running localhost with port 3000 )
- after few second you will have an access to manage your content.

To see your changes you have done from react form you will need to browse http://localhost:8080




