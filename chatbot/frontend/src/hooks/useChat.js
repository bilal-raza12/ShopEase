import { useState, useCallback } from 'react';
import { sendMessage as sendChatMessage, getThread, getThreads } from '../services/chatApi';

export const useChat = (userId) => {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || !userId) return;

    setIsLoading(true);
    setError(null);

    // Add user message immediately for better UX
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendChatMessage(content, userId, threadId);

      // Update thread ID if new thread was created
      if (!threadId && response.thread_id) {
        setThreadId(response.thread_id);
      }

      // Add assistant message
      const assistantMessage = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant',
        content: response.message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      return response;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send message');
      // Remove the optimistic user message on error
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId, threadId]);

  const loadThread = useCallback(async (id) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const thread = await getThread(id, userId);
      setThreadId(thread.id);
      setMessages(thread.messages || []);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load thread');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const startNewThread = useCallback(() => {
    setThreadId(null);
    setMessages([]);
    setError(null);
  }, []);

  const loadThreads = useCallback(async () => {
    if (!userId) return [];

    try {
      return await getThreads(userId);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load threads');
      return [];
    }
  }, [userId]);

  return {
    messages,
    threadId,
    isLoading,
    error,
    sendMessage,
    loadThread,
    startNewThread,
    loadThreads,
  };
};

export default useChat;
