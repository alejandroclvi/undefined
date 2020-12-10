import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function UtilityBar() {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    // TODO: fix type
    const handleCategory = (event: any) => {
        setCategory(event.target.value);
    };
    const handleSort = (event: any) => {
        setSort(event.target.value);
    };
    return (
        <div className="product-list">
            <FormControl className={classes.formControl}>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    onChange={handleCategory}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'non-traditional'}>Non-traditional</MenuItem>
                <MenuItem value={'classic'}>Classic</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="sort-select">Sort by</InputLabel>
                <Select
                    labelId="sorth-select-label"
                    id="sort-select"
                    value={sort}
                    onChange={handleSort}
                >          
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'price'}>Price</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default UtilityBar;
