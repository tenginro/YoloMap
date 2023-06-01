from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import (
    DataRequired,
    Length,
    NumberRange,
)


class ReviewForm(FlaskForm):
    # creatorId = IntegerField("creatorId", validators=[DataRequired()])
    productId = IntegerField("productId", validators=[DataRequired()])
    review = StringField("review", validators=[DataRequired(), Length(min=10)])
    rating = IntegerField("rating", validators=[DataRequired(), NumberRange(min=1)])

    submit = SubmitField("Create Review")
