import { I18n } from '@iobroker/adapter-react-v5';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react';

const MarketplaceDialog = props => {
    const VisMarketplace = window.VisMarketplace?.default;

    return <Dialog
        open={props.open}
        fullScreen
        onClose={props.onClose}
        PaperProps={{
            color: 'primary',
        }}
    >
        {props.addPage ? <DialogTitle>{I18n.t('Add widget or add revision to existing widget')}</DialogTitle> : null}
        <DialogContent>
            {VisMarketplace &&
                    <VisMarketplace
                        addPage={props.addPage}
                        widget={props.widget}
                        onClose={props.onClose}
                        installWidget={props.installWidget}
                        installedWidgets={props.installedWidgets}
                    />}
        </DialogContent>
        <DialogActions>
            <Button
                onClick={props.onClose}
                variant="contained"
                startIcon={<Close />}
            >
Close
            </Button>
        </DialogActions>
    </Dialog>;
};

export default MarketplaceDialog;