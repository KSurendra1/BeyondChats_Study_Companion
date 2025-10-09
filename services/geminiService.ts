import type { Pdf, Question, ChatMessage, VideoRecommendation } from '../types';
import { QuestionType } from '../types';

const MOCK_QUESTIONS: { [key in QuestionType]: Question[] } = {
  [QuestionType.MCQ]: [
    {
      id: 'mcq-1',
      type: QuestionType.MCQ,
      question: 'What is the SI unit for electric current?',
      options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
      correctAnswer: 'Ampere',
      explanation: 'Ampere is the base unit of electric current in the International System of Units (SI).',
    },
    {
      id: 'mcq-2',
      type: QuestionType.MCQ,
      question: "According to Newton's second law, what is the relationship between force, mass, and acceleration?",
      options: ['F = m/a', 'F = ma', 'F = a/m', 'F = m+a'],
      correctAnswer: 'F = ma',
      explanation: "Newton's second law states that the force acting on an object is equal to the mass of that object times its acceleration.",
    },
     {
      id: 'mcq-3',
      type: QuestionType.MCQ,
      question: 'Which of these is a fundamental force in nature?',
      options: ['Friction', 'Tension', 'Gravity', 'Air Resistance'],
      correctAnswer: 'Gravity',
      explanation: 'Gravity is one of the four fundamental forces of nature, along with the electromagnetic, strong nuclear, and weak nuclear forces.',
    },
    {
      id: 'mcq-4',
      type: QuestionType.MCQ,
      question: 'What is the formula for kinetic energy?',
      options: ['KE = mgh', 'KE = 1/2 mv^2', 'KE = mv', 'KE = 1/2 m^2v'],
      correctAnswer: 'KE = 1/2 mv^2',
      explanation: 'Kinetic energy is the energy an object possesses due to its motion, calculated as half of the mass times the square of its velocity.',
    },
    {
      id: 'mcq-5',
      type: QuestionType.MCQ,
      question: 'The dimension of Force is:',
      options: ['[MLT^-2]', '[MLT^-1]', '[ML^2T^-2]', '[ML^2T^-1]'],
      correctAnswer: '[MLT^-2]',
      explanation: 'Force = Mass x Acceleration. The dimension of mass is [M], and acceleration is [LT^-2]. Therefore, the dimension of force is [MLT^-2].',
    }
  ],
  [QuestionType.SAQ]: [
    {
      id: 'saq-1',
      type: QuestionType.SAQ,
      question: 'Define "inertia" in one sentence.',
      correctAnswer: 'Inertia is the property of matter by which it continues in its existing state of rest or uniform motion in a straight line, unless that state is changed by an external force.',
      explanation: 'Inertia is a fundamental concept in physics, often summarized as "an object in motion stays in motion, and an object at rest stays at rest".',
    },
    {
      id: 'saq-2',
      type: QuestionType.SAQ,
      question: 'What are the three modes of heat transfer?',
      correctAnswer: 'Conduction, convection, and radiation.',
      explanation: 'These are the three primary ways heat energy moves from a warmer area to a cooler one.',
    },
  ],
  [QuestionType.LAQ]: [
    {
      id: 'laq-1',
      type: QuestionType.LAQ,
      question: "Explain Newton's Three Laws of Motion with one real-world example for each.",
      correctAnswer: 'First Law (Inertia): An object at rest stays at rest, an object in motion stays in motion. Example: A passenger in a car lurches forward when the car suddenly stops. Second Law (F=ma): The acceleration of an object is directly proportional to the net force and inversely proportional to its mass. Example: It is easier to push an empty shopping cart than a full one. Third Law: For every action, there is an equal and opposite reaction. Example: A rocket propels itself forward by expelling gas backward.',
      explanation: "These three laws form the foundation of classical mechanics and describe the relationship between an object and the forces acting upon it.",
    },
  ],
};

// This is a MOCK function. In a real application, this would call the Gemini API.
export const generateQuiz = (pdf: Pdf, type: QuestionType, count: number): Promise<Question[]> => {
  console.log(`Generating ${type} quiz for ${pdf.name} with ${count} questions...`);

  return new Promise(resolve => {
    setTimeout(() => {
      const questionsForType = MOCK_QUESTIONS[type] || MOCK_QUESTIONS[QuestionType.MCQ];
      const shuffled = [...questionsForType].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, count));
    }, 1500); // Simulate network latency
  });
};

// MOCK function for chatbot
export const getChatbotResponse = (pdf: Pdf, query: string): Promise<Omit<ChatMessage, 'id' | 'role'>> => {
  console.log(`Generating chatbot response for query: "${query}" regarding ${pdf.name}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        text: "The chapter on 'Motion in a Straight Line' covers several key concepts of kinematics. This includes the definitions and differences between position, path length, and displacement, which are fundamental to describing motion.",
        citation: {
          pageNumber: 41,
          quote: "Path length is a scalar quantity... whereas displacement is a vector quantity. For example, if a car goes from a point A to a point B, and returns to A, its path length is 2AB but displacement is zero.",
        }
      });
    }, 2000);
  });
};

// MOCK function for video recommendations
export const getVideoRecommendations = (pdf: Pdf): Promise<VideoRecommendation[]> => {
    console.log(`Fetching video recommendations for ${pdf.name}`);
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 'yt-1',
                    title: 'Introduction to Kinematics - Motion in a Straight Line',
                    channel: 'Khan Academy',
                    thumbnailUrl: 'https://img.youtube.com/vi/ZM8ECpBuQeA/mqdefault.jpg',
                    videoUrl: 'https://www.youtube.com/watch?v=ZM8ECpBuQeA'
                },
                {
                    id: 'yt-2',
                    title: 'Equations of Motion (Physics)',
                    channel: 'Physics Online',
                    thumbnailUrl: 'https://img.youtube.com/vi/vWYi_i_S3k8/mqdefault.jpg',
                    videoUrl: 'https://www.youtube.com/watch?v=vWYi_i_S3k8'
                },
                {
                    id: 'yt-3',
                    title: 'Displacement, Velocity, and Acceleration',
                    channel: 'Bozeman Science',
                    thumbnailUrl: 'https://img.youtube.com/vi/v3-7_3-kIFg/mqdefault.jpg',
                    videoUrl: 'https://www.youtube.com/watch?v=v3-7_3-kIFg'
                }
            ]);
        }, 1500);
    });
};
