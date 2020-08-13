const express = require('express');
const mongoose = require('mongoose');
const app = express();
//var router = express.Router();
const path = require('path'); 
var body_parse = require('body-parser');

require('dotenv').config();
var port = process.env.PORT || 3000;
app.set('port', port);

app.use(body_parse.json());
app.use(body_parse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/personal-test')));

mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.soupg.gcp.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
                    {useUnifiedTopology: true, useNewUrlParser: true}, (err) =>{
                        if(!err)
                            console.log(`Connected to Atlas DB successfully`);
                        else
                            console.log(`Facing error: ${err}`);
                    });

var noteSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    content: {type: String},
    color: {type: String}
})

var noteCollection = mongoose.model('note', noteSchema);    //mongoose will automatically look for plural of name mentioned, ie 'notes'

app.get("/api/notes/:id", (req, res) =>{    //getting single note
    noteCollection.findOne({id: parseInt(req.params.id, 10)}, {_id: 0} ,(err, note) =>{
        if(!err)
            {console.log(`Note with id: ${req.params.id} found`);
            //need {_id: 0} to send the response without the identifier _id, 
            //to avoid primary key conflict issue on adding the duplicate note
            res.send(note);}
        
        else
            console.log(`Note with id ${req.params.id} not found`);
    })
})

app.get("/api/notes", (req, res) =>{        //getting all notes
    noteCollection.find((err, notes) =>{
        if(!err)
            res.send(notes);
        else
            console.log(`Notes not found`);
    });
});

app.delete("/api/notes/:id", (req, res) =>{     //deleting a note
    noteCollection.deleteOne({id: parseInt(req.params.id, 10)}, (err) =>{
        if(!err)
            console.log(`Note with id ${req.params.id} deleted`);
        else
            console.log(`Found error in deleting: ${err}`);
    })
})

app.post("/api/notes", (req, res) =>{   //adding a note
    noteCollection.insertMany(req.body, (err, res) =>{
        if(err)
            console.log(`Doc not added: ${err}`);
        else
            console.log(`Note with id ${req.params.id} added`);
    })
})

app.put("/api/notes/:id", (req, res) => {       //updating a note
    noteCollection.updateOne({id: parseInt(req.params.id, 10)}, {$set :{content: req.body.content, 
                                                                    title: req.body.title,
                                                                    color: req.body.color}} ,(err, res) =>{
        if(!err)
            console.log(`Note with id: ${req.params.id} updated`);
        
        else
            console.log(`Note not updated: ${err}`);
    })
})

app.get('*', (req, res) => {  //serve the landing page for catch-all path
    res.sendFile(path.join(__dirname, 'dist/personal-test/index.html'));
  });


//app.get('api/notes', (req, res) =>{})    for getting all the notes
//app.get('api/notes/:id', (req, res) =>{})   for getting single note
//app.post('api/notes/:id', (req, res) => {})   for adding a note
//app.put('api/notes/:id', (req, res) => {}) for updating a note
//app.delete('api/notes/:id', (req, res) => {})  for deleting a note

app.listen(port, () => console.log(`listening on http://localhost:${port}/`));