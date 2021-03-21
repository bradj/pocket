# Pocket

## Requirements

* Node v14.*
* Docker & Docker Compose

## Getting Started

1. `docker-compose up` - Starts postgres, pgadmin, and nginx
1. `cp .env.example .env` - Change any of the defaults to suit your environment
1. `npm install`
1. `npm run monitor`

## Routes

### Unauthenticated

/auth/login - POST - authenticates users
/auth/logout - POST - authenticates users

### Authenticated

/ - GET - feed for authenticated user
/u/:username - GET - feed that's filtered down to just a specific user
/u/:username/posts - POST - adds a new post to the specified user feed

/p - GET - instance wide feed
/p/:postid - GET - specific post
/p/:postid/comments - POST - adds a new comment

### Admin

/a/accounts - POST - Add a new account

## Get intellisense working in VS Code

* <https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76>
* <https://medium.com/@trukrs/javascript-type-linting-5903e9e3625f>
