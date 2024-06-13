import { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import TokenManager from "../auth/TokenManager";
import useGetUserByIdRequest from "../services/get/useGetUserById";
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const ChatPage = () => {
  const { user, fetchDataById, isLoading } = useGetUserByIdRequest(
    TokenManager.getAccessToken()
  );
  const [claims, setClaims] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const claims = TokenManager.getClaims();
    setClaims(claims);
    if (claims && claims.userId) {
      fetchDataById(claims.userId);
    }
  }, [fetchDataById]);

  useEffect(() => {
    if (claims && claims.userId && user) {
      const fetchConversations = async () => {
        const conversationsRef = collection(db, "user_chats");
        const userConversationsQuery = query(
          conversationsRef,
          where("participants", "array-contains", user.email)
        );

        const unsubscribe = onSnapshot(userConversationsQuery, (snapshot) => {
          const userConversations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setConversations(userConversations);
        });

        return unsubscribe;
      };

      fetchConversations();
    }
  }, [claims, user]);

  useEffect(() => {
    if (currentChatId) {
      const fetchMessages = async () => {
        const messagesRef = collection(db, "user_chats", currentChatId, "messages");
        const messagesQuery = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messages);
        });

        return unsubscribe;
      };

      fetchMessages();
    }
  }, [currentChatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !currentChatId) return;

    try {
      const messagesRef = collection(db, "user_chats", currentChatId, "messages");

      await addDoc(messagesRef, {
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        text: newMessage,
        timestamp: new Date(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
      setError("An error occurred while sending the message.");
    }
  };

  const handleConversationClick = (recipientEmail) => {
    const chatId = [user.email, recipientEmail].sort().join("_");
    setCurrentChatId(chatId);
    setCurrentRecipient(recipientEmail);
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const userQuery = query(
      collection(db, "users"),
      where("email", ">=", e.target.value),
      where("email", "<=", e.target.value + "\uf8ff")
    );
    const querySnapshot = await getDocs(userQuery);
    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
  };

  const handleSearchSelect = (email) => {
    handleConversationClick(email);
    setSearchQuery("");
    setSearchResults([]);
  };

  let content;
  if (isLoading || !user) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    content = (
      <Box display="flex" height="80vh" pt={2}>
        <Box flex={1} p={2} bgcolor="#f5f5f5" borderRight="1px solid #ddd">
          <CssBaseline />
          <Typography variant="h6" gutterBottom>
            Conversations
          </Typography>
          <TextField
            label="Search Users"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          <List sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Card key={result.email} sx={{ mb: 2 }}>
                  <CardContent>
                    <ListItem button onClick={() => handleSearchSelect(result.email)}>
                      <Avatar>{result.email.charAt(0).toUpperCase()}</Avatar>
                      <ListItemText primary={result.email} />
                    </ListItem>
                  </CardContent>
                </Card>
              ))
            ) : (
              conversations.map((conversation) => {
                const recipient = conversation.participants.find(
                  (email) => email !== user.email
                );
                return (
                  <Card key={conversation.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <ListItem button onClick={() => handleConversationClick(recipient)}>
                        <Avatar>{recipient.charAt(0).toUpperCase()}</Avatar>
                        <ListItemText
                          primary={recipient}
                          secondary="Last message preview"
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </List>
        </Box>
        <Box flex={2} p={2} display="flex" flexDirection="column">
          <CssBaseline />
          {error && <Alert severity="error">{error}</Alert>}
          {currentRecipient && (
            <Card sx={{ mb: 2 }}>
              <CardHeader
                avatar={<Avatar>{currentRecipient.charAt(0).toUpperCase()}</Avatar>}
                title={`Chatting with: ${currentRecipient}`}
              />
            </Card>
          )}
          <List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.userId === user.id ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    bgcolor: message.userId === user.id ? "primary.main" : "grey.300",
                    color: message.userId === user.id ? "white" : "black",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "75%",
                    wordWrap: "break-word",
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    secondary={new Date(
                      message.timestamp.seconds * 1000
                    ).toLocaleString()}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            display="flex"
          >
            <TextField
              label="Type a message"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ mr: 2 }}
            />
            <IconButton
              type="submit"
              color="primary"
              aria-label="send message"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {content}
    </Container>
  );
};

export default ChatPage;
