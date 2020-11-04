import React , {Component} from 'react' ; 
import axios from 'axios' ;
import ReactTable from 'react-table-6' ;
import 'react-table-6/react-table.css' ;
import {withRouter} from 'react-router-dom';
class Emptable extends Component {

   state = {
       emp : []
   }

    componentDidMount = () =>{
        axios.get(`http://localhost:8080/api/employees`)
        .then(res=>{
            console.log("hello")
            this.setState({emp:res.data._embedded.employees})
        })
      console.log( "state" + this.state.emp)
    }
    deleteRow = (p) =>{
        axios.delete(p)
       .then(res=>this.componentDidMount())
    }
    editEmployee = (id) =>{
        this.props.history.push(`/update-employee/${id}`);
    }
    viewEmployee  = (id) =>{
        this.props.history.push(`view-employee/${id}`)
    }

    nextPath(path) {
        this.props.history.push(path);
      }
    render(){
        const data = this.state.emp
        const columns = [
            {
                Header: "Id",
                accessor: "id",
                sortable: true,
                resizable: false,
                filterable : true
            } ,
            {
                Header: "Name",
                accessor: "name",
                sortable: true,
                resizable: true,
                filterable : true
            } , 

            {
                Header: "Salary",
                accessor: "salary",
                sortable: true,
                resizable: false,
                filterable : true
            } , 
            {
                Header: "Date",
                accessor: "date",
                sortable: true,
                resizable: false,
                filterable : true
            } ,
            {
                Header: "Designation",
                accessor: "designation",
                sortable: true,
                resizable: false,
                filterable : true
            } , 
           
            {
                Header: "Delete",
                filterable: false,
                sortable: false,
                resizable: false,
                Cell: props =>{
                  return(
                    <button style={{background: "red", color: "green"}}
                    onClick={() =>{
                        console.log(props)
                        this.deleteRow(props.original._links.employee.href)
                    }

                    }
                    >Delete</button>
                )},
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            }   ,
            {
                Header: "Update",
                filterable: false,
                sortable: false,
                resizable: false,
                Cell: props =>{
                  return(
                    <button style={{background:"white", color: "bue"}}
                    
                    onClick={()=>{
                        console.log(props)
                        this.editEmployee(props.original.id)
                    }}
                    >Update</button>
                )},
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            }   ,
            {
                Header: "View",
                filterable: false,
                sortable: false,
                resizable: false,
                Cell: props =>{
                  return(
                    <button style={{background: "green", color: "blue"}}
                    
                    onClick={()=>{
                        console.log(props)
                        this.viewEmployee(props.original.id)
                    }}
                    >View</button>
                )},
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            }   
        ]

        return(
            <div>
                <div className = "row">
                   <button className="btn btn-primary" onClick={() => this.nextPath('/add-employee/')}> Add Employee</button>
                 </div>
                 <br></br>
            <ReactTable
             columns = {columns} 
            data = {data}
           >
         </ReactTable>
         </div>
        )
    }
}
export default Emptable ;  