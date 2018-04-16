import React, { Component } from 'react';
import {
	Button,WingBlank,Checkbox
} from 'antd-mobile';

const CheckboxItem = Checkbox.AgreeItem
import PropTypes from 'prop-types';

import './index.less';


class RadioMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteInfo:null
        }
    }
    

 componentWillMount() {
    console.log('----componentWillMount')
   
 }

 componentDidMount(){
    console.log('----componentDidMount')
 }
 componentWillUnmount(){
    console.log('----componentWillUnmount')
 }
render(){
    console.log('-----render');
    let  { voteInfo,checkBoxChange } = this.props;
    return (
        <div className="main-vote-wrap radio-multi-select-wrapper">
            {voteInfo && voteInfo.map( (val,index_p) => {
                 let classN = `${val.type == 1 ?'radio':'multi'}-wrapper`
                        return (
                            <div className={`${classN} body-content`} key={index_p}>
                                <div className="select-row-title">投票选项{val.type === 1 ? '（单选）' : '（多选）'}</div>
                                {val.list.map( (val_1,index_c) => {
                                    let classN = 'option' + (index_c===val.list.length-1 ? ' last':'');
                                    if(val_1.isActive){
                                        classN += ' active';
                                    }
                                    return (
                                        <div className={classN} key={index_c}>
                                            <div className="left">
                                                {val_1.img && <img className="img" src={val_1.img} alt=""/>}
                                                <p className="title">{val_1.title}</p>
                                                {val_1.img && (
                                                    <div className="note">
                                                        <span>摘要</span>
                                                        <span>介绍</span>
                                                        <span>更多</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="right">
                                                <CheckboxItem onChange={()=>{checkBoxChange(index_p,index_c)}}
                                                checked={val_1.isActive} style={{ marginTop: -20 }}/>
                                            </div>
                                        </div>
                                    )
                                } )}
                            </div>
                        )
                    } )}
        </div>
      );
}
  
};

// RadioMultiSelect.propTypes = {
//   show: PropTypes.bool.isRequired,
//   message: PropTypes.string.isRequired,
//   confirmHandle:PropTypes.func.isRequired
// };

RadioMultiSelect.defaultProps = {
  show: false,
  message: '',
  style:{} //默认没有样式
};

export default RadioMultiSelect;
