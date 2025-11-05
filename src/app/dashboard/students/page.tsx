"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Mail, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Define the student type
type Student = {
  id: string;
  name: string;
  email: string;
  maxLevel: number;
  status: "active" | "inactive" | "unregistered";
};

// Mock data for students - in a real application, this would come from an API
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    maxLevel: 5,
    status: "active",
  },
  {
    id: "2",
    name: "María González",
    email: "maria.gonzalez@email.com",
    maxLevel: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    maxLevel: 3,
    status: "inactive",
  },
  {
    id: "4",
    name: "Ana López",
    email: "ana.lopez@email.com",
    maxLevel: 10,
    status: "active",
  },
  {
    id: "5",
    name: "Luis Fernández",
    email: "luis.fernandez@email.com",
    maxLevel: 6,
    status: "unregistered",
  },
  {
    id: "6",
    name: "Sofía Martínez",
    email: "sofia.martinez@email.com",
    maxLevel: 7,
    status: "active",
  },
  {
    id: "7",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    maxLevel: 4,
    status: "inactive",
  },
  {
    id: "8",
    name: "Laura Ramírez",
    email: "laura.ramirez@email.com",
    maxLevel: 9,
    status: "active",
  },
  {
    id: "9",
    name: "Miguel Torres",
    email: "miguel.torres@email.com",
    maxLevel: 2,
    status: "unregistered",
  },
  {
    id: "10",
    name: "Elena Vásquez",
    email: "elena.vasquez@email.com",
    maxLevel: 11,
    status: "active",
  },
  {
    id: "11",
    name: "Roberto Herrera",
    email: "roberto.herrera@email.com",
    maxLevel: 6,
    status: "active",
  },
  {
    id: "12",
    name: "Carmen Castillo",
    email: "carmen.castillo@email.com",
    maxLevel: 8,
    status: "inactive",
  },
];

export default function StudentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter students based on search term
  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.maxLevel.toString().includes(searchTerm)
  );

  // Calculate pagination values
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestión de Estudiantes</h1>
        <p className="text-muted-foreground">
          Vista general de todos los estudiantes registrados en la plataforma
        </p>
      </div>

      {/* Filter section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Filas por página:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Nivel Máximo</TableHead>
              <TableHead>Correo Electrónico</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    (window.location.href = `/dashboard/students/${student.id}`)
                  }
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    {student.status === "active" ? (
                      <Badge variant="default" className="bg-green-600 text-white">
                        Activo
                      </Badge>
                    ) : student.status === "inactive" ? (
                      <Badge variant="secondary" className="bg-yellow-600 text-white">
                        Inactivo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-600 text-red-600">
                        No Registrado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Nivel {student.maxLevel}
                    </span>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${student.email}`;
                        }}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Correo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Enviar feedback al estudiante (en este caso solo mostrar un alert)
                          alert(
                            `Redirigiendo para enviar feedback a ${student.name}`
                          );
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Feedback
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron estudiantes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-
            {Math.min(endIndex, filteredStudents.length)} de{" "}
            {filteredStudents.length} estudiantes
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "bg-blue-600" : ""}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
