import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {SortContext, CategoryContext} from '../../screens/store/store';

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
                        console.log('category', category);
                        return (
                            <>
                                <InputLabel id="category-select">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={category}
                                    onChange={e => toggleCategory(e.target.value)}
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
                    console.log('sort', sort);
                    return (
                        <>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="sort-select">Sort by</InputLabel>
                                <Select
                                    labelId="sorth-select-label"
                                    id="sort-select"
                                    value={sort}
                                    onChange={e => toggleSort(e.target.value)}
                                >          
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'price'}>Price</MenuItem>
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
