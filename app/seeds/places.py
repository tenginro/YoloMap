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
        description="The specialty here is the classic lobster roll, made with succulent chunks of Maine lobster meat, lightly dressed with mayo, and served on a warm and buttery roll. Along with the lobster rolls, you'll also find other delectable seafood options such as shrimp rolls, crab rolls, and clam chowder. ",
        phone="(617) 876-0451",
        hours="Mon-Sat: 11AM-6PM; Sun: 11AM-4PM",
        category="Restaurant",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/B35STt7pv-BN8mh0BIAXTg/o.jpg",
        lat=42.362574,
        lng=-71.1164871,
    )
    place2 = Place(
        creatorId=1,
        name="Konditor Meister",
        address="32 Wood Rd",
        city="Braintree",
        state="MA",
        description="It is a charming bakery store, where the aroma of freshly baked goods will entice your senses and make your mouth water. The bakery specializes in crafting artisanal bread, pastries, cakes, and desserts that are baked fresh every day using high-quality ingredients. From classic croissants and muffins to decadent cakes and cookies.",
        website="http://www.konditormeister.com",
        phone="(781) 849-1970",
        hours="Mon-Sat: 8AM-6PM; Sun: 8AM-4PM",
        category="Bakery",
        cover_pic="https://s3-media0.fl.yelpcdn.com/bphoto/9-RHkYNqR5hlv38Df2vX9Q/o.jpg",
        lat=42.2258022,
        lng=-71.0361444,
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
        description="This gym is equipped with the latest and greatest in exercise equipment, and the expert trainers are here to help you achieve your fitness goals. It offers a wide range of classes, including cardio, strength training, yoga, and Pilates, to help you stay motivated and engaged in your fitness journey. Our clean and spacious facility provides a comfortable environment for working out, and the friendly staff are always available to answer any questions and provide guidance. ",
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

    all_places = [place1, place2, place3, place4, place5, place6]
    add_places = [db.session.add(place) for place in all_places]
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
