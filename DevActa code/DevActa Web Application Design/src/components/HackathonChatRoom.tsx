import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Hash, Send, Users, BookOpen, Shield, ArrowLeft, Paperclip, Smile } from "lucide-react";
import { currentUser } from "../data/mockData";
import React from "react";

interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

interface Channel {
  id: string;
  name: string;
  icon: any;
  description: string;
}

interface HackathonChatRoomProps {
  onBack?: () => void;
}

export function HackathonChatRoom({ onBack }: HackathonChatRoomProps = {}) {
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/api/placeholder/32/32",
      content: "Hey everyone! Excited to be part of this hackathon! 🚀",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      user: "Mike Johnson",
      avatar: "/api/placeholder/32/32",
      content: "Same here! Anyone looking for a frontend developer?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      user: "Alex Rivera",
      avatar: "/api/placeholder/32/32",
      content: "I'm working on an AI project. Looking for collaborators!",
      timestamp: "10:35 AM",
    },
  ]);

  const channels: Channel[] = [
    {
      id: "general",
      name: "general-chat",
      icon: Hash,
      description: "Main discussion channel",
    },
    {
      id: "resources",
      name: "resources",
      icon: BookOpen,
      description: "Share helpful resources",
    },
    {
      id: "rules",
      name: "rules",
      icon: Shield,
      description: "Hackathon rules and guidelines",
    },
    {
      id: "team-formation",
      name: "team-formation",
      icon: Users,
      description: "Find teammates",
    },
  ];

  const channelMessages: { [key: string]: Message[] } = {
    general: messages,
    resources: [
      {
        id: 1,
        user: "Admin",
        avatar: "/api/placeholder/32/32",
        content: "📚 Useful APIs: https://github.com/public-apis/public-apis",
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        user: "Admin",
        avatar: "/api/placeholder/32/32",
        content: "🎨 Design Resources: https://www.figma.com/community",
        timestamp: "9:05 AM",
      },
    ],
    rules: [
      {
        id: 1,
        user: "Admin",
        avatar: "/api/placeholder/32/32",
        content: "📋 Hackathon Rules:\n1. Teams of 1-4 members\n2. 48-hour deadline\n3. Original code only\n4. Have fun! 🎉",
        timestamp: "8:00 AM",
      },
    ],
    "team-formation": [
      {
        id: 1,
        user: "Emma Davis",
        avatar: "/api/placeholder/32/32",
        content: "Looking for a backend developer! We're building a healthcare app 🏥",
        timestamp: "11:00 AM",
      },
    ],
  };

  const participants = [
    { name: "Sarah Chen", status: "online", avatar: "/api/placeholder/32/32" },
    { name: "Mike Johnson", status: "online", avatar: "/api/placeholder/32/32" },
    { name: "Alex Rivera", status: "away", avatar: "/api/placeholder/32/32" },
    { name: "Emma Davis", status: "online", avatar: "/api/placeholder/32/32" },
    { name: "John Smith", status: "offline", avatar: "/api/placeholder/32/32" },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: currentUser.name,
        avatar: currentUser.avatar,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const currentMessages = channelMessages[activeChannel] || messages;

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar - Channels */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="font-bold text-lg">AI Innovation</h2>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
            🎁 500 ACTA Cards
          </Badge>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <p className="text-xs text-muted-foreground uppercase px-2 mb-2">
              Channels
            </p>
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-md mb-1 transition-colors ${
                    activeChannel === channel.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{channel.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-14 border-b border-border px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">
              {channels.find((c) => c.id === activeChannel)?.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              {channels.find((c) => c.id === activeChannel)?.description}
            </span>
          </div>
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            {participants.length} online
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.isCurrentUser ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 ${
                    msg.isCurrentUser ? "flex flex-col items-end" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp}
                    </span>
                  </div>
                  <Card
                    className={`p-3 ${
                      msg.isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${channels.find((c) => c.id === activeChannel)?.name}`}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Participants */}
      <div className="w-64 bg-card border-l border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="h-4 w-4" />
            Participants ({participants.length})
          </h3>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-2">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer mb-1"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                      participant.status
                    )}`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {participant.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {participant.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

