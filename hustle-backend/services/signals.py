import cloudinary.uploader
import cloudinary
from .models import Services
from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_delete, sender=Services)
def delete_service_images(sender, instance, *args, **kwargs):

    """ Delete the images uploaded in clodinary """

    cloudinary.uploader.destroy(instance.image1.name)
    cloudinary.uploader.destroy(instance.image2.name)