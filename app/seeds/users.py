from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        budget=50000,
        profile_pic="https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
        password="password",
    )
    user2 = User(
        username="UserTwo",
        email="usertwo@aa.io",
        budget=50000,
        profile_pic="https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
        password="password",
    )
    user3 = User(
        username="UserThree",
        email="usertwo@aa.io",
        budget=50000,
        profile_pic="https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
        password="password",
    )

    all_users = [demo, user2, user3]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
