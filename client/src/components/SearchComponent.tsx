import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

interface SearchComponentProps {
    list: string[];
}

const useStyles = makeStyles((theme) => ({
    popover: {
        padding: theme.spacing(1),
    },
    highlighted: {
        backgroundColor: '#ffff00', // Yellow background
    },
}));

const SearchComponent: React.FC<SearchComponentProps> = ({ list }) => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const anchorEl = useRef(null);

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchText(event.target.value);
        if (event.target.value !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const filteredList = list.filter(item => item.toLowerCase().includes(searchText.toLowerCase())).slice(0, 5);

    const HighlightText = ({ text = '', highlight = '' }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) => 
                    part.toLowerCase() === highlight.toLowerCase()
                        ? <span key={index} className={classes.highlighted}>{part}</span> 
                        : part
                )}
            </span>
        );
    };

    return (
        <div>
            <TextField 
                id="search-input" 
                label="Search" 
                variant="outlined" 
                value={searchText} 
                onChange={handleSearchChange} 
                ref={anchorEl}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="bi bi-search"></i>
                      </InputAdornment>
                    ),
                  }}
            />
            <Popover
                open={isOpen}
                anchorEl={anchorEl.current}
                onClose={() => setIsOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popover}>
                    {filteredList.map((item, index) => (
                        <div key={index}>
                            <HighlightText text={item} highlight={searchText} />
                        </div>
                    ))}
                </div>
            </Popover>
        </div>
    );
};

export default SearchComponent;
