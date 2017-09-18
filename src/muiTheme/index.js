import { createMuiTheme } from 'material-ui/styles'
import { teal, red } from 'material-ui/colors'


export default createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
    },
    heights: {
        appbar: 56,
    }
})