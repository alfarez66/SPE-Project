import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
// import { deleteRoom } from '../../../actions/room';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
  } from 'react';

  const initialState = {
    currentUser: null,
    openLogin: false,
    loading: false,
    alert: { open: false, severity: 'info', message: '' },
    profile: { open: false, file: null, photoURL: '' },
    images: [],
    details: { title: '', description: '', price: 0 },
    location: { lng: 0, lat: 0 },
    rooms: [],
    priceFilter: 50,
    addressFilter: null,
    filteredRooms: [],
    room: null,
    users: [],
  };

  const Context = createContext(initialState);

  // const useValue = () => {
  //   return useContext(Context);
  // };
  

const imagesActions = ({ params }) => {
  // const {
  //   dispatch,
  //   state: { currentUser },
  // } = useValue();
  return (
    <Box>
      <Tooltip title="View room details">
        <IconButton
        //   onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton
        //   onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default imagesActions;