import { useState, useEffect } from 'react';
import { db } from '../../firebase';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // useEffect(() => {
  //   const unsubscribe = database.collection('messages')
  //     .orderBy('timestamp', 'asc')
  //     .onSnapshot(snapshot => {
  //       setMessages(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
  //     });

  //   return () => unsubscribe();
  // }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   db.collection('messages').add({
  //     text: newMessage,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   });
  //   setNewMessage('');
  // };

  return (
    <div>
      <div>
        {messages.map(({ id, data }) => (
          <div key={id}>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
      {/* <form onSubmit={sendMessage}> */}
      <form>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
