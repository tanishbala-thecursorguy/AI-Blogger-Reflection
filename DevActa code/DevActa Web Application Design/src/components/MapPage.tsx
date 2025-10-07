import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { MapPin, Users, Calendar, ExternalLink, Plus, Mail, Building2, Upload, Briefcase } from 'lucide-react';

import DynamicMapComponent from './DynamicMapComponent';

interface Startup {
  id: string;
  name: string;
  description: string;
  location: [number, number];
  founder: string;
  email: string;
  website?: string;
  logo?: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'growth' | 'scale';
  employees: number;
  founded: string;
  tags: string[];
  isHiring: boolean;
}

function MapStartups() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStartupLocation, setNewStartupLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'idea':
        return 'bg-gray-500';
      case 'mvp':
        return 'bg-blue-500';
      case 'growth':
        return 'bg-green-500';
      case 'scale':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleMapClick = useCallback((location: [number, number]) => {
    setNewStartupLocation(location);
    setShowCreateForm(true);
  }, []);

  const handleCreateStartup = (startupData: Omit<Startup, 'id' | 'location'>) => {
    if (!newStartupLocation) return;
    
    const newStartup: Startup = {
      ...startupData,
      id: Date.now().toString(),
      location: newStartupLocation,
    };
    
    setStartups(prev => [...prev, newStartup]);
    setShowCreateForm(false);
    setNewStartupLocation(null);
  };

  // Startup Creation Form Component
  const StartupCreationForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      founder: '',
      email: '',
      website: '',
      logo: '',
      industry: '',
      stage: 'idea' as const,
      employees: 1,
      founded: new Date().getFullYear().toString(),
      tags: [] as string[],
      isHiring: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateStartup(formData);
      // Reset form
      setFormData({
        name: '',
        description: '',
        founder: '',
        email: '',
        website: '',
        logo: '',
        industry: '',
        stage: 'idea',
        employees: 1,
        founded: new Date().getFullYear().toString(),
        tags: [],
        isHiring: false,
      });
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, logo: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden !z-[99999] p-0">
          <div className="overflow-y-auto max-h-[90vh] px-6 py-4">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-2xl">Add Your Startup</DialogTitle>
              <DialogDescription>
                Fill in the details to add your startup to the map.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pb-4">
            {/* Logo Upload Section */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-muted/50">
              {formData.logo ? (
                <div className="relative">
                  <img src={formData.logo} alt="Logo preview" className="w-32 h-32 object-contain rounded-lg" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <label className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:underline">Upload Startup Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Startup Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter startup name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@startup.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your startup"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Founder</label>
                <Input
                  value={formData.founder}
                  onChange={(e) => setFormData(prev => ({ ...prev, founder: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., SaaS, HealthTech, FinTech"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Stage</label>
                <Select value={formData.stage} onValueChange={(value: any) => setFormData(prev => ({ ...prev, stage: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Employees</label>
                <Input
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData(prev => ({ ...prev, employees: parseInt(e.target.value) || 1 }))}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Founded Year</label>
                <Input
                  value={formData.founded}
                  onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
                  placeholder="2024"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Website (optional)</label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourstartup.com"
                type="url"
              />
            </div>

            {/* Hiring Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">We're Hiring!</p>
                  <p className="text-xs text-muted-foreground">Show hiring badge on the map</p>
                </div>
              </div>
              <Button
                type="button"
                variant={formData.isHiring ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, isHiring: !prev.isHiring }))}
              >
                {formData.isHiring ? "Hiring ✓" : "Not Hiring"}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-background py-4 -mx-6 px-6 border-t mt-6">
              <Button type="submit" className="flex-1" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Startup
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)} className="flex-1 sm:flex-none" size="lg">
                Cancel
              </Button>
            </div>
          </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <div className="h-screen w-full flex">
        {/* Map */}
        <div className="flex-1 h-screen relative z-0">
          <DynamicMapComponent 
            ref={mapRef}
            startups={startups} 
            onStartupSelect={setSelectedStartup}
            onMapClick={handleMapClick}
          />
          
          {/* Location button - outside map container */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (mapRef.current) {
                mapRef.current.centerOnUserLocation();
              }
            }}
            className="absolute top-4 right-4 z-[9999] bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-lg transition-colors"
            title="Center on my location"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 h-screen bg-card border-l border-border p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Startup Ecosystem</h2>
              <p className="text-sm text-muted-foreground">
                Click anywhere on the map to add your startup!
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setStartups(startups)}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setStartups(startups.filter(s => s.stage === 'idea'))}
              >
                Idea
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setStartups(startups.filter(s => s.stage === 'mvp'))}
              >
                MVP
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setStartups(startups.filter(s => s.stage === 'growth'))}
              >
                Growth
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setStartups(startups.filter(s => s.stage === 'scale'))}
              >
                Scale
              </Button>
            </div>

            {/* Startups list */}
            <div className="space-y-3">
              {startups.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No startups yet</p>
                  <p className="text-xs">Click on the map to add your first startup!</p>
                </div>
              ) : (
                startups.map((startup) => (
                  <Card
                    key={startup.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedStartup?.id === startup.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedStartup(startup)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        {startup.logo && (
                          <img 
                            src={startup.logo} 
                            alt={`${startup.name} logo`}
                            className="w-12 h-12 object-contain rounded border"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm font-semibold line-clamp-2">
                              {startup.name}
                            </CardTitle>
                            <div className="flex flex-col gap-1">
                              <Badge className={`text-xs ${getStageColor(startup.stage)}`}>
                                {startup.stage}
                              </Badge>
                              {startup.isHiring && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  <Briefcase className="h-3 w-3 mr-1" />
                                  Hiring
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{startup.founder}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{startup.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Founded {startup.founded}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{startup.employees} employees</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {startup.description}
                        </p>
                        <div className="flex gap-2 pt-2">
                          {startup.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(startup.website, '_blank');
                              }}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Website
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${startup.email}`;
                            }}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Startup Creation Form */}
        <StartupCreationForm />
      </div>
    </div>
  );
}

export function MapPage() {
  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <MapStartups />
    </div>
  );
}
