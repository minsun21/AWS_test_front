import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { POST_SAVE, POST_LIST } from "../../common/Url";
import { RESULT_SUCCESS } from "../../common/Constants";


function PostsList() {
    const history = useHistory();
    const [tableInfo, settableInfo] = useState([]);

    useEffect(() => {
        axios.get(POST_LIST).then(res => {
            if (res.data.result === RESULT_SUCCESS)
                settableInfo(res.data.data);
            else
                alert(res.result);
        })
    }, [])

    const columns = [
        { field: 'title', headerName: '제목', width: 130 },
        { field: 'content', headerName: '내용', width: 180 },
        { field: 'author', headerName: '작성자', width: 100 },
        { field: 'createDate', headerName: '생성일', width: 130 },
        { field: 'viewCount', headerName: '조회수', width: 50 },
    ];

    const goPostsWrite = () => {
        history.push(POST_SAVE);
    }

    return (
        <div className="posts">
            <h1>스프링 부트로 시작하는 웹 서비스</h1>
            <Button variant="outlined" color="primary" onClick={goPostsWrite} >글 등록</Button>
            <div style={{ height: 400, width: '100%', marginTop: '30px' }}>
                <DataGrid rows={tableInfo} columns={columns} pageSize={5} checkboxSelection />
            </div>
        </div>
    )
}

export default PostsList
