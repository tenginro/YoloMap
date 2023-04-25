from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import Place, db, Product, Review
from ..forms import ReviewForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename

review_routes = Blueprint("reviews", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field}: {error}")
    return errorMessages


@review_routes.route("/")
def get_all_reviews():
    reviews = Review.query.all()
    return [{**review.to_dict()} for review in reviews]


@review_routes.route("/<int:id>")
def get_one_review(id):
    review = Review.query.get(id)
    return {**review.to_dict()}


@review_routes.route("/current")
@login_required
def get_user_reviews():
    user = current_user.to_dict()
    reviews = Review.query.filter(Review.creatorId == user["id"])

    return [
        {**review.to_dict(), "product": Place.query.get(review.productId).to_dict()}
        for review in reviews
    ]


@review_routes.route("/new", methods=["POST"])
@login_required
def create_review():
    user = current_user.to_dict()
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        place = Place.query.get(form.data["placeId"])

        new_review = Review(
            creatorId=user["id"],
            placeId=place.id,
            name=form.data["name"],
            description=form.data["description"],
            price=form.data["price"],
        )
        db.session.add(new_review)
        db.session.commit()
        return {**new_review.to_dict()}

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    return {"message": "Bad Data"}


@review_routes.route("/<int:id>/edit", methods=["PATCH", "PUT"])
@login_required
def update_review(id):
    user = current_user.to_dict()
    review = Review.query.get(id)

    if review.creatorId == user["id"]:
        form = ReviewForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            review.name = form.data["name"]
            review.description = form.data["description"]
            review.price = form.data["price"]

            db.session.commit()

            updated_review = Review.query.get(id)
            return {
                **updated_review.to_dict(),
                "place": Place.query.get(review.placeId).to_dict(),
            }

        if form.errors:
            return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    return {"message": "User does not own this review"}


@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review Deleted!"}
    return {"message": "Review not found"}
