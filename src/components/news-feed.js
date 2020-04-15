import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
} from "@material-ui/core"
import CustomCard from "../components/custom-card"
// import firebase  from "gatsby-plugin-firebase";
import firebase from "../helper/firebase"

const useStyles = theme => ({
  root: {
    width: "100%",
  },
})

class NewsFeed extends React.Component {
  constructor(props) {
    super(props)
    const columns = [
      { id: "title", label: "Title", minWidth: 170 },
      { id: "source", label: "Source", minWidth: 40 },
      { id: "date", label: "Date", minWidth: 40 },
    ]
    this.state = {
      page: 0,
      rowsPerPage: 8,
      columns: columns,
      rows: [],
    }
  }

  createData(id, title, date, source) {
    return { id, title, date, source }
  }

  componentDidUpdate() {
    const context = this

    firebase
      .firestore()
      .collection("/news-feed")
      .onSnapshot(querySnapshot => {
        if (querySnapshot.exists === null) return
        var { rows } = context.state
        var newEntries = false
        querySnapshot.forEach(doc => {
          var entry = {
            id: doc.id,
            title: doc.data().title,
            source: doc.data().source,
            link: doc.data().link,
            date: doc
              .data()
              .date.toDate()
              .toLocaleString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
          }

          if (!rows.some(row => row.id === entry.id)) {
            rows.push(entry)
            newEntries = true
          }

          if (newEntries) context.setState({ rows })
        })
      })
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value,
    })
  }

  followLink = link => {
    window.open(link, "_blank")
  }

  render() {
    const { classes } = this.props
    const { page, rowsPerPage, columns, rows } = this.state

    return (
      <CustomCard title={"New Feed"}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => this.followLink(row.link)}
                    >
                      {columns.map(column => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </CustomCard>
    )
  }
}

export default withStyles(useStyles)(NewsFeed)
