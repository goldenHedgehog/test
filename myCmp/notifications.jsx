define(['react'], function(React) {
    /******** props
     *
     * ********/

    var Error = React.createClass({
        getInitialState: function() {
            return{
                header:"",
                value:"",
                timer   :this.props.timer || null,
            }
        },
        hide:function(){
            $(this.refs.not.getDOMNode()).transition('fade');
        },
        show:function(value,header){
            if(value)this.setState({value:value});
            if(header)this.setState({header:header});
            $(this.refs.not.getDOMNode()).transition('show');
        },
        componentDidMount :function(){
            var self=this;
            $('.message .nopeclose')
                .on('click', function() {
                    $(this)
                        .closest('.message')
                        .transition('fade')
                    ;
                })
            ;
        },
        render:function(){
            return(
                <div ref="not" className="ui hidden negative message">
                    <i className="nopeclose close icon"></i>
                    <div className="header">
                        {this.state.header || this.props.header || "Ошибка"}
                    </div>
                    <p> {this.state.value || this.props.value || "некая"} </p>
                </div>
            )
        }
    });
    var Warning = React.createClass({
        getInitialState: function() {
            return{
                header:"",
                value:"",
                timer   :this.props.timer || 6000,
            }
        },
        hide:function(){
            $(this.refs.not.getDOMNode()).transition('fade');
        },
        show:function(value,header){
            if(value)this.setState({value:value});
            if(header)this.setState({header:header});
            $(this.refs.not.getDOMNode()).transition('show');
        },
        componentDidMount :function(){
            $('.message .nopeclose')
                .on('click', function() {
                    $(this)
                        .closest('.message')
                        .transition('fade')
                    ;
                })
            ;
           /* if(this.state.timer){
                setTimeout(() => {
                    if(self.refs.not && $(this.refs.not.getDOMNode()).hasClass( "visible" )){
                        $(this.refs.not.getDOMNode()).transition('fade')
                    }
                }, self.state.timer);
            }*/
        },
        render:function(){
            return(
                <div ref="warn" className="ui hidden warning message">
                    <i className="nopeclose close icon"></i>
                    <div className="header">
                        {this.state.header || this.props.header || "Внимание"}
                    </div>
                    <p> {this.state.value || this.props.value || "некая"} </p>
                </div>
            )
        }
    });
    var Success = React.createClass({
        getInitialState: function() {
            console.log("getInitialState",this.props )
            return{
                header:"",
                value:"",
                timer   :this.props.timer || 3000,
            }
        },
        hide:function(){
            $(this.refs.yep.getDOMNode()).transition('fade');
        },
        show:function(value,header){
            if(value)this.setState({value:value});
            if(header)this.setState({header:header});
            $(this.refs.yep.getDOMNode()).transition('show');
        },
        componentDidMount :function(){
            var self=this;
            $('.message .yepclose')
                .on('click', function() {
                    $(this)
                        .closest('.message')
                        .transition('fade')
                    ;
                })
            ;
            console.log(this.state.timer)
           if(this.state.timer){
                console.log(self.refs.not)
                setTimeout(() => {
                    if(self.refs.not && $(this.refs.not.getDOMNode()).hasClass( "visible" )){
                        $(this.refs.not.getDOMNode()).transition('fade')
                    }
                }, self.state.timer);
            } /**/
        },
        render:function(){
            console.log("schedule render",this.props )
            return(
                <div ref="yep" className="ui hidden positive message">
                    <i className="yepclose close icon"></i>
                    <div className="header">
                        {this.state.header || this.props.header || "Успешно"}
                    </div>
                    <p> {this.state.value || this.props.value || "некая"} </p>
                </div>
            )
        }
    });
    return  {
        Error:Error,
        Warning:Warning,
        Success:Success
    };
});
