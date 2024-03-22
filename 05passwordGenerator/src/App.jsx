import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str =str+"0123456789"
    }
    if(charAllowed) {
      str=str+"!@#$%^&*(_+=-``/*~"
    }
    for (let i =1 ; i<=length ;i++){
      let char =Math.floor(Math.random()*str.length+1)  
      pass = pass + str.charAt(char)
      
       
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])
  
  
  
  
 




  useEffect(() => {
    passwordGenerator()
    }
    ,[length,numberAllowed,charAllowed,
   passwordGenerator])


    const passwordRef = useRef(null)

    const copyPasswordToClipboard = useCallback(() => {
      
        passwordRef.current.select();
        passwordRef.current.setSelectionRange(0, 3);
        console.log("Selected Text:", passwordRef.current.value);
      
      window.navigator.clipboard.writeText(password)
      


    },[password])
    



  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 text-orange-500 '>
      <h1 className='text-2xl   text-center  text-white mt-10 pt-5'>Password Generator</h1>


          <div className=' flex mb-4 rounded-lg overflow-hideen shadow pt-5 '>
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-2xl mb-2'
            placeholder='password'
            readOnly
            ref={passwordRef}
          
            
            
            />
            <button onClick={copyPasswordToClipboard}
             className='bg-blue-700 outline-none px-3 py-0.5 shrink-0 mb-2 ml-2 text-white rounded-2xl  '>Copy</button>

          </div>

          <div className='flex gap-x-2 text-sm  '>
            <div className='flex items-center gap-x-2'>
              <input 
                   type="range"
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e) => {
                  setLength(e.target.value)
                     }}
              
                />
              <label>Lengh:({length})</label>
              
            </div>

            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox" 
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumAllowed(prev => !(prev));
                }}

                
                
                
                />
                   <label htmlFor="numberInput">Numbers</label>

            </div>

            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              id="characterInput" 
              onChange={() => {
                setCharAllowed(prev => !(prev));
              }}
              
              
              
              />
              <label htmlFor="characterInput">Characters</label>
            </div>

          </div>
      </div>
    </>
  )
}

export default App
