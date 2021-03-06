import * as Http from "http";
import * as Url from "url";
import * as mongo from "mongodb"

const hostname: string = "127.0.0.1";
const port: number = 3000;
const connectionString: string = "mongodb://localhost:27017";



const client: mongo.MongoClient = new mongo.MongoClient(connectionString);
let eventCollection: mongo.Collection;


client.connect(_err => {
    eventCollection = client.db("gis").collection("events");
    console.log("eventCollection collection initialized!");
});

const server: Http.Server = Http.createServer();
server.listen(port);
server.addListener("request", handleRequest);

console.log(`Server running at http://${hostname}:${port}`);


async function handleRequest(request: Http.IncomingMessage, response: Http.ServerResponse): Promise<void> {
    

    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*");

    let url: Url.UrlWithParsedQuery = Url.parse(request.url, true);

    switch (url.pathname) {
        case "/concertEvent": {
            switch (request.method) {
                case "GET":
                    let events=await eventCollection.find().toArray();
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