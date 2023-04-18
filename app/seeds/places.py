from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_places():
    place1 = Place(
        creatorId=1,
        name="Alive & Kicking Lobsters",
        address="269 Putnam Ave",
        city="Cambridge",
        state="MA",
        description="lobster rolls",
        website="",
        phone="(617) 876-0451",
        hours="Mon-Sat: 11AM-6PM; Sun: 11AM-4PM",
        category="Restaurant",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/qrCNLCmiEJ289w28wztofw/o.jpg",
        lat=42.362574,
        lng=-71.1164871,
    )
    place2 = Place(
        creatorId=1,
        name="Konditor Meister",
        address="32 Wood Rd",
        city="Braintree",
        state="MA",
        description="cake cake cake",
        website="http://www.konditormeister.com",
        phone="(781) 849-1970",
        hours="Mon-Sat: 8AM-6PM; Sun: 8AM-4PM",
        category="Bakery",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/vdnB8qLcQamSt3uIA5QmaQ/o.jpg",
        lat=42.2258022,
        lng=-71.0361444,
    )
    place3 = Place(
        creatorId=1,
        name="Charlie's Kitchen",
        address="10 Eliot St",
        city="Cambridge",
        state="MA",
        description="oyster beer wine",
        website="http://www.charlieskitchen.com",
        phone="(617) 492-9646",
        hours="Sun-Wed: 11AM-1AM; Thu-Sat: 11AM-2AM",
        category="Bar",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/_CV5Rhwt3jCGQeY7tjRUEQ/o.jpg",
        lat=42.372395,
        lng=-71.1240599,
    )
    place4 = Place(
        creatorId=1,
        name="Planet Fitness",
        address="1815 Massachusetts Ave",
        city="Cambridge",
        state="MA",
        description="exercise",
        website="https://www.planetfitness.com",
        phone="(617) 945-8596",
        hours="Mon-Thu: 6AM-12AM; Fri: 6AM-10PM; Sat-Sun: 7AM-7PM",
        category="Gym",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/8g2AoVZmN6gLqUcW34Eoog/o.jpg",
        lat=42.387407,
        lng=-71.1215319,
    )
    place5 = Place(
        creatorId=1,
        name="Museum of Fine Arts",
        address="465 Huntington Ave",
        city="Boston",
        state="MA",
        description="art art art",
        website="http://www.mfa.org",
        phone="(617) 267-9300",
        hours="Sat-Mon: 10AM-5PM; Tue: Closed; Wed: 10AM-5PM; Thu-Fri: 10AM-10PM",
        category="Museum",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/wlKSKQ27U8CkuLDRr4eqEQ/o.jpg",
        lat=42.339381,
        lng=-71.0966229,
    )

    all_places = [place1, place2, place3, place4, place5]
    add_places = [db.session.add(place) for place in all_places]
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
