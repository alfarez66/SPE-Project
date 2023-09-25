import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { Routes,Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { useState } from "react";
import Team from "./scenes/team";
import  Form  from "./scenes/form";
// import  Monitor  from "@mui/icons-material";
import Monitor  from "./scenes/monitor";
import Report from "./scenes/reports";
import Upload from "./scenes/upload";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true)
  const user = { role: 'Admin'}

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={user.role} isSidebar={isSidebar}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/team" element={<Team/>} />
              <Route path="/form" element={<Form/>} />
              <Route path="/report" element={<Report/>} />
              <Route path="/report/create" element={<Upload/>} />
              <Route path="/monitor" element={<Monitor/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
