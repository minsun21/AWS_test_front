import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { POST_SAVE, POST_LIST, POST_REMOVE, POST_EDIT } from "../../common/Url";
import { RESULT_SUCCESS } from "../../common/Constants";


function PostsList() {
    const history = useHistory();
    const [tableInfo, setTableInfo] = useState([]);
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        axios.get(POST_LIST).then(res => {
            if (res.data.result === RESULT_SUCCESS)
                setTableInfo(res.data.data);
            else
                alert(res.result);
        })
    }, [])

    const columns = [
        { field: 'title', headerName: '제목', width: 130 },
        { field: 'content', headerName: '내용', width: 180 },
        { field: 'author', headerName: '작성자', width: 100 },
        { field: 'modifedDate', headerName: '날짜', width: 130 },
        { field: 'viewCount', headerName: '조회수', width: 100 },
    ];

    const goPostsWrite = () => {
        history.push(POST_SAVE);
    }

    const editPost = () => {
        if (selection && selection.rowIds.length === 1) {
            const url = POST_EDIT + `/${selection.rowIds[0]}`;
            history.push(url);
        } else
            alert('1개만 선택해주세요');
    }

    const removePost = () => {
        if (selection.length > 0) {
            axios.post(POST_REMOVE, selection).then(res => {
                if (res.data.result === RESULT_SUCCESS)
                    setTableInfo(res.data.data);
                else
                    alert(res.result);
            })
        } else
            alert('선택해주세요');
    }

    return (
        <div className="posts">
            <h1>자유 게시판</h1>
            <Button variant="outlined" color="primary" onClick={goPostsWrite}>글 등록</Button>
            <div style={{ height: 400, width: '100%', marginTop: '10px', marginBottom: '30px' }}>
                <DataGrid rows={tableInfo} columns={columns} pageSize={5} checkboxSelection onSelectionChange={(newSelection) => {
                    setSelection(newSelection);
                }} />
            </div>
            <Button variant="outlined" color="primary" onClick={editPost} style={{ marginRight: '10px' }}>수정</Button>
            <Button variant="outlined" color="primary" onClick={removePost}>삭제</Button>
        </div>
    )
}

export default PostsList
