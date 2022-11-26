/* eslint-disable */

/**
 * Copyright 2020-2022, bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Hidden, Tooltip } from '@mui/material';

import ErrorDialog from '@iobroker/adapter-react-v5/Dialogs/Error';
import Utils from '@iobroker/adapter-react-v5/Components/Utils';
import TextInputDialog from '@iobroker/adapter-react-v5/Dialogs/TextInput';
import { EXTENSIONS } from '@iobroker/adapter-react-v5/Components/FileViewer';
import FileViewer from '@iobroker/adapter-react-v5/Components/FileViewer';

// Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import JsonIcon from '@mui/icons-material/Bookmark';
import CssIcon from '@mui/icons-material/BookmarkBorder';
import HtmlIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import JSIcon from '@mui/icons-material/Code';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import UploadIcon from '@mui/icons-material/Publish';
import MusicIcon from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/SaveAlt';
import AddFolderIcon from '@mui/icons-material/CreateNewFolder';
import EmptyFilterIcon from '@mui/icons-material/FolderOpen';
import IconList from '@mui/icons-material/List';
import IconTile from '@mui/icons-material/ViewModule';
import IconBack from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness5Icon from '@mui/icons-material/Brightness6';

import ExpertIcon from '@iobroker/adapter-react-v5/icons/IconExpert';
import IconClosed from '@iobroker/adapter-react-v5/icons/IconClosed';
import IconOpen from '@iobroker/adapter-react-v5/icons/IconOpen';
import IconNoIcon from '@iobroker/adapter-react-v5/icons/IconNoIcon';

import withWidth from '@iobroker/adapter-react-v5/Components/withWidth';

const ROW_HEIGHT   = 32;
const BUTTON_WIDTH = 32;
const TILE_HEIGHT  = 120;
const TILE_WIDTH   = 64;

const NOT_FOUND = 'Not found';

const styles = theme => ({
    dialog: {
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
    root: {
        width: '100%',
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
    },
    filesDiv: {
        width: `calc(100% - ${theme.spacing(2)})`,
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: theme.spacing(1),
    },
    filesDivTable: {
        height: `calc(100% - ${48 + parseInt(theme.spacing(1), 10)}px)`,
    },
    filesDivTile: {
        height: `calc(100% - ${48 * 2 + parseInt(theme.spacing(1), 10)}px)`,
        display: 'flex',
        alignContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        flex: `0 0 ${TILE_WIDTH}px`,
    },

    itemTile: {
        position: 'relative',
        userSelect: 'none',
        cursor: 'pointer',
        height: TILE_HEIGHT,
        width: TILE_WIDTH,
        display: 'inline-block',
        textAlign: 'center',
        opacity: 0.1,
        transition: 'opacity 1s',
        margin: 4,
        '&:hover': {
            background: theme.palette.secondary.light,
            color: Utils.invertColor(theme.palette.secondary.main, true),
        },
    },
    itemNameFolderTile: {
        fontWeight: 'bold',
    },
    itemNameTile: {
        width: '100%',
        height: 32,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 12,
        textAlign: 'center',
        wordBreak: 'break-all',
    },
    itemFolderIconTile: {
        width: '100%',
        height: TILE_HEIGHT - 32 - 16 - 8, // name + size
        display: 'block',
        paddingLeft: 8,
        color: theme.palette.secondary.main || '#fbff7d',
    },
    itemFolderIconBack: {
        position: 'absolute',
        top: 22,
        left: 18,
        zIndex: 1,
        color: theme.palette.mode === 'dark' ? '#FFF' : '#000',
    },
    itemSizeTile: {
        width: '100%',
        height: 16,
        textAlign: 'center',
        fontSize: 10,
    },
    itemImageTile: {
        width: 'calc(100% - 8px)',
        height: TILE_HEIGHT - 32 - 16 - 8, // name + size
        margin: 4,
        display: 'block',
        textAlign: 'center',
        objectFit: 'contain',
    },
    itemIconTile: {
        width: '100%',
        height: TILE_HEIGHT - 32 - 16 - 8, // name + size
        display: 'block',
        objectFit: 'contain',
    },

    itemSelected: {
        background: theme.palette.primary.main,
        color: Utils.invertColor(theme.palette.primary.main, true),
    },

    itemTable: {
        userSelect: 'none',
        cursor: 'pointer',
        height: ROW_HEIGHT,
        display: 'inline-flex',
        lineHeight: `${ROW_HEIGHT}px`,
        '&:hover': {
            background: theme.palette.secondary.light,
            color: Utils.invertColor(theme.palette.secondary.main, true),
        },
    },
    itemNameTable: {
        display: 'inline-block',
        paddingLeft: 10,
        fontSize: '1rem',
        verticalAlign: 'top',
        flexGrow: 1,
    },
    itemNameFolderTable: {
        fontWeight: 'bold',
    },
    itemSizeTable: {
        display: 'inline-block',
        width: 60,
        verticalAlign: 'top',
        textAlign: 'right',
    },
    itemAccessTable: {
        // display: 'inline-block',
        verticalAlign: 'top',
        width: 60,
        textAlign: 'right',
        paddingRight: 5,
        display: 'flex',
        justifyContent: 'center',
    },
    itemImageTable: {
        display: 'inline-block',
        width: 30,
        marginTop: 1,
        objectFit: 'contain',
        maxHeight: 30,
    },
    itemIconTable: {
        display: 'inline-block',
        marginTop: 1,
        width: 30,
        height: 30,
    },
    itemFolderTable: {

    },
    itemFolderTemp: {
        opacity: 0.4,
    },
    itemFolderIconTable: {
        marginTop: 1,
        marginLeft: theme.spacing(1),
        display: 'inline-block',
        width: 30,
        height: 30,
        color: theme.palette.secondary.main || '#fbff7d',
    },
    itemDownloadButtonTable: {
        display: 'inline-block',
        width: BUTTON_WIDTH,
        height: ROW_HEIGHT,
        minWidth: BUTTON_WIDTH,
        verticalAlign: 'top',
        padding: 0,
        '& span': {
            paddingTop: 9,
        },
        '& svg': {
            width: 14,
            height: 14,
            fontSize: '1rem',
        },
    },
    itemAclButtonTable: {
        width: BUTTON_WIDTH,
        height: ROW_HEIGHT,
        minWidth: BUTTON_WIDTH,
        verticalAlign: 'top',
        padding: 0,
        fontSize: 12,
        display: 'flex',
    },
    itemDeleteButtonTable: {
        display: 'inline-block',
        width: BUTTON_WIDTH,
        height: ROW_HEIGHT,
        minWidth: BUTTON_WIDTH,
        verticalAlign: 'top',
        padding: 0,
        '& svg': {
            width: 18,
            height: 18,
            fontSize: '1.5rem',
        },
    },

    uploadDiv: {
        top: 0,
        zIndex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        opacity: 0.9,
        textAlign: 'center',
        background: '#FFFFFF',
    },
    uploadDivDragging: {
        opacity: 1,
    },

    uploadCenterDiv: {
        margin: 20,
        border: '3px dashed grey',
        borderRadius: 30,
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 40px)',
        position: 'relative',
        color: theme.palette.mode === 'dark' ? '#222' : '#CCC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadCenterIcon: {
        width: '25%',
        height: '25%',
    },
    uploadCenterText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    uploadCloseButton: {
        zIndex: 2,
        position: 'absolute',
        top: 30,
        right: 30,
    },
    uploadCenterTextAndIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: '30%',
        width: '50%',
        margin: '-15% 0 0 -25%',
    },
    menuButtonExpertActive: {
        color: '#c00000',
    },
    pathDiv: {
        display: 'flex',
        width: `calc(100% - ${theme.spacing(2)})`,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        textOverflow: 'clip',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    pathDivInput: {
        width: '100%',
    },
    pathDivBreadcrumb: {
        paddingTop: 3,
        paddingBottom: 2,
        borderBottom: 'solid 1px',
    },
    pathDivBreadcrumbDir: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.mode === 'dark' ? '#333' : '#CCC',
        },
    },
    pathDivBreadcrumbSlash: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
        opacity: 0.7,
    },
    pathDivBreadcrumbFile: {
        cursor: 'pointer',
        flexGrow: 1,
    },
    backgroundImageLight: {
        background: 'white',
    },
    backgroundImageDark: {
        background: 'black',
    },
    backgroundImageColored: {
        background: 'silver',
    },
    '@media screen and (max-width: 500px)': {
        itemNameTable: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'end',
            direction: 'rtl',
        },
    },
    specialFolder: {
        color: theme.palette.mode === 'dark' ? '#229b0f' : '#5dd300'
    }
});

const USER_DATA = '0_userdata.0';

function sortFolders(a, b) {
    if (a.folder && b.folder) {
        return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
    } if (a.folder) {
        return -1;
    } if (b.folder) {
        return 1;
    }
    return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
}

function getParentDir(dir) {
    const parts = (dir || '').split('/');
    parts.length && parts.pop();
    return parts.join('/');
}

function isFile(path) {
    const ext = Utils.getFileExtension(path);
    if (ext && ext.toLowerCase().match(/[a-z]+/) && ext.length < 5) {
        return true;
    }

    return false;
}

const TABLE = 'Table';
const TILE = 'Tile';

/**
 * @extends {React.Component<import('./types').FileBrowserProps>}
 */
class FileBrowser extends Component {
    /**
     * @param {Readonly<import("./types").FileBrowserProps>} props
     */
    constructor(props) {
        super(props);
        let expanded = (window._localStorage || window.localStorage).getItem('files.expanded') || '[]';

        try {
            expanded = JSON.parse(expanded);
        } catch (e) {
            expanded = [];
        }

        let viewType;
        if (this.props.showViewTypeButton) {
            viewType = (window._localStorage || window.localStorage).getItem('files.viewType') || TABLE;
        } else {
            viewType = TABLE;
        }

        const selected = this.props.selected || (window._localStorage || window.localStorage).getItem('files.selected') || USER_DATA;
        let currentDir = '';
        if (isFile(selected)) {
            currentDir = getParentDir(selected);
        } else {
            currentDir = selected;
        }
        const backgroundImage = (window._localStorage || window.localStorage).getItem('files.backgroundImage') || null;

        this.state = {
            viewType,
            folders: {},
            filterEmpty: (window._localStorage || window.localStorage).getItem('files.empty') !== 'false',
            expanded,
            currentDir,
            expertMode: this.props.expertMode,
            addFolder: false,
            uploadFile: false,
            deleteItem: '',
            // marked: [],
            viewer: '',
            formatEditFile: '',
            path: selected,
            selected,
            errorText: '',
            modalEditOfAccess: false,
            backgroundImage,
            queueLength: 0,
            loadAllFolders: false,
            allFoldersLoaded: false,
            fileErrors: [],
        };

        this.imagePrefix = this.props.imagePrefix || './files/';

        this.levelPadding = this.props.levelPadding || 20;
        this.mounted = true;
        this.suppressDeleteConfirm = 0;

        this.browseList = [];
        this.browseListRunning = false;
        this.initialReadFinished = false;
        this.supportSubscribes = null;
        this._tempTimeout = {};
    }

    static getDerivedStateFromProps(props, state) {
        if (props.expertMode !== undefined && props.expertMode !== state.expertMode) {
            return { expertMode: props.expertMode, loadAllFolders: true };
        }

        return null;
    }

    loadFolders() {
        this.initialReadFinished = false;

        return this.browseFolder('/')
            .then(folders => {
                return this.state.viewType === TABLE ?
                    this.browseFolders([...this.state.expanded], folders)
                    :
                    (this.state.currentDir && this.state.currentDir !== '/' ? this.browseFolder(this.state.currentDir, folders) : Promise.resolve(folders))
            })
            .then(folders => this.setState({ folders }, () => {
                if (this.state.viewType === TABLE && !this.findItem(this.state.selected)) {
                    const parts = this.state.selected.split('/');
                    while (parts.length && !this.findItem(parts.join('/'))) {
                        parts.pop();
                    }
                    let selected;
                    if (parts.length) {
                        selected = parts.join('/');
                    } else {
                        selected = USER_DATA;
                    }
                    this.setState({ selected, path: selected, pathFocus: false }, () => this.scrollToSelected());
                } else {
                    this.scrollToSelected();
                }
                this.initialReadFinished = true;
            }));
    }

    scrollToSelected() {
        if (this.mounted) {
            const el = document.getElementById(this.state.selected);
            el && el.scrollIntoView();
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.loadFolders();
        return this.props.socket.checkFeatureSupported('BINARY_STATE_EVENT')
            .then(result => {
                this.supportSubscribes = result;
                this.supportSubscribes && this.props.socket.subscribeFiles('*', '*', this.onFileChange);
            });
    }

    componentWillUnmount() {
        this.supportSubscribes && this.props.socket.unsubscribeFiles('*', '*', this.onFileChange);
        this.mounted = false;
        this.browseList = null;
        this.browseListRunning = false;
        Object.values(this._tempTimeout)
            .forEach(timer => timer && clearTimeout(timer));
        this._tempTimeout = {};
    }

    browseFolders(foldersList, _newFolders, _resolve) {
        if (!_newFolders) {
            _newFolders = {};
            Object.keys(this.state.folders).forEach(folder => _newFolders[folder] = this.state.folders[folder]);
        }

        if (!_resolve) {
            return new Promise(resolve => this.browseFolders(foldersList, _newFolders, resolve));
        }

        if (!foldersList || !foldersList.length) {
            return _resolve(_newFolders);
        }

        return this.browseFolder(foldersList.shift(), _newFolders)
            .then(()  => setTimeout(() => this.browseFolders(foldersList, _newFolders, _resolve), 0))
            .catch(() => setTimeout(() => this.browseFolders(foldersList, _newFolders, _resolve), 0));
    }

    readDirSerial(adapter, relPath) {
        return new Promise((resolve, reject) => {
            if (this.browseList) { // if component still mounted
                this.browseList.push({
                    resolve, reject, adapter, relPath,
                });
                !this.browseListRunning && this.processBrowseList();
            }
        });
    }

    processBrowseList(level) {
        if (!this.browseListRunning && this.browseList && this.browseList.length) {
            this.browseListRunning = true;
            if (this.browseList.length > 10) {
                // not too often
                if (!(this.browseList.length % 10)) {
                    this.setState({ queueLength: this.browseList.length });
                }
            } else {
                this.setState({ queueLength: this.browseList.length });
            }

            this.browseList[0].processing = true;
            this.props.socket.readDir(this.browseList[0].adapter, this.browseList[0].relPath)
                .then(files => {
                    if (this.browseList) { // if component still mounted
                        const item = this.browseList.shift();
                        if (item) {
                            const resolve = item.resolve;
                            item.resolve = null;
                            item.reject  = null;
                            item.adapter = null;
                            item.relPath = null;
                            resolve(files);
                            this.browseListRunning = false;
                            if (this.browseList.length) {
                                if (level < 5) {
                                    this.processBrowseList(level + 1);
                                } else {
                                    setTimeout(() => this.processBrowseList(0), 0);
                                }
                            } else {
                                this.setState({ queueLength: 0 });
                            }
                        } else {
                            this.setState({ queueLength: 0 });
                        }
                    }
                })
                .catch(e => {
                    if (this.browseList) { // if component still mounted
                        const item = this.browseList.shift();
                        if (item) {
                            const reject = item.reject;
                            item.resolve = null;
                            item.reject = null;
                            item.adapter = null;
                            item.relPath = null;
                            reject(e);
                            this.browseListRunning = false;
                            if (this.browseList.length) {
                                if (level < 5) {
                                    this.processBrowseList(level + 1);
                                } else {
                                    setTimeout(() => this.processBrowseList(0), 0);
                                }
                            } else {
                                this.setState({ queueLength: 0 });
                            }
                        } else {
                            this.setState({ queueLength: 0 });
                        }
                    }
                });
        }
    }

    browseFolder(folderId, _newFolders, _checkEmpty, force) {
        if (typeof _newFolders === 'boolean') {
            force = _newFolders;
            _newFolders = null;
        }

        if (!_newFolders) {
            _newFolders = {};
            Object.keys(this.state.folders).forEach(folder =>
                _newFolders[folder] = this.state.folders[folder]);
        }

        if (_newFolders[folderId] && !force) {
            if (!_checkEmpty) {
                return new Promise((resolve, reject) =>
                    Promise.all(_newFolders[folderId].filter(item => item.folder).map(item =>
                        this.browseFolder(item.id, _newFolders, true)
                            .catch(error => { })))
                        .then(() => resolve(_newFolders))
                        .catch(error => reject(error)));
            }

            return Promise.resolve(_newFolders);
        }

        if (!folderId || folderId === '/') {
            return this.props.socket.readMetaItems()
                .then(objs => {
                    const _folders = [];
                    let userData = null;

                    // load only adapter.admin and not other meta files like hm-rpc.0.devices.blablabla
                    if (!this.state.expertMode) {
                        objs = objs.filter(obj => !obj._id.endsWith('.admin'));
                    }
                    const pos = objs.findIndex(obj => obj._id === 'system.meta.uuid');
                    if (pos !== -1) {
                        objs.splice(pos, 1);
                    }

                    // remember, that all folders are loaded
                    if (this.state.expertMode) {
                        this.setState({ allFoldersLoaded: true, loadFolders: false });
                    }

                    objs.forEach(obj => {
                        const item = {
                            id:     obj._id,
                            name:   obj._id,
                            title:  (obj.common && obj.common.name) || obj._id,
                            meta:   true,
                            from:   obj.from,
                            ts:     obj.ts,
                            color:  obj.common && obj.common.color,
                            icon:   obj.common && obj.common.icon,
                            folder: true,
                            acl:    obj.acl,
                            level:  0,
                        };
                        if (item.id === USER_DATA) {
                            // user data must be first
                            userData = item;
                        } else {
                            _folders.push(item);
                        }
                    });
                    _folders.sort((a, b) => (a.id > b.id ? 1 : (a.id < b.id ? -1 : 0)));
                    _folders.unshift(userData);

                    _newFolders[folderId || '/'] = _folders;

                    if (!_checkEmpty) {
                        return Promise.all(_folders.filter(item => item.folder).map(item =>
                            this.browseFolder(item.id, _newFolders, true)
                                .catch(error => { })))
                            .then(() => _newFolders);
                    }

                    return _newFolders;
                })
                .catch(e => this.initialReadFinished && window.alert(`Cannot read meta items: ${e}`));
        }

        const parts   = folderId.split('/');
        const level   = parts.length;
        const adapter = parts.shift();
        const relPath = parts.join('/');

        // make all requests here serial
        return this.readDirSerial(adapter, relPath)
            .then(files => {
                const _folders = [];
                files.forEach(file => {
                    const item = {
                        id:       `${folderId}/${file.file}`,
                        ext:      Utils.getFileExtension(file.file),
                        folder:   file.isDir,
                        name:     file.file,
                        size:     file.stats && file.stats.size,
                        modified: file.modifiedAt,
                        acl:      file.acl,
                        level,
                    };
                    _folders.push(item);
                });

                _folders.sort(sortFolders);
                _newFolders[folderId] = _folders;

                if (!_checkEmpty) {
                    return Promise.all(_folders.filter(item => item.folder).map(item => this.browseFolder(item.id, _newFolders, true)))
                        .then(() => _newFolders);
                }

                return _newFolders;
            })
            .catch(e => {
                this.initialReadFinished && window.alert(`Cannot read ${adapter}${relPath ? `/${relPath}` : ''}: ${e}`);
                _newFolders[folderId] = [];
                return _newFolders;
            });
    }

    toggleFolder(item, e) {
        e && e.stopPropagation();
        const expanded = [...this.state.expanded];
        const pos = expanded.indexOf(item.id);
        if (pos === -1) {
            expanded.push(item.id);
            expanded.sort();

            (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));

            if (!item.temp) {
                return this.browseFolder(item.id)
                    .then(folders => this.setState({ expanded, folders }))
                    .catch(err => window.alert(err === NOT_FOUND ? this.props.t('ra_Cannot find "%s"', item.id) : this.props.t('ra_Cannot read "%s"', item.id)));
            } else {
                this.setState({ expanded });
            }
        } else {
            expanded.splice(pos, 1);
            (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));
            this.setState({ expanded });
        }
    }

    onFileChange = (id, fileName, size) => {
        const key = id + '/' + fileName;
        const pos = key.lastIndexOf('/');
        const folder = key.substring(0, pos);
        console.log(`File changed ${key}[${size}]`);

        if (this.state.folders[folder]) {
            this._tempTimeout[folder] && clearTimeout(this._tempTimeout[folder]);

            this._tempTimeout[folder] = setTimeout(() => {
                delete this._tempTimeout[folder];

                this.browseFolder(folder, true)
                    .then(folders => this.setState({ folders }));
            }, 300);
        }
    };

    changeFolder(e, folder) {
        e && e.stopPropagation();

        this.lastSelect = Date.now();

        folder = folder || getParentDir(this.state.currentDir);

        if (folder === '/') {
            folder = '';
        }

        (window._localStorage || window.localStorage).setItem('files.currentDir', folder);

        if (folder && !this.state.folders[folder]) {
            return this.browseFolder(folder)
                .then(folders =>
                    this.setState({
                        folders,
                        path: folder,
                        currentDir: folder,
                        selected: folder,
                        pathFocus: false
                    }, () =>
                        this.props.onSelect && this.props.onSelect('')));
        }

        return this.setState({
            currentDir: folder,
            selected: folder,
            path: folder,
            pathFocus: false
        }, () =>
            this.props.onSelect && this.props.onSelect(''));
    }

    select(id, e, cb) {
        if (typeof e === 'function') {
            cb = e;
            e = null;
        }
        e && e.stopPropagation();
        this.lastSelect = Date.now();
        (window._localStorage || window.localStorage).setItem('files.selected', id);
        this.setState({ selected: id, path: id, pathFocus: false }, () => {
            if (this.props.onSelect) {
                const ext = Utils.getFileExtension(id);
                if ((!this.props.filterFiles || this.props.filterFiles.includes(ext)) &&
                    (!this.props.filterByType || EXTENSIONS[this.props.filterByType].includes(ext))
                ) {
                    this.props.onSelect(id);
                } else {
                    this.props.onSelect('');
                }
            }
            cb && cb();
        });
    }

    renderFolder(item, expanded) {
        if (this.state.filterEmpty && (!this.state.folders[item.id] || !this.state.folders[item.id].length) && item.id !== USER_DATA && !item.temp) {
            return null;
        }
        const Icon = expanded ? IconOpen : IconClosed;
        const padding = this.state.viewType === TABLE ? item.level * this.levelPadding : 0;
        const isUserData = item.name === USER_DATA;
        const isSpecialData = isUserData || item.name === 'vis.0' || item.name === 'vis-2-beta.0';

        return <div
            key={item.id}
            id={item.id}
            style={this.state.viewType === TABLE ? { marginLeft: padding, width: `calc(100% - ${padding}px` } : {}}
            onClick={e => this.state.viewType === TABLE ? this.select(item.id, e) : this.changeFolder(e, item.id)}
            onDoubleClick={e => this.state.viewType === TABLE && this.toggleFolder(item, e)}
            title={item.title && typeof item.title === 'object' ? (item.title[this.props.lang] || item.title.end || '') : (item.title || null)}
            className={Utils.clsx(
                'browserItem',
                this.props.classes[`item${this.state.viewType}`],
                this.props.classes[`itemFolder${this.state.viewType}`],
                this.state.selected === item.id && this.props.classes.itemSelected,
                item.temp && this.props.classes['itemFolderTemp'],
            )}
        >
            <Icon className={Utils.clsx(this.props.classes['itemFolderIcon' + this.state.viewType], isSpecialData && this.props.classes.specialFolder)} onClick={this.state.viewType === TABLE ? e => this.toggleFolder(item, e) : undefined} />

            <div className={Utils.clsx(this.props.classes['itemName' + this.state.viewType], this.props.classes['itemNameFolder' + this.state.viewType])}
            >{isUserData ? this.props.t('ra_User files') : item.name}</div>

            <Hidden smDown>
                <div className={this.props.classes[`itemSize${this.state.viewType}`]}>{this.state.viewType === TABLE && this.state.folders[item.id] ? this.state.folders[item.id].length : ''}</div>
            </Hidden>

            <Hidden smDown>
                {this.state.viewType === TABLE ? this.formatAcl(item.acl) : null}
            </Hidden>

            <Hidden smDown>
                {this.state.viewType === TABLE && this.props.expertMode ? <div className={this.props.classes[`itemDeleteButton${this.state.viewType}`]} /> : null}
            </Hidden>
            {this.state.viewType === TABLE && this.props.allowDownload ? <div className={this.props.classes[`itemDownloadButton${this.state.viewType}`]} /> : null}

            {this.state.viewType === TABLE && this.props.allowDelete && this.state.folders[item.id] && this.state.folders[item.id].length ?
                <IconButton
                    aria-label="delete"
                    onClick={e => {
                        e.stopPropagation();
                        if (this.suppressDeleteConfirm > Date.now()) {
                            this.deleteItem(item.id);
                        } else {
                            this.setState({ deleteItem: item.id });
                        }
                    }}
                    className={this.props.classes[`itemDeleteButton${this.state.viewType}`]}
                    size="large"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
                :
                (this.state.viewType === TABLE && this.props.allowDelete ? <div className={this.props.classes[`itemDeleteButton${this.state.viewType}`]} /> : null)}
        </div>;
    }

    renderBackFolder() {
        return <div
            key={this.state.currentDir}
            id={this.state.currentDir}
            onClick={e => this.changeFolder(e)}
            title={this.props.t('ra_Back to %s', getParentDir(this.state.currentDir))}
            className={Utils.clsx(
                'browserItem',
                this.props.classes[`item${this.state.viewType}`],
                this.props.classes[`itemFolder${this.state.viewType}`],
            )}
        >
            <IconClosed className={this.props.classes[`itemFolderIcon${this.state.viewType}`]} />
            <IconBack className={this.props.classes.itemFolderIconBack} />

            <div
                className={Utils.clsx(this.props.classes[`itemName${this.state.viewType}`], this.props.classes[`itemNameFolder${this.state.viewType}`])}
            >..</div>
        </div>;
    }

    formatSize(size) {
        return <div className={this.props.classes[`itemSize${this.state.viewType}`]}>{size || size === 0 ? Utils.formatBytes(size) : ''}</div>;
    }

    formatAcl(acl) {
        let access = acl && (acl.permissions || acl.file);
        if (access) {
            access = access.toString(16).padStart(3, '0');
        }

        return <div className={this.props.classes['itemAccess' + this.state.viewType]}>
            <IconButton
                size="large"
                onClick={() => this.setState({ modalEditOfAccess: true })}
                className={this.props.classes['itemAclButton' + this.state.viewType]}
            >{access || '---'}</IconButton>
        </div>;
    }

    getFileIcon(ext) {
        switch (ext) {
            case 'json':
                return <JsonIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;

            case 'css':
                return <CssIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;

            case 'js':
            case 'ts':
                return <JSIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;

            case 'html':
            case 'md':
                return <HtmlIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;

            case 'mp3':
            case 'ogg':
            case 'wav':
            case 'm4a':
            case 'mp4':
            case 'flac':
                return <MusicIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;

            default:
                return <FileIcon className={this.props.classes[`itemIcon${this.state.viewType}`]} />;
        }
    }

    static getEditFile(ext) {
        switch (ext) {
            case 'json':
            case 'js':
            case 'html':
            case 'txt':
                return true;
            default:
                return false;
        }
    }

    setStateBackgroundImage = () => {
        const array = ['light', 'dark', 'colored', 'delete'];
        this.setState(({ backgroundImage }) => {
            if (array.indexOf(backgroundImage) !== -1 && array.length - 1 !== array.indexOf(backgroundImage)) {
                (window._localStorage || window.localStorage).setItem('files.backgroundImage', array[array.indexOf(backgroundImage) + 1]);
                return { backgroundImage: array[array.indexOf(backgroundImage) + 1] };
            }
            (window._localStorage || window.localStorage).setItem('files.backgroundImage', array[0]);
            return { backgroundImage: array[0] };
        });
    }

    getClassBackgroundImage = () => {
        // ['light', 'dark', 'colored', 'delete']
        switch (this.state.backgroundImage) {
            case 'light':
                return this.props.classes.backgroundImageLight;
            case 'dark':
                return this.props.classes.backgroundImageDark;
            case 'colored':
                return this.props.classes.backgroundImageColored;
            case 'delete':
                return null;
            default:
                return null;
        }
    }

    renderFile(item) {
        const padding = this.state.viewType === TABLE ? item.level * this.levelPadding : 0;
        const ext = Utils.getFileExtension(item.name);

        return <div
            key={item.id}
            id={item.id}
            onDoubleClick={() => {
                if (!this.props.onSelect) {
                    this.setState({ viewer: this.imagePrefix + item.id });
                } else if (
                    (!this.props.filterFiles || this.props.filterFiles.includes(item.ext)) &&
                    (!this.props.filterByType || EXTENSIONS[this.props.filterByType].includes(item.ext))
                ) {
                    this.props.onSelect(item.id, true);
                }
            }}
            onClick={e => this.select(item.id, e)}
            style={this.state.viewType === TABLE ? { marginLeft: padding, width: `calc(100% - ${padding}px)` } : {}}
            className={Utils.clsx(
                'browserItem',
                this.props.classes[`item${this.state.viewType}`],
                this.props.classes[`itemFile${this.state.viewType}`],
                this.state.selected === item.id && this.props.classes.itemSelected,
            )}
        >
            {EXTENSIONS.images.includes(ext) ?
                this.state.fileErrors.includes(item.id) ?
                    <IconNoIcon className={Utils.clsx(this.props.classes['itemImage' + this.state.viewType], this.getClassBackgroundImage())}/> :
                    <img
                        onError={e => {
                            e.target.onerror = null;
                            const fileErrors = [...this.state.fileErrors];
                            if (!fileErrors.includes(item.id)) {
                                fileErrors.push(item.id);
                                this.setState({ fileErrors });
                            }
                        }}
                        className={Utils.clsx(this.props.classes['itemImage' + this.state.viewType], this.getClassBackgroundImage())}
                        src={this.imagePrefix + item.id} alt={item.name}
                    />
                :
                this.getFileIcon(ext)}
            <div className={this.props.classes[`itemName${this.state.viewType}`]}>{item.name}</div>
            <Hidden smDown>{this.formatSize(item.size)}</Hidden>
            <Hidden smDown>{this.state.viewType === TABLE ? this.formatAcl(item.acl) : null}</Hidden>
            <Hidden smDown>
                {this.state.viewType === TABLE && this.props.expertMode && FileBrowser.getEditFile(ext) ?
                    <IconButton
                        aria-label="delete"
                        onClick={e => {
                            e.stopPropagation();
                            if (!this.props.onSelect) {
                                this.setState({ viewer: this.imagePrefix + item.id, formatEditFile: ext });
                            } else if (
                                (!this.props.filterFiles || this.props.filterFiles.includes(item.ext)) &&
                                (!this.props.filterByType || EXTENSIONS[this.props.filterByType].includes(item.ext))
                            ) {
                                this.props.onSelect(item.id, true);
                            }
                        }}
                        className={this.props.classes[`itemDeleteButton${this.state.viewType}`]}
                        size="large"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    :
                    <div className={this.props.classes[`itemDeleteButton${this.state.viewType}`]} />}
            </Hidden>
            {this.state.viewType === TABLE && this.props.allowDownload ? <IconButton
                download
                href={this.imagePrefix + item.id}
                className={this.props.classes[`itemDownloadButton${this.state.viewType}`]}
                onClick={e => e.stopPropagation()}
                size="large"
            >
                <DownloadIcon />
            </IconButton> : null}

            {this.state.viewType === TABLE &&
             this.props.allowDelete &&
             item.id !== 'vis.0/' &&
             item.id !== 'vis-2-beta.0/' &&
             item.id !== USER_DATA
                ?
                <IconButton
                    aria-label="delete"
                    onClick={e => {
                        e.stopPropagation();
                        if (this.suppressDeleteConfirm > Date.now()) {
                            this.deleteItem(item.id);
                        } else {
                            this.setState({ deleteItem: item.id });
                        }
                    }}
                    className={this.props.classes[`itemDeleteButton${this.state.viewType}`]}
                    size="large"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
                :
                (this.state.viewType === TABLE && this.props.allowDelete ?
                        <div className={this.props.classes[`itemDeleteButton${this.state.viewType}`]} />
                        :
                        null
                )
            }
        </div>;
    }

    renderItems(folderId) {
        if (this.state.folders && this.state.folders[folderId]) {
            // tile
            if (this.state.viewType === TILE) {
                const res = [];
                if (folderId && folderId !== '/') {
                    res.push(this.renderBackFolder());
                }
                this.state.folders[folderId].forEach(item => {
                    if (item.folder) {
                        res.push(this.renderFolder(item));
                    } else if (
                        (!this.props.filterFiles || this.props.filterFiles.includes(item.ext)) &&
                        (!this.props.filterByType || EXTENSIONS[this.props.filterByType].includes(item.ext))
                    ) {
                        res.push(this.renderFile(item));
                    }
                });
                return res;
            }
            return this.state.folders[folderId].map(item => {
                const res = [];
                if (item.folder) {
                    const expanded = this.state.expanded.includes(item.id);

                    res.push(this.renderFolder(item, expanded));
                    if (this.state.folders[item.id] && expanded) {
                        res.push(this.renderItems(item.id));
                    }
                } else if (
                    (!this.props.filterFiles || this.props.filterFiles.includes(item.ext)) &&
                    (!this.props.filterByType || EXTENSIONS[this.props.filterByType].includes(item.ext))
                ) {
                    res.push(this.renderFile(item));
                } else {
                    return null;
                }

                return res;
            });
        }
        return <div style={{ position: 'relative' }}>
            <CircularProgress key={folderId} color="secondary" size={24} />
            <div style={{
                position: 'absolute', zIndex: 2, top: 4, width: 24, textAlign: 'center',
            }}
            >
                {this.state.queueLength}
            </div>
        </div>;
    }

    renderToolbar() {
        return <Toolbar key="toolbar" variant="dense">
            {this.props.showExpertButton ? <IconButton
                edge="start"
                title={this.props.t('ra_Toggle expert mode')}
                className={Utils.clsx(this.props.classes.menuButton, this.state.expertMode && this.props.classes.menuButtonExpertActive)}
                aria-label="expert mode"
                onClick={() => this.setState({ expertMode: !this.state.expertMode })}
                size="large"
            >
                <ExpertIcon />
            </IconButton> : null}
            {this.props.showViewTypeButton ? <IconButton
                edge="start"
                title={this.props.t('ra_Toggle view mode')}
                className={this.props.classes.menuButton}
                aria-label="view mode"
                onClick={() => {
                    const viewType = this.state.viewType === TABLE ? TILE : TABLE;
                    (window._localStorage || window.localStorage).setItem('files.viewType', viewType);
                    let currentDir = this.state.selected;
                    if (isFile(currentDir)) {
                        currentDir = getParentDir(currentDir);
                    }
                    this.setState({ viewType, currentDir }, () => {
                        if (this.state.viewType === TABLE) {
                            this.scrollToSelected();
                        }
                    });
                }}
                size="large"
            >
                {this.state.viewType !== TABLE ? <IconList /> : <IconTile />}
            </IconButton> : null}
            <IconButton
                edge="start"
                title={this.props.t('ra_Hide empty folders')}
                className={this.props.classes.menuButton}
                color={this.state.filterEmpty ? 'secondary' : 'inherit'}
                aria-label="filter empty"
                onClick={() => {
                    (window._localStorage || window.localStorage).setItem('file.empty', !this.state.filterEmpty);
                    this.setState({ filterEmpty: !this.state.filterEmpty });
                }}
                size="large"
            >
                <EmptyFilterIcon />
            </IconButton>
            <IconButton
                edge="start"
                title={this.props.t('ra_Reload files')}
                className={this.props.classes.menuButton}
                color="inherit"
                aria-label="reload files"
                onClick={() => this.setState({ folders: {} }, () => this.loadFolders())}
                size="large"
            >
                <RefreshIcon />
            </IconButton>
            {this.props.allowCreateFolder ? <IconButton
                edge="start"
                disabled={!this.state.selected || !this.state.folders[this.state.selected]}
                title={this.props.t('ra_Create folder')}
                className={this.props.classes.menuButton}
                color="inherit"
                aria-label="add folder"
                onClick={() => this.setState({ addFolder: true })}
                size="large"
            >
                <AddFolderIcon />
            </IconButton> : null}
            {this.props.allowUpload ? <IconButton
                edge="start"
                disabled={!this.state.selected || !this.state.folders[this.state.selected]}
                title={this.props.t('ra_Upload file')}
                className={this.props.classes.menuButton}
                color="inherit"
                aria-label="upload file"
                onClick={() => this.setState({ uploadFile: true })}
                size="large"
            >
                <UploadIcon />
            </IconButton> : null}
            <Tooltip title={this.props.t('ra_Background image')}>
                <IconButton
                    color="inherit"
                    edge="start"
                    className={this.props.classes.menuButton}
                    onClick={this.setStateBackgroundImage}
                    size="large"
                >
                    <Brightness5Icon />
                </IconButton>
            </Tooltip>
        </Toolbar>;
    }

    findItem(id, folders) {
        folders = folders || this.state.folders;
        if (!folders) {
            return null;
        }
        const parts = id.split('/');
        parts.pop();
        const parentFolder = parts.join('/') || '/';
        if (!folders[parentFolder]) {
            return null;
        }
        return folders[parentFolder].find(item => item.id === id);
    }

    renderInputDialog() {
        if (this.state.addFolder) {
            const parentFolder = this.findFirstFolder(this.state.selected);

            if (!parentFolder) {
                return window.alert(this.props.t('ra_Invalid parent folder!'));
            }

            return <TextInputDialog
                key="inputDialog"
                applyText={this.props.t('ra_Create')}
                cancelText={this.props.t('ra_Cancel')}
                titleText={this.props.t('ra_Create new folder in %s', this.state.selected)}
                promptText={this.props.t('ra_If no file will be created in the folder, it will disappear after the browser closed')}
                labelText={this.props.t('ra_Folder name')}
                verify={text => this.state.folders[parentFolder].find(item => item.name === text) ? '' : this.props.t('ra_Duplicate name')}
                onClose={name => {
                    if (name) {
                        const folders = {};
                        Object.keys(this.state.folders).forEach(folder => folders[folder] = this.state.folders[folder]);
                        const parent = this.findItem(parentFolder);
                        const id = `${parentFolder}/${name}`;
                        folders[parentFolder].push({
                            id,
                            level: parent.level + 1,
                            name,
                            folder: true,
                            temp: true,
                        });

                        folders[parentFolder].sort(sortFolders);

                        folders[id] = [];
                        const expanded = [...this.state.expanded];
                        if (!expanded.includes(parentFolder)) {
                            expanded.push(parentFolder);
                            expanded.sort();
                        }
                        (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));
                        this.setState({ addFolder: false, folders, expanded }, () =>
                            this.select(id));
                    } else {
                        this.setState({ addFolder: false });
                    }
                }}
                replace={text => text.replace(/[^-_\w\d]/, '_')}
            />;
        }
        return null;
    }

    componentDidUpdate(/* prevProps , prevState, snapshot */) {
        this.setOpacityTimer && clearTimeout(this.setOpacityTimer);
        this.setOpacityTimer = setTimeout(() => {
            this.setOpacityTimer = null;
            const items = window.document.getElementsByClassName('browserItem');
            for (let i = 0; i < items.length; i++) {
                items[i].style.opacity = 1;
            }
        }, 100);
    }

    uploadFile(fileName, data) {
        const parts = fileName.split('/');
        const adapter = parts.shift();
        return this.props.socket.writeFile64(adapter, parts.join('/'), data)
            .catch(e => window.alert(`Cannot write file: ${e}`));
    }

    findFirstFolder(id) {
        let parentFolder = id;
        const item = this.findItem(parentFolder);
        // find folder
        if (item && !item.folder) {
            const parts = parentFolder.split('/');
            parts.pop();
            parentFolder = '';
            while (parts.length) {
                const _item = this.findItem(parts.join('/'));
                if (_item && _item.folder) {
                    parentFolder = parts.join('/');
                    break;
                }
            }
        }

        return parentFolder;
    }

    renderUpload() {
        if (this.state.uploadFile) {
            return [
                <Fab
                    key="close"
                    color="primary"
                    aria-label="close"
                    className={this.props.classes.uploadCloseButton}
                    onClick={() => this.setState({ uploadFile: false })}
                >
                    <CloseIcon />
                </Fab>,
                <Dropzone
                    key="dropzone"
                    onDragEnter={() => this.setState({ uploadFile: 'dragging' })}
                    onDragLeave={() => this.setState({ uploadFile: true })}
                    onDrop={acceptedFiles => {
                        let count = acceptedFiles.length;

                        acceptedFiles.forEach(file => {
                            const reader = new FileReader();

                            reader.onabort = () => console.log('file reading was aborted');
                            reader.onerror = () => console.log('file reading has failed');
                            reader.onload  = () => {
                                const parentFolder = this.findFirstFolder(this.state.selected);

                                if (!parentFolder) {
                                    return window.alert(this.props.t('ra_Invalid parent folder!'));
                                }
                                const id = `${parentFolder}/${file.name}`;

                                this.uploadFile(id, reader.result)
                                    .then(() => {
                                        if (!--count) {
                                            this.setState({ uploadFile: false }, () => {
                                                if (this.supportSubscribes) {
                                                    // open current folder
                                                    const expanded = [...this.state.expanded];
                                                    if (!expanded.includes(parentFolder)) {
                                                        expanded.push(parentFolder);
                                                        expanded.sort();
                                                        (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));
                                                    }
                                                    this.setState({ expanded }, () =>
                                                        this.select(id));
                                                } else {
                                                    setTimeout(() =>
                                                            this.browseFolder(parentFolder, true)
                                                                .then(folders => {
                                                                    // open current folder
                                                                    const expanded = [...this.state.expanded];
                                                                    if (!expanded.includes(parentFolder)) {
                                                                        expanded.push(parentFolder);
                                                                        expanded.sort();
                                                                        (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));
                                                                    }
                                                                    this.setState({ folders, expanded }, () =>
                                                                        this.select(id));
                                                                })
                                                        , 500);
                                                }
                                            });
                                        }
                                    });
                            };

                            reader.readAsArrayBuffer(file);
                        });
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className={Utils.clsx(this.props.classes.uploadDiv, this.state.uploadFile === 'dragging' && this.props.classes.uploadDivDragging)}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <div className={this.props.classes.uploadCenterDiv}>
                                <div className={this.props.classes.uploadCenterTextAndIcon}>
                                    <UploadIcon className={this.props.classes.uploadCenterIcon} />
                                    <div className={this.props.classes.uploadCenterText}>
                                        {
                                            this.state.uploadFile === 'dragging' ? this.props.t('ra_Drop file here') :
                                                this.props.t('ra_Place your files here or click here to open the browse dialog')
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)}
                </Dropzone>,
            ];
        }
        return null;
    }

    deleteRecursive(id) {
        const item = this.findItem(id);
        if (item.folder) {
            return (this.state.folders[id] ? Promise.all(this.state.folders[id].map(_item =>
                this.deleteRecursive(_item.id))) : Promise.resolve())
                .then(() => {
                    // If it is folder of second level
                    if (item.level >= 1) {
                        const parts = id.split('/');
                        const adapter = parts.shift();
                        this.props.socket.deleteFolder(adapter, parts.join('/'))
                            .then(() => {
                                // remove this folder
                                const folders = JSON.parse(JSON.stringify(this.state.folders));
                                delete folders[item.id];
                                // delete folder from parent item
                                const parentId = getParentDir(item.id);
                                const parentFolder = folders[parentId];
                                if (parentFolder) {
                                    const pos = parentFolder.indexOf(parentFolder.find(f => f.id === item.id));
                                    if (pos !== -1) {
                                        parentFolder.splice(pos, 1);
                                    }

                                    this.select(parentId, () => this.setState({ folders }));
                                }
                            });
                    }
                });
        }
        const parts = id.split('/');
        const adapter = parts.shift();
        if (parts.length) {
            return this.props.socket.deleteFile(adapter, parts.join('/'))
                .catch(e => window.alert(`Cannot delete file: ${e}`));
        }
        return Promise.resolve();
    }

    deleteItem(deleteItem) {
        deleteItem = deleteItem || this.state.deleteItem;

        this.setState({ deleteItem: '' }, () =>
            this.deleteRecursive(deleteItem)
                .then(() => {
                    const newState = {};
                    const pos = this.state.expanded.indexOf(deleteItem);
                    if (pos !== -1) {
                        const expanded = [...this.state.expanded];
                        expanded.splice(pos, 1);
                        (window._localStorage || window.localStorage).setItem('files.expanded', JSON.stringify(expanded));
                        newState.expanded = expanded;
                    }

                    if (!this.supportSubscribes) {
                        let parentFolder = this.findFirstFolder(deleteItem);
                        const folders = {};
                        Object.keys(this.state.folders).forEach(name => {
                            if (name !== parentFolder && !name.startsWith(parentFolder + '/')) {
                                folders[name] = this.state.folders[name];
                            }
                        });
                        newState.folders = folders;

                        this.setState(newState, () =>
                            setTimeout(() => this.browseFolders([...this.state.expanded], folders)
                                .then(folders => this.setState({ folders })), 200));

                    } else {
                        this.setState(newState);
                    }
                })
        );
    }

    renderDeleteDialog() {
        if (this.state.deleteItem) {
            return <Dialog
                key="deleteDialog"
                open={!0}
                onClose={() => this.setState({ deleteItem: '' })}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.t('ra_Confirm deletion of %s', this.state.deleteItem.split('/').pop())}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.t('ra_Are you sure?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="grey"
                        variant="contained"
                        onClick={() => {
                            this.suppressDeleteConfirm = Date.now() + 60000 * 5;
                            this.deleteItem();
                        }}
                    >
                        {this.props.t('ra_Delete (no confirm for 5 mins)')}
                    </Button>
                    <Button variant="contained" onClick={() => this.deleteItem()} color="primary" autoFocus>{this.props.t('ra_Delete')}</Button>
                    <Button variant="contained" onClick={() => this.setState({ deleteItem: '' })} color="grey">{this.props.t('ra_Cancel')}</Button>
                </DialogActions>
            </Dialog>;
        }
        return false;
    }

    renderViewDialog() {
        return this.state.viewer ? <FileViewer
            supportSubscribes={this.supportSubscribes}
            key={this.state.viewer}
            href={this.state.viewer}
            formatEditFile={this.state.formatEditFile}
            themeName={this.props.themeName}
            setStateBackgroundImage={this.setStateBackgroundImage}
            getClassBackgroundImage={this.getClassBackgroundImage}
            t={this.props.t}
            socket={this.props.socket}
            lang={this.props.lang}
            expertMode={this.state.expertMode}
            onClose={() => this.setState({ viewer: '', formatEditFile: '' })}
        /> : null;
    }

    renderError() {
        if (this.state.errorText) {
            return <ErrorDialog key="errorDialog" text={this.state.errorText} onClose={() => this.setState({ errorText: '' })} />;
        }
        return null;
    }

    updateItemsAcl(info) {
        const folders = JSON.parse(JSON.stringify(this.state.folders));
        let changed;
        info.forEach(it => {
            const item = this.findItem(it.id, folders);
            if (item && JSON.stringify(item.acl) !== JSON.stringify(it.acl)) {
                item.acl = it.acl;
                changed = true;
            }
        });
        changed && this.setState({ folders });
    }

    changeToPath() {
        setTimeout(() => {
            if (this.state.path !== this.state.selected && (!this.lastSelect || Date.now() - this.lastSelect > 100)) {
                let folder = this.state.path;
                if (isFile(this.state.path)) {
                    folder = getParentDir(this.state.path);
                }
                new Promise(resolve => {
                    if (!this.state.folders[folder]) {
                        return this.browseFolder(folder)
                            .then(folders => this.setState({ folders }, () => resolve(true)))
                            .catch(err => this.setState({ errorText: err === NOT_FOUND ? this.props.t('ra_Cannot find "%s"', folder) : this.props.t('ra_Cannot read "%s"', folder) }));
                    }
                    return resolve(true);
                })
                    .then(result =>
                        result && this.setState({ selected: this.state.path, currentDir: folder, pathFocus: false }));
            } else if (!this.lastSelect || Date.now() - this.lastSelect > 100) {
                this.setState({ pathFocus: false });
            }
        }, 100);
    }

    renderBreadcrumb() {
        const parts = this.state.selected.startsWith('/') ? this.state.selected.split('/') : (`/${this.state.selected}`).split('/');
        const p = [];
        return parts.map((part, i) => {
            part && p.push(part);
            const path = p.join('/');
            if (i < parts.length - 1) {
                return [
                    <div key={`${this.state.selected}_${i}`} className={this.props.classes.pathDivBreadcrumbDir} onClick={e => this.changeFolder(e, path || '/')}>
                        {part || this.props.t('ra_Root')}
                    </div>,
                    <span key={`${this.state.selected}_s_${i}`} className={this.props.classes.pathDivBreadcrumbSlash}>{'>'}</span>];
            }
            return <div key={`${this.state.selected}_${i}`} className={this.props.classes.pathDivBreadcrumbFile} onClick={() => this.setState({ pathFocus: true })}>{part}</div>;
        });
    }

    renderPath() {
        return <div key="path" className={Utils.clsx(this.props.classes.pathDiv, !this.state.pathFocus && this.props.classes.pathDivBreadcrumb)}>
            {this.state.pathFocus ?
                <Input
                    value={this.state.path}
                    onKeyDown={e => e.keyCode === 13 && this.changeToPath()}
                    onBlur={() => this.changeToPath()}
                    onChange={e => this.setState({ path: e.target.value })}
                    className={this.props.classes.pathDivInput}
                />
                :
                this.renderBreadcrumb()
            }
        </div>;
    }

    render() {
        if (!this.props.ready) {
            return <LinearProgress />;
        }

        if (this.state.loadAllFolders && !this.foldersLoading) {
            this.foldersLoading = true;
            setTimeout(() => {
                this.setState({ loadAllFolders: false, folders: {} }, () => {
                    this.foldersLoading = false;
                    this.loadFolders();
                });
            }, 300);
        }

        return <div style={this.props.style} className={Utils.clsx(this.props.classes.root, this.props.className)}>
            {this.props.showToolbar ? this.renderToolbar() : null}
            {this.state.viewType === TILE ? this.renderPath() : null}
            <div className={Utils.clsx(this.props.classes.filesDiv, this.props.classes[`filesDiv${this.state.viewType}`])}>
                {this.state.viewType === TABLE ? this.renderItems('/') : this.renderItems(this.state.currentDir || '/')}
            </div>
            {this.props.allowUpload ? this.renderInputDialog() : null}
            {this.props.allowUpload ? this.renderUpload() : null}
            {this.props.allowDelete ? this.renderDeleteDialog() : null}
            {this.props.allowView ? this.renderViewDialog() : null}
            {this.state.modalEditOfAccess && this.props.modalEditOfAccessControl && this.props.modalEditOfAccessControl(this, this.state.modalEditOfAccessObjData)}
            {this.renderError()}
        </div>;
    }
}

FileBrowser.defaultProps = {
    modalEditOfAccessControl: () => { },
};

FileBrowser.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    ready: PropTypes.bool,
    expertMode: PropTypes.bool,
    showToolbar: PropTypes.bool,
    allowUpload: PropTypes.bool,
    allowDownload: PropTypes.bool,
    allowCreateFolder: PropTypes.bool,
    allowDelete: PropTypes.bool,
    allowView: PropTypes.bool,
    imagePrefix: PropTypes.string,
    showExpertButton: PropTypes.bool,
    viewType: PropTypes.string,
    showViewTypeButton: PropTypes.bool,

    selected: PropTypes.string,
    tileView: PropTypes.bool,
    filterFiles: PropTypes.array, // like ['png', 'svg', 'bmp', 'jpg', 'jpeg']
    filterByType: PropTypes.string, // images, code or txt from FileViewer.EXTENSIONS
    onSelect: PropTypes.func, // function (id, isDoubleClick)

    modalEditOfAccessControl: PropTypes.func,
};

/** @type {typeof FileBrowser} */
const _export = withWidth()(withStyles(styles)(FileBrowser));
export default _export;