// src/components/ContentAnalyzer.tsx
import React, { useState } from 'react';
interface AnalysisResult {
  url: string;
  topics: string[];
  keywords: { word: string; count: number }[];
  wordCount: number;
  score: {
    overall: number;
    structure: number;
    content: number;
    seo: number;
  };
  structure: {
    headings: { level: string; count: number }[];
    paragraphs: number;
    images: number;
    links: number;
  };
  gaps: string[];
  opportunities: string[];
  metadata?: {
    title?: string;
    description?: string;
    language?: string;
  };
}

const ContentAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);

    try {
      // Call our Python backend
      const response = await fetch(`http://localhost:5000/api/analyze?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="analyzer-container">
      <h1>Blog Content Analyzer</h1>
      <p className="subtitle">Paste your blog URL to analyze content, keywords, and get improvement suggestions</p>
      
      <div className="input-section">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your blog URL (e.g., https://yourblog.com/article)"
          className="url-input"
        />
        <button 
          onClick={handleAnalyze}
          disabled={isLoading}
          className="analyze-btn"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Blog'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Analyzing your blog content...</p>
        </div>
      )}

      {analysis && (
        <div className="results-section">
          {/* Overview Section */}
          <div className="section overview-section">
            <h2>📊 Blog Overview</h2>
            <div className="overview-grid">
              <div className="overview-item">
                <span className="label">Blog URL:</span>
                <span className="value">{analysis.url}</span>
              </div>
              <div className="overview-item">
                <span className="label">Total Words:</span>
                <span className="value">{analysis.wordCount.toLocaleString()}</span>
              </div>
              {analysis.metadata?.title && (
                <div className="overview-item">
                  <span className="label">Page Title:</span>
                  <span className="value">{analysis.metadata.title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Score Cards */}
          <div className="section scores-section">
            <h2>🏆 Content Scores</h2>
            <div className="scores-grid">
              <div className="score-card overall">
                <h3>Overall Score</h3>
                <div className="score-circle">
                  <span>{analysis.score.overall}/100</span>
                </div>
              </div>
              <div className="score-card">
                <h3>Structure</h3>
                <div className="score-circle">
                  <span>{analysis.score.structure}/100</span>
                </div>
              </div>
              <div className="score-card">
                <h3>Content</h3>
                <div className="score-circle">
                  <span>{analysis.score.content}/100</span>
                </div>
              </div>
              <div className="score-card">
                <h3>SEO</h3>
                <div className="score-circle">
                  <span>{analysis.score.seo}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Topics & Keywords */}
          <div className="section topics-section">
            <div className="two-column">
              <div className="column">
                <h3>🎯 Detected Topics</h3>
                <div className="topics-list">
                  {analysis.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
              <div className="column">
                <h3>🔑 Top Keywords</h3>
                <div className="keywords-list">
                  {analysis.keywords.slice(0, 10).map((keyword, index) => (
                    <div key={index} className="keyword-item">
                      <span className="keyword">{keyword.word}</span>
                      <span className="count">{keyword.count} times</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Structure Analysis */}
          <div className="section structure-section">
            <h3>🏗️ Content Structure</h3>
            <div className="structure-grid">
              {analysis.structure.headings.map((heading, index) => (
                <div key={index} className="structure-item">
                  <span className="label">{heading.level} Headings:</span>
                  <span className="value">{heading.count}</span>
                </div>
              ))}
              <div className="structure-item">
                <span className="label">Paragraphs:</span>
                <span className="value">{analysis.structure.paragraphs}</span>
              </div>
              <div className="structure-item">
                <span className="label">Images:</span>
                <span className="value">{analysis.structure.images}</span>
              </div>
              <div className="structure-item">
                <span className="label">Links:</span>
                <span className="value">{analysis.structure.links}</span>
              </div>
            </div>
          </div>

          {/* Gaps & Opportunities */}
          <div className="section recommendations-section">
            <div className="two-column">
              <div className="column">
                <h3 className="gap-title">⚠️ Content Gaps</h3>
                <ul className="gap-list">
                  {analysis.gaps.map((gap, index) => (
                    <li key={index}>{gap}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <h3 className="opportunity-title">💡 Opportunities</h3>
                <ul className="opportunity-list">
                  {analysis.opportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentAnalyzer;