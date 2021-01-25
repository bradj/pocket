from mongoengine import connect as mongo_connect, disconnect as mongo_disconnect
from pocket.config import config


async def connect() -> None:
    user = config.settings.db_user
    host = config.settings.db_host
    database = config.settings.db_database
    password = config.settings.db_password

    mongo_connect('pocket',
            host=f'mongodb+srv://{user}:{password}@{host}/{database}?retryWrites=true&w=majority')


def disconnect() -> None:
    mongo_disconnect()
