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
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description")
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    website = StringField("website")
    phone = StringField("phone", validators=[Length(max=20)])
    hours = StringField("hours")
    category = SelectField(
        "category", choices=["Art", "Restaurant", "Bar", "Travel", "Bakery"]
    )
    cover_pic = FileField(
        "cover_pic", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    lat = FloatField("lat", validators=[Optional(), NumberRange(min=-90, max=90)])
    lng = FloatField("lng", validators=[Optional(), NumberRange(min=-180, max=180)])
    submit = SubmitField("Create Place")
