from mongoengine import StringField, Document, ReferenceField, ListField, EmbeddedDocument, EmbeddedDocumentField, CASCADE
from pocket.model.user import UserDB
from datetime import datetime


class Comment(EmbeddedDocument):
    content = StringField(max_length=1024)
    name = StringField(max_length=120)


class Post(Document):
    image_location = StringField(max_length=256, required=True)
    caption = StringField(max_length=1024)
    author = ReferenceField(UserDB, reverse_delete_rule=CASCADE, required=True)
    created = datetime.utcnow()
    tags = ListField(StringField(max_length=30))
    comments = ListField(EmbeddedDocumentField(Comment))

    # http://docs.mongoengine.org/tutorial.html#posts
    meta = {'allow_inheritance': True}


class ImagePost(Post):
    image_path = StringField()
