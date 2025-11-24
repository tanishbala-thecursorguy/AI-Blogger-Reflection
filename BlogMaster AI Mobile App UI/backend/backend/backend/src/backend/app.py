# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from collections import Counter
import re
import nltk
from nltk.corpus import stopwords
import string
import os

# Download NLTK stopwords (run once)
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

class ContentAnalyzer:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        
    def fetch_url_content(self, url):
        """Fetch HTML content from URL"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to fetch URL: {str(e)}")
    
    def extract_text_content(self, html):
        """Extract clean text content from HTML"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "nav", "footer", "header"]):
            script.decompose()
            
        # Get text from main content areas
        text = soup.get_text()
        
        # Clean up text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text
    
    def extract_structure(self, html):
        """Extract website structure"""
        soup = BeautifulSoup(html, 'html.parser')
        
        structure = {
            'headings': {
                'h1': len(soup.find_all('h1')),
                'h2': len(soup.find_all('h2')),
                'h3': len(soup.find_all('h3')),
                'h4': len(soup.find_all('h4')),
                'h5': len(soup.find_all('h5')),
                'h6': len(soup.find_all('h6'))
            },
            'paragraphs': len(soup.find_all('p')),
            'images': len(soup.find_all('img')),
            'links': len(soup.find_all('a'))
        }
        
        return structure
    
    def extract_metadata(self, html):
        """Extract meta information"""
        soup = BeautifulSoup(html, 'html.parser')
        
        metadata = {
            'title': soup.find('title').get_text() if soup.find('title') else '',
            'description': '',
            'language': soup.get('lang', 'en')
        }
        
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            metadata['description'] = meta_desc.get('content', '')
            
        return metadata
    
    def analyze_keywords(self, text):
        """Analyze keywords and their frequency"""
        # Clean and tokenize text
        text = text.lower()
        text = text.translate(str.maketrans('', '', string.punctuation))
        words = text.split()
        
        # Filter out stop words and short words
        filtered_words = [
            word for word in words 
            if word not in self.stop_words and len(word) > 3
        ]
        
        # Count word frequency
        word_freq = Counter(filtered_words)
        
        # Get top 15 keywords
        top_keywords = [
            {'word': word, 'count': count} 
            for word, count in word_freq.most_common(15)
        ]
        
        return {
            'wordCount': len(words),
            'keywords': top_keywords
        }
    
    def identify_topics(self, keywords, text):
        """Identify main topics based on content"""
        topics = []
        text_lower = text.lower()
        
        # Topic patterns
        topic_patterns = {
            'Technology': ['software', 'code', 'programming', 'development', 'tech', 'computer', 'digital', 'app', 'web', 'data'],
            'Business': ['business', 'company', 'enterprise', 'corporate', 'startup', 'venture', 'market', 'industry', 'sales'],
            'Marketing': ['marketing', 'seo', 'social', 'media', 'content', 'brand', 'advertising', 'campaign', 'audience'],
            'Design': ['design', 'ui', 'ux', 'interface', 'user', 'experience', 'creative', 'visual', 'layout'],
            'Education': ['learn', 'education', 'course', 'tutorial', 'study', 'training', 'knowledge', 'teaching'],
            'Health': ['health', 'fitness', 'wellness', 'medical', 'exercise', 'nutrition', 'diet', 'care'],
            'Travel': ['travel', 'destination', 'tour', 'vacation', 'hotel', 'flight', 'adventure'],
            'Finance': ['money', 'finance', 'investment', 'bank', 'financial', 'budget', 'saving', 'cash']
        }
        
        for topic, keywords_list in topic_patterns.items():
            if any(keyword in text_lower for keyword in keywords_list):
                topics.append(topic)
        
        return topics if topics else ['General']
    
    def calculate_scores(self, structure, word_count, keywords):
        """Calculate content scores"""
        structure_score = 0
        content_score = 0
        seo_score = 0
        
        # Structure scoring
        if structure['headings']['h1'] > 0:
            structure_score += 25
        if structure['paragraphs'] >= 5:
            structure_score += 25
        if structure['images'] > 0:
            structure_score += 25
        if structure['links'] >= 3:
            structure_score += 25
        
        # Content scoring
        if word_count >= 500:
            content_score += 40
        elif word_count >= 200:
            content_score += 25
        if len(keywords) >= 5:
            content_score += 30
        content_score = min(content_score + (word_count // 50), 100)
        
        # SEO scoring
        if structure['headings']['h1'] > 0:
            seo_score += 20
        if structure['images'] > 0:
            seo_score += 20
        if word_count >= 300:
            seo_score += 20
        if structure['links'] >= 5:
            seo_score += 20
        seo_score = min(seo_score + (len(keywords) * 2), 100)
        
        overall = (structure_score + content_score + seo_score) // 3
        
        return {
            'overall': overall,
            'structure': structure_score,
            'content': content_score,
            'seo': seo_score
        }
    
    def identify_gaps_opportunities(self, structure, word_count, metadata):
        """Identify content gaps and opportunities"""
        gaps = []
        opportunities = []
        
        # Identify gaps
        if structure['headings']['h1'] == 0:
            gaps.append('Missing H1 heading - crucial for SEO')
        if structure['images'] == 0:
            gaps.append('No images detected - visuals improve engagement')
        if word_count < 300:
            gaps.append(f'Content is short ({word_count} words) - aim for 300+ words')
        if not metadata['description']:
            gaps.append('Missing meta description - important for SEO')
        if structure['links'] < 3:
            gaps.append('Few internal/external links - linking improves SEO')
        
        # Identify opportunities
        opportunities.append('Add meta description for better SEO')
        if word_count < 1000:
            opportunities.append('Expand content with more detailed information')
        if structure['images'] < 3:
            opportunities.append('Add more relevant images to break up text')
        opportunities.append('Use more subheadings (H2, H3) to improve structure')
        opportunities.append('Include internal links to related content')
        opportunities.append('Add call-to-action to engage readers')
        
        return gaps, opportunities
    
    def analyze(self, url):
        """Main analysis function"""
        # Fetch and parse content
        html = self.fetch_url_content(url)
        text_content = self.extract_text_content(html)
        structure = self.extract_structure(html)
        metadata = self.extract_metadata(html)
        
        # Analyze content
        content_analysis = self.analyze_keywords(text_content)
        topics = self.identify_topics(content_analysis['keywords'], text_content)
        scores = self.calculate_scores(structure, content_analysis['wordCount'], content_analysis['keywords'])
        gaps, opportunities = self.identify_gaps_opportunities(structure, content_analysis['wordCount'], metadata)
        
        # Prepare headings list
        headings_list = []
        for level, count in structure['headings'].items():
            if count > 0:
                headings_list.append({'level': level.upper(), 'count': count})
        
        return {
            'url': url,
            'topics': topics,
            'keywords': content_analysis['keywords'],
            'wordCount': content_analysis['wordCount'],
            'score': scores,
            'structure': {
                'headings': headings_list,
                'paragraphs': structure['paragraphs'],
                'images': structure['images'],
                'links': structure['links']
            },
            'gaps': gaps,
            'opportunities': opportunities,
            'metadata': metadata
        }

analyzer = ContentAnalyzer()

@app.route('/api/analyze', methods=['GET'])
def analyze_url():
    """API endpoint to analyze URL"""
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'URL parameter is required'}), 400
    
    try:
        # Ensure URL has protocol
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
            
        result = analyzer.analyze(url)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def serve_frontend():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)