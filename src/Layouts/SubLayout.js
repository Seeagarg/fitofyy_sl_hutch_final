import React from 'react'
import classes from './SubLayout.module.css'

const SubLayout = ({children}) => {
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    {children}
    </div>
    </div>
  )
}

export default SubLayout
