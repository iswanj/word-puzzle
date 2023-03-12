export const CATEGORIES = {
  animals: [
    'Dog',
    'Cat',
    'Elephant',
    'Lion',
    'Tiger',
    'Otter',
    'Moose',
    'Koala',
    'Lemur',
    'Badger',
    'Gecko',
    'Gerbil',
    'Bison',
    'Jaguar',
    'Jaguar',
    'Ferret',
    'Donkey',
    'Zebra',
    'Puma',
    'Sloth',
    'Panda',
    'Shrimp',
    'Eagle',
    'Iguana',
    'Jaguar',
    'Llama',
    'Gopher',
    'Marmot',
    'Muskrat',
    'Rabbit',
  ],
  cities: [
    'Penang',
    'Paris',
    'Vienna',
    'Oslo',
    'Moscow',
    'Tokyo',
    'Berlin',
    'Madrid',
    'Odessa',
    'Perth',
    'Hamburg',
    'Lima',
    'Rome',
    'Dublin',
    'Athens',
    'Seoul',
    'Lisbon',
    'Hanoi',
    'Nairobi',
    'Baku',
    'Luanda',
    'Dakar',
    'Ljubljana',
    'Brasília',
    'Reykjavik',
    'Tirana',
    'Nassau',
    'Lilongwe',
    'Doha',
    'Kigali',
  ],
  food: [
    'Pizza',
    'Burger',
    'Taco',
    'Sushi',
    'Salad',
    'Pasta',
    'Fries',
    'Ramen',
    'Steak',
    'Soup',
    'Rice',
    'Noodle',
    'Toast',
    'Bagel',
    'Cheese',
    'Scone',
    'Waffle',
    'Pancake',
    'Donut',
    'Croissant',
    'Churro',
    'Falafel',
    'Curry',
    'Shawarma',
    'Hummus',
    'Kebab',
    'Gyoza',
    'Dumpling',
    'Bruschetta',
    'Fajita',
  ],
};

export const getWordsByCategory = category => {
  // get random 5 items from array
  const shuffled = CATEGORIES[category].sort(() => 0.5 - Math.random());
  return [...shuffled].slice(0, 5);
};

export const getCategories = () => {
  return Object.keys(CATEGORIES);
};