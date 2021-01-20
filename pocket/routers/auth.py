from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
async def login():
    return {"action": "login"}


@router.post("/logout")
async def logout():
    return {"action": "logout"}

