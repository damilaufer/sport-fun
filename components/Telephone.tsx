import React from 'react'

import { MyTextField } from './MyTextField'

const Telephone = (params) => {
  return <MyTextField type="tel" {...params} />
}

export { Telephone }
