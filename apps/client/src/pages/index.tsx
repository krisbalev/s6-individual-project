import { useState } from 'react';

type User = {
  id: number;
  username: string;
};

type Props = {
  users: User[];
};

const Home = ({ users }: Props) => {
  const [userId, setUserId] = useState<number>();
  const [user, setUser] = useState<User>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3001/users/${userId}`);
    const data = await response.json();
    setUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter user ID:
          <input type="number" value={userId} onChange={(e) => setUserId(parseInt(e.target.value))} />
        </label>
        <button type="submit">Get User</button>
      </form>
      {user && (
        <div>
          <h2>User {user.id}</h2>
          <p>Username: {user.username}</p>
        </div>
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            User {user.id}: {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3001/users');
  const users = await response.json();
  return {
    props: { users },
  };
};

export default Home;
