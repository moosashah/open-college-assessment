# Setup

1. `docker compose up` (start local mysql database)
2. `cp .env.example .env`
3. `npm i`
4. `npm dev` (start dev server on localhost:4000 and run migrations)
5. test on `http://localhost:4000/graphql`

Live demo: https://open-college-assessment-production.up.railway.app/graphql
Demo video: https://www.loom.com/share/9f924b067f6642c38e938c6574029c0e

## Techstack

* Express
* Typescript
* Apollo
* Graphql
* docker (running mysql locally)
* Drizzle ORM
* mysql DB
* deployment - railway 🙂

Improvements: 

Add tests - mock server/e2e test
Add health check endpoint
Better linting/typechecking
Add formatting (prettier)
Use husky -> run scritps on certain git hooks (before pushing branch to remote)
Use lintstaged/commitlint 
Add analytics (post hog)
Add monitoring/error tracking with sentry
Improve error responses


Production: 
local db for local dev (docker container) but in production -> RDS/Aurora/planetscale some manged DB service
Appsync - serverless graphql service
Auth: Auth0, Cognito, passport, workOS


Add CI - linting / running tests in PR/before commit - auto deploy when merge to main
	GitHub actions
    Code build
    Code pipeline
    circleCI
    Argocd

Callouts: 

updateCourse is a put (needs all fields) 
	Can change it to behave more like a patch

register mutation returns token as well as login
    Think this is more of a product decision whether user should register -> login to get token or register should do both
