import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHearder() {
  return (
    <div className='p-5 flex justify-end shadow-md'>
      <UserButton/>
    </div>
  )
}

export default DashboardHearder
