from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import Place, User, db
from ..forms import PlaceForm

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


@place_routes.route("/<int:id>", methods=["POST"])
@login_required
def create_place():
    user = current_user.to_dict()
    form = PlaceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_place = Place(
            creatorId=user["id"],
            name=form.data["name"],
            description=form.data["description"],
            address=form.data["address"],
            city=form.data["city"],
            state=form.data["state"],
            website=form.data["website"],
            phone=form.data["phone"],
            hours=form.data["hours"],
            category=form.data["category"],
            cover_pic=form.data["cover_pic"],
            lat=form.data["lat"],
            lng=form.data["lng"],
        )
        db.session.add(new_place)
        db.session.commit()
        return {**new_place.to_dict()}

    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}

    return {"message": "Bad Data"}


@place_routes.route("/<int:id>", methods=["PATCH", "PUT"])
@login_required
def update_place(id):
    user = current_user.to_dict()
    place = Place.query.get(id)

    if place.user_id == user["id"]:
        form = PlaceForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            place.name = form.data["name"]
            place.description = form.data["description"]
            place.address = (form.data["address"],)
            place.city = (form.data["city"],)
            place.state = (form.data["state"],)
            place.website = (form.data["website"],)
            place.phone = (form.data["phone"],)
            place.hours = (form.data["hours"],)
            place.category = form.data["category"]
            place.cover_pic = (form.data["cover_pic"],)
            place.lat = (form.data["lat"],)
            place.lng = (form.data["lng"],)

            db.session.commit()

            updated_place = Place.query.get(id)
            return {**updated_place.to_dict()}

        if form.errors:
            return {
                "message": "form errors",
                "errors": f"{form.errors}",
            }

    return {"message": "User does not own this place"}


@place_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_place(id):
    place = Place.query.get(id)
    if place:
        db.session.delete(place)
        db.session.commit()
        return {"message": "Place Deleted!"}
    return {"message": "Place not found"}
