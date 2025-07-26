// This is a mock in-memory store. In a real application, you would use a database.
interface Idea {
  id: string;
  text: string;
  timestamp: Date;
  isPublic: boolean;
  contact?: string;
}

const ideas: Idea[] = [];

export const addIdea = (ideaText: string, isPublic: boolean, contact?: string): Idea => {
  const newIdea: Idea = {
    id: Math.random().toString(36).substr(2, 9),
    text: ideaText,
    timestamp: new Date(),
    isPublic,
    contact,
  };
  ideas.unshift(newIdea); // Add to the beginning of the array
  return newIdea;
};

export const getIdeas = (): Idea[] => {
  // Only return ideas that are marked as public
  return ideas.filter(idea => idea.isPublic);
};
