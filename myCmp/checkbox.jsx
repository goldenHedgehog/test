define(['react'], function(React) {
    var Checkbox = React.createClass({
        getInitialState: function() {
            return{
                onEdit:false,
                onSave:false
            }
        },
        getChecked:function(){
            return {check:$(this.refs.checkboxInput.getDOMNode()).attr("checked")?true:false}
        },
        getData :function(){
            return {check:$(this.refs.checkboxInput.getDOMNode()).attr("checked")?true:false}
        },
        componentDidMount :function(){
            this.checkbox = $(this.refs.checkbox.getDOMNode()).checkbox();
            var self = this;
            this.checkbox.on("change",function(e){
                $(self.refs.checkboxInput.getDOMNode()).attr("checked",e.target.checked)
                if(self.props.checkedCB){
                    self.props.checkedCB({check:e.target.checked})
                }
            });
        },
        render:function(){
            return(
                <div className="inline field">
                    <div ref="checkbox" className={"ui "+this.props.style+" checkbox"}>
                        <input ref="checkboxInput" type="checkbox" checked={this.props.checked} tabIndex="0" className="hidden" />
                        <label>{this.props.label}</label>
                    </div>
                </div>
            )
        }
    });
    return Checkbox;
});
