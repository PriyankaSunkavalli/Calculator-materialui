import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from "@mui/material";
import { useState } from "react";
import Keys from "./components/Keys";
import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
  });
  return (
    <Root>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>This app is using the dark mode</main>
        <div>
          Light
          <Switch
            checked={darkmode}
            onChange={(e) => setDarkmode(e.target.checked)}
          />
          Dark
        </div>
        <Keys />
      </ThemeProvider>
    </Root>
  );
}

export default App;
