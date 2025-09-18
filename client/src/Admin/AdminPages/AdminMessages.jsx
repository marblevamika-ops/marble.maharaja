import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from "react-icons/bs";
import { getAllContactMessage } from '../../Api/Api';
import adminUserProfileLogo from '../../Components/Assets/logos/admin-user-profile-logo.png';

export default function AdminMessages() {
    const [messageData, setMessageData] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // useEffect(() => {
    //     const fetchAllMessages = async () => {
    //         const result = await getAllContactMessage();
    //         if (result.success && Array.isArray(result.messages)) {
    //             // Merge messages by email, picking the latest message and combining "seen" state
    //             const mergedMessages = result.messages.reduce((acc, message) => {
    //                 const existing = acc.find(m => m.email === message.email);
    //                 if (existing) {
    //                     existing.seen = existing.seen && message.seen; // Unseen if any is unseen
    //                     if (new Date(message.submittedAt) > new Date(existing.submittedAt)) {
    //                         existing.fullName = message.fullName;
    //                         existing.submittedAt = message.submittedAt;
    //                     }
    //                 } else {
    //                     acc.push({ ...message });
    //                 }
    //                 return acc;
    //             }, []);

    //             // Sort by latest message first
    //             mergedMessages.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    //             setMessageData(mergedMessages);
    //         } else {
    //             console.error('Failed to fetch messages');
    //         }
    //     };
    //     fetchAllMessages();
    // }, []);
    useEffect(() => {
        const fetchAllMessages = async () => {
            const result = await getAllContactMessage();

            if (result.success && Array.isArray(result.messages)) {
                // Merge messages by email, picking the latest message and combining "seen" state
                const mergedMessages = result.messages.reduce((acc, message) => {
                    const existing = acc.find(m => m.email === message.email);
                    if (existing) {
                        existing.seen = existing.seen && message.seen; // Mark as unseen if any is unseen
                        // Keep the latest message data
                        if (new Date(message.submittedAt) > new Date(existing.submittedAt)) {
                            existing.fullName = message.fullName;
                            existing.submittedAt = message.submittedAt;
                            existing.message = message.message;
                        }
                    } else {
                        acc.push({ ...message });
                    }
                    return acc;
                }, []);

                // Sort by newest submittedAt first
                mergedMessages.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

                setMessageData(mergedMessages);

                // Set the first message as selected by default
                if (mergedMessages.length > 0) {
                    setSelectedMessage(mergedMessages[0]);
                }
            } else {
                console.error('Failed to fetch messages');
            }
        };

        fetchAllMessages();
    }, []);

    function timeAgo(timestamp) {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const secondsAgo = Math.floor((now - messageTime) / 1000);

        const minutesAgo = Math.floor(secondsAgo / 60);
        const hoursAgo = Math.floor(secondsAgo / 3600);
        const daysAgo = Math.floor(secondsAgo / 86400);
        const weeksAgo = Math.floor(daysAgo / 7);
        const monthsAgo = Math.floor(daysAgo / 30);
        const yearsAgo = Math.floor(daysAgo / 365);

        if (secondsAgo < 60) return 'Just now';
        if (minutesAgo < 60) return `${minutesAgo}min`;
        if (hoursAgo < 24) return `${hoursAgo}hr`;

        if (daysAgo < 7) {
            return `${daysAgo}d`;
        } else if (weeksAgo < 4) {
            return `${weeksAgo}w`;
        } else if (monthsAgo < 12) {
            return `${monthsAgo}m`;
        } else {
            return `${yearsAgo}yr`;
        }
    }



    return (
        <div className='page-container'>
            <div className="admin-messager">
                <div className="message-index">
                    <div className='message-index-header'>
                        <h2>Message</h2>
                        {messageData.length}
                    </div>
                    {messageData.length === 0 ? (
                        <p>No messages found.</p>
                    ) : (
                        messageData.map((message) => (
                            <div
                                key={message._id}
                                className={`index-card ${!message.seen ? 'unread' : ''}`}
                                onClick={() => handleSelectMessage(message)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={adminUserProfileLogo}
                                    alt="User"
                                />
                                <div>
                                    <h4>{message.email}</h4>
                                    <div>
                                        <p>
                                            {!message.seen
                                                ? 'You have a new message'
                                                : message.email.length > 30
                                                    ? message.email.slice(0, 30) + '...'
                                                    : message.email
                                            }
                                        </p>
                                        <p>{timeAgo(message.submittedAt)}</p>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Details Box */}
                {selectedMessage ? (
                    <div className="message-box">
                        <div className="message-box-header">
                            <div className='messager-profile'>
                                <img
                                    src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                                    alt="User"
                                />
                                <div>
                                    <h4>{selectedMessage.fullName}</h4>
                                    <p>{selectedMessage.email}</p>
                                </div>
                            </div>
                            <div>
                                <h3><BsInfoCircle /></h3>
                            </div>
                        </div>

                        <div className="message-box-container">
                            {messageData
                                .filter(msg => msg.email === selectedMessage.email)
                                .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
                                .map((msg, index) => (
                                    <div key={index} className="message-box-content">
                                        <p><strong>Message #{index + 1}:</strong> {msg.message}</p>
                                        <p><em>Sent {timeAgo(msg.submittedAt)}</em></p>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <p>Select a message to view details</p>
                )}

                {/* <div className="message-box">
                    <div className="message-box-header">
                        <div className='messager-profile'>
                            <img
                                src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                                alt="User"
                            />
                            <div>
                                <h4>User Name</h4>
                                <p>example.email@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <h3><BsInfoCircle /></h3>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
