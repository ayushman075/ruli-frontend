import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axiosInstance from "@/utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const EvaluateRule = () => {
    const [selectedRule, setSelectedRule] = useState(null);
    const [inputValues, setInputValues] = useState({});
  const [result,setResult] = useState();
  const [show,setShow]=useState(false);
    // Handle rule selection
    const handleRuleChange = (ruleValue) => {
      const rule = ruleDropdown.find((r) => r._id === ruleValue);
      setSelectedRule(rule);
      setInputValues({}); // Reset input values when rule changes
      setShow(false);
    };
  
    // Handle input change
    const handleInputChange = (field, value) => {
      setInputValues((prev) => ({ ...prev, [field]: value }));
    };
    const validateFields = () => {
        if (!selectedRule){ 
            toast.error(`Select a rule to evaluate`);
            return false;}
    
        for (const field of selectedRule.fields) {
          if (!inputValues[field]) {
            toast.error(`Please fill in the ${field} field.`);
            return false;
          }
        }
    
        return true;
      };
    // Evaluate the rule (Placeholder function)
    const evaluateRule = () => {
        if (!selectedRule) {
            toast.error("Select a rule to evaluate")
            return;
          }

       else if(!validateFields){
        toast.error("Some fields are empty !!")
        return;
       }
       else{
      
          const payload = {
            ruleId: selectedRule._id,
            data: inputValues,
          };

          axiosInstance.post("rule/evaluate",payload).then((response)=>{
            if(response.data.statusCode<400){
            setResult(response.data.data.result);
            console.log(result)
            toast.success("Data evaluated successfully")
            setShow(true)
            }
            else{
                toast.error("An error occurred while getting Rule Evaluation !!")
                console.log(response.data);
               
            }
          }).catch((error)=>{
           
            toast.error("An error occurred while getting Rule Evaluation !!")
            console.log(error.data);
          })

        }
      // Add your rule evaluation logic here
    };
  
    const [ruleDropdown,setRuleDropdown]=useState([])

    useEffect(()=>{
        axiosInstance.get("rule/get").then((response)=>{

            if(response.data.statusCode<400){
            const rules=response.data.data.rules;
            setRuleDropdown(rules) 
            
        }
        else{
            toast.error("An error occurred while getting Rules dropdown !!")
            console.log(response.data);
        }

        }).catch((error)=>{
            toast.error("An error occurred while getting Rules dropdown !!")
            console.log(error.data);
        })
    },[])


  return (
    <div className="p-4 bg-[#1E3E62] my-6 rounded-lg">
      <Select autoComplete="true" className="text-white" onValueChange={handleRuleChange}>
        <SelectTrigger className="w-full" style={{color:"white"}}>
          <SelectValue placeholder="Select Rule" />
        </SelectTrigger>
        <SelectContent> 
          {ruleDropdown.map((rule) => (
            <SelectItem key={rule._id} value={rule._id}>
              {rule.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedRule && (
        <div className="mt-4 justify-evenly pr-3 w-full flex flex-row flex-wrap">
          {selectedRule.fields.map((field) => (
            <div key={field} >
              <input
                type="text"
                className="w-full  max-md:w-full mx-3 my-2 justify-center p-2 border rounded bg-secondary text-white"
                placeholder={`Enter ${field}`}
                value={inputValues[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </div>
          ))}

          <button
            className="bg-[#FF6500] text-white border-2 border-[#FF6500] hover:bg-transparent p-4 py-2 h-fit rounded-lg my-auto"
            onClick={evaluateRule}
          >
            Evaluate
          </button>
         
        </div>
      )}
       <div className="text-white my-3">
            {show&&<p>{result==true?"Success, The given data follows the selected rule.":"Oops, The given data dosen't follow the selected rule."}</p>}
          </div>
    </div>
  )
}

export default EvaluateRule
