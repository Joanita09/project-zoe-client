import { Typography } from '@material-ui/core';
import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { hasNoValue } from '../../../components/inputs/inputHelpers';
import { remoteRoutes } from '../../../data/constants';
import { IState } from '../../../data/types';
import { get, post } from '../../../utils/ajax';
import Toast from '../../../utils/Toast';

interface IProps {
    url?: string;
    title?: string;
    category?: string;
}

const AddHelpFileButton = ({url, title, category}: IProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  //Function to handle submissions
  const handleSubmit = () => {
    const toSave = {
      url: url,
      title: title,
      category: category,
    };

    post(remoteRoutes.help, toSave, () => {
      Toast.success('Help File Added'); 
    });
  };

  useEffect(() => {
    setLoading(true);
    get(
      `${remoteRoutes.help}`,
      (data) => {
        for (let i = 0; i < data.length; i++) {
          //check if the file was already added
          if (data[i].url === url) {
            setAdd(data[i].url);
          }
        }
      }, undefined, 
      () => {
        setLoading(false);
      }
    );
  }, [url]);

  return hasNoValue(add)? (
    <Box display="flex">
      <Box pr={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Add Help File &nbsp;&nbsp;
        </Button>
      </Box>
  </Box>
  ) : (
    <Typography> Add Help File </Typography>
  );
}; 

export default AddHelpFileButton;
