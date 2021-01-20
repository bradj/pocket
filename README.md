# Pocket

## Requirements

* Pipenv
* Python 3.8

## Getting Started

1. `cp .env.example .env` - Change any of the defaults to suit your environment
1. `pipenv install`
1. `pipenv run test`

## Routes

### Unauthenticated

/auth/login - POST - authenticates users
/auth/logout - POST - authenticates users
/* - * - login

### Authenticated

/ - GET - feed for authenticated user
/:id - GET - individual user feed
/:id/posts - POST - adds a new post to the specified user feed

/p/:postid - GET - gets specific post
/p/:postid/comments - POST - adds a new comment

/a/* - * - ADMIN

comments
https://www.instagram.com/web/comments/2340264772690097915/add/
{"id": "17929571122465962", "from": {"id": "14894745500", "username": "theangrybj", "full_name": "Angry BJ", "profile_picture": "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/s150x150/106581146_409364586686086_8308433778781584599_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com\u0026_nc_ohc=vWxGAXxt8QcAX_VvPJq\u0026tp=1\u0026oh=ecd41082cad5eaee5f5a6424ac8db960\u0026oe=60183235"}, "text": ":D", "created_time": 1609441291, "status": "ok"}
comment_text: :D
replied_to_comment_id:


https://www.instagram.com/web/comments/2340264772690097915/add/
{"id": "17924973553469776", "from": {"id": "14894745500", "username": "theangrybj", "full_name": "Angry BJ", "profile_picture": "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/s150x150/106581146_409364586686086_8308433778781584599_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com\u0026_nc_ohc=vWxGAXxt8QcAX_VvPJq\u0026tp=1\u0026oh=ecd41082cad5eaee5f5a6424ac8db960\u0026oe=60183235"}, "text": "@theangrybj D:", "created_time": 1609441444, "status": "ok"}
comment_text: @theangrybj D:
replied_to_comment_id: 17929571122465962


wss://edge-chat.instagram.com/chat
