# Pocket

## Requirements

* Node v14.16.0

## Getting Started

1. `cp .env.example .env` - Change any of the defaults to suit your environment
1. `npm install`
1. `npm run monitor`

## Routes

### Unauthenticated

/auth/login - POST - authenticates users
/auth/logout - POST - authenticates users
/*-* - login

### Authenticated

/ - GET - feed for authenticated user
/:id - GET - individual user feed
/:id/posts - POST - adds a new post to the specified user feed

/p/:postid - GET - gets specific post
/p/:postid/comments - POST - adds a new comment

/a/*-* - ADMIN

## Get intellisense working in VS Code

* <https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76>
* <https://medium.com/@trukrs/javascript-type-linting-5903e9e3625f>
