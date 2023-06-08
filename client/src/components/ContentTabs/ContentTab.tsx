
import React from 'react'

type Props = {
  title: string,
  children: React.ReactNode;
}


const ContentTab: React.FC<Props> = ({ children } ) => {
  return <div>{children}</div>
}

export default ContentTab
  