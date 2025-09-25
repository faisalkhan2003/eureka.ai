from typing import Optional
from datetime import datetime
from pymongo.collection import Collection
from app.db.mongo import get_db


COLLECTION_NAME = "users"




def _collection() -> Collection:
    return get_db()[COLLECTION_NAME]




def find_by_email(email: str) -> Optional[dict]:
    return _collection().find_one({"email": email})




def create_user(name:str, email: str, password_hash: str) -> dict:
    now = datetime.utcnow().isoformat()
    doc = {
    "name":name,
    "email": email,
    "password_hash": password_hash,
    "created_at": now,
    "updated_at": now,
}
    _collection().insert_one(doc)
# Return without password hash for safety if needed by callers
    return {k: v for k, v in doc.items() if k != "password_hash"}