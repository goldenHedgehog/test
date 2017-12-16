define(['react'], function(React) {

    class Label extends React.Component {

        static propTypes = {
            timer   :this.props.timer || 3000,
            color   :this.props.color || "",
            style   :this.props.style || "basic",
            position:this.props.position || "left"
        };

        componentDidMount(){
            var self=this;
            if(this.state.timer){
                setTimeout(() => {
                    if(self.refs.label){
                        $(self.refs.label.getDOMNode()).transition('fade right')
                    }
                }, self.state.timer);
            }
        }

        render(){
            return(
                <div ref="label" className= {"ui "+this.state.position+" pointing "+this.state.color+" "+this.state.style+ " label"}>
                    {this.props.label || "Выполнено"}
                </div>
            );
        }
    }
    return Label;
});