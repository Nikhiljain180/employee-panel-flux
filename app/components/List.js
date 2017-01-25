var React = require('react');
var ReactDOM = require('react-dom');

var List = React.createClass({
  render: function() {
      return (
        <div className="relative renderEmpTable">
           <table className="table-inverse table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Job Title</th>
                <th>Department</th>
              </tr>
            </thead>
                <RenderTableData edit={this.props.edit} data={this.props.items} remove={this.props.remove}/>
          </table>
       </div>
      )
    }
});

var RenderTableData = React.createClass({
  handleEditEmpDetail : function(index,item){
    this.removeInfo(index);
    this.props.edit(item);
    stayZila.stayZilaElement(document.querySelector('.employeeEditForm')).addClass('hide').removeClass('show');
  },
  editInfo : function(item,index){
    ReactDOM.render(
      <EditItem add={this.handleEditEmpDetail} item={item} index={index}/>,
         document.getElementById('empEditPanelContainer')
    );
    stayZila.stayZilaElement(document.querySelector('.employeeEditForm')).addClass('show').removeClass('hide');
    document.querySelector('#usrE').value = item.name;
    document.querySelector('#emailE').value = item.email;
    document.querySelector('#genderE').value = item.gender;
    document.querySelector('#jobTitleE').value = item.jobTitle;
    document.querySelector('#departmentE').value = item.department;
  },
  removeInfo : function(index){
    this.props.remove(index);
  },
   render: function(){
    var that = this,
     empData = this.props.data.map(function(item,index) {
      return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.jobTitle}</td>
            <td>{item.department}</td>
            <td className="pt-20 empButton">
                <button  className="mb-20 btn-default btn btn-primary" onClick={that.editInfo.bind(that,item,index)}>Edit</button>
            </td>
            <td className="pt-20 empButton">
                <button type="button" className="mb-20 btn-default btn btn-primary" onClick={that.removeInfo.bind(that,index)}>Delete</button>
            </td>
          </tr>
      )
    });
    return(
       <div>
          <div id="empEditPanelContainer" className="empEditPanelContainer"></div>
         <table className="empData">
          <tbody>
             {empData}
         </tbody>
         </table>
       </div>
    )
  }
});

var EditItem = React.createClass({

  submitEmpDetail : function(item,add,index,event){
    var newItem = {},flag = 0;
    if(!this.refs.Name.value){
      stayZila.stayZilaElement(document.querySelector('#usrE')).addClass('borderError');
    }
    if(!this.refs.email.value){
      stayZila.stayZilaElement(document.querySelector('#emailE')).addClass('borderError');
    }
    if(this.refs.Name.value && this.refs.email.value){
      if(this.refs.Name.value == item.name && this.refs.email.value == item.email &&
          this.refs.gender.value == item.gender && this.refs.jobTitle.value == item.jobTitle
         && this.refs.department.value == item.department){
           flag = 1;
      }
      newItem.name = this.refs.Name.value;
      newItem.email = this.refs.email.value;
      newItem.gender = this.refs.gender.value;
      newItem.jobTitle = this.refs.jobTitle.value;
      newItem.department = this.refs.department.value;

      this.refs.Name.value = '';this.refs.email.value = '';
      if(flag == 0) {
         add(index,newItem);
      }
      this.closeEmpPanel(event);
    }
  },
  closeEmpPanel : function(event){
    stayZila.stayZilaElement(document.querySelector('.employeeEditForm')).addClass('hide').removeClass('show');
  },
  changeState : function(event){
    stayZila.stayZilaElement(event.target).removeClass('borderError');
  },
  render: function() {
    return (
        <div className="empPanelEdit">
        <div className="hide employeeEditForm">
        <div className="fixed empMask" onClick={this.closeEmpPanel}></div>
    <div className="absolute employeeDetail">
        <div className="mb-10 form-group">
        <label for="usr">Name:</label>
    <input ref="Name" type="text" className="form-control" id="usrE" onFocus={this.changeState}/>
    </div>
    <div className="mb-10 form-group">
        <label for="email">Email:</label>
    <input ref="email" type="text" className="form-control" id="emailE" onFocus={this.changeState}/>
    </div>
    <div className="mb-10 form-group">
        <label for="gender">Gender:</label>
    <select ref="gender" className="form-control" id="genderE">
        <option>Male</option>
        <option>FeMale</option>
        </select>
        </div>
        <div className="mb-10 form-group">
        <label for="jobTitle">Job Title:</label>
    <select ref="jobTitle" className="form-control" id="jobTitleE">
        <option>FrontEnd Developer</option>
    <option>backend Developer</option>
    <option>fullStack Developer</option>
    <option>Web Tester</option>
    <option>Product Managar</option>
    <option>Operation Managar</option>
    <option>Sales Exicutive</option>
    <option>Bussiness Exicutive </option>
    </select>
    </div>
    <div className="form-group">
        <label for="department">Department:</label>
    <select ref="department" className="form-control" id="departmentE">
        <option>IT Department</option>
    <option>Busniess Department</option>
    <option>Sales Department</option>
    </select>
    </div>
    <button type="button" onClick={this.submitEmpDetail.bind(this,this.props.item,this.props.add,this.props.index)} className="w-100 mt-10 btn-default btn btn-primary">Submit Detail</button>
    </div>
    </div>
    </div>
    )
  }
});



module.exports = List;
