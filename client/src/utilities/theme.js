import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: indigo
    },
    spacing: {
        unit: 1
    },
    typography: { useNextVariants: true }
});

export default theme