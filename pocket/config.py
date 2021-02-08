from dotenv import load_dotenv
load_dotenv()

import pathlib
from os.path import expanduser
from pydantic import BaseSettings


class Settings(BaseSettings):
    pocket_upload_dir: str
    db_user: str
    db_host: str
    db_password: str
    db_database: str
    secret_key: str
    algorithm: str
    access_token_expires_minutes: int


class Config(object):
    def __init__(self) -> None:
        self.settings = Settings()
        self.upload_directory = self._upload_directory()

    def _upload_directory(self) -> str:
        directory = self.settings.pocket_upload_dir or pathlib.Path().absolute()
        directory = expanduser(directory)

        return directory

config = Config()
