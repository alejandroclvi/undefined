import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {SortContext, CategoryContext, categoryOption, sortOption} from '../../screens/store/store';

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
    return (
        <div className="product-list">
            <FormControl className={classes.formControl}>
                <CategoryContext.Consumer>
                    {({category, toggleCategory}) => {
                        return (
                            <>
                                <InputLabel id="category-select">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={category}
                                    onChange={(e) => {
                                        const category = (e.target.value as categoryOption);
                                        toggleCategory(category);
                                    }}
                                >
                                <MenuItem value="all">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={'non-traditional'}>Non-traditional</MenuItem>
                                <MenuItem value={'classic'}>Classic</MenuItem>
                                </Select>
                            </>
                        )
                    }}
                </CategoryContext.Consumer>
            </FormControl>
            <SortContext.Consumer>
                {({sort, toggleSort}) => {
                    return (
                        <>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="sort-select">Sort by</InputLabel>
                                <Select
                                    labelId="sorth-select-label"
                                    id="sort-select"
                                    value={sort}
                                    onChange={e => {
                                        const sortBy = (e.target.value as sortOption);
                                        toggleSort(sortBy);
                                    }}
                                >          
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='price'>Price</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )
                }}
            </SortContext.Consumer>
        </div>
    );
}

export default UtilityBar;
