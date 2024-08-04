import { useCallback, useEffect, useState,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setlength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  const PassGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if (NumberAllowed) str += "0123456789"
    if (CharAllowed) str += "!@#$%^&*_"
    for (let i = 0; i <length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, NumberAllowed, CharAllowed, setPassword])
  useEffect(()=>{
    PassGenerator()
  },[length,NumberAllowed,CharAllowed])
const passRef=useRef(null)
const CopyToClipboard=useCallback(()=>{
  passRef.current?.select()
  passRef.current?.setSelectionRange(0,7)
window.navigator.clipboard.writeText(Password)
},[Password])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-700 bg-white text-center'>PASSWORD GENERATOR
      <div className='flex shadow-md rounded-lg overflow-hidden mb-4 bg-orange-600'>
        <input type='text'
          value={Password}
          className='outline-none w-full py-1 px-4 bg-orange-300 text-blue-800' placeholder='password' readOnly
       ref={passRef}
       ></input>
        <button className='outline-none px-3 py-0.5 bg-red-500 text-blue-800'
        onClick={CopyToClipboard}
        >COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setlength(e.target.value) }}>

          </input>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={NumberAllowed} id='numberInput' onChange={() => { setNumberAllowed(prev => !prev) }}></input>
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={CharAllowed} id='CharInput' onChange={() => { setCharAllowed(prev => !prev) }} ></input>
          <label htmlFor='CharInput'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
