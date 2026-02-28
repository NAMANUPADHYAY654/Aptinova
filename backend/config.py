"""
MongoDB configuration and connection setup
"""
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection string
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "aptinova")

# Global MongoDB client
client = None
db = None


def connect_to_mongo():
    """Connect to MongoDB"""
    global client, db
    try:
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        # Test the connection
        client.admin.command('ping')
        db = client[DB_NAME]
        print(f"✓ Connected to MongoDB: {DB_NAME}")
        return db
    except ServerSelectionTimeoutError:
        print(f"✗ Failed to connect to MongoDB at {MONGO_URL}")
        raise


def close_mongo_connection():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("✓ MongoDB connection closed")


def get_database():
    """Get the MongoDB database instance"""
    global db
    if db is None:
        connect_to_mongo()
    return db
