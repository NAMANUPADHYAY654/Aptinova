import json
import os
import sys
from fastapi import FastAPI

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.main import app

# This file is used for deployment on platforms like Vercel, Railway, or Render
# The ASGI app 'app' is exposed for the server to call

__all__ = ['app']
