from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        creatorId=1,
        placeId=8,
        name="Lobster Roll",
        description="lobster sandwich",
        cover_pic="https://www.foodiecrush.com/wp-content/uploads/2020/06/Lobster-Rolls-foodiecrush.com-020.jpg",
        price=30,
    )
    product2 = Product(
        creatorId=3,
        placeId=8,
        name="Daily Special",
        description="2 cooked lobsters + steamed mussels",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/Yj58WMQfUdmbxlYzUn_UWg/o.jpg",
        price=47,
    )
    product3 = Product(
        creatorId=2,
        placeId=2,
        name="Milk tea",
        description="combo",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/iXA4Fmj6vFmLBkCs5U_YIQ/o.jpg",
        price=30,
    )
    product4 = Product(
        creatorId=1,
        placeId=3,
        name="Oyster",
        description="one dollar oyster",
        cover_pic="https://www.washingtonpost.com/resizer/FiEKMAUiSxtyJl6w5JlQ7MtHCxw=/arc-anglerfish-washpost-prod-washpost/public/2L4TYTLHBQQ7TM3DXB2IXTAYKA.jpg",
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
        cover_pic="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/530000/530919-fenway-kenmore.jpg",
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
    product9 = Product(
        creatorId=1,
        placeId=1,
        name="Peking Duck",
        description="Combo for peking duck",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/C9QovNh3xz4Lt7URbFLUDQ/o.jpg",
        price=100,
    )
    product10 = Product(
        creatorId=3,
        placeId=7,
        name="Resort hotel",
        description="7 days stay",
        cover_pic="https://i.insider.com/60b91309bee0fc0019d5b2a0?width=700",
        price=2500,
    )
    product11 = Product(
        creatorId=3,
        placeId=7,
        name="General Admission Ticket",
        description="Annual Pass",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/qWXZH5N8lim9USuY1WSP9w/o.jpg",
        price=1400,
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
        product9,
        product10,
        product11,
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
