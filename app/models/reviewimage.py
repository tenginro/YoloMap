from .db import db, environment, SCHEMA, add_prefix_for_prod


class ReviewImage(db.Model):
    __tablename__ = "reviewimages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    reviewId = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("reviews.id"), ondelete="CASCADE"),
        nullable=False,
    )
    url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "reviewId": self.reviewId,
            "url": self.url,
        }
