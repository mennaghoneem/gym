const API_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const BASE_IMAGE_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

export async function getExercises() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }
    const result = await response.json();

    return result.map((item) => {
      const muscle = (item.primaryMuscles && item.primaryMuscles.length > 0)
        ? item.primaryMuscles[0]
        : (item.category || 'General');

      const img = (item.images && item.images.length > 0)
        ? `${BASE_IMAGE_URL}${item.images[0]}`
        : '';

      return {
        id: item.id,
        name: item.name,
        target: muscle,
        bodyPart: item.category || muscle,
        equipment: item.equipment || 'None',
        instructions: item.instructions || [],
        gifUrl: img
      };
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
}