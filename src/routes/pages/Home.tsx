import { logUserOut } from "../../apollo";

const Home: React.FC = () => {
  return (
    <div>
      <button onClick={logUserOut}>logout</button>
    </div>
  );
};

export default Home;
