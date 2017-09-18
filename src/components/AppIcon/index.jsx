import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'
import "./index.scss"
import PropTypes from 'prop-types'


export default ({icon, ...props}) => (
    <div className="svg-icon-position-helper">
        <SvgIcon {...props} viewBox="0 0 100 100">
            <path className={`app-icon ${icon}`} />
        </SvgIcon>
    </div>
)