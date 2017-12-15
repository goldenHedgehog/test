define(function(require){
    var React        = require('react'),
        beautify     = require('beautify');
    var Ace = React.createClass({
        componentDidMount: function(){
            var ace  = require('ace/ace');
            if (typeof ace === 'undefined') {
                ace = window.ace;
            }
            var self=this;
            this.editor = ace.edit(this.refs.codeEditor.getDOMNode());
            this.editor.getSession();
            this.editor.setOptions({
                enableSnippets:true,
                maxLines: Infinity,
                minLines: 6
            });
            //this.editor.setAutoScrollEditorIntoView(true);
            this.editor.session.setMode("ace/mode/javascript");
            this.editor.getSession().setTabSize(2);

            /*this.editor.commands.addCommand({
                name: "beautify",
                bindKey: {win: "Ctrl-Shift-F", mac: "Ctrl-Shift-F"},
                exec: function(editor) {
                    var str = self.editor.getValue();
                    self.editor.setValue(beautify.js_beautify(str, { indent_size: 4 }), null, '\t' );
                }
            });
            this.editor.commands.addCommand({
                name: "autocompletionOff",
                bindKey: {win: "Ctrl-Shift-U", mac: "Ctrl-Shift-U"},
                exec: function(editor) {
                    self.editor.setBehavioursEnabled(false);
                }
            });
            this.editor.commands.addCommand({
                name: "autocompletionOn",
                bindKey: {win: "Ctrl-Shift-Y", mac: "Ctrl-Shift-Y"},
                exec: function(editor) {
                    self.editor.setBehavioursEnabled(true);
                }
            });*/
            console.log(this.props.config)
            if(_.isObject(this.props.config)) this.props.config = JSON.stringify(this.props.config);
            this.editor.setValue(this.props.config || "", null, '\t');
            //this.editor.focus();
        },
        resize:function(){
            this.editor.resize(true);
        },
        getData:function(node){
            return this.editor.getValue()
            //var arr = node.value.split('\n');
           // this.editor.insert(arr[0]);
            //this.editor.focus();
        },
        setConfig:function(config){
           // this.editor.setValue(beautify.js_beautify(config, { indent_size: 4 }), null, '\t');
        },
        getError:function(){
            return this.editor.getSession().getAnnotations()
        },

        render:function(){
            if(this.editor){
               // this.editor.setValue(beautify.js_beautify(this.props.config, { indent_size: 4 }), null, '\t');
                //this.editor.focus();
            }
            return (
                <div ref="codeEditor" className="codeEditor"></div>
            )
        }
    });
    return Ace;
});
