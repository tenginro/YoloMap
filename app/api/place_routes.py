from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Place, User

place_routes = Blueprint("places", __name__)


@place_routes.route("/")
def get_all_places():
    places = Place.query.all()
    return [{**place.to_dict()} for place in places]


@place_routes.route("/<int:id>")
def get_one_place(id):
    place = Place.query.get(id)
    return {**place.to_dict()}


@place_routes.route("/current")
@login_required
def get_user_places():
    user = current_user.to_dict()
    places = Place.query.filter(Place.creatorId == user["id"])
    return [{**place.to_dict()} for place in places]
