// Components import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons import
import { IoSearch } from "react-icons/io5";

function DriverManagement() {
  return (
    <>
      <div className="h-full p-6">
        <p className="text-3xl font-semibold text-center">Manage Bus Drivers</p>
        <div className="flex justify-center my-6">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search Drivers"
              className="bg-white"
            />
            <Button type="submit" className="hover:cursor-pointer">
              <IoSearch />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverManagement;
