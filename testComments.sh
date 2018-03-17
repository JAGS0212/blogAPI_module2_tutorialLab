
curl -X DELETE "http://localhost:3000/posts/0/comments/0" -i

curl  -X POST -d '{"comment":"Hello my name is Jorge"}'  "http://localhost:3000/posts/0/comments" -H "Content-Type: application/json" -i


curl  -X PUT -d '{"comment":"Hello my name is Pipe"}' "http://localhost:3000/posts/0/comments/1" -H 'Content-Type: application/json' -i


curl -X GET "http://localhost:3000/posts/0/comments"  -i

