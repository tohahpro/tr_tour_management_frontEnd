import { Link } from "react-router";


export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center" >
      <h1 className="font-bold text-xl">You are not authorized.</h1>
      <Link to='/' type="button" className="px-4 py-1 bg-primary mt-8 font-medium rounded">Home</Link>
    </div>
  );
}