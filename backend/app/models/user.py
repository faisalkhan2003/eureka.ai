from typing import TypedDict


class UserModel(TypedDict, total=False):
    _id: object
    name:str
    email: str
    password_hash: str
    created_at: str
    updated_at: str