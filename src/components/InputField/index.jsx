import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import * as a from 'store/actions'

@connect(store => ({
    errors: store.errors
}))
export default class InputField extends React.Component {

    render() {
        const error = this.props.errors.filter(error => error.name == this.props.id)[0]
        const { dispatch, ...inputFieldProps } = this.props
        return (
            <TextField
                onFocus={ () => this.props.dispatch(a.removeError(this.props.id)) }
                error={ !!error }
                helperText={ error ? error.msg : this.props.helperText ? this.props.helperText : "" }
                { ...inputFieldProps }
            />
        )
    }
}

InputField.propTypes = {
    id: PropTypes.string.isRequired
}