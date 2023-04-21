from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import (
    DataRequired,
    ValidationError,
    Length,
    NumberRange,
    Optional,
)
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description")
    cover_pic = FileField(
        "cover_pic", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    price = IntegerField(
        "price",
        validators=[
            DataRequired(),
            NumberRange(min=0, message="Please provide a valid price."),
        ],
    )
    placeId = IntegerField("placeId", validators=[DataRequired()])
    submit = SubmitField("Create Product")
