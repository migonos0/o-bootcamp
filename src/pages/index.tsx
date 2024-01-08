import { useRanges } from "@/state/range.state";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Controller, useForm } from "react-hook-form";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useCallback, useMemo, useState } from "react";
import { Range, rangeSchema } from "@/schemas/range.schema";
import {
  CreateRangeInput,
  createRangeInputSchema,
} from "@/schemas/inputs/create-range-input.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function Home() {
  // State
  const { ranges } = useRanges();

  // Local State
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>();
  const [isCreateRangeDialogOpen, setIsCreateRangeDialogOpen] = useState(false);

  // Forms
  const {
    control: createRangeInputControl,
    handleSubmit: createRangeInputHandleSubmit,
    reset: createRangeInputReset,
    formState: { errors },
  } = useForm<CreateRangeInput>({
    resolver: zodResolver(createRangeInputSchema),
    defaultValues: {
      maximum: 0,
      minimum: 0,
      status: true,
      samplingRanges: [],
    },
  });

  // Event Handlers
  const handleDetailsDialogClose = () => setIsDetailsDialogOpen(false);
  const handleDetailsDialogOpen = () => setIsDetailsDialogOpen(true);
  const handleCreateRangeDialogClose = () => setIsCreateRangeDialogOpen(false);
  const handleCreateRangeDialogOpen = () => setIsCreateRangeDialogOpen(true);

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
          <Button
            onClick={handleCreateRangeDialogOpen}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
          >
            <p>Nuevo Rango</p>
          </Button>
        </Card>

        {/* DataGrid */}
        <DataGrid columns={rangeColumns} rows={ranges ?? []} />
      </main>

      {/* Dialogs */}
      {/* Sampling Ranges Dialog */}
      <Dialog open={isDetailsDialogOpen} onClose={handleDetailsDialogClose}>
        <DialogTitle>Rangos de Muestreo</DialogTitle>
        <DialogContent>
          <DataGrid
            columns={samplingRangeColumns}
            rows={selectedRange?.samplingRanges ?? []}
          ></DataGrid>
        </DialogContent>
      </Dialog>

      {/* Create Range Dialog */}
      <Dialog
        open={isCreateRangeDialogOpen}
        onClose={handleCreateRangeDialogClose}
      >
        <form>
          <DialogTitle>Crear Rango</DialogTitle>

          <DialogContent className="flex gap-y-6 flex-col">
            <div className="pt-2">
              <Controller
                control={createRangeInputControl}
                name="maximum"
                render={({ field }) => (
                  <TextField {...field} type="number" label="Máximo" />
                )}
              />
              <ErrorMessage message={errors.maximum?.message} />
            </div>

            <div>
              <Controller
                control={createRangeInputControl}
                name="minimum"
                render={({ field }) => (
                  <TextField {...field} type="number" label="Mínimo" />
                )}
              />
              <ErrorMessage message={errors.minimum?.message} />
            </div>

            <div>
              <Typography variant="subtitle1">Estado</Typography>
              <Controller
                control={createRangeInputControl}
                name="status"
                render={({ field }) => (
                  <div className="flex gap-x-2">
                    <TextField {...field} type="checkbox" label="Estado" />
                    <p>{field.value ? "Activo" : "Inactivo"}</p>
                  </div>
                )}
              />
              <ErrorMessage message={errors.status?.message} />
            </div>

            <div>
              <Typography variant="subtitle1">Rangos de Muestreo</Typography>
              <Button variant="outlined">Agregar o Modificar</Button>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCreateRangeDialogClose}>Cancelar</Button>
            <Button type="submit">Crear</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
