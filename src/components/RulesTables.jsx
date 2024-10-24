import React, { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axiosConfig';
import { toast } from 'react-toastify';
import { Space, Table, Tag } from 'antd';
const columns = [
    {
      title: 'Rule Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Is Combined',
      dataIndex: 'isCombined',
      key: 'isCombined',
      render: (isCombined) => (
        <Tag color={isCombined ? 'green' : 'volcano'}>
          {isCombined ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Rule String',
      dataIndex: 'ruleString',
      key: 'ruleString',
    },
    {
      title: 'Fields',
      dataIndex: 'fields',
      key: 'fields',
      render: (fields) => fields.join(', '),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      
    },
  
  ];
  
 

const RulesTables = () => {
    const [rulesData,setRuleData]=useState([]);

    useEffect(()=>{
        axiosInstance.get("rule/get").then((response)=>{

            if(response.data.statusCode<400){
            const rules=response.data.data.rules;

          setRuleData(rules);

          
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

   
  return (
    <div>
       <div className='my-6'>
       <Table
      columns={columns}
      dataSource={rulesData}
      pagination={false} // Adjust pagination as needed
      rowKey="_id" // Use _id as the unique key for each row
    />
    </div>
    </div>
  )
}

export default RulesTables
