import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHearder() {
  return (
    <div className='p-5 flex justify-end shadow-md sticky top-0 bg-white z-10'>
      <UserButton/>
    </div>
  )
}

export default DashboardHearder
