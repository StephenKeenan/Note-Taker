const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class NotesModel {
    readDB() {
        return readFileAsync("db/db.json", 'utf8')
    }

    // we will use this function to retrive all notes
    retriveNotes(){
        return this.readDB().then(function (notes) {
            let formatedNotes = [].concat(JSON.parse(notes))
            return formatedNotes
        })
    }

    createNewNote() {
        
    }
}

module.exports = new NotesModel()