import Link from "next/link";

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/login">login</Link>
        </li>
        <li>
          <Link href="/register">register</Link>
        </li>
        <li>
          <Link href="/profile">profile</Link>
        </li>
      </ul>

    </div>
  );
};

export default Home;
