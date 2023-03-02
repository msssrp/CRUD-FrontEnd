import { Routes , Route , BrowserRouter} from "react-router-dom"
import Cards from "./components/Cards"
import NewPlayer from "./components/NewPlayer"
import EditPlayer from "./components/EditPlayer"
function App() {
 

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Cards/>}/>
      <Route path='/createPlayer' element={<NewPlayer/>}/>
      <Route path='/edit/:id' element={<EditPlayer/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
