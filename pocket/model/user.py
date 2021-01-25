from mongoengine import StringField, Document


class User(Document):
    email = StringField(required=True, max_length=64)
    username = StringField(required=True, max_length=30)
    password = StringField(required=True, max_length=128)
