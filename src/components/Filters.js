import { useEffect, useState } from "react"

const Filters=()=>{
  const [filter,setFilter]=useState('photos')
  const [list,setList]=useState([])
  let [count,setCount]=useState(0)
  function handleFilter(value){
    setFilter(value)
  }
  async function fetchData(){
    const res=await fetch(`https://jsonplaceholder.typicode.com/${filter}`)
    const data= await res.json()
    const filteredData= data.slice(0,10)
    setList(filteredData)
  }
  
  useEffect(()=>{
    fetchData()
  },[filter])


  return(
    <>
     <select 
     name="cars" 
     id="cars" 
     onChange={(e)=>{
      handleFilter(e.target.value)
     }}>
          <option value="posts">Posts</option>
          {/* <option value="comments">Comments</option> */}
          <option value="albums">Albums</option>
          <option value="photos">Photos</option>
      </select>
      <div>
        {
          list.map((item)=>{
            return (
              <h1>{item.title}</h1>
            )
          })
        }
      </div>
      <h1>{count}</h1>
      <button onClick={
        (e)=>{
          setCount(count++)
        }
      }>+</button>
      </>
  )
}

export default Filters