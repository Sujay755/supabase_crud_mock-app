import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./components/config/supaConfig";

const App = () => {
  const [users, setUsers] = useState([]);
  const [pName, setPName] = useState("");
  const [age, setAge] = useState(0);
  const [eName, setEName] = useState("");
  const [eAge, setEAge] = useState(0);
  const [eId, setEId] = useState(0);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("peoples").select();

    setUsers(data);

    console.log(data);
  };

  const createUser = async () => {
    const { error } = await supabase
      .from("peoples")
      .insert({ name: pName, age: age });

      setPName('');
      setAge(0);
    fetchUsers();
  };

  const deleteUser = async (personId) => {
    const { error } = await supabase
      .from("peoples")
      .delete()
      .eq("id", personId);

    fetchUsers();
  };

  const editRequest = (person) => {
    setEName(person.name);
    setEAge(person.age);
    setEId(person.id);
  };

  const updateUser = async () => {
    const { error } = await supabase
      .from("peoples")
      .update({ name: eName, age: eAge })
      .eq("id", eId);

      setEName('');
      setEAge(0);
      setEId(0);

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <form>
        <div className="flex flex-row">
          <input
            className="p-1 m-1 border border-slate-50 text-white text-lg w-36"
            type="text"
            placeholder="Name"
            value={pName}
            onChange={(e) => setPName(e.target.value)}
          />
          <input
            className="p-1 m-1 border border-slate-50 text-white text-lg w-36"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button
            type="button"
            className="border border-slate-50 m-1"
            onClick={createUser}
          >
            Create
          </button>
        </div>

        <div className="flex flex-row">
          <input
            className="p-1 m-1 border border-slate-50 text-white text-lg w-36"
            type="text"
            placeholder="Name"
            value={eName}
            onChange={(e) => setEName(e.target.value)}
          />
          <input
            className="p-1 m-1 border border-slate-50 text-white text-lg w-36"
            type="number"
            placeholder="Age"
            value={eAge}
            onChange={(e) => setEAge(e.target.value)}
          />
          <button
            type="button"
            className="border border-slate-50 m-1"
            onClick={updateUser}
          >
            Update
          </button>
        </div>
      </form>

      {users.map((person) => (
        <div key={person.id} className="flex flex-row m-2 justify-center">
          <h1 className="p-1 m-1 border border-slate-50 text-white text-lg">
            {person.id}
          </h1>
          <h1 className="p-1 m-1 border border-slate-50 text-white text-lg">
            {person.name}
          </h1>
          <h1 className="p-1 m-1 border border-slate-50 text-white text-lg">
            {person.age}
          </h1>
          <button
            type="button"
            className="border border-slate-50 m-1"
            onClick={() => deleteUser(person.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="border border-slate-50 m-1"
            onClick={() => editRequest(person)}
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
};

export default App;
