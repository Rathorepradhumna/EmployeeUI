import React , {Component} from 'react' ; 
import axios from 'axios' ; 
import S3FileUpload from 'react-s3';
const config = {
  bucketName: '',
  dirName: 'photos', /* optional */
  region: '',
  accessKeyId: '',
  secretAccessKey: '',
}
class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            salary: '',
            date: '' ,
            designation : '',
            profile : '' ,
            resume : ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
     }
     changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }
    changeDesignationHandler= (event) => {
        this.setState({designation: event.target.value});
    }
    uploadProfile = (e) =>{
      console.log(e.target.files[0])
      
      S3FileUpload
      .uploadFile(e.target.files[0], config)
      .then(data => {
        console.log(data.location)
        this.setState({profile:data.location})
      })
      .catch(err => console.error(err))

    }
    uploadResume = (e) =>{
      console.log(e.target.files[0])
      
      S3FileUpload
      .uploadFile(e.target.files[0], config)
      .then(data => {
        console.log(data.location)
        this.setState({resume:data.location})
      })
      .catch(err => console.error(err))

    }
    save = (e) =>{
        e.preventDefault();
        if(this.state.id!==undefined){
          let employee = {name: this.state.name, salary: this.state.salary, date: this.state.date , designation : this.state.designation , profile:this.state.profile , resume : this.state.resume};
          console.log('employee => ' + JSON.stringify(employee));
         console.log( "param" + this.state.id)
         axios.put(`http://localhost:8080/api/employees/` + this.state.id , employee )
         .then(res=>{
           console.log(res)
          this.props.history.push('/')
         })
        }
        else{
          let employee = {name: this.state.name, salary: this.state.salary, date: this.state.date , designation : this.state.designation ,profile:this.state.profile , resume : this.state.resume};
          console.log('employee => ' + JSON.stringify(employee));
          axios.post(`http://localhost:8080/api/employees` , employee)
          .then(res=>this.props.history.push('/'))
      
        }
      }
    render(){
        return(
            <div  className = "card col-md-6 offset-md-3">
                <form>
                <div class="form-group">
            <label>Profile Picture</label>
            <input type ="file" onChange={this.uploadProfile} />
            </div>
            <div class="form-group">

              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter Name" onChange={this.changeNameHandler}/>
              <small id="name" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">salary</label>
              <input type="text" class="form-control" id="salary" placeholder="salary" onChange={this.changeSalaryHandler}/>
            </div>
            <div class="form-group">
              <label for="date">date</label>
              <input type="Date" class="form-control" id="date"  placeholder="date" onChange={this.changeDateHandler}/>
            </div>
           
            <div class="form-group">
              <label for="designation">designation</label>
              <input type="text" class="form-control" id="designation"  placeholder="designation" onChange={this.changeDesignationHandler}/>
            </div>
            <div class="form-group">
            <label>upload Resume</label>
            <input type ="file" onChange={this.uploadResume} />
            </div>
            <button type="submit" class="btn btn-primary" onClick={this.save}>Submit</button>
          </form>
          </div>
        );
       
    }
}
export default CreateEmployeeComponent;