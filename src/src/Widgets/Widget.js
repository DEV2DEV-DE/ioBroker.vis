import PropTypes from 'prop-types';
import I18n from '@iobroker/adapter-react-v5/i18n';
import { withStyles } from '@mui/styles';

import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import image from '../img/Prev_HTML.png';

const styles = () => ({
    widget: {
        borderStyle: 'solid',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'orange',
        width: 120,
        display: 'inline-flex',
        margin: 4,
        height: 30,
    },
    widgetTitle: {
        textAlign: 'center', flex: 1, alignSelf: 'center', color: 'black',
    },
    widgetImage: {
        width: 20,
    },
    widgetImageContainer: {
        borderLeftStyle: 'solid', borderLeftWidth: 1, borderLeftColor: 'gray', display: 'flex', padding: 4, alignItems: 'center',
    },
});

const Widget = props => {
    const result = <div className={props.classes.widget}>
        <div className={props.classes.widgetTitle}>{window._(props.widgetType.name)}</div>
        <span className={props.classes.widgetImageContainer}>
            <img className={props.classes.widgetImage} src={image} alt="" />
        </span>
    </div>;

    const widthRef = useRef();
    const [, dragRef, preview] = useDrag(
        {
            type: 'widget',
            item: () => ({
                widgetType: props.widgetType,
                preview: <div style={{ width: widthRef.current.offsetWidth }}>
                    {result}
                </div>,
            }),
            end: (item, monitor) => {
            },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }, [props.widgetType],
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [props.widgetType]);

    return <span ref={dragRef}>
        <span ref={widthRef}>
            {result}
        </span>
    </span>;
};

Widget.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Widget);
