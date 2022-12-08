from django.db import models
from ckeditor.fields import RichTextField 
# Create your models here.

# a recipe should have several things. 

class RecipeType(models.Model):
    name = models.CharField(max_length=100)
    ingredients = RichTextField()
    instructions = RichTextField()
    user = models.CharField(max_length=20)
