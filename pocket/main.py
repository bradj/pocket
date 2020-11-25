from flask import Flask
from flask import request
from markupsafe import escape

app = Flask(__name__)


@app.route('/')
def index():
    return 'Index Page'


@app.route('/account')
def account():
    return 'Account Page'


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        if 'the_file' in request.files:
            f = request.files['the_file']
            f.save('/Users/developer/code/bradj/pocket/uploads/%s' % f.filename)
        else:
            return 'No file found'
    
    return 'Uploads!'


@app.route('/<username>')
def user_page(username):
    # show the user profile for that user
    return 'Hello, %s' % escape(username)

