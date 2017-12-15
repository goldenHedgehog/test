define(['react'], function(React) {
    /******** props
     * value = "value input" || ""
     * label = "label input" || ""
     * floatingLabel = "text" || "",
     * placeholder = "placeholder input", if null us label, if null - empty
     * disabled = "input disabled" || ""
     * checkEmpty = true || false
     * type      = "number" || "text"    default "text"
     * ********/

    var Text = React.createClass({
        getInitialState: function() {
            return{
                error:false,
                value:this.props.value
            }
        },
        getData:function(){
            if(this.props.checkEmpty ){
                if(this.refs.editor.getDOMNode().value==""){this.setState({error:true});}
                else{this.setState({error:false});}
            }
            return this.refs.editor.getDOMNode().value
        },
        onChange:function(e){
            this.setState({value:e.target.value,error:false});
            if(this.props.onChange)this.props.onChange(e.target.value);
        },
        componentDidMount :function(){
            if(this.props.floatingLabel)$('.floating.ui.label').popup()
        },
        componentWillReceiveProps:function(props){
            this.state.value=props.value
        },
        render:function(){
            var self = this;
            var classInput = "my ui input";
            if(this.props.disabled)classInput += " disabled";
            if(this.state.error)   classInput += " error";
            return(
                <div className={classInput}>
                    {this.props.label?<label className="my my-label in-input">{this.props.label}</label>:null}
                    {this.props.floatingLabel?
                        <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                            <i className="info circle icon"></i>
                        </div>
                        :null}
                    <input
                        ref="editor"
                        min={this.props.min ||""}
                        max={this.props.max ||""}
                        type={this.props.type ||"text"}
                        pattern={this.props.pattern ||""}
                        placeholder={this.props.placeholder?this.props.placeholder:this.props.label||""}
                        value={this.state.value || this.props.min}
                        onChange={this.onChange}
                    />
                </div>
            )
        }
    });
    return Text;
});
