from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, FloatField
from wtforms.validators import (
    DataRequired,
    ValidationError,
    Length,
    NumberRange,
    Optional,
    Regexp,
)
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS

states_usa = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
]


class PlaceForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(message="Name is required")])
    description = StringField("description")
    address = StringField(
        "address", validators=[DataRequired(message="Address is required")]
    )
    city = StringField("city", validators=[DataRequired(message="City is required")])
    state = SelectField(
        "state",
        choices=[(state, state) for state in states_usa],
    )
    website = StringField("website")
    phone = StringField(
        "phone",
        validators=[
            Optional(),
            Length(
                min=10, max=10, message="Please provide a valid 10-digit phone number."
            ),
            Regexp(
                "^[0-9]*$",
                message="Please provide a valid 10-digit phone number.",
            ),
        ],
    )
    hours = StringField("hours")
    category = SelectField(
        "category",
        choices=["Art", "Restaurant", "Bar", "Travel", "Bakery", "Coffee/Tea"],
    )
    cover_pic = FileField(
        "cover_pic", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    lat = FloatField(
        "lat",
        validators=[
            DataRequired(message="Please provide a valid latitude."),
            NumberRange(
                min=-90,
                max=90,
                message="Please provide a valid latitude between -90 and 90.",
            ),
        ],
    )
    lng = FloatField(
        "lng",
        validators=[
            DataRequired(message="Please provide a valid longitude."),
            NumberRange(
                min=-180,
                max=180,
                message="Please provide a valid longitude between -180 and 180.",
            ),
        ],
    )
    submit = SubmitField("Create Place")
