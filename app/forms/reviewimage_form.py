from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import (
    DataRequired,
    Optional,
)
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS


class ReviewImageForm(FlaskForm):
    reviewId = IntegerField("reviewId", validators=[DataRequired()])
    url = FileField(
        "url", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )

    submit = SubmitField("Create ReviewImage")
