import { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Autocomplete } from "@mui/material";

const ProductAssignInput = () => {
  const [select1, setSelect1] = useState<string | null>(null);
  const [select2, setSelect2] = useState<string | null>(null);
  const [inputNumber1, setInputNumber1] = useState("");
  const [inputNumber2, setInputNumber2] = useState("");
  const [inputDate, setInputDate] = useState("");

  const options = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2} direction="column">

        {/* Row 1 - First Autocomplete with label */}
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="subtitle1">Chọn một đại lý:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              options={options}
              value={select1}
              onChange={(_, newValue) => setSelect1(newValue)}
              renderInput={(params) => <TextField {...params} placeholder="Select 1" fullWidth />}
            />
          </Grid>
        </Grid>

        {/* Row 2 - Second Autocomplete with label */}
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="subtitle1">Chọn một sản phẩm:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              options={options}
              value={select2}
              onChange={(_ , newValue) => setSelect2(newValue)}
              renderInput={(params) => <TextField {...params} placeholder="Select 2" fullWidth />}
            />
          </Grid>
        </Grid>

        {/* Row 3 - Three Inputs with labels on the same line */}
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="subtitle1">Từ ID:</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              fullWidth
              value={inputNumber1}
              onChange={(e) => setInputNumber1(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1">Đến ID:</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              fullWidth
              value={inputNumber2}
              onChange={(e) => setInputNumber2(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1">Ngày xuất:</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="date"
              fullWidth
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        {/* Row 4 - Four Buttons */}
        <Grid item container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" sx={{ minWidth: 120 }}>
              Button 1
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" sx={{ minWidth: 120 }}>
              Button 2
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" sx={{ minWidth: 120 }}>
              Button 3
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" sx={{ minWidth: 120 }}>
              Button 4
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductAssignInput;
