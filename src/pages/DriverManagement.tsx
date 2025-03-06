// Library import
import { useState, useEffect } from "react";
import { app } from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

// Components import
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// Icons import
import { FaExternalLinkAlt } from "react-icons/fa";

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
  {
    header: "Details",
    accessorKey: "doc_id",
    cell: ({ row }) => (
      <Link to={row.getValue("doc_id")}>
        <FaExternalLinkAlt />
      </Link>
    ),
  },
];

function DriverManagement() {
  const db = getFirestore(app);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const table = useReactTable({
    data: drivers,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "drivers"));
        const driversData = querySnapshot.docs.map((doc) => ({
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

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(search);
  }, [search, table]);

  return (
    <>
      <div className="h-full p-6">
        <p className="text-3xl font-semibold text-center">Manage Bus Drivers</p>
        <div className="flex justify-center my-6">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search Drivers by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
        {loading ? (
          "Loading..."
        ) : (
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
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-100">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell(cell.getContext())
                            : cell.getValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

export default DriverManagement;
