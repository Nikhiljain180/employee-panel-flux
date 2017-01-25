var React = require('react');

var AddItem = React.createClass({

    submitEmpDetail : function(event){
        var newItem = {};
        if(!this.refs.Name.value){
            stayZila.stayZilaElement(document.querySelector('#usr')).addClass('borderError');
        }
        if(!this.refs.email.value){
            stayZila.stayZilaElement(document.querySelector('#email')).addClass('borderError');
        }
        if(this.refs.Name.value && this.refs.email.value){
            newItem.name = this.refs.Name.value;
            newItem.email = this.refs.email.value;
            newItem.gender = this.refs.gender.value;
            newItem.jobTitle = this.refs.jobTitle.value;
            newItem.department = this.refs.department.value;

            this.refs.Name.value = '';this.refs.email.value = '';
            this.props.add(newItem);
            this.closeEmpPanel(event);
        }
    },
    addEmp : function(){
        stayZila.stayZilaElement(document.querySelector('.employeeForm')).addClass('show').removeClass('hide');
    },
    closeEmpPanel : function(event){
        stayZila.stayZilaElement(document.querySelector('.employeeForm')).addClass('hide').removeClass('show');
    },
    changeState : function(event){
        stayZila.stayZilaElement(event.target).removeClass('borderError');
    },
  render: function() {
    return (
      <div className="empPanel">
        <div className="header">
           <button type="button" className="mb-20 btn-default btn btn-primary" onClick={this.addEmp}>Add Employee</button>
        </div>
        <div className="hide employeeForm">
          <div className="fixed empMask" onClick={this.closeEmpPanel}></div>
          <div className="absolute employeeDetail">
          <div className="mb-10 form-group">
            <label for="usr">Name:</label>
            <input ref="Name" type="text" className="form-control" id="usr" onFocus={this.changeState}/>
          </div>
          <div className="mb-10 form-group">
            <label for="email">Email:</label>
            <input ref="email" type="text" className="form-control" id="email" onFocus={this.changeState}/>
          </div>
          <div className="mb-10 form-group">
            <label for="gender">Gender:</label>
            <select ref="gender" className="form-control" id="gender">
                <option>Male</option>
                <option>FeMale</option>
            </select>
          </div>
          <div className="mb-10 form-group">
            <label for="jobTitle">Job Title:</label>
            <select ref="jobTitle" className="form-control" id="jobTitle">
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
            <select ref="department" className="form-control" id="department">
                <option>IT Department</option>
                <option>Busniess Department</option>
                <option>Sales Department</option>
            </select>
          </div>
          <button type="button" onClick={this.submitEmpDetail} className="w-100 mt-10 btn-default btn btn-primary">Submit Detail</button>
      </div>
        </div>
      </div>
    )
  }
});

module.exports = AddItem;
