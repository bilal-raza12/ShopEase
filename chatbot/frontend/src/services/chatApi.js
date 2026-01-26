import axios from 'axios';

const CHATBOT_API_URL = process.env.REACT_APP_CHATBOT_API_URL || 'http://localhost:8000/api';

const chatApi = axios.create({
  baseURL: CHATBOT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message, userId, threadId = null) => {
  const response = await chatApi.post('/chat/', {
    message,
    user_id: userId,
    thread_id: threadId,
  });
  return response.data;
};

export const getThreads = async (userId) => {
  const response = await chatApi.get('/chat/threads', {
    params: { user_id: userId },
  });
  return response.data;
};

export const getThread = async (threadId, userId) => {
  const response = await chatApi.get(`/chat/threads/${threadId}`, {
    params: { user_id: userId },
  });
  return response.data;
};

export const deleteThread = async (threadId, userId) => {
  const response = await chatApi.delete(`/chat/threads/${threadId}`, {
    params: { user_id: userId },
  });
  return response.data;
};

export default chatApi;
