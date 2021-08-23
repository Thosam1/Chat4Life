// class for getting chat room and data together

// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    // adding new chat documents
    async addChat(message) {
        //format a chat object 
        const now = new Date(); // when the user submits the message
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    // setting up a real-time listener to get new chats
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room) // complex query, to only listen to the current room changes
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        // update the ui
                        callback(change.doc.data()) // passing the data object to the callback function
                    }
                });
            });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){ // if it has a value
            this.unsub();   // so we unsubscribre from listening to the previous room 
        } 
       
    }
}


