
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';




import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/mode/xml/xml'); 
require('codemirror/mode/javascript/javascript');



export const CodeEditor = (props, ref) => {

    let defaultVal = `function convertToF(celsius) {
    let fahrenheit = celsius * 9/5 + 32;
    return fahrenheit;
    }
      
      convertToF(30)`
      

    const [value, setValue] = useState(defaultVal);
const [output, setOutput] = useState('')
const [tests, setTests] = useState([
    {description: 'convertToF(0) should return a number ',
    test: `const tester = () =>  typeof convertToF(0) \n tester()`,
    expected: 'number',
    pass: 'start'
},
{description: 'convertToF(-30) should return -22 ',
test: `const tester = () =>  convertToF(-30) \n tester()`,
expected: -22,
pass: 'start'
},
{description: 'convertToF(-10) should return -14 ',
test: `const tester = () =>  convertToF(-10) \n tester()`,
expected: 14,
pass: 'start'
},
{description: 'convertToF(0) should return 32 ',
test: `const tester = () =>  convertToF(0) \n tester()`,
expected: 32,
pass: 'start'
},
{description: 'convertToF(20) should return 68 ',
test: `const tester = () =>  convertToF(20) \n tester()`,
expected: 68,
pass: 'start'
}

])



      const runTests = (input) => {
   
        tests.forEach(t=>{
 


    let testCase = value + '\n' + t.test
  
let result  =  eval(testCase)

if( result === t.expected){
    t.pass = true
}else{
    t.pass =false
}
setOutput(result)

        })
            
           
            
               
           
      }


 return(<div>
     <div className="description" style={{color: '#c3c3f3', padding: '30px'}}>


     
<h3>
    Basic Algorithm Scripting: Convert Celsius to Fahrenheit
</h3>
<p>
The algorithm to convert from Celsius to Fahrenheit is the temperature in Celsius times 9/5, plus 32. You are given a variable celsius representing a temperature in Celsius. Use the variable fahrenheit already defined and assign it the Fahrenheit temperature equivalent to the given Celsius temperature. Use the algorithm mentioned above to help convert the Celsius temperature to Fahrenheit. Don't worry too much about the function and return statements as they will be covered in future challenges. For now, only use operators that you have already learned</p>
</div>
     <CodeMirror  
     value={value}    
    options={{
        mode: 'javascript',    
        theme: 'material',    
        lineNumbers: true  
    }}
     onBeforeChange={(editor, data, value) => {    setValue(value)  }}  onChange={(editor, data, value) => {  }}

/>

<button onClick= {()=> runTests()}>Run </button>
{/* <h4 style ={{color: 'white'}}>{output}</h4> */}


{tests.map(t =>{
   return ( <div>
      {/* { t.pass? 
      <i className = 'fas fa-check-circle fa-2x'style={{color: 'green'}}></i>: 
      <p style={{color: 'red'}}>fail</p>

    //   <i className = 'fas fa-check-circle fa-2x'style={{color: 'red'}}></i>
      
      } */}
       <h4>{t.description}</h4>
   
    {t.pass==='start'? <Start/>:t.pass?<Check/>: <Fail/>}

       </div>)
})}



 </div>)

  


  }

 

  const Check = ()=> {
  return (
  <div>
      <i style={{color: 'green'}}className="fas fa-check-circle fa-2x"></i>
      </div>)
  }
  const Fail = ()=> (<div>

<i style={{color: 'red'}} className="fas fa-times-circle fa-2x"></i>

  </div>
  
  )

  const Start = ()=> (<div>

    <i style={{color: 'grey'}}className="fas fa-flask fa-2x"></i>
    
      </div>
      
      )