import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div style={{ margin: 'auto', textAlign: 'center', width:'400px'}}>
      <CircularProgress sx={{ color: '#762fcf' }} />
    </div>
  );
};

export default Loading;
