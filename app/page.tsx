import Link from "next/link";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Home</h1>
      <Link href="/course">Course</Link>
    </div>
  );
};

export default Home;
