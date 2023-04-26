from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

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
    review = db.Column(db.Text)
    rating = db.Column(db.Integer)

    creator = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    reviewImages = db.relationship(
        "ReviewImage", back_populates="review", cascade="all, delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "productId": self.productId,
            "review": self.review,
            "rating": self.rating,
        }
