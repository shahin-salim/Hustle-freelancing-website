from rest_framework.permissions import BasePermission


class IsSellerIsAuthorized(BasePermission):
    """
    Checking the user is seller or not
    """
    
    def has_permission(self, request, view):
        try:
            return request.user.is_seller
        except:
            return False
