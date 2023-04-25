from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Cart, Product, User
from ..forms import CartForm

cart_routes = Blueprint("carts", __name__)


@cart_routes.route("/current")
@login_required
def get_user_cart():
    user = current_user.to_dict()
    cartItems = Cart.query.filter(Cart.creatorId == user["id"]).all()
    return [
        {
            **item.to_dict(),
            "product": Product.query.get(item.productId).to_dict(),
            "user": User.query.get(item.creatorId).to_dict(),
        }
        for item in cartItems
    ]


@cart_routes.route("/add", methods=["POST"])
@login_required
def add_to_cart():
    user = current_user.to_dict()
    form = CartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(form.data["productId"])

        new_Cart = Cart(creatorId=user["id"], productId=product.id)

        db.session.add(new_Cart)
        db.session.commit()
        return {
            **new_Cart.to_dict(),
            "product": Product.query.get(new_Cart.productId).to_dict(),
            "user": User.query.get(new_Cart.creatorId).to_dict(),
        }


@cart_routes.route("/<int:id>/remove", methods=["DELETE"])
@login_required
def remove_from_cart(id):
    cartItem = Cart.query.get(id)

    if cartItem:
        db.session.delete(cartItem)
        db.session.commit()
        return {"message": "Product is removed from cart!"}
    return {"message": "CartItem not found"}


@cart_routes.route("/current/clear", methods=["DELETE"])
@login_required
def clear_cart():
    user = current_user.to_dict()
    allCartItems = Cart.query.filter(Cart.creatorId == user["id"]).all()

    if len(allCartItems):
        clear = [db.session.delete(cartItem) for cartItem in allCartItems]
        db.session.commit()
        return {"message": "Products are removed from cart!"}
    return {"message": "CartItem not found"}
