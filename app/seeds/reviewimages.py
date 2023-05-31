from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviewimages():
    reviewimage1 = ReviewImage(
        creatorId=1,
        reviewId=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/qjqBJK90iddtuhUTr3L6xA/o.jpg",
    )
    reviewimage2 = ReviewImage(
        creatorId=1,
        reviewId=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/ga8PwI1X1UIlnNcp0bj6hQ/o.jpg",
    )
    reviewimage3 = ReviewImage(
        creatorId=1,
        reviewId=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/ogjaJwrawdOUeaLbJcNbfA/o.jpg",
    )
    reviewimage4 = ReviewImage(
        creatorId=1,
        reviewId=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/AWaSxCzuNFVhFPxIE0ZhKQ/o.jpg",
    )
    reviewimage5 = ReviewImage(
        creatorId=1,
        reviewId=3,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/EGsMTJWX6L8U_KmHuUlbIA/o.jpg",
    )
    reviewimage6 = ReviewImage(
        creatorId=1,
        reviewId=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/q2MofMEg0TPJfj3b7YtRQA/o.jpg",
    )
    reviewimage7 = ReviewImage(
        creatorId=1,
        reviewId=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/rENk9pX12yYGWpkfVaBktA/o.jpg",
    )

    all_reviewimages = [
        reviewimage1,
        reviewimage2,
        reviewimage3,
        reviewimage4,
        reviewimage5,
        reviewimage6,
        reviewimage7,
    ]
    add_reviewimages = [db.session.add(reviewimage) for reviewimage in all_reviewimages]
    db.session.commit()


def undo_reviewimages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviewimages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM reviewimages"))

    db.session.commit()
