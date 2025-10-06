import { useState, useEffect } from 'react';
import { ArrowLeft, Home, FileText, Video, Map, ExternalLink, Download, Clock, User, Tag, Search, Filter, Grid, List, Eye, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { getPublishedContent } from '@/lib/admin';
import { ContentItem } from '@/types/admin';
import { roadmapData } from '@/data/roadmaps';
import { getMockYouTubeVideos, fetchYouTubeVideos, setupAutoRefresh, formatDuration, formatViewCount, formatPublishDate, type YouTubeVideo } from '@/lib/youtube';

const ContentPage = () => {
  const [pdfs, setPdfs] = useState<ContentItem[]>([]);
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [roadmaps, setRoadmaps] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pdfs' | 'videos' | 'roadmaps'>('pdfs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load PDFs and Videos from database (if backend is working)
        // For now, add static PDF resources including user-provided PDFs
        const pdfContent: ContentItem[] = [
            {
                id: 'pdf-user-1',
                title: 'Premium Blockchain Notes',
                content: 'Comprehensive blockchain technology notes covering fundamentals, cryptography, smart contracts, DeFi, NFTs, and advanced blockchain concepts with practical examples.',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts', 'DeFi', 'Web3'],
                featured: true,
                created_at: '2025-09-01T00:00:00Z',
                updated_at: '2025-09-01T00:00:00Z',
                external_url: '/Premium-Blockchain-Notes.pdf',
                difficulty: 'intermediate'
            },
            {
                id: 'pdf-user-2',
                title: 'Programming Video Notes Collection',
                content: 'Curated collection of programming video notes covering various programming languages, frameworks, and development concepts from popular video tutorials.',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Programming', 'Video Notes', 'Tutorials', 'Learning Materials'],
                featured: true,
                created_at: '2025-09-01T00:00:00Z',
                updated_at: '2025-09-01T00:00:00Z',
                external_url: '/Programming-Video-Notes.pdf',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-40',
                title: 'Java Notes for Professionals',
                content: 'Curated collection of programming video notes covering various programming languages, frameworks, and development concepts from popular video tutorials.',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Programming', 'Video Notes', 'Tutorials', 'Learning Materials'],
                featured: true,
                created_at: '2025-09-01T00:00:00Z',
                updated_at: '2025-09-01T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/40',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-39',
                title: 'C Sharp Notes for Professionals',
                content: 'C Sharp Notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['C#', 'Notes'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/39',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-38',
                title: 'Python Notes for Professionals',
                content: 'Python notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Python', 'Notes'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/38',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-37',
                title: 'Data Structures and Algorithms with JavaScript',
                content: 'DSA with JS',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['DSA', 'JavaScript'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/37',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-36',
                title: 'Data Structures and Algorithms in Python',
                content: 'DSA with Python',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['DAS', 'Python'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/36',
                    difficulty: 'intermediate'
            },
            {
                id: 'lenotes-35',
                title: 'JavaScript Notes for Professionals',
                content: 'JavaScript Notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['JavaScript'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/35',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-34',
                title: 'C Notes for Professionals',
                content: 'C Notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['C', 'Low level'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/34',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-33',
                title: 'ZTM - DATA STRUCTURES & ALGORITHMS CHEAT SHEET',
                content: 'DSA CheatSheet',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['DSA', 'CheatSheet'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/33',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-32',
                title: 'BLOCKCHAIN TECHNOLOGY AND APPLICATIONS',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: [''],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/32',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-31',
                title: 'Solidity Documentation',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: [''],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/31',
                    difficulty: 'intermediate'
            },
            {
                id: 'lenotes-30',
                title: 'Mathematics for Machine Learning',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['ML', 'Math'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/30',
                    difficulty: 'intermediate'
            },
            {
                id: 'lenotes-29',
                title: 'What is an API',
                content: 'Walkthroug about APIs',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['API'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/29',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-28',
                title: 'DSA in Java',
                content: 'DSA with Java',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['DSA', 'Java'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/28',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-27',
                title: 'Introduction to Computer Networking',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['networking'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/27',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-26',
                title: 'Operating System BCA-II Year',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['OS'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/26',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-25',
                title: 'Python Cheat Sheet',
                content: 'CheatSheet',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Python', 'CheatSheet'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/25',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-24',
                title: 'Advanced Java',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Java'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/24',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-23',
                title: 'React JS Notes for Professionals',
                content: 'React JS notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['JS', 'React'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/23',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-22',
                title: 'HTML & CSS Crash Course',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['HTML', 'CSS'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/22',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-21',
                title: 'Machine Learning',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['ML'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/21',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-20',
                title: 'C++ Notes for Professionals',
                content: 'C++ notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['C++'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/20',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-19',
                title: 'Java - TutorialPoint',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Java'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/19',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-18',
                title: 'Python-OOP',
                content: 'OOP with Python',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['OOP', 'Python'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/18',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-17',
                title: 'XML Hand Book',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['XML'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/17',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-16',
                title: 'XML Basics',
                content: '',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['XML'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/16',
                difficulty: 'beginner'
            },
            {
                id: 'lenotes-15',
                title: 'NodeJS Notes for Professionals',
                content: 'Node JS notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['JS', 'Node'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/15',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-14',
                title: 'JavaScript Notes for Professionals',
                content: 'JavaScript notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['JavaScript'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/14',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-13',
                title: 'Java Notes for Professionals',
                content: 'Java notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Java'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/13',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-12',
                title: 'Python Notes for Professionals',
                content: 'Python notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Python'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/12',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-11',
                title: 'PHP Notes for Professionals',
                content: 'PHP notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['PHP'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/11',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-10',
                title: 'CSS Notes for Professionals',
                content: 'CSS notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['CSS'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/10',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-9',
                title: 'Git Notes for Professionals',
                content: 'Git notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Git'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/9',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-8',
                title: 'C Notes for Professionals',
                content: 'C notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['C'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/8',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-7',
                title: 'MySQL Notes for Professionals',
                content: 'MySQL notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['SQL', 'MySQL', 'Database'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/7',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-6',
                title: 'HTML 5 Notes for Professionals',
                content: 'HTML 5 notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['HTML'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/6',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-5',
                title: 'Dot NET Framework Notes for Professionals',
                content: '.NET notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['.NET'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/5',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-4',
                title: 'Linux Notes for Professionals',
                content: 'Linux notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Linux'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/4',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-3',
                title: 'Mongo DB Notes for Professionals',
                content: 'Mongo DB notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Mongo', 'Database'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/3',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-2',
                title: 'SQL Notes for professionals',
                content: 'SQL notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['SQL', 'Database'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/2',
                difficulty: 'intermediate'
            },
            {
                id: 'lenotes-1',
                title: 'BCA Mathematics',
                content: 'Math notes',
                type: 'pdf' as const,
                status: 'published' as const,
                author_id: 'dna-team',
                author_email: 'team@dnaforge.com',
                tags: ['Math'],
                featured: false,
                created_at: '2025-10-06T00:00:00Z',
                updated_at: '2025-10-06T00:00:00Z',
                external_url: 'https://LeNotes.artizote.com/notes/1',
                difficulty: 'intermediate'
            }
        ];
        const videoContent: ContentItem[] = [];
        
        // Load YouTube videos
        const ytVideos = await fetchYouTubeVideos();
        setYoutubeVideos(ytVideos);
        
        // Load roadmaps from static data
        const staticRoadmaps: ContentItem[] = [];
        
        // Convert roadmap data to ContentItem format
        Object.entries(roadmapData).forEach(([category, roadmaps]) => {
          roadmaps.forEach((roadmap, index) => {
            staticRoadmaps.push({
              id: `roadmap-${category}-${index}`,
              title: roadmap.title,
              content: roadmap.description,
              type: 'roadmap' as const,
              status: 'published' as const,
              author_id: 'roadmap-sh',
              author_email: 'team@roadmap.sh',
              tags: roadmap.tags || [],
              featured: roadmap.featured || false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              external_url: roadmap.url,
              difficulty: roadmap.difficulty
            });
          });
        });
        
        setPdfs(pdfContent);
        setVideos(videoContent);
        setRoadmaps(staticRoadmaps);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Setup auto-refresh for YouTube videos
    const cleanup = setupAutoRefresh((newVideos) => {
      setYoutubeVideos(newVideos);
    }, 60); // Check every 60 minutes

    return cleanup;
  }, []);

  // Filter content based on search and difficulty
  const filterContent = (items: ContentItem[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesDifficulty;
    });
  };

  // Filter YouTube videos
  const filterYouTubeVideos = (videos: YouTubeVideo[]) => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'pdfs': return filterContent(pdfs);
      case 'videos': return filterYouTubeVideos(youtubeVideos);
      case 'roadmaps': return filterContent(roadmaps);
      default: return [];
    }
  };

  const ContentCard = ({ item, type }: { item: ContentItem; type: 'pdf' | 'video' | 'roadmap' }) => {
    const getIcon = () => {
      switch (type) {
        case 'pdf': return <FileText className="h-6 w-6" />;
        case 'video': return <Video className="h-6 w-6" />;
        case 'roadmap': return <Map className="h-6 w-6" />;
      }
    };

    const getColorClass = () => {
      switch (type) {
        case 'pdf': return 'border-red-400/30 hover:border-red-400 text-red-400';
        case 'video': return 'border-blue-400/30 hover:border-blue-400 text-blue-400';
        case 'roadmap': return 'border-green-400/30 hover:border-green-400 text-green-400';
      }
    };

    return (
      <div className={`glass-card p-6 rounded-xl border ${getColorClass()} hover:scale-105 transition-all duration-300 group`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getIcon()}
            <h3 className="text-lg font-bold text-white group-hover:text-current transition-colors">
              {item.title}
            </h3>
          </div>
          {item.featured && (
            <div className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
              <span className="text-xs font-semibold text-yellow-400">Featured</span>
            </div>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
          {item.content}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-800/50 rounded-full">
                <Tag className="h-3 w-3" />
                <span className="text-xs text-gray-300">{tag}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
          {item.author_email && (
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>{item.author_email.split('@')[0]}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {type === 'roadmap' ? (
            <Button
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              asChild
            >
              <Link to={`/roadmap/${item.id}`}>
                <Map className="h-4 w-4 mr-2" />
                View Roadmap
              </Link>
            </Button>
          ) : item.external_url ? (
            <Button
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              asChild
            >
              <a href={item.external_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open {type === 'pdf' ? 'PDF' : 'Video'}
              </a>
            </Button>
          ) : null}
          {type === 'pdf' && item.external_url && (
            <Button
              variant="outline"
              className="border-current hover:bg-current hover:text-black"
              asChild
            >
              <a href={item.external_url} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    );
  };

  const YouTubeVideoCard = ({ video }: { video: YouTubeVideo }) => {
    const [imgSrc, setImgSrc] = useState(video.thumbnail);
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
      // Progressive fallback for YouTube thumbnails
      const fallbacks = [
        `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
        `https://i.ytimg.com/vi/${video.id}/default.jpg`,
        `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${video.id}/default.jpg`
      ];

      const currentIndex = fallbacks.indexOf(imgSrc);
      if (currentIndex < fallbacks.length - 1) {
        setImgSrc(fallbacks[currentIndex + 1]);
      } else {
        setImgError(true);
      }
    };

    return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        {!imgError ? (
          <img 
            src={imgSrc} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <Video className="h-12 w-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Thumbnail unavailable</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-3">
            <Play className="h-6 w-6 text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {video.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{formatViewCount(video.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatPublishDate(video.publishedAt)}</span>
            </div>
          </div>
          <div className="text-red-400 font-semibold text-xs">DNA Official Tech</div>
        </div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
          asChild
        >
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <Play className="h-4 w-4 mr-2" />
            Watch on YouTube
          </a>
        </Button>
      </div>
    </div>
  );
}

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
        {type === 'pdfs' && <FileText className="h-10 w-10 text-gray-400" />}
        {type === 'videos' && <Video className="h-10 w-10 text-gray-400" />}
        {type === 'roadmaps' && <Map className="h-10 w-10 text-gray-400" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-400 mb-2">No {type} available</h3>
      <p className="text-gray-500">Check back later for new content!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white hover:text-gray-300 hover:bg-white/10"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Link 
                to="/"
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-400/30">
                <FileText className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Free Resources Hub
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Your one-stop destination for all learning materials. Access curated PDFs, video tutorials, and interactive roadmaps to accelerate your journey in technology and development.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{pdfs.length}</div>
                <div className="text-sm text-gray-400">PDFs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{youtubeVideos.length}</div>
                <div className="text-sm text-gray-400">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{roadmaps.length}</div>
                <div className="text-sm text-gray-400">Roadmaps</div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-900/50 backdrop-blur-sm p-1 rounded-xl border border-gray-800">
              <button
                onClick={() => setActiveTab('pdfs')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'pdfs'
                    ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="h-4 w-4" />
                PDFs ({pdfs.length})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'videos'
                    ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Video className="h-4 w-4" />
                Videos ({youtubeVideos.length})
              </button>
              <button
                onClick={() => setActiveTab('roadmaps')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'roadmaps'
                    ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Map className="h-4 w-4" />
                Roadmaps ({roadmaps.length})
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            {activeTab === 'roadmaps' && (
              <div className="flex gap-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="border-gray-700"
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading resources...</p>
            </div>
          ) : (
            <div>
              {activeTab === 'pdfs' && (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {getFilteredContent().length > 0 ? (
                    getFilteredContent().map((item) => (
                      <ContentCard key={item.id} item={item} type="pdf" />
                    ))
                  ) : (
                    <div className="col-span-full">
                      <EmptyState type="pdfs" />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'videos' && (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {getFilteredContent().length > 0 ? (
                    (getFilteredContent() as YouTubeVideo[]).map((video) => (
                      <YouTubeVideoCard key={video.id} video={video} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">
                        {searchTerm ? 'No videos match your search' : 'No videos available'}
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms' : 'Our latest videos from DNA Official Tech will appear here!'}
                      </p>
                      {searchTerm && (
                        <Button 
                          onClick={() => setSearchTerm('')}
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'roadmaps' && (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {getFilteredContent().length > 0 ? (
                    getFilteredContent().map((item) => (
                      <ContentCard key={item.id} item={item} type="roadmap" />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Map className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">
                        {searchTerm ? 'No roadmaps match your search' : 'No roadmaps available'}
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms or filters' : 'Check back later for new content!'}
                      </p>
                      {searchTerm && (
                        <Button 
                          onClick={() => setSearchTerm('')}
                          className="mt-4 bg-green-600 hover:bg-green-700"
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-card p-8 rounded-2xl border border-blue-400/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Looking for more resources?</h3>
              <p className="text-gray-400 mb-6">
                Suggest new content or contribute resources to help the community grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-blue-400 hover:bg-blue-500 text-black"
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                >
                  Suggest Content
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  asChild
                >
                  <Link to="/opportunities">
                    View Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
