import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function SnackbarWithDecorators({ message, open,color, onClose }) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(open); // Sync local state with prop
  }, [open]);

  const handleSnackbarOpen = () => {
    setIsOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsOpen(false);
    onClose(); // Call onClose prop to handle close event
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="neutral" >
        Show Snackbar
      </Button> */}
      <Snackbar
      onClick={handleSnackbarOpen}
        variant="soft"
        color={color}
        open={isOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={handleSnackbarClose}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        {message}
      </Snackbar>
    </React.Fragment>
  );
}
