from rest_framework.permissions import BasePermission

# post , put, delete methods are only permitted for the admin


class IsUserIsAuthorized(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser if request.method != "GET" else True


class Sample(BasePermission):

    def has_permission(self, request, view):
        print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        print(request.user)
        print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        return True
