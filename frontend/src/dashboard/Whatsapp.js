import React, { Fragment, useState } from 'react';

function Whatsapp() {
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    // Add more contacts as needed
  ];

  const messages = [
    { from: 'Alice', text: 'Hello!' },
    { from: 'You', text: 'Hi Alice!' },
    // Add more messages as needed
  ];

  return (
    <Fragment>
      <div className="whatsapp-container">
        <div className="contacts-list">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              className="contact-item" 
              onClick={() => setSelectedContact(contact)}
            >
              {contact.name}
            </div>
          ))}
        </div>
        <div className="chat-window">
          {selectedContact ? (
            <Fragment>
              <div className="chat-header">{selectedContact.name}</div>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.from === 'You' ? 'sent' : 'received'}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button>Send</button>
              </div>
            </Fragment>
          ) : (
            <div className="no-contact-selected">Select a contact to start chatting</div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Whatsapp;
