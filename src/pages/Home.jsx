import Form from "../components/Form";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-5.5">
      <h1 className="text-3xl text-slate-800 text-center font-bold">
        Welcome to chess timer
      </h1>
      <Form />
    </div>
  );
}

export default Home;
