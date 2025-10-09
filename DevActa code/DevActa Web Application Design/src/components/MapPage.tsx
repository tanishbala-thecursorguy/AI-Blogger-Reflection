import React, { useState, useCallback, useRef, useEffect } from 'react';
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

interface MapStartupsProps {
  onPageChange?: (page: string) => void;
}

function MapStartups({ onPageChange }: MapStartupsProps) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStartupLocation, setNewStartupLocation] = useState<[number, number] | null>(null);
  const [showStartupPopup, setShowStartupPopup] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const mapRef = useRef<any>(null);

  // Add some sample startups for testing
  useEffect(() => {
    if (startups.length === 0) {
      setStartups([
        {
          id: '1',
          name: 'TechCorp Solutions',
          description: 'We are revolutionizing the tech industry with innovative AI-powered solutions that help businesses scale efficiently.',
          location: [17.6868, 83.2185] as [number, number],
          founder: 'John Smith',
          email: 'john@techcorp.com',
          website: 'https://techcorp.com',
          logo: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TC',
          industry: 'Technology',
          stage: 'growth' as const,
          employees: 45,
          founded: '2020',
          tags: ['AI', 'Machine Learning', 'SaaS'],
          isHiring: true
        },
        {
          id: '2',
          name: 'GreenTech Innovations',
          description: 'Building sustainable technology solutions for a greener future. We focus on renewable energy and eco-friendly products.',
          location: [17.7200, 83.3200] as [number, number],
          founder: 'Sarah Johnson',
          email: 'sarah@greentech.com',
          website: 'https://greentech.com',
          logo: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=GT',
          industry: 'Clean Energy',
          stage: 'mvp' as const,
          employees: 12,
          founded: '2022',
          tags: ['Sustainability', 'Renewable Energy', 'IoT'],
          isHiring: false
        }
      ]);
    }
  }, [startups.length]);

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

  const handleStartupSelect = useCallback((startup: any) => {
    setSelectedStartup(startup as Startup);
    setShowStartupPopup(true);
  }, []);

  // Posts Overlay Component
  const PostsOverlay = () => {
    console.log('PostsOverlay rendering, showPosts:', showPosts);
    if (!showPosts) {
      console.log('PostsOverlay not rendering because showPosts is false');
      return null;
    }
    console.log('PostsOverlay rendering the overlay');

    return (
      <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-[90vw] max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Startup Posts</h2>
            <button
              onClick={() => setShowPosts(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4">
            <div className="space-y-4">
              {/* Sample posts - you can replace with real data */}
              {startups.map((startup) => (
                <div key={startup.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    {startup.logo && (
                      <img 
                        src={startup.logo} 
                        alt={`${startup.name} logo`}
                        className="w-12 h-12 object-cover rounded-full border"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{startup.name}</h3>
                        <Badge className={`text-xs ${getStageColor(startup.stage)} text-white`}>
                          {startup.stage}
                        </Badge>
                        {startup.isHiring && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Hiring
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{startup.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>👥 {startup.employees} employees</span>
                        <span>📅 Founded {startup.founded}</span>
                        <span>🏢 {startup.industry}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${startup.email}`}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        {startup.website && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(startup.website, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Website
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {startups.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No startup posts yet</p>
                  <p className="text-sm">Add some startups to see their posts here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Startup Details Popup Component
  const StartupDetailsPopup = () => {
    if (!selectedStartup) return null;

    return (
      <Dialog open={showStartupPopup} onOpenChange={setShowStartupPopup}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[90vh] overflow-hidden !z-[99999] p-0">
          <div className="overflow-y-auto max-h-[90vh] px-6 py-4">
            <DialogHeader className="pb-4">
              <div className="flex items-center gap-4">
                {selectedStartup.logo && (
                  <img 
                    src={selectedStartup.logo} 
                    alt={`${selectedStartup.name} logo`}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                )}
                <div>
                  <DialogTitle className="text-3xl">{selectedStartup.name}</DialogTitle>
                  <DialogDescription className="text-lg">
                    {selectedStartup.industry} • Founded {selectedStartup.founded}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Company Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedStartup.employees} employees</p>
                        <p className="text-sm text-muted-foreground">Team size</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedStartup.industry}</p>
                        <p className="text-sm text-muted-foreground">Industry</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedStartup.founded}</p>
                        <p className="text-sm text-muted-foreground">Founded year</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedStartup.email}</p>
                        <p className="text-sm text-muted-foreground">Email address</p>
                      </div>
                    </div>
                    {selectedStartup.website && (
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <a href={selectedStartup.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                            Visit Website
                          </a>
                          <p className="text-sm text-muted-foreground">Company website</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedStartup.description}</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <Badge className={`text-sm px-4 py-2 ${getStageColor(selectedStartup.stage)} text-white`}>
                  {selectedStartup.stage.toUpperCase()} STAGE
                </Badge>
                {selectedStartup.isHiring && (
                  <Badge className="text-sm px-4 py-2 bg-green-500 text-white">
                    <Briefcase className="h-4 w-4 mr-2" />
                    WE'RE HIRING
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t mt-6">
              <Button variant="outline" onClick={() => setShowStartupPopup(false)}>
                Close
              </Button>
              <Button onClick={() => window.location.href = `mailto:${selectedStartup.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Startup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full bg-background overflow-hidden relative">
      {/* Full Screen Map */}
      <div className="h-[calc(100vh-80px)] w-full">
          <DynamicMapComponent 
            ref={mapRef}
          startups={startups as any} 
          onStartupSelect={handleStartupSelect}
            onMapClick={handleMapClick}
          />
          
        {/* Posts Button - Positioned to the right of default zoom controls */}
        <button
          onClick={() => {
            console.log('Posts button clicked, current showPosts:', showPosts);
            setShowPosts(true);
            console.log('Posts button clicked, setting showPosts to true');
          }}
          className="absolute top-4 left-20 z-[9999] bg-blue-500 hover:bg-blue-600 text-white border border-blue-600 rounded-lg p-3 shadow-lg transition-colors flex items-center gap-2 font-bold"
          title="View Posts"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span className="text-sm font-medium text-white">Posts</span>
        </button>

        {/* Location Button - Top Right */}
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

        {/* Add Startup Button - Bottom Right */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="absolute bottom-16 right-4 z-[9999] bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-colors"
          title="Add your startup"
        >
          <Plus className="w-6 h-6" />
        </button>
            </div>

      {/* Posts Overlay */}
      <PostsOverlay />
      
      {/* Debug overlay to test if showPosts is working */}
      {showPosts && (
        <div className="absolute top-10 left-10 bg-red-500 text-white p-4 rounded z-[99999]">
          Posts overlay should be visible! showPosts: {showPosts.toString()}
        </div>
      )}

        {/* Startup Creation Form */}
        <StartupCreationForm />
      
      {/* Startup Details Popup */}
      <StartupDetailsPopup />
    </div>
  );
}

interface MapPageProps {
  onPageChange?: (page: string) => void;
}

export function MapPage({ onPageChange }: MapPageProps) {
  return (
    <div className="h-[calc(100vh-80px)] w-full bg-background overflow-hidden">
      <MapStartups onPageChange={onPageChange} />
    </div>
  );
}
