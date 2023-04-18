from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        creatorId=1,
        placeId=1,
        name="Lobster Roll",
        description="lobster sandwich",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/DtW76OIGv5Y3_JMATH50Nw/o.jpg",
        price=30,
    )
    product2 = Product(
        creatorId=1,
        placeId=1,
        name="Daily Special",
        description="2 cooked lobsters + steamed mussels",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/Yj58WMQfUdmbxlYzUn_UWg/o.jpg",
        price=47,
    )
    product3 = Product(
        creatorId=1,
        placeId=2,
        name="Tiramisu",
        description="one piece",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/HOQvhAnwuBntwBbmlWUxyA/o.jpg",
        price=2,
    )
    product4 = Product(
        creatorId=1,
        placeId=3,
        name="Oyster",
        description="one dollar oyster",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/_6lnTI6uI3nRM4cfXJG6ww/o.jpg",
        price=12,
    )
    product5 = Product(
        creatorId=1,
        placeId=4,
        name="Membership",
        description="one month",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/ftn7f5IUTwbZATQWqYcsKA/o.jpg",
        price=10,
    )
    product6 = Product(
        creatorId=1,
        placeId=1,
        name="General Admission Ticket",
        description="one day",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/DtW76OIGv5Y3_JMATH50Nw/o.jpg",
        price=27,
    )

    all_products = [
        product1,
        product2,
        product3,
        product4,
        product5,
        product6,
    ]
    add_products = [db.session.add(product) for product in all_products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
