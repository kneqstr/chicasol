import ProtectedVideo from "@/components/protected-component";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Мои видео-курсы</h1>
      <ProtectedVideo videoId="b0b2731b-a16c-4ea7-a270-c186fc48fdaf" />
    </div>
  );
};

export default Home;
