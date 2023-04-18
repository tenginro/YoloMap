from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    productId = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"),
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "productId": self.productId,
        }
