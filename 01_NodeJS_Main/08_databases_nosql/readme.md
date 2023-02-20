# Databases NoSQL (MongoDB)

1. MongoDB

   - Deploy your application online on [ATLAS](https://cloud.mongodb.com/)
   - use the url to connect to mongoDB
     - mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net/?retryWrites=true&w=majority
   - [Compass](https://www.mongodb.com/products/compass) GUI for mongodb
   - Mongo-Express (GUI for mongodb)
     - http://localhost:8081/
     ```
        docker pull mongo-express
        docker run --network host  --name mongo_express -e ME_CONFIG_MONGODB_SERVER=localhost -p 8081:8081  -d mongo-express
     ```

2. More Links
   - [MongoDB Official Docs:](https://docs.mongodb.com/manual/core/security-encryption-at-rest/https://docs.mongodb.com/manual/)
   - [SQL vs NoSQL:](https://academind.com/learn/web-dev/sql-vs-nosql/)
   - [Learn more about MongoDB:](https://academind.com/learn/mongodb)
