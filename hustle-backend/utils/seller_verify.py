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


class SellerViewPermission(BasePermission):
    """
    Checking the user is seller or not
    """

    def has_permission(self, request, view):
        print(request.user)
        if request.method == "POST" and request.user != "AnonymousUser" or request.method == "GET":
            print("====================&&&&&&&&&&&&=========================")
            return True
        return False
