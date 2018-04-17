import React, { Component } from 'react';
import {
	Button,WingBlank,Checkbox
} from 'antd-mobile';

const CheckboxItem = Checkbox.AgreeItem;
const wrapperMap = {
    'vote':{
        className:'main-vote-wrap',
        subTitle:'投票选项'
    },
    'questionnaireSurvey':{
        className:'main-questionnaire-survey',
        subTitle:'问卷调查选项'
    }
}
import PropTypes from 'prop-types';

import './index.less';


class RadioMultiSelect extends Component {
    constructor(props) {
        super(props);
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
    let  { voteInfo,checkBoxChange,type } = this.props,wpName =`${wrapperMap[type].className}-wrapper`
    return (
        <div className={`${wpName} main-activity-wrap radio-multi-select-wrapper`}>
            {voteInfo && voteInfo.map( (val,index_p) => {
                 let classN = `${val.type == 1 ?'radio':'multi'}-wrapper`
                        return (
                            <div className={`${classN} body-content`} key={index_p}>
                                <div className="select-row-title">{wrapperMap[type]['subTitle']}{val.type === 1 ? '（单选）' : '（多选）'}</div>
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

RadioMultiSelect.propTypes = {
    //外面定义checkBox方法
    checkBoxChange: PropTypes.func.isRequired,
    //传进来的数据
    voteInfo: PropTypes.array.isRequired,
    //活动类型相关的type
    type:PropTypes.string.isRequired
};

RadioMultiSelect.defaultProps = {

};

export default RadioMultiSelect;
