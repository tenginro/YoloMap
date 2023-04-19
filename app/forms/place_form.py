from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange


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
    cover_pic = StringField("cover_pic")
    lat = FloatField("lat", validators=[NumberRange(min=-90, max=90)])
    lng = FloatField("lng", validators=[NumberRange(min=-180, max=180)])
    submit = SubmitField("Create Place")
