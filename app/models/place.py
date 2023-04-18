from .db import db, environment, SCHEMA, add_prefix_for_prod


class Place(db.Model):
    __tablename__ = "places"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    website = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    hours = db.Column(db.Text)
    category = db.Column(db.String(20))
    cover_pic = db.Column(db.String(255))
    lat = db.Column(db.Numeric(10, 7))
    lng = db.Column(db.Numeric(10, 7))

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "website": self.website,
            "phone": self.phone,
            "hours": self.hours,
            "category": self.category,
            "cover_pic": self.cover_pic,
            "lat": self.lat,
            "lng": self.lng,
        }
