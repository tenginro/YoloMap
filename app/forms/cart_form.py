from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired


class CartForm(FlaskForm):
    productId = IntegerField("productId", validators=[DataRequired()])
    submit = SubmitField("Add to Cart")
