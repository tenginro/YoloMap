from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_places():
    place1 = Place(
        creatorId=1,
        name="Jiangnan",
        address="177 Tremont St",
        city="Boston",
        state="MA",
        description="It fills the role of upscale Chinese fine dining. It's located next to Boston Commons and Chinatown with limited parking meters available. The interior inside consists of old upscale European style decoration and art. There's a bar once you come in, then two tables for a large party, and then the main dining area.",
        website="http://jiangnanny.com",
        phone="(857) 277-0668",
        hours="Mon-Fri: 11:30AM-9:30PM (3PM-4:30PM Closed); Sat-Sun: 11:30AM-9:30PM",
        category="Restaurant",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/ab642O-Blm-_uE6Dlsx05w/o.jpg",
        lat=42.3530538,
        lng=-71.0643608,
    )
    place2 = Place(
        creatorId=2,
        name="Cha Redefine",
        address="507 S Spring St",
        city="Los Angeles",
        state="CA",
        description="milk tea, bubble tea",
        website="http://www.charedefine.com/",
        phone="(213) 266-8404",
        hours="11:30AM-7PM",
        category="Coffee/Tea",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/DxQ0k_ywz9RPxUbMif1UNA/o.jpg",
        lat=33.9665211,
        lng=-118.2724931,
    )
    place3 = Place(
        creatorId=1,
        name="Charlie's Kitchen",
        address="10 Eliot St",
        city="Cambridge",
        state="MA",
        description="Whether you're a seasoned oyster lover or trying them for the first time, the cozy and inviting atmosphere is the perfect place to unwind and enjoy a casual meal with friends or family.",
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
        description="This gym is equipped with the latest and greatest in exercise equipment, and the expert trainers are here to help you achieve your fitness goals. It offers a wide range of classes, including cardio, strength training, yoga, and Pilates, to help you stay motivated and engaged in your fitness journey. ",
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
        description="The MFA is open. Open to new ideas that broaden our perspectives. Open to every visitor, from the curious to the lifelong learner. Open to new possibilities discovered through art.",
        website="http://www.mfa.org",
        phone="(617) 267-9300",
        hours="Sat-Mon: 10AM-5PM; Tue: Closed; Wed: 10AM-5PM; Thu-Fri: 10AM-10PM",
        category="Museum",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/wlKSKQ27U8CkuLDRr4eqEQ/o.jpg",
        lat=42.339381,
        lng=-71.0966229,
    )
    place6 = Place(
        creatorId=1,
        name="Universal Studio",
        address="6000 Universal Blvd",
        city="Orlando",
        state="FL",
        description="Step into the Wizard World of Harry Potter, soar through the skies with Jurassic Park dinosaurs, and battle evil robots with the Transformers. Meet your favorite characters and enjoy live performances, parades, and fireworks shows. ",
        website="https://www.universalorlando.com",
        phone="(407) 363-8000",
        hours="Sun: 9AM-8PM; Mon: 9AM-6PM; Tue: 9AM-7PM; Wed-Thu: 9AM-8PM; Fri-Sat: 8AM-6PM",
        category="Travel",
        cover_pic="https://shebuystravel.com/wp-content/uploads/2019/04/Universal-Ball.jpg",
        lat=28.478997,
        lng=-81.490429,
    )

    place7 = Place(
        creatorId=3,
        name="Disney World",
        address="Walt Disney World Resort",
        city="Orlando",
        state="FL",
        description="WDW is made up of four theme parks: Magic Kingdom, Epcot, Disney's Hollywood Studios, and Disney's Animal Kingdom. ",
        website="https://disneyworld.disney.go.com/?CMP=OKC-80007798_GM_WDW_destination_waltdisneyworldresort_NA",
        phone="(407) 939-5277",
        hours="Open 24 hours",
        category="Travel",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/3FENUBmEzXnA_E0eievktA/o.jpg",
        lat=28.3771857,
        lng=-81.5733149,
    )
    place8 = Place(
        creatorId=2,
        name="Alive & Kicking Lobsters",
        address="269 Putnam Ave",
        city="Cambridge",
        state="MA",
        description="The specialty here is the classic lobster roll, made with succulent chunks of Maine lobster meat, lightly dressed with mayo, and served on a warm and buttery roll. Other delectable seafood options such as shrimp rolls, crab rolls, and clam chowder. ",
        phone="(617) 876-0451",
        hours="Mon-Sat: 11AM-6PM; Sun: 11AM-4PM",
        category="Restaurant",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/B35STt7pv-BN8mh0BIAXTg/o.jpg",
        lat=42.362574,
        lng=-71.1164871,
    )

    all_places = [place1, place2, place3, place4, place5, place6, place7, place8]
    add_places = [db.session.add(place) for place in all_places]
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
