import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import MyCalendar from '../Calendar/index';
import './Header.css';

const Header = () => {

    // State to track whether the "Calendar" TreeItem is expanded
    const [isCalendarExpanded, setCalendarExpanded] = React.useState(false);

    // Function to toggle the "Calendar" TreeItem expansion state
    const handleCalendarToggle = () => {
        setCalendarExpanded(!isCalendarExpanded);
    };

    return (
        <div className="container">
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                //sx={{ width: '100%', height: '100%', }}
            >

                <TreeItem nodeId="1" label="Actions (Calendar, only UI)" onClick={isCalendarExpanded}>
                    <TreeItem
                        nodeId="2"
                        label="Calendar"
                        onClick={handleCalendarToggle}
                    >
                        <MyCalendar />
                    </TreeItem>
                </TreeItem>
                <TreeItem nodeId="5" label="Controllers (Only list without DB access and actions)">
                    <TreeItem nodeId="10" label="ItemController">
                        <TreeItem nodeId="11" label="CreateUser" />
                        <TreeItem nodeId="12" label="ReadUser" />
                        <TreeItem nodeId="13" label="UpdateUser" />
                        <TreeItem nodeId="14" label="DeleteUser" />
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </div>
    );
};

export default Header;
