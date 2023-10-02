import { useJsonQuery } from './fetch'; 

const TestFetch = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (isLoading) {
    console.log('Loading...');
  }

  if (error) {
    console.error('Error:', error);
  }

  if (data) {
    console.log('Data:', data);
  }

  return null; // Return null to prevent rendering
};

export default TestFetch;