from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import Place, db, Product, Review, User, ReviewImage
from ..forms import ReviewImageForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename

reviewimages_routes = Blueprint("reviewimages", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field}: {error}")
    return errorMessages


@reviewimages_routes.route("/new", methods=["POST"])
@login_required
def create_reviewimage():
    user = current_user.to_dict()
    form = ReviewImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review.query.get(form.data["reviewId"])

        image = form.data["url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"message": "not able to upload to AWS"}

        url = upload["url"]

        new_reviewimage = ReviewImage(
            creatorId=user["id"],
            reviewId=review.id,
            url=url,
        )
        db.session.add(new_reviewimage)
        db.session.commit()
        return {**new_reviewimage.to_dict()}

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    return {"message": "Bad Data"}
