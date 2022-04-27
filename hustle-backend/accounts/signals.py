import cloudinary.uploader
import cloudinary
from .models import CustomUser
from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_delete, sender=CustomUser)
def delete_user_profile(sender, instance, *args, **kwargs):
    
    # Delete profile picture uploaded in cloudinary
    
    cloudinary.uploader.destroy(instance.image.name)