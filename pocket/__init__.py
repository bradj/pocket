from typing import Optional
from fastapi import FastAPI

from pocket.routers import users, auth, posts, feed
from pocket import db

app = FastAPI()


@app.on_event("startup")
async def startup():
    await db.connect()

app.include_router(feed.router)
app.include_router(
    users.router,
    prefix='/u',
    tags=['users'])
app.include_router(
    auth.router,
    prefix='/auth',
    tags=['auth']
)
app.include_router(
    posts.router,
    prefix='/p',
    tags=['posts']
)
