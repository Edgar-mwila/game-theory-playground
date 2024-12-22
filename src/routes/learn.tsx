import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBrain, 
  FaBookOpen, 
  FaChalkboardTeacher, 
  FaSearch,
  FaCheckCircle,
  FaStar,
  FaLightbulb,
  FaQuoteRight,
  FaCode,
  FaChartLine,
  FaHandshake,
  FaGamepad,
  FaInfoCircle,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaHistory,
  FaUsers,
  FaUniversity,
  FaQuestionCircle
} from 'react-icons/fa';
import { concepts } from '../concepts';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface KeyFigure {
  name: string;
  contribution: string;
  year: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ContentDetails {
  history: string;
  keyFigures: KeyFigure[];
  implications: string[];
}

interface TopicContent {
  definition: string;
  keyPoints: string[];
  realWorldExample: string;
  relatedGames: string[];
  details: ContentDetails;
  quiz: QuizQuestion[];
}

interface Topic {
  id: string;
  title: string;
  difficulty: Difficulty;
  readTime: string;
  content: TopicContent;
}

interface Category {
  id: string;
  title: string;
  icon: JSX.Element;
  topics: Topic[];
}

interface QuizAnswers {
  [key: number]: number;
}

const difficultyColors: Record<Difficulty, string> = {
  'Beginner': 'text-green-400',
  'Intermediate': 'text-yellow-400',
  'Advanced': 'text-red-400'
};

const filterConcepts = (categories: Category[], searchTerm: string): Category[] => {
  return categories
    .map(category => ({
      ...category,
      topics: category.topics.filter(topic => 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.content.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.topics.length > 0);
};

const getAllTopics = (categories: Category[]): Topic[] => {
  return categories.reduce<Topic[]>((acc, category) => [...acc, ...category.topics], []);
};

const MobileSideNav: React.FC<{
  filteredConcepts: Category[];
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic) => void;
  setIsSideNavOpen: (isOpen: boolean) => void;
}> = ({ filteredConcepts, selectedTopic, setSelectedTopic, setIsSideNavOpen }) => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    className="fixed inset-y-0 left-0 w-4/5 bg-gray-900 z-50 overflow-y-auto"
  >
    <div className="p-4">
      <button
        onClick={() => setIsSideNavOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <FaTimes size={24} />
      </button>
      <div className="mt-12">
        {filteredConcepts.map((category) => (
          <div key={category.id} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {category.icon}
              <h3 className="font-semibold">{category.title}</h3>
            </div>
            <div className="space-y-2">
              {category.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setIsSideNavOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded ${
                    selectedTopic?.id === topic.id ? 'bg-purple-600' : ''
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const QuizSection: React.FC<{
  topic: Topic;
  showQuiz: boolean;
  setShowQuiz: (show: boolean) => void;
  quizAnswers: QuizAnswers;
  setQuizAnswers: (answers: QuizAnswers) => void;
  showResults: boolean;
  handleQuizSubmit: () => void;
}> = ({ topic, showQuiz, setShowQuiz, quizAnswers, setQuizAnswers, showResults, handleQuizSubmit }) => (
  <div className="mt-8">
    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FaQuestionCircle /> Test Your Knowledge
    </h4>
    {!showQuiz ? (
      <button
        onClick={() => setShowQuiz(true)}
        className="px-4 py-2 bg-purple-600 rounded-lg"
      >
        Start Quiz
      </button>
    ) : (
      <div className="space-y-6">
        {topic.content.quiz.map((question, index) => (
          <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
            <p className="font-semibold mb-4">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => setQuizAnswers((prev: any) => ({
                    ...prev,
                    [index]: optionIndex
                  }))}
                  className={`w-full text-left p-2 rounded ${
                    quizAnswers[index] === optionIndex 
                      ? 'bg-purple-600' 
                      : 'bg-gray-600/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showResults && (
              <div className="mt-4">
                {quizAnswers[index] === question.correct ? (
                  <p className="text-green-400">Correct!</p>
                ) : (
                  <p className="text-red-400">
                    Incorrect. {question.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        {!showResults && (
          <button
            onClick={handleQuizSubmit}
            className="px-4 py-2 bg-purple-600 rounded-lg"
          >
            Submit Answers
          </button>
        )}
      </div>
    )}
  </div>
);

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'favorites'>('all');
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredConcepts = filterConcepts(concepts, searchTerm);
  const allTopics = getAllTopics(concepts);

  useEffect(() => {
    if (window.innerWidth >= 1024 && !selectedTopic && concepts[0]?.topics[0]) {
      setSelectedTopic(concepts[0].topics[0]);
    }
  }, []);

  const getNextTopic = (): Topic | null => {
    if (!selectedTopic) return null;
    const currentIndex = allTopics.findIndex(topic => topic.id === selectedTopic.id);
    return allTopics[currentIndex + 1] || null;
  };

  const getPrevTopic = (): Topic | null => {
    if (!selectedTopic) return null;
    const currentIndex = allTopics.findIndex(topic => topic.id === selectedTopic.id);
    return allTopics[currentIndex - 1] || null;
  };

  const handleQuizSubmit = (): void => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen py-20">
      <button
        onClick={() => setIsSideNavOpen(true)}
        className="fixed top-4 left-4 lg:hidden z-40 bg-gray-800 p-2 rounded-lg"
      >
        <FaBars size={24} />
      </button>

      <AnimatePresence>
        {isSideNavOpen && (
          <MobileSideNav 
            filteredConcepts={filteredConcepts}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            setIsSideNavOpen={setIsSideNavOpen}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="hidden lg:block lg:col-span-1 space-y-6 max-h-[90vh] overflow-y-auto">
            {filteredConcepts.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <div className="p-4 bg-gray-700/50 flex items-center gap-3">
                  {category.icon}
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                <div className="p-4 space-y-2">
                  {category.topics.map((topic) => (
                    <motion.button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedTopic?.id === topic.id 
                          ? 'bg-purple-600'
                          : 'hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{topic.title}</span>
                        <span className={`text-sm ${difficultyColors[topic.difficulty]}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2" ref={contentRef}>
            <AnimatePresence mode="wait">
              {selectedTopic && (
                <motion.div
                  key={selectedTopic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800/50 rounded-xl backdrop-blur-sm p-6"
                >
                  <div className="flex justify-between mb-6">
                    <button
                      onClick={() => {
                        const prevTopic = getPrevTopic();
                        if (prevTopic) setSelectedTopic(prevTopic);
                      }}
                      disabled={!getPrevTopic()}
                      className="px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-50"
                    >
                      <FaArrowLeft className="inline mr-2" /> Previous
                    </button>
                    <button
                      onClick={() => {
                        const nextTopic = getNextTopic();
                        if (nextTopic) setSelectedTopic(nextTopic);
                      }}
                      disabled={!getNextTopic()}
                      className="px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-50"
                    >
                      Next <FaArrowRight className="inline ml-2" />
                    </button>
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold">{selectedTopic.title}</h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {selectedTopic.readTime} read
                      </span>
                      <button className="text-gray-400 hover:text-yellow-400 transition">
                        <FaStar />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FaQuoteRight className="text-purple-400 text-xl flex-shrink-0 mt-1" />
                        <p className="text-lg">{selectedTopic.content.definition}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaLightbulb className="text-purple-400" /> Key Points
                      </h3>
                      <ul className="space-y-2">
                        {selectedTopic.content.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaHistory /> Historical Context
                      </h3>
                      <p className="text-gray-300">{selectedTopic.content.details.history}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaUsers /> Key Figures
                      </h3>
                      <div className="space-y-4">
                        {selectedTopic.content.details.keyFigures.map((figure, index) => (
                            <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                            <h5 className="font-semibold">{figure.name} ({figure.year})</h5>
                            <p className="text-gray-300">{figure.contribution}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaChalkboardTeacher /> Real World Application
                      </h3>
                      <p className="text-gray-300">{selectedTopic.content.realWorldExample}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaUniversity /> Implications
                      </h3>
                      <ul className="space-y-2">
                        {selectedTopic.content.details.implications.map((implication, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FaCheckCircle className="text-purple-400 flex-shrink-0" />
                            {implication}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaGamepad /> Related Games
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTopic.content.relatedGames.map((game, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>

                    <QuizSection 
                      topic={selectedTopic}
                      showQuiz={showQuiz}
                      setShowQuiz={setShowQuiz}
                      quizAnswers={quizAnswers}
                      setQuizAnswers={setQuizAnswers}
                      showResults={showResults}
                      handleQuizSubmit={handleQuizSubmit}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/learn')({
  component: Learn,
});