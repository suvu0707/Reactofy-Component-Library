import React from 'react';
import Link from '@mui/material/Link';


function Link(props) {
  return (
    <Link href={props.href}>{props.text}</Link>
  )
}

export default Link;