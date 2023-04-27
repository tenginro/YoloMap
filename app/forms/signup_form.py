from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, IntegerField, PasswordField, FloatField
from wtforms.validators import (
    DataRequired,
    Email,
    ValidationError,
    NumberRange,
    Optional,
)
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.aws_helpers import ALLOWED_EXTENSIONS
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
    email = EmailField(
        "email",
        validators=[
            DataRequired(),
            user_exists,
            Email(message="Please provide a valid email."),
        ],
    )
    password = PasswordField("password", validators=[DataRequired()])
    budget = IntegerField(
        "budget",
        validators=[
            NumberRange(min=1, message="Please provide a valid integer for budget.")
        ],
    )
    profile_pic = FileField(
        "profile_pic", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))]
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
