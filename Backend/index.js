console.log("Hello worlt");
const http = require("http");
const express = require("express");
const { setupMaster } = require("cluster");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

setup()
defineRoutes()
launch()

function setup(){
  
  app.use(express.json());
  
  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  app.use(requestLogger)
}

function defineRoutes(){
  setupGets()
  setupPosts()
  setupDeletes()
  setupUnknownEndpoint()
}

function setupGets(){
  app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
  });
  
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });
  
  app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    const note = notes.find((note) => {
      console.log(note.id, typeof note.id, id, typeof id, note.id === id);
      return note.id == id;
    });
    console.log(note);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  });
}
function setupPosts(){
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
}

function setupDeletes(){
  app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);
  
    response.status(204).end();
  });
}

function setupUnknownEndpoint(){
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)
}

function launch(){
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}




