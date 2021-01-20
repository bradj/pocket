from fastapi import APIRouter

router = APIRouter()


@router.get('/{postid}')
async def get_post(postid: str):
    return {'postid': postid}


@router.post('/{postid}/comments')
async def add_comment(postid: str):
    return {'postid': postid, 'add_comment': True}
