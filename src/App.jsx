import { useState, useCallback, useEffect, useRef} from "react"



function App() {
  const [length, setLength] = useState(8)
  const [numberOn, setNumberOn] = useState(false)
  const [characterOn, setCharacterOn] = useState(false)
  const [password, setPassword] = useState("")
  const Copyref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberOn) {
      str += "0123456789"
    }
    if (characterOn) {
      str += "!@#$%^&*_+=[]{}~`]"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)


  }, [length, numberOn, characterOn, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberOn, characterOn, passwordGenerator])

  const copyPassword = useCallback(()=>{
    Copyref.current?.select();
    // Copyref.current?.setSelectionRange(0,3) (for range selection)
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    <>
      <div className="w-full h-screen" style={{ backgroundColor: "black" }}>
        <div className="h-screen flex justify-center items-center">
          <div className=" text-cyan-600 bg-gray-700 shadow-md rounded-lg  px-4 py-4 ">
            <h1 className="text-cyan-600 text-3xl text-center font-bold mb-4">Password Generator</h1>
            <div className="flex  shadow rounded-lg overflow-hidden mb-4">
              <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={Copyref}
              />

              <button className="bg-cyan-600 text-white px-3 font-medium" onClick={copyPassword}>Copy</button>
            </div>

            <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                  <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}/>
                  <label >length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                    <input type="checkbox" defaultChecked={numberOn} id="numberInput" onChange={() => {
                      setNumberOn((prev)=> !prev)
                    }} />
                     <label htmlFor="numberInput">Number</label>
              </div>
              <div className="flex items-center gap-x-1">
                    <input type="checkbox" defaultChecked={characterOn} id="charInput" onChange={() => {
                      setCharacterOn((prev)=> !prev)
                    }} />
                     <label htmlFor="charInput">Character</label>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <button className="bg-cyan-600 text-white px-3 font-medium p-1 rounded-md" onClick={passwordGenerator}>Generate password</button>
            </div>
          </div>


        </div>

      </div>
    </>
  )
}

export default App

