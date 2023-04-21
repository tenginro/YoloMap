from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import Place, db, Product
from ..forms import ProductForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint("products", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field}: {error}")
    return errorMessages


@product_routes.route("/")
def get_all_products():
    products = Product.query.all()
    return [{**product.to_dict()} for product in products]


@product_routes.route("/<int:id>")
def get_one_product(id):
    product = Product.query.get(id)
    return {**product.to_dict()}


@product_routes.route("/current")
@login_required
def get_user_products():
    user = current_user.to_dict()
    products = Product.query.filter(Product.creatorId == user["id"])
    return [{**product.to_dict()} for product in products]


@product_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    user = current_user.to_dict()
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        place = Place.query.get(form.data["placeId"])

        image = form.data["cover_pic"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"message": "not able to upload to AWS"}

        url = upload["url"]

        new_product = Product(
            creatorId=user["id"],
            placeId=place["id"],
            name=form.data["name"],
            description=form.data["description"],
            cover_pic=url,
            price=form.data["price"],
        )
        db.session.add(new_product)
        db.session.commit()
        return {**new_product.to_dict()}

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    return {"message": "Bad Data"}


@product_routes.route("/<int:id>/edit", methods=["PATCH", "PUT"])
@login_required
def update_product(id):
    user = current_user.to_dict()
    product = Product.query.get(id)

    if product.creatorId == user["id"]:
        form = ProductForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            image = form.data["cover_pic"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"message": "not able to upload to AWS"}

            url = upload["url"]

            product.name = form.data["name"]
            product.description = form.data["description"]
            product.cover_pic = url
            product.price = form.data["price"]

            db.session.commit()

            updated_product = Product.query.get(id)
            return {**updated_product.to_dict()}

        if form.errors:
            return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    return {"message": "User does not own this product"}


@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return {"message": "Product Deleted!"}
    return {"message": "Product not found"}
