from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description")
    cover_pic = FileField(
        "cover_pic", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    price = IntegerField("price", validators=[DataRequired()])
    placeId = IntegerField("placeId", validators=[DataRequired()])
    submit = SubmitField("Create Product")
