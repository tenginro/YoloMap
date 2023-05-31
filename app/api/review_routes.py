from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import Place, db, Product, Review, User
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


@review_routes.route("/<int:id>")
def get_one_review(id):
    review = Review.query.get(id)
    return {
        **review.to_dict(),
        "reviewOwner": User.query.get(review.creatorId).to_dict(),
        "reviewImages": [image.to_dict() for image in review.reviewImages],
    }


@review_routes.route("/current")
@login_required
def get_user_reviews():
    user = current_user.to_dict()
    reviews = Review.query.filter(Review.creatorId == user["id"])

    return [
        {
            **review.to_dict(),
            "product": Product.query.get(review.productId).to_dict(),
            "place": Place.query.get(
                Product.query.get(review.productId).placeId
            ).to_dict(),
            "reviewImages": [image.to_dict() for image in review.reviewImages],
        }
        for review in reviews
    ]


@review_routes.route("/new", methods=["POST"])
@login_required
def create_review():
    user = current_user.to_dict()
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(form.data["productId"])

        new_review = Review(
            creatorId=user["id"],
            productId=product.id,
            review=form.data["review"],
            rating=form.data["rating"],
        )
        db.session.add(new_review)
        db.session.commit()
        return {
            **new_review.to_dict(),
            "reviewOwner": User.query.get(new_review.creatorId).to_dict(),
            "reviewImages": [image.to_dict() for image in new_review.reviewImages],
        }

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
            review.review = form.data["review"]
            review.rating = form.data["rating"]

            db.session.commit()

            updated_review = Review.query.get(id)
            return {
                **updated_review.to_dict(),
                "reviewOwner": User.query.get(updated_review.creatorId).to_dict(),
                "reviewImages": [
                    image.to_dict() for image in updated_review.reviewImages
                ],
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
