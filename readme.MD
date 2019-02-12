# First assignment
 When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

### Installing
```
    docker-compose up
    
    docker exec -it {container-name} ash 
    npm install
```
## Requests

```
# Should return response in json {"welcome":"new visitor"}
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/hello

# Should return same response as mentioned above plus in the console it should list all the data send in the `POST` request
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data "param1=random-value1" http://localhost:3000/hello

# Should return 404 status code
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/not-found
```
