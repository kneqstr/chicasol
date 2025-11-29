import ProtectedVideo from "@/components/ProtectedVideo";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Мои видео-курсы</h1>
      <ProtectedVideo videoId="78d79ecb-96e5-4018-9f7f-02234632d644" />
    </div>
  );
};

export default Home;
