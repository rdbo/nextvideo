import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Upload } from "lucide-react";

export default function NavBar() {
  return (
    <div className="px-2 py-1 relative h-14 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="font-bold text-2xl">
            Next<span className="text-blue-500">Video</span>
          </h1>
        </Link>
      </div>
      <form
        method="GET"
        action="/search"
        className="absolute top-0 left-0 bottom-0 right-0 w-min mx-auto flex justify-center items-center h-14"
      >
        <Input
          placeholder="Search for a video"
          className="w-96 rounded-l-full"
          name="query"
          required
        />
        <Button variant="outline" className="rounded-r-full border-l-0">
          <Search size={18} />
        </Button>
      </form>
      <div>
        <Link href="/upload">
          <Button variant="outline" className="rounded-full">
            <Upload size={18} />
            <p className="ml-1">Upload</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
