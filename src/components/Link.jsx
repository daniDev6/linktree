import { useEffect, useRef, useState } from "react"
export default function Link({docId,title,url,onDelete,onUpdate}){
    const [currentTitle,setCurrentTitle]=useState(title)
    const [editTitle,setEditTitle]=useState(false)
    const [currentUrl,setCurrentUrl]=useState(url)
    const [editUrl,setEditUrl]=useState(false)

    const titleRef=useRef(null)
    const urlRef=useRef(null)
    useEffect(()=>{
        if(titleRef.current){
            titleRef.current.focus()
        }
        if(urlRef.current){
            urlRef.current.focus()
        }
    },[editTitle,editUrl])



    const handleEditTitle=()=>{
        setEditTitle(true)
    }
    const handleEditUrl=()=>{
        setEditUrl(true)
    }
    const handleChangeTitle=(e)=>{
        setCurrentTitle(e.target.value)
    }
    const handleChangeUrl=(e)=>{
        setCurrentUrl(e.target.value)
    }

    const handleBlurTitle=(e)=>{
        onUpdate(docId,currentTitle,currentUrl)
        setEditTitle(false)
    }
    const handleBlurUrl=(e)=>{
        onUpdate(docId,currentTitle,currentUrl)
        setEditUrl(false)
    }
    const handleDelete=()=>{
        onDelete(docId)
    }
    return(
        <div key={docId}>
            <div>
                {
                    editTitle?<>
                    <input ref={titleRef} onBlur={handleBlurTitle} type="text" value={currentTitle} onChange={handleChangeTitle}/>
                    </>:<>
                    <button onClick={handleEditTitle}>Edit</button>
                {currentTitle}
                    </>
                }
                
            </div>
            <div>
                {
                    editUrl?<>
                        <input onBlur={handleBlurUrl} ref={urlRef} type="text" value={currentUrl} onChange={handleChangeUrl} />
                    </>:<>
                    <button onClick={handleEditUrl}>Edit</button>
                {currentUrl}
                    </>

                }
                
            </div>
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
        </div>
        )
}