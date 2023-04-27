from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange


class UpdateBudgetForm(FlaskForm):
    budget = IntegerField(
        "budget",
        validators=[
            NumberRange(min=1, message="Please provide a valid integer for budget.")
        ],
    )
