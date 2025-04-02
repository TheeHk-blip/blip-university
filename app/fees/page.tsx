import { title } from "../components/primitives";

export default function Fees() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={title({})}>Fees</h1>
      <div className="flex flex-col ml-1.5 items-center justify-center">
        <span>
          Fee payable this semester is
        </span>        
      </div>
    </div>
  );
}