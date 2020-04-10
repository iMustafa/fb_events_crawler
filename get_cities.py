# parseapi.back4app.com
# key = 4MHImdHUCre36bZ9cqS0CJW2gO5sh9DFHQcPekDk
curl -X GET 
-H "X-Parse-Application-Id: 2XKgBMmi12Qa2tNoZZIWP0QqhflIt4w5WLf3uvRU" 
-H "X-Parse-REST-API-Key: 3m8p3Z5VvRumhVH0b8iFzdLNAr67GdQLin3gR2Gw" 
-G 
--data-urlencode "limit=0"
https://parseapi.back4app.com/classes/City


curl -X GET 
-H "X-Parse-Application-Id: 2XKgBMmi12Qa2tNoZZIWP0QqhflIt4w5WLf3uvRU" 
-H "X-Parse-REST-API-Key: 3m8p3Z5VvRumhVH0b8iFzdLNAr67GdQLin3gR2Gw" 
-G 
--data-urlencode "where={ \"name\":\"A string\",\"altName\":\"A string\",\"country\":{ \"__type\": \"Pointer\", \"className\": \"Country\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" }}" 
https://parseapi.back4app.com/classes/City