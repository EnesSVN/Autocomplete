import { useEffect ,useState,useRef} from "react"


const data = [
  {
    id:1,
    title: "test 1",

  },
  {
    id:2,
    title: "Test 2",

  },
  {
    id:3,
    title: "deneme 1",

  },
  {
    id:4,
    title: "Deneme 2"
  }
]

function App() {
  const [search,setSearch] = useState("")
  const [result, setResult] = useState([])
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/,"").length > 0

  useEffect(()=>{
     document.addEventListener("mousedown", handlerClickOutside)
     return () =>{
       document.removeEventListener("mousedown", handlerClickOutside)
     }
  },[])

  const handlerClickOutside = (e) =>{
    if(searchRef.current && !searchRef.current.contains(e.target)){
      setSearch("")
    }
  }

  useEffect(() => {
    if(isTyping){
      setResult(data.filter(item=> item.title.toLowerCase().includes(search.toLowerCase())))
    }else{
      setResult([])
    }
  },[search])


  return (
    <div>
      <div className="search" ref={searchRef}>
        <input className={isTyping ? "typing" : null} type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        {result && isTyping && (
          <div className="search-result">
            {result.map(item=>(
              <div key={item.key} className="search-resualt-item">
                {item.title}
                
              </div>
            ))}
            {result.length === 0 && (
              <div className="resualt-not-found">
                "{search}" bulunamamiştır.
              </div>
              )}
          </div> 
        )}

      </div>

    </div>
  );
}

export default App;
