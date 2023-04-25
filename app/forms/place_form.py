from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, FloatField
from wtforms.validators import (
    DataRequired,
    ValidationError,
    Length,
    NumberRange,
    Optional,
)
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS


class PlaceForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(message="Name is required")])
    description = StringField("description")
    address = StringField(
        "address", validators=[DataRequired(message="Address is required")]
    )
    city = StringField("city", validators=[DataRequired(message="City is required")])
    state = StringField("state", validators=[DataRequired(message="State is required")])
    website = StringField("website")
    phone = StringField(
        "phone",
        validators=[
            Optional(),
            Length(min=10, max=10, message="Please provide a valid phone number."),
        ],
    )
    hours = StringField("hours")
    category = SelectField(
        "category", choices=["Art", "Restaurant", "Bar", "Travel", "Bakery"]
    )
    cover_pic = FileField(
        "cover_pic", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    lat = FloatField(
        "lat",
        validators=[
            DataRequired(message="Please provide a valid latitude."),
            NumberRange(min=-90, max=90, message="Please provide a valid latitude."),
        ],
    )
    lng = FloatField(
        "lng",
        validators=[
            DataRequired(message="Please provide a valid longitude."),
            NumberRange(min=-180, max=180, message="Please provide a valid longitude."),
        ],
    )
    submit = SubmitField("Create Place")
