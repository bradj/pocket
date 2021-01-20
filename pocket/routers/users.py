from fastapi import APIRouter

router = APIRouter()


@router.get('/{username}')
async def get_user_feed(username: str):
    return {'username': username}


@router.post('/{username}/posts')
async def add_post(username: str):
    return {'username': username, 'post': True}
