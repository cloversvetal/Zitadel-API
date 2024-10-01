import express from 'express';
import { API } from './zitadel.api.js';
import { zitadelConfig } from './zitadel.api.js';
import formUrlEncoded from 'form-urlencoded';


const app = express();

let tokenForAuthorize = "";

app.use(express.urlencoded({ extended: true }));
app.listen(3000, async (req, res) => {    
    console.log("sono in ascolto");
});

//LOGIN SERVICE USER
app.get('/login', async (req, res) => {
    const authCredentials = 'Basic ' + btoa(zitadelConfig.CLIENT_SERVICE_ID + ":" + zitadelConfig.CLIENT_SERVICE_SECRET);
    fetch(API.TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authCredentials
        },
        body: 'grant_type=client_credentials&scope=openid profile'
    })
    .then((response) => response.json())
    .then((token) => {
        console.log(token);
        //tokenForAuthorize = token.access_token;
        tokenForAuthorize = "JFk10FKEkLBicu4c9KmmQGr77mdkePFzstmbM9GDdHvBF6e65adHOp1Wiebtn57olG3Zoos"
    });

    res.send();
});

//Non autorizzato
app.get('/introspection', async (req, res) => {
    const token = tokenForAuthorize;
    
    const authCredentials = "Basic " + btoa((zitadelConfig.API_CLIENT_ID) + ":" + (zitadelConfig.API_CLIENT_SECRET))
    console.log(authCredentials);
    

    fetch(API.INTROSPECTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authCredentials
        },
        body: new URLSearchParams({
            'token': token
        })
      })
      .then((response)=> response.json())
      .then(token => console.log(token)); 
   
    res.send();
});


//LOGIN HUMAN USER



//API protette
app.route('api/api-1', async (req, res) => {
    console.log("Sei un service user");
});

app.route('api/api-2', async (req, res) => {
    console.log("Sei un human user");
});

app.route('api/api-3', async (req, res) => {
    console.log("Sei un human user");
});