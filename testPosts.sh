#curl  -X POST -d '{"na": "Top 10 ES6 <script>alert(\"Jorge\")</script> Features", "ur":"http://webapplog.com/es6", "text": "This is some descriptive text"}'  "http://localhost:3000/posts" -H "Content-Type: application/json" -i

#curl  -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": "Other descriptive text"}' "http://localhost:3000/posts/0" -H 'Content-Type: application/json' -i

curl -X DELETE "http://localhost:3000/posts/0" -i

#curl -X GET "http://localhost:3000/posts"  -i
