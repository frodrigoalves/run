// This is a mock in-memory store. In a real application, you would use a database.
interface Idea {
  id: string;
  text: string;
  timestamp: Date;
}

const ideas: Idea[] = [];

export const addIdea = (ideaText: string): Idea => {
  const newIdea: Idea = {
    id: Math.random().toString(36).substr(2, 9),
    text: ideaText,
    timestamp: new Date(),
  };
  ideas.unshift(newIdea); // Add to the beginning of the array
  return newIdea;
};

export const getIdeas = (): Idea[] => {
  return ideas;
};
