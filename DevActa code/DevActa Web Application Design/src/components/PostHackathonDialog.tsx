import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Calendar, Clock, Gift } from "lucide-react";

interface PostHackathonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPost: (data: {
    title: string;
    summary: string;
    actaCards: number;
    meetLink: string;
    date: string;
    time: string;
  }) => void;
}

export function PostHackathonDialog({ open, onOpenChange, onPost }: PostHackathonDialogProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [actaCards, setActaCards] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && summary && actaCards && meetLink && date && time) {
      onPost({
        title,
        summary,
        actaCards: parseInt(actaCards),
        meetLink,
        date,
        time,
      });
      // Reset form
      setTitle("");
      setSummary("");
      setActaCards("");
      setMeetLink("");
      setDate("");
      setTime("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Post Hackathon</DialogTitle>
          <DialogDescription>
            Create a new hackathon event and invite developers to participate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Hackathon Title</Label>
            <Input
              id="title"
              placeholder="e.g., AI Innovation Challenge 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="professional-input"
            />
          </div>

          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Describe your hackathon, goals, themes, and what participants will build..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              required
              className="professional-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="professional-input"
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="professional-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="actaCards" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Prize Gift (No. of ACTA Cards)
            </Label>
            <Input
              id="actaCards"
              type="number"
              placeholder="100"
              value={actaCards}
              onChange={(e) => setActaCards(e.target.value)}
              required
              className="professional-input"
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="meetLink" className="flex items-center gap-2">
              <span>Google Meet Link</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
              </svg>
            </Label>
            <Input
              id="meetLink"
              type="url"
              placeholder="https://meet.google.com/..."
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              required
              className="professional-input"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="professional-button-secondary"
            >
              Cancel
            </Button>
            <Button type="submit" className="professional-button-primary">
              Post Hackathon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
