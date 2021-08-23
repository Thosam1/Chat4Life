// class instances 
const chatroom = new Chatroom('general', 'shaun');

// get chats and render
chatroom.getChats(data => {
    console.log(data);
});