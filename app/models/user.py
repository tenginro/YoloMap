from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    budget = db.Column(db.Integer, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    lat = db.Column(db.Numeric(10, 7))
    lng = db.Column(db.Numeric(10, 7))

    places = db.relationship("Place", back_populates="creator")
    products = db.relationship("Product", back_populates="creator")
    reviews = db.relationship("Review", back_populates="creator")
    reviewImages = db.relationship("ReviewImage", back_populates="creator")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_pic": self.profile_pic,
            "budget": self.budget,
            "lat": self.lat,
            "lng": self.lng,
        }
