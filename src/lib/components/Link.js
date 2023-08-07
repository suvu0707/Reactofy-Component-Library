import React from 'react';
import CustomLink from '@mui/material/Link';

function MyCustomLink(props) {
  return (
    <CustomLink href={props.href}>{props.text}</CustomLink>
  );
}

export default MyCustomLink;
