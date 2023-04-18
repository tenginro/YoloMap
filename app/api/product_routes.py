from flask import Blueprint
from app.models import Place, User, Product

product_routes = Blueprint("products", __name__)
