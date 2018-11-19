import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Measure from "react-measure";
import MeasureContext from './MeasureContext';
import ToolbarItem from "./ToolbarItem";

class Toolbar extends Component {
    static defaultProps = {
        children: PropTypes.array,
        className: PropTypes.string,
    };

    static propTypes = {};

    state = {
        width: Number.MAX_SAFE_INTEGER,
    };

    items = {};

    onMeasureItem = (key, size) => {
        this.items[key] = size;
        console.log('Item size', key, size);
        if (this.rafTimer) cancelAnimationFrame(this.rafTimer);
        this.rafTimer = requestAnimationFrame(() => this.forceUpdate());
    };

    onResize = ({bounds}) => {
        const {width} = bounds;
        this.setState({width});
    };

    ctx = {
        onMeasure: this.onMeasureItem
    };

    getItemSize = key => this.items[key] || {width: 0, height: 0};

    render() {
        const {children, className, ...props} = this.props;
        const availableSpace = this.state.width - this.getItemSize('kebab').width;
        let incWidth = 0;
        const {visible, hidden} = children.reduce((mappedChilds, ch) => {
                incWidth += this.getItemSize(ch.key).width;
                if (incWidth < availableSpace) {
                    mappedChilds.visible.push(React.cloneElement(ch, {
                        key: ch.key,
                        itemKey: ch.key,
                    }));
                } else {
                    mappedChilds.hidden.push(React.cloneElement(ch, {
                        key: ch.key,
                        itemKey: ch.key,
                    }));
                }
                return mappedChilds;
            }, {visible: [], hidden: []}
        );
        return (
            <MeasureContext.Provider value={this.ctx}>
                <Measure
                    bounds
                    onResize={this.onResize}>
                    {({measureRef}) =>
                        <div
                            ref={measureRef}
                            className={cn(className)}
                            {...props}>
                            {visible}
                            <ToolbarItem itemKey="kebab" float="right">
                                <button>...</button>
                            </ToolbarItem>
                        </div>}
                </Measure>
            </MeasureContext.Provider>
        );
    }
}

export default Toolbar;
