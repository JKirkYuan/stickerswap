var LoginForm = React.createClass({ 
  getInitialState: function () {
    return { email: '', password: '' };
  },
  handleEmailChange: function(e) {
    this.setState({ email: e.target.value  });
  },
  handlePasswordChange: function(e) {
    this.setState({ password: e.target.value  });
  },
  login(e) {
    e.preventDefault();
    $.ajax({
      type        : "POST",
      url         : "/user_token",
      data        : {"auth": {"email": this.state.email, "password": this.state.password}},
      success     : function (html) {
        console.log(html);
        if(html == 'true') {
          alert("right username And password");
        } else {
          alert("Wrong username And password");
        }
      },
    });
  },
  render() { 
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    return ( 
      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log In</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="loginForm" onSubmit={this.login}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" className="form-control" id="email" onChange={this.handleEmailChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Password</label>
                  <input type="password" name="password" className="form-control" id="password" onChange={this.handlePasswordChange}/>
                </div>
                <input type='hidden' name='utf8' value='✓' />
                <input type='hidden' name='authenticity_token' value={csrfToken} />
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.login}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    )  
  },
});
