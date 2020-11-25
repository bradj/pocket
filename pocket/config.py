import os
from os.path import expanduser
import pathlib


def upload_directory():
    directory = os.getenv('POCKET_UPLOAD_DIR')

    if not directory:
        directory = pathlib.Path().absolute()
    else:
        directory = expanduser(directory)

    return directory
