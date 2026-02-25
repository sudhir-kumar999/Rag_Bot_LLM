import RagLayout from "../components/rag/RagLayout";
// import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  // const { user, logout } = useAuth();

  return (
    <div>
      {/* <h1>Welcome {user?.name}</h1>
      <button onClick={logout}>Logout</button> */}
      <RagLayout/>
    </div>
  );
}