import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus } from "lucide-react";
import { PostHackathonDialog } from "./PostHackathonDialog";
import { mockHackathons, currentUser } from "../data/mockData";

interface HackathonsPageProps {
  onPageChange?: (page: string) => void;
}

export function HackathonsPage({ onPageChange }: HackathonsPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hackathons, setHackathons] = useState(mockHackathons);

  // Falling emojis for hackathons (networking themed)
  const hackathonEmojis = ['💻', '🌐', '🔗', '📡', '🤝', '💡', '⚡', '🚀', '🎯', '🏆', '👥', '🔌', '📱', '💬', '🌟'];

  useEffect(() => {
    const emojiContainer = document.getElementById('emoji-container-hackathon');
    if (!emojiContainer) return;

    // Create continuous stream of emojis
    const createEmoji = () => {
      const emoji = document.createElement('div');
      emoji.className = 'falling-emoji';
      emoji.textContent = hackathonEmojis[Math.floor(Math.random() * hackathonEmojis.length)];
      emoji.style.left = `${Math.random() * 100}%`;
      emoji.style.animationDuration = `${Math.random() * 8 + 12}s`; // 12-20s duration
      emoji.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;
      
      // Add random horizontal drift
      emoji.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);
      
      emojiContainer.appendChild(emoji);

      // Remove emoji after animation completes
      setTimeout(() => {
        if (emoji.parentNode) {
          emoji.parentNode.removeChild(emoji);
        }
      }, 25000); // Remove after 25s to ensure cleanup
    };

    // Create initial batch immediately (no delay)
    for (let i = 0; i < 30; i++) {
      createEmoji();
    }

    // Continue creating emojis at intervals for continuous flow
    const intervalId = setInterval(createEmoji, 800); // New emoji every 0.8 seconds

    return () => {
      clearInterval(intervalId);
      if (emojiContainer) {
        emojiContainer.innerHTML = '';
      }
    };
  }, []);

  const handlePost = (data: {
    title: string;
    summary: string;
    actaCards: number;
    meetLink: string;
    date: string;
    time: string;
  }) => {
    const newHackathon = {
      id: hackathons.length + 1,
      ...data,
      postedBy: currentUser.name,
      postedDate: "Just now",
      status: "upcoming",
      participants: 0,
    };
    setHackathons([newHackathon, ...hackathons]);
  };

  const upcomingHackathons = hackathons.filter((h) => h.status === "upcoming");
  const pastHackathons = hackathons.filter((h) => h.status === "past");

  const HackathonCard = ({ hackathon }: { hackathon: any }) => (
    <Card className="p-6 professional-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl mb-2 text-foreground">{hackathon.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{hackathon.summary}</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-3 mb-4">
        <Badge className="professional-badge-prize text-base px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500">
          🎁 {hackathon.actaCards || 100} ACTA Cards
        </Badge>
        <Badge variant="secondary" className="professional-badge-participants">
          👥 {hackathon.participants} participants
        </Badge>
        {hackathon.date && (
          <Badge variant="outline" className="text-base px-4 py-1">
            📅 {hackathon.date}
          </Badge>
        )}
        {hackathon.time && (
          <Badge variant="outline" className="text-base px-4 py-1">
            🕒 {hackathon.time}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            className="professional-button-primary"
            onClick={() => onPageChange && onPageChange('hackathon-chat')}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
            </svg>
            Join Hackathon
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          by {hackathon.postedBy} • {hackathon.postedDate}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Falling Emojis Background */}
      <div id="emoji-container-hackathon" className="emoji-background"></div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-foreground">Hackathons</h1>
            <p className="text-muted-foreground">
              Join exciting hackathons, compete for prizes, and build amazing projects
            </p>
          </div>

          <Button
            className="professional-button-primary"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Post Hackathon
          </Button>
        </div>

        {/* Tabs for Upcoming/Past */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="professional-tabs">
            <TabsTrigger value="upcoming" className="professional-tab">
              🚀 Upcoming ({upcomingHackathons.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="professional-tab">
              📜 Past ({pastHackathons.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingHackathons.length === 0 ? (
              <Card className="p-12 bg-card text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl mb-2">No Upcoming Hackathons</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to create a hackathon event!
                </p>
                <Button className="professional-button-primary" onClick={() => setDialogOpen(true)}>
                  Create Hackathon
                </Button>
              </Card>
            ) : (
              upcomingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastHackathons.length === 0 ? (
              <Card className="p-12 bg-card text-center">
                <div className="text-4xl mb-4">📂</div>
                <h3 className="text-xl mb-2">No Past Hackathons</h3>
                <p className="text-muted-foreground">Past hackathons will appear here</p>
              </Card>
            ) : (
              pastHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Dialog */}
      <PostHackathonDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPost={handlePost}
      />
    </div>
  );
}