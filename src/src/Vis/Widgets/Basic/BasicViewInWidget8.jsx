/**
 *  ioBroker.vis
 *  https://github.com/ioBroker/ioBroker.vis
 *
 *  Copyright (c) 2022-2023 bluefox https://github.com/GermanBluefox,
 *  Creative Common Attribution-NonCommercial (CC BY-NC)
 *
 *  http://creativecommons.org/licenses/by-nc/4.0/
 *
 * Short content:
 * Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
 * Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
 * (Free for non-commercial use).
 */

import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from '@iobroker/adapter-react-v5';

import VisRxWidget from '../../visRxWidget';

class BasicViewInWidget8 extends VisRxWidget {
    static getWidgetInfo() {
        return {
            id: 'tplStatefulContainerView8',
            visSet: 'basic',
            visName: 'View in widget 8',
            visAttrs: 'oid;count[1]/number;group.views;contains_view_(0-count)/views',
            visPrev: 'widgets/basic/img/Prev_StatefulContainerView8.png',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return BasicViewInWidget8.getWidgetInfo();
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);
        // set default width and height
        if (props.style.width === undefined) {
            props.style.width = 400;
        }
        if (props.style.height === undefined) {
            props.style.height = 270;
        }

        const viewArr = [];
        let i = 0;
        while (this.state.rxData[`contains_view_${i}`] !== undefined) {
            viewArr.push(this.state.rxData[`contains_view_${i}`]);
            i++;
        }

        const oid = this.state.rxData.oid;
        let val = this.state.values[`${oid}.val`];
        let view;

        if (oid !== 'nothing_selected' && val !== undefined) {
            if (val === 'true' || val === true)  {
                val = 1;
            }
            if (val === 'false' || val === false) {
                val = 0;
            }
            view = viewArr[val];
        } else {
            view = viewArr[0];
        }
        /*
        <% if (vis.editMode) { %>
            <div class="editmode-helper" />
        <% } %>
        <%
            var viewArr = [];
            var i = 0;
            while (data.attr('contains_view_' + i) !== undefined) {
                viewArr.push(data.attr('contains_view_' + i));
                i++;
            }
        %>
        <div class="vis-widget-body">
            <div class="vis-view-container" data-oid="<%= data.attr('oid') %>" data-vis-contains="<%= vis.binds.stateful.value(viewArr, data.attr('oid')) %>" <%= (el) -> vis.binds.stateful.view(el, viewArr, data.attr('persistent'), data.attr('notIfInvisible')) %> />
        </div>
         */
        if (view === this.props.view) {
            return <div className="vis-widget-body" style={{ overflow: 'hidden', position: 'absolute' }}>
                {I18n.t('vis_2_widgets_basic_cannot_recursive')}
            </div>;
        }

        return <div className="vis-widget-body" style={{ overflow: 'hidden', position: 'absolute' }}>
            {this.state.editMode ? <div className="editmode-helper" /> : null}
            {super.getWidgetView(view)}
        </div>;
    }
}

BasicViewInWidget8.propTypes = {
    id: PropTypes.string.isRequired,
    VisView: PropTypes.any.isRequired,
    views: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
    dateFormat: PropTypes.string,
};

export default BasicViewInWidget8;
