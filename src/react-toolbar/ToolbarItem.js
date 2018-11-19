import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import MeasureContext from "./MeasureContext";

class ToolbarItem extends Component {
    static propTypes = {
        itemKey: PropTypes.string.isRequired,
        float: PropTypes.oneOf(['left', 'right']),
        children: PropTypes.any,
    };

    static defaultProps = {
        float: 'left',
    };

    static contextType = MeasureContext;

    onResize = ({bounds}) => this.context.onMeasure(this.props.itemKey, bounds);

    render() {
        const {children, itemKey, float, ...props} = this.props;
        return (
            <Measure
                bounds
                onResize={this.onResize}>
                {({measureRef}) =>
                    <div ref={measureRef}
                         style={{float}}
                         {...props}>
                        {children}
                    </div>
                }
            </Measure>
        );
    }
}

export default ToolbarItem;
