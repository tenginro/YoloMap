from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        creatorId=1,
        productId=2,
        review="We got the special which included a steamed lobster and a couple of mussels and wow it was a nice yummy combination.",
        rating=5,
    )
    review2 = Review(
        creatorId=2,
        productId=1,
        review="The lobster bisque really hit the spot! It had some big pieces of lobster in it. Definitely recommend as a side to the sandwich.",
        rating=5,
    )
    review3 = Review(
        creatorId=1,
        productId=3,
        review="This is one of the best places around for milk tea.",
        rating=5,
    )
    review4 = Review(
        creatorId=2,
        productId=3,
        review="Boba tea is my favorite.",
        rating=5,
    )
    review5 = Review(
        creatorId=1,
        productId=4,
        review="Went to Charlie's Kitchen after 9pm on a Friday for super cheap oysters. If you go between noon and 5pm or after 9pm, it's 50 cent a piece for the first dozen (per person) and then $1 a piece.",
        rating=5,
    )
    review6 = Review(
        creatorId=1,
        productId=5,
        review="It's an okay experience",
        rating=3,
    )

    all_reviews = [
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
    ]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
