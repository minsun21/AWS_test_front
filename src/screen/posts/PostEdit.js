import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ROOT, POST_EDIT, POST_GET } from "../../common/Url";
import { RESULT_SUCCESS } from "../../common/Constants";

const inputLabelProps = {
    shrink: true,
}
const inputStyle = { margin: 15 }

function PostEdit({ match }) {
    const id = match.params.id;
    const history = useHistory();
    const [inputInfo, setInputInfo] = useState();

    useEffect(() => {
        const url = POST_GET + `/${id}`;
        axios.get(url).then(res => {
            if (res.data.result === RESULT_SUCCESS)
                setInputInfo(res.data.data);
            else
                alert(res.result);
        })
    }, [])

    const onChangeHandler = (e) => {
        setInputInfo({
            ...inputInfo,
            [e.target.id]: e.target.value,
        })
    }

    const postReset = () => { history.push(ROOT); }

    const submitHandler = (e) => {
        e.preventDefault();
        const url = POST_EDIT + `/${inputInfo.id}`;
        if (infoCheck()) {
            axios.put(url, inputInfo).then(res => {
                if (res) { history.push(ROOT); }
            });
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
            <h1>게시글 수정</h1>
            {inputInfo &&
                <form onSubmit={submitHandler}>
                    <TextField
                        id="title"
                        label="제목"
                        value={inputInfo.title}
                        style={inputStyle}
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
                        fullWidth
                        InputLabelProps={inputLabelProps}
                        variant="outlined"
                        onChange={onChangeHandler}
                    />
                    <div className="post__write__bottom">
                        <Button variant="outlined" type="submit" color="primary">수정</Button>
                        <Button variant="outlined" onClick={postReset}>취소</Button>
                    </div>
                </form>
            }
        </div>

    )
}

export default PostEdit
