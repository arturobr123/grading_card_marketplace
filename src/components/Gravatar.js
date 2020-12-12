import React from 'react';
import md5 from 'md5';

// Aprende más del Gravatar en: http://gravatar.com
function Gravatar(props) {
  const url = props.avatarURL;

  return (
    <img
      className={props.className}
      src={url}
      alt="Avatar"
    />
  );
}

export default Gravatar;
