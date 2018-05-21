import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import ClassNames from 'classnames';
import EmojiData from './data';
import Emojify from '../Emoji';

export default class CommentInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEmoji: false,
        };
    }

    static defaultProps = {
        exportComment: () => {},
        isShowBtn: true
    };

    static defaultPropTypes = {
        exportComment: PropTypes.func,
        isShowBtn: PropTypes.boolen
    };

    componentDidMount() {
        // this.textareaDom = document.getElementById(this.textareaId);
        this.textareaDom = ReactDOM.findDOMNode(this.refs.commentText);
    }

    addEmoji = (event) => {
        this.caretIndex = this.getCaretPosition();
        this.setCaretPosition(this.caretIndex);
        this.insertText(event.target.title);
    }

    toggleEmoji = () => {
        this.caretIndex = this.getCaretPosition();
        this.setState(preState => {
            return { showEmoji: !preState.showEmoji }
        }, () => {
            this.setCaretPosition(this.caretIndex);
        });
    }

    //获取光标位置
    getCaretPosition () {
        let CaretPos = 0;
        if (document.selection) {
            // IE Support
            this.textareaDom.focus ();
            let Sel = document.selection.createRange ();
            Sel.moveStart ('character', -this.textareaDom.value.length);
            CaretPos = Sel.text.length;
        } else if (this.textareaDom.selectionStart || this.textareaDom.selectionStart == '0') {
            // Firefox support
            CaretPos = this.textareaDom.selectionStart;
        }

        return CaretPos;
    }

    //设置光标位置函数
    setCaretPosition(pos){
        if(this.textareaDom.setSelectionRange) {
            this.textareaDom.focus();
            this.textareaDom.setSelectionRange(pos,pos);
        } else if (this.textareaDom.createTextRange) {
            var range = this.textareaDom.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    insertText(str) {
        if (document.selection) {
            this.textareaDom.focus();
            var sel = document.selection.createRange();
            sel.text = str;
        } else if (typeof this.textareaDom.selectionStart === 'number' && typeof this.textareaDom.selectionEnd === 'number') {
            var startPos = this.textareaDom.selectionStart,
                endPos = this.textareaDom.selectionEnd,
                cursorPos = startPos,
                tmpStr = this.textareaDom.value;
            this.textareaDom.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            this.textareaDom.selectionStart = this.textareaDom.selectionEnd = cursorPos;
        } else {
            this.textareaDom.value += str;
        }
        this.caretIndex = this.getCaretPosition();
    }

    exportComment = (event) => {
        event.stopPropagation();
        const commentCont = this.refs.commentText.value;
        this.props.exportComment(commentCont);
    }

    clearTextarea = () => {
        this.textareaDom.value = '';
    }

    toggleFocus(isfocus) {
        this.setState({
            textareaFocus: isfocus,
        });
    }

    onTextareaBlur = (e) => {
        console.log(e.relatedTarget);
        console.log(e.nativeEvent);
        for ( let key in e) {
            console.log(key, e[key]);
        }
    }


    render() {
        const { showEmoji, textareaFocus } = this.state;
        const { isShowBtn, className } = this.props;
        return (
            <div className={ ClassNames("blog-comment-input", {[className]: className}) }>
                <textarea id="test" className={ ClassNames({ focus: textareaFocus }) }  rows="4" ref="commentText" placeholder='你不想说点啥么？' onFocus={ () => { this.toggleFocus(true) } } onBlur={ this.onTextareaBlur } ></textarea>
                <div className={ ClassNames("btn clearfix", {btnshow: textareaFocus})}>
                    <Icon type='emoji' className='fl' onClick={ this.toggleEmoji } />
                    { isShowBtn ? <button onClick={ this.exportComment } >发布</button> : null}
                </div>
                <div className={ ClassNames("emoji-box", { show: showEmoji}) } id='CommentEmoji' >
                    <Emojify style={{height: 20, cursor: 'pointer'}} onClick={ this.addEmoji }>
                        <div className='emoji-wrap'>
                            {EmojiData}
                        </div>
                    </Emojify>
                </div>
            </div>
        )
    }
}