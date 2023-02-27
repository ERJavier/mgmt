import Clients from "../components/Clients"
import AddClientModel from "../AddClientModel";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModel />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
