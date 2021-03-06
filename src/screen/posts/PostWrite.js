import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ROOT, POST_SAVE } from "../../common/Url";

const inputLabelProps = {
    shrink: true,
}
const inputStyle = { margin: 15 }

function PostWrite() {
    const history = useHistory();
    const init = { title: '', author: '', content: '' };

    const [inputInfo, setInputInfo] = useState(init);

    const onChangeHandler = (e) => {
        setInputInfo({
            ...inputInfo,
            [e.target.id]: e.target.value,
        })
    }

    const postReset = () => { setInputInfo(init); }

    const submitHandler = (e) => {
        e.preventDefault();
        if (infoCheck()) {
            axios.post(POST_SAVE, inputInfo).then(res => {
                if (res) { history.push(ROOT); }
            }).catch((err) => console.log(err));
        }
    }

    const infoCheck = () => {
        if (inputInfo.title === '' || inputInfo.content === '' || inputInfo.author === '') {
            alert('값 입력해주세요')
            return false;
        }
        return true;
    }

    return (
        <div className="posts">
            <h1>게시글 등록</h1>
            <form onSubmit={submitHandler}>
                <TextField
                    id="title"
                    label="제목"
                    value={inputInfo.title}
                    style={inputStyle}
                    placeholder="제목을 입력해주세요"
                    fullWidth
                    InputLabelProps={inputLabelProps}
                    onChange={onChangeHandler}
                />
                {/* 나중에 자동 등록 하기 */}
                <TextField
                    id="author"
                    label="작성자"
                    value={inputInfo.author}
                    style={inputStyle}
                    placeholder="작성자를 입력해주세요"
                    fullWidth
                    InputLabelProps={inputLabelProps}
                    onChange={onChangeHandler}
                />
                <TextField
                    id="content"
                    label="내용"
                    value={inputInfo.content}
                    style={inputStyle}
                    multiline
                    rows={20}
                    placeholder="내용을 입력해주세요"
                    fullWidth
                    InputLabelProps={inputLabelProps}
                    variant="outlined"
                    onChange={onChangeHandler}
                />
                <div className="post__write__bottom">
                    <Button variant="outlined" type="submit" color="primary">등록</Button>
                    <Button variant="outlined" onClick={postReset}>취소</Button>
                </div>
            </form>
        </div>

    )
}

export default PostWrite
