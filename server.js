Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url")
const mongo = require("mongodb");
const hostname = "127.0.0.1";
const port = 3000;
const connectionString = "mongodb://localhost:27017";
const client = new mongo.MongoClient(connectionString);
let eventCollection;

client.connect(_err => {
    
    eventCollection = client.db("gis").collection("events");
    console.log("eventCollection collection initialized!");
});
const server = Http.createServer();
server.listen(port);
server.addListener("request", handleRequest);
console.log(`Server running at http://${hostname}:${port}`);
async function handleRequest(request, response) {
    
    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    let url = Url.parse(request.url, true);
    switch (url.pathname) {
        case "/concertEvent": {
            switch (request.method) {
                case "GET":
                    let events = await eventCollection.find().toArray();
                    response.write(JSON.stringify(events));
                    console.log('events fetched');
                    break;
                case "POST":
                    let jsonString = "";
                    request.on("data", data => {
                        jsonString += data;
                    });
                    request.on("end", async () => {
                        eventCollection.insertOne(JSON.parse(jsonString));
                        console.log(jsonString + " inserted");
                    });
                    break;
            }
            break;
        }
        case "concertEvents":
            switch (request.method) {
                case "GET":
                    
                    break;
            }
            break;
        default:
            response.statusCode = 404;
    }
    response.end();
}