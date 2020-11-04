import React , {Component} from 'react' ;
import axios from 'axios' ;
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            emp: []
        }
    }
    componentDidMount = () =>{
        axios.get(`http://localhost:8080/api/employees/${this.state.id}`)
        .then(res=>{
            console.log(res.data)
            this.setState({emp:res.data})
        })
    }
    goBack = (e) =>{
        this.props.history.push('/');
    }
    render(){
        return(
            <div>
            <br></br>
            <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> View Employee Details</h3>
                <div className = "card-body">
                <div className = "row">
                        <label> Picture </label>
                        <div> <img src={this.state.emp.profile} width='200' height='200'/></div>
                    </div>
                    <div className = "row">
                        <label> Name: </label>
                        <div>  {this.state.emp.name}</div>
                    </div>
                    <div className = "row">
                        <label> Salary: </label>
                        <div>  {this.state.emp.salary}</div>
                    </div>
                    <div className = "row">
                        <label>Date of joining :  </label>
                        <div>{this.state.emp.date}</div>
                    </div>
                    <div className = "row">
                        <label>Designation : </label>
                        <div>{this.state.emp.designation}</div>
                    </div>
                    <div className = "row">
                        <label>Resume: </label>
                        <div><a href={this.state.emp.resume} add target="_blank">Click to view resume</a></div>
                    </div>
                    <div className="row" >
                        <button onClick={this.goBack}>Back</button>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}
export default ViewEmployeeComponent;