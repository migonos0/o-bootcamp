import { useRanges } from "@/state/range.state";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm } from "react-hook-form";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useCallback, useMemo, useState } from "react";
import { Range, rangeSchema } from "@/schemas/range.schema";

export default function Home() {
  // State
  const { ranges } = useRanges();

  // Local State
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>();

  // Forms
  const {} = useForm();

  // Event Handlers
  const handleDetailsDialogClose = () => setIsDetailsDialogOpen(false);
  const handleDetailsDialogOpen = () => setIsDetailsDialogOpen(true);

  // Event Handler Builders
  const buildSamplingRangesButtonClickHandler = useCallback(
    (range?: Range) => () => {
      handleDetailsDialogOpen();
      setSelectedRange(range);
    },
    []
  );

  // Memoized values
  const rangeColumns = useMemo<GridColDef[]>(
    () => [
      { field: "maximum", headerName: "Máximo" },
      { field: "minimum", headerName: "Mínimo" },
      {
        field: "status",
        headerName: "Estado",
        renderCell(params) {
          return params.row.status ? "Activo" : "Inactivo";
        },
      },
      {
        field: "action",
        headerName: "Acciones",
        sortable: false,
        width: 128,
        renderCell(params) {
          const parsedRow = rangeSchema.safeParse(params.row);
          const range = parsedRow.success ? parsedRow.data : undefined;

          return (
            <IconButton
              onClick={buildSamplingRangesButtonClickHandler(range)}
              aria-label="Rangos de Muestreo"
            >
              <ViewListIcon />
            </IconButton>
          );
        },
      },
    ],
    [buildSamplingRangesButtonClickHandler]
  );
  const samplingRangeColumns = useMemo<GridColDef[]>(
    () => [
      {
        field: "numberSamples",
        headerName: "Número de Muestras",
        width: 256,
      },
      {
        field: "sampling",
        headerName: "Nivel",
        renderCell(params) {
          return params.row.sampling.name;
        },
      },
    ],
    []
  );

  return (
    <>
      <main>
        {/* Toolbar */}
        <Card className="p-2">
          <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
            <p>Nuevo Rango</p>
          </Button>
        </Card>

        {/* DataGrid */}
        <DataGrid columns={rangeColumns} rows={ranges ?? []} />
      </main>

      {/* Dialogs */}
      <Dialog open={isDetailsDialogOpen} onClose={handleDetailsDialogClose}>
        <DialogTitle>Rangos de Muestreo</DialogTitle>

        <DialogContent>
          <DataGrid
            columns={samplingRangeColumns}
            rows={selectedRange?.samplingRanges ?? []}
          ></DataGrid>
        </DialogContent>
      </Dialog>
    </>
  );
}
