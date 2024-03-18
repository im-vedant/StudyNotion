import { useEffect } from "react";
function useOnOutsideClick(ref,handler) {
 useEffect(()=>{
    const listener=(e)=>{
        if(ref.current===null || ref.current.contains(e.target) )
        return ;
    handler()
    }
    document.addEventListener('mousedown',listener)
    return ()=>{
        document.removeEventListener('mousedown',listener)
    }
 })
}

export default useOnOutsideClick