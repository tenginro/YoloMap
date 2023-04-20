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
        placeId=5,
        name="General Admission Ticket",
        description="one day",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/DtW76OIGv5Y3_JMATH50Nw/o.jpg",
        price=27,
    )
    product7 = Product(
        creatorId=1,
        placeId=6,
        name="Flight",
        description="flight from my place, for two",
        cover_pic="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Transportation_Security_Administration_seal.svg/1200px-Transportation_Security_Administration_seal.svg.png",
        price=1000,
    )
    product8 = Product(
        creatorId=1,
        placeId=6,
        name="Hotel",
        description="hotel for one week",
        cover_pic="https://cache.marriott.com/content/dam/marriott-renditions/BOSQU/bosqu-double-superior-6746-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
        price=1500,
    )

    all_products = [
        product1,
        product2,
        product3,
        product4,
        product5,
        product6,
        product7,
        product8,
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
