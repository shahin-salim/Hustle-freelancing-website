// // Product image starting with url
// export const SERVICE_IMAGE_URL = "https://res.cloudinary.com/dkezigu54/image/upload/v1651049203/"

// // Service image starts with url
// export const PROFILE_IMAGE_URL = "https://res.cloudinary.com/dkezigu54/image/upload/v1651119421/"

// SERVER 2 URL
// Chat server url
export const CHAT_SERVER_URL = "http://localhost:4000/"


// Refresh token url if token is expired
export const REFRESH_TOKEN_URL = "/accounts/token/refresh/"

// Login url for user 
export const LOGIN_URL = "/accounts/token/"

// Signup url of the user
export const SIGNUP_URL = "/accounts/signup/"

// Logout url of the user
export const LOGOUT_URL = "/accounts/logout/"

// Fetch all the services
export const FETCH_SERVICES_URL = "/services/list_service/"

// Get all the of service details
export const GET_SERVICE_URL = "/services/service/"

// Get the package deatils of the selected service
export const GET_PACKAGES_OF_SERVICE_URL = "/services/scope_and_price/?service_id="

// Get the all the  users have contact with the current user
// export const GET_USERS_IN_CONTACT_URL = CHAT_SERVER_URL + "contacts?id="
export const GET_USERS_IN_CONTACT_URL = "/chat/contacts"

// Get all the users details
export const GET_USER_DETAILS_URL = "/accounts/users/"

// Get chats using the sender and reciever id
export const GET_MESSAGES_URL = CHAT_SERVER_URL + "messages"

// Send messeges
export const SEND_MESSAGES_URL = CHAT_SERVER_URL + "send_messages"

// get servicess of the user
export const SERVICES_OF_THE_USER_URL = "/services/"

// message at first time
export const ESTABLISH_CONNECTION = CHAT_SERVER_URL + "establish_connection"

// get conversation id of the chat
export const GET_OR_CREATE_CONVERSATION_ID_URL = "/chat/"