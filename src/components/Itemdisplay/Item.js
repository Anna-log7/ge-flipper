import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Item.css';


const styles = theme => ({
  root: {
    margin: 'auto',
    height: '90vh',
    width: '50%',
    marginTop: theme.spacing(3),
    overflowY: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0
  },
});

class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }

  }
  render() {
    const { isLoaded, items } = this.state;
    const { classes } = this.props;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Buy price</TableCell>
              <TableCell>Sell price</TableCell>
              <TableCell>Buy limit</TableCell>
              <TableCell>Margin</TableCell>
              <TableCell>ROI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/derivative/${ item.id }`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.buy_average}</TableCell>
                <TableCell>{item.sell_average}</TableCell>
                <TableCell>{item.buy_quantity}</TableCell>
                <TableCell>{item.margin}</TableCell>
                <TableCell>{item.roi}%</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Paper>
    );
  }
  async componentDidMount() {
    const resp = await axios.get('https://storage.googleapis.com/osbuddy-exchange/summary.json', {
      params: {
        ts: Date.now(),
      }
    });
    let keyItems = Object.values(resp.data);
    keyItems = keyItems.map(i => {
      return {
        ...i,
        margin: i.buy_average - i.sell_average,
        roi: parseFloat((((i.buy_average - i.sell_average) / i.buy_average) * 100).toFixed(2)),
      };
    });

    console.log(keyItems);

    keyItems = keyItems.filter((i) => {
      return (
        i.buy_average > 100
        && i.sell_average > 100
        && i.members
        && i.buy_quantity > 3
        && i.roi > 0.5
        && i.roi < 10
      );
    });

    // Sort by return on investment
    keyItems.sort(this.sortFunc);

    return this.setState({
      isLoaded: true,
      items: keyItems,
    });
  }

  sortFunc(a, b) {
    // Need to parse otherwise the comparison doesn't work correctly
    const roiA = parseFloat(a.roi);
    const roiB = parseFloat(b.roi);

    if (roiA > roiB) {
      return -1;
    }
    if (roiA < roiB) {
      return 1;
    }
    return 0;
  }
}

export default withStyles(styles)(ItemComponent);
