from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange


class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description")
    cover_pic = StringField("cover_pic")
    price = IntegerField("price")
    placeId = IntegerField("placeId")
    submit = SubmitField("Create Product")
