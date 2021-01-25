from fastapi import APIRouter, Depends
from pocket.model.user import User
from pocket.context import oauth2_scheme, get_current_user


router = APIRouter()


@router.get('/{username}')
async def get_user_feed(username: str, token: str = Depends(oauth2_scheme)):
    return {'username': username}


@router.get('/')
async def current_user(current_user: User = Depends(get_current_user)):
    return current_user


@router.post('/{username}/posts')
async def add_post(username: str):
    return {'username': username, 'post': True}
