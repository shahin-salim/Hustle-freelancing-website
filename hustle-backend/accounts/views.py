from .import signals
from .models import CustomUser
from rest_framework import status
from rest_framework.views import APIView
from .serializer import CustomUserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

class SignUp(APIView):

    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            token = {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }

            return Response(token, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_routes(request):
    routes = [
        '/accounts/signup/',
        '/accounts/token/',
        '/accounts/token/refresh/',
        'seller/',
        'category/',
        'subcategory',
        'services/',
        'scope_and_price/'
    ]
    return Response(routes)
