/**
 *  ioBroker.vis
 *  https://github.com/ioBroker/ioBroker.vis
 *
 *  Copyright (c) 2023 bluefox https://github.com/GermanBluefox,
 *  Creative Common Attribution-NonCommercial (CC BY-NC)
 *
 *  http://creativecommons.org/licenses/by-nc/4.0/
 *
 * Short content:
 * Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
 * Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
 * (Free for non-commercial use).
 */
import PropTypes from 'prop-types';

import JQuiButton from './JQuiButton';

class JQuiContainerDialog extends JQuiButton {
    static getWidgetInfo() {
        const widgetInfo = JQuiButton.getWidgetInfo();

        const newWidgetInfo = {
            id: 'tplContainerDialog',
            visSet: 'jqui',
            visName: 'container - HTML - view in jqui Dialog',
            visWidgetLabel: 'jqui_container_dialog',
            visPrev: 'widgets/jqui/img/Prev_ContainerDialog.png',
            visOrder: 7,
            visAttrs: widgetInfo.visAttrs,
        };

        // Add note
        newWidgetInfo.visAttrs[0].fields.unshift({
            name: '_note',
            type: 'help',
            text: 'jqui_button_link_blank_note',
        });

        // set resizable to true
        const visResizable = JQuiButton.findField(newWidgetInfo, 'visResizable');
        visResizable.default = true;

        const buttonText = JQuiButton.findField(newWidgetInfo, 'buttontext');
        buttonText.default = 'Container Dialog';

        const htmlDialog = JQuiButton.findField(newWidgetInfo, 'html_dialog');
        htmlDialog.default = '<div>HTML Dialog</div>';

        return newWidgetInfo;
    }

    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return JQuiContainerDialog.getWidgetInfo();
    }
}

JQuiContainerDialog.propTypes = {
    id: PropTypes.string.isRequired,
    views: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default JQuiContainerDialog;
