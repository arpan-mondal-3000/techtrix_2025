// Library import
import { useState, useEffect } from "react";
import { app } from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

// Components import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// Icons import
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Driver {
  name: string;
  id: string;
  doc_id: string;
}

const columns: ColumnDef<Driver>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
];

function DriverManagement() {
  const db = getFirestore(app);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const table = useReactTable({
    data: drivers,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "drivers"));
        const driversData = querySnapshot.docs.map((doc) => ({
          // id: doc.id,
          ...doc.data(),
        })) as Driver[];
        setDrivers(driversData);
        console.log(driversData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);
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
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <Link to={`/dashboard`}>
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default DriverManagement;
