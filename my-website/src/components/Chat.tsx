import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Document {
  name: string;
  path: string;
  size: number;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AI assistant. Select a document from the dropdown above to get started!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>("");
  const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [isDocumentDropdownOpen, setIsDocumentDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load available documents when component mounts or chat opens
  useEffect(() => {
    if (isOpen && availableDocuments.length === 0) {
      fetchAvailableDocuments();
    }
  }, [isOpen]);

  const fetchAvailableDocuments = async () => {
    setIsLoadingDocuments(true);
    try {
      const response = await fetch("http://localhost:8000/documents");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setAvailableDocuments(data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "Failed to load available documents. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!dataSource) {
      toast({
        title: "No document selected",
        description: "Please upload a document first to chat about it.",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_input: input,
          data_source: dataSource,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from bot");
      }

      const data = await response.json();

      // Set session ID if this is the first message
      if (!sessionId) {
        setSessionId(data.session_id);
      }

      // Add bot message to chat
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.response.answer || "I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      toast({
        title: "Response received",
        description: `Tokens used: ${data.response.total_tokens_used}`,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          "Failed to get response from bot. Make sure the backend is running.",
        variant: "destructive",
      });

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        content:
          "Sorry, I encountered an error. Please try again or check that the backend is running at http://localhost:8000",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content:
          "Hi! I'm your AI assistant. Select a document from the dropdown above to get started!",
        timestamp: new Date(),
      },
    ]);
    setSessionId(null);
    setDataSource("");
    setInput("");
  };

  const handleSelectDocument = (doc: Document) => {
    setDataSource(doc.name);
    setIsDocumentDropdownOpen(false);
    setSessionId(null); // Reset session for new document
    handleClearChat();
    toast({
      title: "Document selected",
      description: `Now chatting about: ${doc.name}`,
    });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl md:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {dataSource
                    ? `Chatting about: ${dataSource}`
                    : "Select a document to start"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-muted ml-2"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-100" />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-200" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card p-3 space-y-2">
              {/* Document Selector */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDocumentDropdownOpen(!isDocumentDropdownOpen)}
                  disabled={isLoadingDocuments}
                  className="w-full flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:border-primary disabled:opacity-50"
                >
                  <span className="truncate">
                    {dataSource ? `📄 ${dataSource}` : "Select a document..."}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDocumentDropdownOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isDocumentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-border bg-background shadow-lg max-h-48 overflow-y-auto"
                    >
                      {isLoadingDocuments ? (
                        <div className="px-3 py-2 text-xs text-muted-foreground">Loading documents...</div>
                      ) : availableDocuments.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-muted-foreground">No documents available</div>
                      ) : (
                        availableDocuments.map((doc) => (
                          <motion.button
                            key={doc.path}
                            whileHover={{ backgroundColor: "var(--muted)" }}
                            onClick={() => handleSelectDocument(doc)}
                            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors border-b border-border last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">📄 {doc.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {(doc.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          </motion.button>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading || !dataSource}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !input.trim() || !dataSource}
                  className="rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>

              {messages.length > 1 && (
                <button
                  onClick={handleClearChat}
                  className="w-full rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1"
                >
                  Clear chat
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
