define(['react','jsx!myCmp/timeoutLabel'], function(React,Label) {
    /******** props
     * hover         = true||false                                             // default:false            //включает отключает подсказки
     * hoverPosition = "top left" || "top center" || "top right" ||
     *                 "bottom left" || "bottom center" || "bottom right" ||   // default:"top center"     //позиция подсказки  текста
     *                 "right center" || "left center"
     * hoverContent  = " "                                                     // default:"Click to edit"  //текст подсказки текста
     * **attr        = {id:id, name:"name"}
     * **save        = function(attr,cb){} //  cb(onSave){} // onSave ="false"||"success"||"error"
     *
     *
     */
    var DblClickEdit = React.createClass({
        getInitialState: function() {
            return{
                onEdit:false,
                onSave:false,
                name:this.props.attr.name
            }
        },
        editSwitch:function(state){
            this.setState({onEdit:state,onSave:false});
        },
        save:function(id){
            if(!this.refs.editor.getDOMNode().value){
                this.setState({onEdit:false,onSave:"error"});
                return
            }
            var self = this;
            if(this.state.onEdit && this.props.save){
                this.props.save ({id:id,value:this.refs.editor.getDOMNode().value,other:{id:this.props.attr.idlist}},function(onSave){
                    self.setState({
                        onEdit:false,
                        onSave:onSave||false,
                        name:self.refs.editor.getDOMNode().value
                    });
                });
            }
        },
        getData:function(){
            return this.state.name
        },
        componentWillReceiveProps:function(props){
            //this.state.name=props.attr.name;
        },
        setName:function(name){
            this.setState({name:name});
        },
        componentDidUpdate :function(){
            if(this.state.onEdit ){
                var self = this;
                var editor = $(this.refs.editor.getDOMNode())
                editor.focus();
                editor.blur(function(e){
                    self.save(e.target.dataset.id);
                });
                editor.keyup(function(e) {
                    if(e.which == 13) {
                        self.save(e.target.dataset.id);
                    }
                    if (e.which == 27){
                        self.setState({onEdit:false,onSave:false});
                    }
                });
            }
            if(this.props.hover)$('.no-edit-field').popup()
            if(this.props.hover)$('.edit-icon.success').popup()
            if(this.props.hover)$('.edit-icon.error').popup()
        },
        componentDidMount :function(){
            if(this.props.hover)$('.no-edit-field').popup()
        },
        render:function(){
            return(
                <div className="my dbl-click-edit-wrapper">
                    {this.state.onEdit?
                        <div className="ui input field">
                            {this.props.label? <label className="lebel-field on-edit">{this.props.label}</label>:null}
                            <input type="text" ref="editor" data-id={this.props.attr.id} placeholder="value" defaultValue={this.state.name} />
                        </div>
                        :
                        <div className="ui icon input field" onClick={this.editSwitch.bind(null,true)}  >
                            {this.props.label? <label className="lebel-field on-label">{this.props.label}</label>:null}
                            <p ref="label" className="no-edit-field" data-content={this.props.hoverContent || "Click to edit" } data-position={this.props.hoverPosition || "top center" }> {this.state.name || "empty"} </p>
                            {(() => {
                                switch (this.state.onSave) {
                                    case "success":    return <i className="edit-icon large icons success" data-content={"Edit successfully" } data-position={ "top right" }>
                                                                <i className="edit icon"></i>
                                                                <i className="corner positive checkmark icon"></i>
                                                            </i>;
                                    case "error":    return <i className="edit-icon large icons error" data-content={"Edit error"} data-position={ "top right" }>
                                                                <i className="edit icon"></i>
                                                                <i className="corner negative remove icon"></i>
                                                            </i>;
                                    default: return <i className="edit-icon edit large icon"></i>
                                }
                            })()}
                        </div>
                    }
                </div>
            )
        }
    });
    return DblClickEdit;
});
