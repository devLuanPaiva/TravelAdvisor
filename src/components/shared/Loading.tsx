import { BiLoaderCircle } from "react-icons/bi";
interface LoadingProps {
  message: string;
}
export default function Loading({ message }: Readonly<LoadingProps>) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BiLoaderCircle className="animate-spin text-gray-600" size={48} />
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
}
