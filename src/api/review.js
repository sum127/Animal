import axios from 'axios'
export default {
    // fetch는 header에 json타입인지 어떤타입인지 셋팅해줘야하는데
    // axios사용시 매개변수가 자바스크립트면 자동으로 json으로 변환해준다.

    // 전체목록조회
    list: () =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews`),
    // id로 조회
    search: (id) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}`),
    // 제목으로 조회
    title: (title) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/search/title?keyword=${title}`),
    // 닉네임 중복체크
    check: (nickname) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/nickname/check?keyword=${nickname}`),
    //아이디 비번체크
    pwCheck: (nickname, password) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/${nickname}/check?keyword=${password}`),
    // 내용 업로드
    post: (review) =>
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/reviews`,
            review),
    // 파일업로드
    uploadFile: (id, form) =>
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}/review-picture-file`,
            form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }),
    patchFile: (textId, form) =>
        axios.put(`${process.env.VUE_APP_API_BASE_URL}/reviews/${textId}/pictures`,
            form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }),
    // id로 삭제
    del: (id) =>
        axios.delete(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}`),
    // 파일삭제
    delpic: (id) =>
        axios.delete(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}/review-picture-file`),
    patchContent: (id, content) =>
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}?content=${content}`),

    patchPic: (id, form) =>
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}/pictures`,
            form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }),










}