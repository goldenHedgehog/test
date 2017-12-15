define(['react'], function(React) {
    var Dropdown = React.createClass({
        getInitialState: function() {
            return{
                onEdit:false
            }
        },
        selected:"",
        formater:function(){
            var list = this.props.list;
            if(_.isArray(this.props.list)|| _.isObject(this.props.list)){
                if(!_.isObject(this.props.list[0])){
                    list=[];
                    for(var i in this.props.list){
                        list.push({id:this.props.list[i],name:this.props.list[i]})

                    }
                }
            };
            var selectInList = _.findWhere(list, {id:this.props.select})
            if(!selectInList){
                list.push({id:this.props.select,name:this.props.select})
            }
            return list
        },
        getSelect:function(){
            return {id:$(this.refs.dropdown.getDOMNode()).val()}
        },
        getData :function(){
            return {id:$(this.refs.dropdown.getDOMNode()).val()}
        },
        select:function(e){
            this.selected=e.target.value;
            if(e.target.value=="js_empty") {
                $(this.refs.dropdown.getDOMNode()).val("")
                this.clear();
                return
            }
            if(this.props.selectCB){
                this.props.selectCB({id:e.target.value})
            }
        },
        componentDidMount :function(){
            var self = this;
            if(this.props.select){
                $(this.refs.dropdown.getDOMNode()).val(this.props.select);
            }
            var props={};
            if(self.props.allowAdditions) props.allowAdditions=true
            $(this.refs.dropdown.getDOMNode()).dropdown(props);
            if(this.props.floatingLabel)$('.floating.ui.label').popup()
        },
        setList:function(list){
            this.props.list=list;
            this.setState({onEdit:true});
        },
        clear:function(){
            $(this.refs.dropdown.getDOMNode()).dropdown('clear');
        },
        componentWillUpdate:function(props){
            //console.log("componentWillUpdate",props.select)
            //this.props.select=props.select
            if(props.select){
                //$(this.refs.dropdown.getDOMNode()).val(props.select);
            }
        },
        render:function(){
            var formater=this.formater();
            var self = this;
            return(
                <div className={this.props.error?"my dropdown-wrapper error":"my dropdown-wrapper"}>
                    {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                    {this.props.floatingLabel?
                        <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                            <i className="info circle icon"></i>
                        </div>
                        :null}
                    <select ref="dropdown" onChange={this.select} className="ui search dropdown">
                        <option value="" data-name={null}>{this.props.placeholder||"selected..."}</option>
                        {formater.map(function(item){
                            item = self.props.itsModel? item.attributes : item;
                                return <option value={item.id} data-name={item.name}>{item.name}</option>
                        })}
                        {this.props.noSelect?<option value="js_empty" data-name="js_empty">No selected...</option>:null}
                    </select>
                </div>
            )
        }
    });
    return Dropdown;
});
