from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    placeId = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("places.id"), ondelete="CASCADE"),
        nullable=False,
    )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    cover_pic = db.Column(db.String(255))
    price = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "placeId": self.placeId,
            "name": self.name,
            "description": self.description,
            "cover_pic": self.cover_pic,
            "price": self.price,
        }
