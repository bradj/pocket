import os
from os.path import expanduser


def upload_directory():
    directory = os.getenv('POCKET_UPLOAD_DIR')

    if not directory:
        directory = '/some/default'
    else:
        directory = expanduser(directory)

    return directory
