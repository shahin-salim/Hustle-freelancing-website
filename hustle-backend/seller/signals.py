from django.db.models.signals import post_save
from django.dispatch import receiver

from accounts.models import CustomUser
from .models import SellerProfile


@receiver(post_save, sender=SellerProfile)
def update_user(sender, instance, **kwargs):
    """
    update is_seller status true in the auth user table
    """
    
    CustomUser.objects.filter(id=instance.user_id.id).update(is_seller=True)
