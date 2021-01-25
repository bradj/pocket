from pocket.model.post import Post
from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get('/')
async def get_instance_feed():
    val = Post.objects().to_json()

    print(val, type(val))

    return {"feed": val}
