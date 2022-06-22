import React from 'react'

import * as classes from "./Wrapper.module.scss"

const Wrapper: React.FC = ({children}) => <div className={classes.wrapper}>{children}</div>

export default Wrapper