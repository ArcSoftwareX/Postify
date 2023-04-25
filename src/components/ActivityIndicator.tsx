import React from 'react'

const ActivityIndicator = ({ size }: { size: number }) => {
  return (
    <div className='animate-spin'>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='opacity-50'><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
    </div>
  )
}

export default ActivityIndicator