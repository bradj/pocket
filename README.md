# Pocket

## Requirements

* Pipenv
* Python 3.8

## Getting Started

1. `cp .env.example .env` - Change any of the defaults to suit your environment
1. `pipenv install`
1. `pipenv run test`

If you're using **VS Code**:

```
{
    "files.exclude": {
        "**/.git": true,
        "**/.DS_Store": true,
        "**/*.pyc": true,
        "**/__pycache__": true
    },
    "python.pythonPath": "paste the output of 'pipenv --py' here",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true
}
```

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
