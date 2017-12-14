define(['react'], function(React) {
    /******** props
     * hover         = true||false                                             // default:false            //включает отключает подсказки
     * hoverPosition = "top left" || "top center" || "top right" ||
     *                 "bottom left" || "bottom center" || "bottom right" ||   // default:"top center"     //позиция подсказки  текста
     *                 "right center" || "left center"
     * hoverContent  = " "                                                     // default:"Click to edit"  //текст подсказки текста
     * typeDate      = "datetime" || "date" ||"time"                          // default:datetime            //
     *
     */

    var dateParser = function(){

    };

    var Checkbox = React.createClass({
        getInitialState: function() {
            return{
                onEdit:false,
                onSave:false
            }
        },
        getData:function(){
            console.log(this.calendar.calendar('get date'))
            return  this.calendar.calendar('get date')
        },
        componentDidMount :function(){
            var self = this;

            this.calendar = $(this.refs.datetime.getDOMNode()).calendar({
                ampm: false,
                type: self.props.typeDate  || "datetime"
            });
            if(this.props.value)this.calendar.calendar('set date',this.props.value,true,false );
            if(this.props.hover)$('.ui.calendar').popup();
        },
        componentWillUpdate:function(props){
            if(props.value)this.calendar.calendar('set date',props.value,true,false );
        },
        render:function(){
            var classInput = "ui input left icon";
            if(this.props.disabled)classInput += " disabled";
            return(
                <div className={this.props.error?"my calendar-wrapper error":"my calendar-wrapper"}>
                    {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                    {this.props.floatingLabel?
                        <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                            <i className="info circle icon"></i>
                        </div>
                        :null}
                    <div className="ui calendar" ref="datetime"  data-content={this.props.hoverContent || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                        <div className={classInput} >
                            {this.props.typeDate == "time" ? <i className="time icon"></i> : <i className="calendar icon"></i>}
                            <input type="text" placeholder="Date/Time"  />
                        </div>
                    </div>
               </div>
            )
        }
    });
    return Checkbox;
});
