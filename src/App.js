import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { Routes,Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { useState, useEffect } from "react";
import Team from "./scenes/team";
import  Form  from "./scenes/form";
import Monitor  from "./scenes/monitor";
import Report from "./scenes/reports";
import Upload from "./scenes/upload";
import SignIn from "./scenes/signin";
import SignUp from "./scenes/signup";
import axios from "./api/axios";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true)
  const [userName, setUserName] = useState("User")
  const [userRole, setuserRole] = useState("Guest")

  useEffect(() => {
    async function fetchAccountData(){
      try{
        const response = await axios.get("/account")
        if(response.status === 200){
          setUserName(response.data.name)
          setuserRole(response.data.role)
        }
      } catch(error){
        console.error("error fetching account data", error)
      }
    }
    fetchAccountData()
  }, [])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userName={userName} userRole={userRole} isSidebar={isSidebar}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path="/login" element={<SignIn/>} />
              <Route path="/register" element={<SignUp />}></Route>
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
