from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeView, csrf, UserRecipesViewset

router = DefaultRouter()
router.register("recipes", RecipeView, basename="recipes")
router.register("myrecipes", UserRecipesViewset, basename="myrecipes")

recipes_urlpatterns = [
    re_path(r'^api/v1/', include(router.urls)),
    re_path(r'^api/v1/csrf$', csrf),  # for csrftoken generation
]



