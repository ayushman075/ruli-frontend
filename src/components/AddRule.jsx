import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import rootShouldForwardProp from '@mui/material/styles/rootShouldForwardProp'
import { toast } from 'react-toastify'
import axiosInstance from '@/utils/axiosConfig'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const AddRule = () => {
    const [activeTab, setActiveTab] = useState(0);
    const addRuleRef = useRef(null);
    const updateRuleRef = useRef(null);
    const [rule1,setRule1] = useState("");
    const [rule2,setRule2] = useState("");
    const [ruleName,setRuleName] = useState("");

    const handleCombineRule =  () => {
      if(!ruleName){
        toast.error("Please enter rule name to proceed")
      }
      if(!rule1){
        toast.error("Please select Rule 1 to proceed")
      }
      else if(!rule2){
        toast.error("Please select Rule 2 to proceed")
      }
      else {
        setLoading(true);
        axiosInstance.post("rule/combine",{name:ruleName,rule1Id:rule1,rule2Id:rule2}).then((response)=>{
            if(response.data.statusCode<400){
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message); 
            }
        console.log(response);
        setLoading(false);
        }).catch((error)=>{
            toast.error("An error occurred while combining rule, Please try again !!")
            console.log(error)
            setLoading(false);
        })
      }
    }

    useEffect(() => {
        if (addRuleRef.current && updateRuleRef.current) {
          // Set styles based on the activeTab
          if (activeTab === 0) {
            addRuleRef.current.style.backgroundColor = '#FF6500';
            updateRuleRef.current.style.backgroundColor = '#0B192C';
          } else {
            addRuleRef.current.style.backgroundColor = '#0B192C';
            updateRuleRef.current.style.backgroundColor = '#FF6500';
          }
          // Set text color for both tabs
          addRuleRef.current.style.color = 'white';
          updateRuleRef.current.style.color = 'white';
        }
      }, [activeTab]); // Triggered whenever activeTab changes
    
      const handleTabClick = (index) => {
        setActiveTab(index);
      };
    const [loading,setLoading]=useState(false);

    const [ruleData,setRuleData]=useState({
        name:"",
        ruleString:"",
        fields:[],
    })

    const [ruleDropdown,setRuleDropdown]=useState([]);

    useEffect(()=>{
        axiosInstance.get("rule/get").then((response)=>{

            if(response.data.statusCode<400){
            const rules=response.data.data.rules;

            const rulesArr=[];

            rules.map((rule)=>{
                rulesArr.push({label:rule.name,value:rule._id})
            })

            setRuleDropdown(rulesArr) 
        }
        else{
            toast.error("An error occurred while getting Rules dropdown !!")
            console.log(response.data);
        }

        }).catch((error)=>{
            toast.error("An error occurred while getting Rules dropdown !!")
            console.log(error)
        })
    },[])
  
    const handleRuleSave = () =>{
        if(!ruleData.name){
            toast.error("Rule name is required !!")
        }
        else if(!ruleData.ruleString){
            toast.dark.error("Rule string is required !!")
        }
        else if(ruleData.fields.length<1){
            toast.error("Rule Fields is required !!")
        }
        else{
            setLoading(true);
            axiosInstance.post("rule/create",ruleData).then((response)=>{
                if(response.data.statusCode<400){
                    toast.success(response.data.message);
                }
                else{
                    toast.error(response.data.message); 
                }
            console.log(response);
            setLoading(false);
            }).catch((error)=>{
                toast.error("An error occurred while adding rule, Please try again !!")
                console.log(error)
                setLoading(false);
            })
        }
    }
  return (
    <div className='w-full'>
    <Tabs defaultValue="addRule" className="w-full">
      <TabsList className="grid w-full grid-cols-2 text-white bg-[#0B192C]">
        <TabsTrigger value="addRule"  ref={addRuleRef}  
          onClick={()=>{handleTabClick(0)}}>Add Rule</TabsTrigger>
        <TabsTrigger value="updateRule" ref={updateRuleRef}  
        onClick={()=>{handleTabClick(1)}}>Combine Rule</TabsTrigger>
      </TabsList>
      <TabsContent value="addRule" >
        <Card className="bg-[#0B192C] text-white border-0">
          <CardHeader>
            <CardTitle>Add Rule</CardTitle>
            <CardDescription>
              Add new Rule to evaluate data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Rule Name</Label>
              <Input id="ruleName" defaultValue="" onChange={(e)=>{setRuleData((prev)=>({...prev,name:e.target.value}));console.log(ruleData)}}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="ruleString">Rule String</Label>
              <Input id="ruleString" defaultValue="" onChange={(e)=>{setRuleData((prev)=>({...prev,ruleString:e.target.value}));console.log(ruleData)}}/>
            </div>
            <div className="space-y-1">
            <Label htmlFor="ruleFields">Fields</Label>
            <Input id="ruleFields" defaultValue="" onChange={(e)=>{setRuleData((prev)=>({...prev,fields:e.target.value.split(',')}));console.log(ruleData)}} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#FF6500] border-2 border-[#FF6500] p-5" disabled={loading} onClick={handleRuleSave}>{loading?"Processing ...":"Save"}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="updateRule">
        <Card className="bg-[#0B192C] text-white border-0">
          <CardHeader>
            <CardTitle>Combine Rule</CardTitle>
            <CardDescription>
              Combine two existing Rule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Rule Name</Label>
              <Input id="ruleName" defaultValue="" onChange={(e)=>{setRuleName(e.target.value)}}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Select Rule 1</Label>
              <Select autoComplete="true" onValueChange={(e)=>{setRule1(e)}}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Rule" />
  </SelectTrigger>
  <SelectContent>
  
    {ruleDropdown.map((rule)=>{
      
      return(
        <SelectItem key={rule.value}  value={rule.value}>{rule.label}</SelectItem>
      )
   
    })}
  </SelectContent>
</Select>
            </div>
            <div className="space-y-1">
            <Label htmlFor="current">Select Rule 2</Label>
              <Select autoComplete="true" onValueChange={(e)=>{setRule2(e)}}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Rule" />
  </SelectTrigger>
  <SelectContent>
  
    {ruleDropdown.map((rule)=>{
      if(rule1!=rule.value){
      return(
        <SelectItem key={rule.value}  value={rule.value}>{rule.label}</SelectItem>
      )
    }
    })}
  </SelectContent>
</Select>
            </div>
          </CardContent>
          <CardFooter>
          <Button className="bg-[#FF6500] border-2 border-[#FF6500] p-5" disabled={loading} onClick={handleCombineRule}>{loading?"Processing ...":"Combine"}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    </div>
  )
}

export default AddRule
