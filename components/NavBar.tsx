import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Upload } from "lucide-react";

export default function NavBar() {
  return (
    <div className="px-2 py-1 relative h-14 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl">
          Next<span className="text-blue-500">Video</span>
        </h1>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-min mx-auto flex justify-center items-center h-14">
        <Input
          placeholder="Search for a video"
          className="w-96 rounded-l-full"
        />
        <Button variant="outline" className="rounded-r-full border-l-0">
          <Search size={18} />
        </Button>
      </div>
      <div>
        <Button variant="outline" className="rounded-full">
          <Upload size={18} />
          <p className="ml-1">Upload</p>
        </Button>
      </div>
    </div>
  );
}
