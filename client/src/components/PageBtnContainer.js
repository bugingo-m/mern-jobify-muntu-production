import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useGlobalContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
const PageBtnContainer = () => {
    const {numOfPages,page,changePage}=useGlobalContext()
    const prevPage = () => {
        let pageNum=page - 1
        if(pageNum < 1){
            pageNum=numOfPages
        }
        changePage(pageNum)
      };
      const nextPage = () => {
        let pageNum=page + 1
        if(pageNum > numOfPages){
            pageNum=1
        }
        changePage(pageNum)
      };

      const pages = Array.from({length:numOfPages},(_,index)=>{
        return index + 1
      })
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className='btn-container'>
        {pages.map((pageNumber)=>{
            return(
                <button className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                 key={pageNumber} onClick={()=>changePage(pageNumber)}>
                {pageNumber}</button>
            )
        })}
      </div>

      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
