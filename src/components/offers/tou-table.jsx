import { groupBy } from "lodash";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export function TimeOfUseTable({ tou_details }) {
  // 1. group by period name
  const byPeriod = groupBy(tou_details, (tou) => tou.name);

  return (
    <TableContainer
      component={Paper}
      sx={{ bgcolor: "#1f2937", border: "1px solid #4b5563" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "#9ca3af",
                borderColor: "#4b5563",
                fontWeight: 600,
              }}
            >
              Period
            </TableCell>
            <TableCell
              sx={{
                color: "#9ca3af",
                borderColor: "#4b5563",
                fontWeight: 600,
              }}
            >
              Time
            </TableCell>
            <TableCell
              sx={{
                color: "#9ca3af",
                borderColor: "#4b5563",
                fontWeight: 600,
              }}
            >
              Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            // 2. render each group
            Object.entries(byPeriod).map(([periodName, rows]) =>
              rows.map((tou, idx) => (
                <TableRow key={`${periodName}-${idx}`}>
                  {idx === 0 && (
                    <TableCell
                      rowSpan={rows.length}
                      sx={{ color: "#d1d5db", borderColor: "#4b5563" }}
                    >
                      {periodName}
                    </TableCell>
                  )}
                  <TableCell sx={{ color: "#d1d5db", borderColor: "#4b5563" }}>
                    {tou.times}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderColor: "#4b5563",
                      fontWeight: 500,
                    }}
                  >
                    {tou.rate}
                    {tou.units}
                  </TableCell>
                </TableRow>
              )),
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
