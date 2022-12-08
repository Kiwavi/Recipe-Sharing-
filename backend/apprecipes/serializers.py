from rest_framework import serializers
from .models import RecipeType

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeType
        # serialize and display all but do not display the user 
        fields = '__all__'
        extra_kwargs = {
            'user' : {
                'write_only' : True
            }
        } 
