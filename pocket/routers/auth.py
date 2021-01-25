from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}


def fake_hash_password(password: str):
    return "fakehashed" + password


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    
    if not user:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    
    hashed_password = fake_hash_password(form_data.password)

    if not hashed_password == user['hashed_password']:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    
    return {"access_token": user['username'], "token_type": "bearer"}


@router.post("/logout")
async def logout():
    return {"action": "logout"}
